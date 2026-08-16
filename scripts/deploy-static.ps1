<#
.SYNOPSIS
  Deploy a static site folder to an IIS path on this Windows VM.

.DESCRIPTION
  Creates the destination folder if missing, copies with robocopy /MIR,
  and never deletes app_offline.htm mid-copy incorrectly.
  Designed for Articara (Vite/React PWA) under C:\sites\othersites\articara.

.EXAMPLE
  .\deploy-static.ps1 -SourcePath .\site -DestPath 'C:\sites\othersites\articara'
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$SourcePath,

    [Parameter(Mandatory = $true)]
    [string]$DestPath,

    [string]$AppPoolName = '',

    [int]$OfflineWaitSeconds = 2
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Set-AppPoolState {
    param([string]$Name, [ValidateSet('Started', 'Stopped')]$State)
    if (-not $Name) { return }
    Import-Module WebAdministration -ErrorAction Stop
    $pool = Get-WebAppPoolState -Name $Name -ErrorAction SilentlyContinue
    if (-not $pool) { throw "IIS app pool '$Name' was not found." }
    if ($State -eq 'Stopped' -and $pool.Value -ne 'Stopped') {
        Write-Host "Stopping app pool '$Name'..."
        Stop-WebAppPool -Name $Name
        $deadline = (Get-Date).AddSeconds(60)
        do {
            Start-Sleep -Seconds 1
            $pool = Get-WebAppPoolState -Name $Name
        } while ($pool.Value -ne 'Stopped' -and (Get-Date) -lt $deadline)
        if ($pool.Value -ne 'Stopped') {
            throw "Timed out waiting for app pool '$Name' to stop."
        }
    }
    elseif ($State -eq 'Started' -and $pool.Value -ne 'Started') {
        Write-Host "Starting app pool '$Name'..."
        Start-WebAppPool -Name $Name
    }
}

if (-not (Test-Path -LiteralPath $SourcePath)) {
    throw "Source path not found: $SourcePath"
}

$SourcePath = (Resolve-Path -LiteralPath $SourcePath).Path

$parent = Split-Path -Parent $DestPath
if ($parent -and -not (Test-Path -LiteralPath $parent)) {
    Write-Host "Creating parent folder: $parent"
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
}
if (-not (Test-Path -LiteralPath $DestPath)) {
    Write-Host "Creating site folder: $DestPath"
    New-Item -ItemType Directory -Path $DestPath -Force | Out-Null
}

$offlineFile = Join-Path $DestPath 'app_offline.htm'
$offlineHtml = @'
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Deploying</title></head>
<body>
  <h1>Site update in progress</h1>
  <p>Please retry in a minute.</p>
</body>
</html>
'@

try {
    Write-Host "Placing app_offline.htm in $DestPath"
    Set-Content -LiteralPath $offlineFile -Value $offlineHtml -Encoding UTF8
    Start-Sleep -Seconds $OfflineWaitSeconds
    Set-AppPoolState -Name $AppPoolName -State Stopped

    Write-Host "Copying files from $SourcePath to $DestPath"
    & robocopy $SourcePath $DestPath /MIR /XF app_offline.htm /NFL /NDL /NJH /NJS /NP /R:2 /W:2
    $robocopyExit = $LASTEXITCODE
    if ($robocopyExit -ge 8) {
        throw "robocopy failed with exit code $robocopyExit"
    }
}
finally {
    if (Test-Path -LiteralPath $offlineFile) {
        Remove-Item -LiteralPath $offlineFile -Force
        Write-Host 'Removed app_offline.htm'
    }
    Set-AppPoolState -Name $AppPoolName -State Started
}

$fileCount = (Get-ChildItem -LiteralPath $DestPath -Recurse -File -ErrorAction SilentlyContinue | Measure-Object).Count
Write-Host "Deploy complete -> $DestPath ($fileCount files)"
if ($AppPoolName) {
    $final = Get-WebAppPoolState -Name $AppPoolName
    Write-Host "App pool '$AppPoolName' state: $($final.Value)"
}
