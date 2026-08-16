import type { MealPlan } from '../types'

export const MEAL_PLANS: MealPlan[] = [
  {
    id: 'mediterranean',
    title: 'Mediterranean',
    description: 'Anti-inflammatory staples: olive oil, fish, greens, legumes.',
    meals: [
      { name: 'Breakfast', detail: 'Greek yogurt, berries, walnuts, drizzle of honey' },
      { name: 'Lunch', detail: 'Chickpea salad with olive oil, cucumber, tomato, feta' },
      { name: 'Dinner', detail: 'Baked salmon, roasted vegetables, quinoa' },
      { name: 'Snack', detail: 'Handful of almonds + orange' },
    ],
  },
  {
    id: 'vegetarian',
    title: 'Vegetarian',
    description: 'Plant-forward plates rich in fiber and colorful produce.',
    meals: [
      { name: 'Breakfast', detail: 'Overnight oats with chia, banana, cinnamon' },
      { name: 'Lunch', detail: 'Lentil soup with spinach and whole-grain toast' },
      { name: 'Dinner', detail: 'Tofu stir-fry with broccoli, peppers, brown rice' },
      { name: 'Snack', detail: 'Hummus with carrot and cucumber sticks' },
    ],
  },
  {
    id: 'highProtein',
    title: 'High protein',
    description: 'Supports muscle and recovery on low-energy days.',
    meals: [
      { name: 'Breakfast', detail: 'Egg omelette with spinach and cottage cheese' },
      { name: 'Lunch', detail: 'Grilled chicken bowl with beans and greens' },
      { name: 'Dinner', detail: 'Turkey meatballs, zucchini noodles, tomato sauce' },
      { name: 'Snack', detail: 'Protein smoothie with berries' },
    ],
  },
  {
    id: 'budget',
    title: 'Budget-friendly',
    description: 'Simple, affordable anti-inflammatory meals.',
    meals: [
      { name: 'Breakfast', detail: 'Oatmeal with peanut butter and banana' },
      { name: 'Lunch', detail: 'Bean and rice bowl with frozen mixed vegetables' },
      { name: 'Dinner', detail: 'Egg curry with potatoes and side salad' },
      { name: 'Snack', detail: 'Roasted chickpeas or seasonal fruit' },
    ],
  },
  {
    id: 'desi',
    title: 'Pakistani / Indian inspired',
    description: 'Familiar flavors adapted for gentler, anti-inflammatory days.',
    meals: [
      { name: 'Breakfast', detail: 'Moong dal chilla with mint yogurt' },
      { name: 'Lunch', detail: 'Khichdi with bottle gourd (lauki) and salad' },
      { name: 'Dinner', detail: 'Grilled fish or paneer tikka, sautéed greens, small roti' },
      { name: 'Snack', detail: 'Masala chai (light) with roasted makhana' },
    ],
  },
]
