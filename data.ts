
import { FoodItem } from './types';

export const FOOD_DATABASE: FoodItem[] = [
  // POULTRY & EGGS
  { id: '1', name: 'Whole Egg (Large)', category: 'Poultry/Egg', baseUnit: 'pcs', baseAmount: 1, calories: 72, protein: 6.3, carbs: 0.4, fats: 4.8 },
  { id: '2', name: 'Egg White (Large)', category: 'Poultry/Egg', baseUnit: 'pcs', baseAmount: 1, calories: 17, protein: 3.6, carbs: 0.2, fats: 0.1 },
  { id: '3', name: 'Chicken Breast (Raw)', category: 'Poultry/Egg', baseUnit: 'g', baseAmount: 100, calories: 110, protein: 23.0, carbs: 0.0, fats: 1.2 },
  { id: '4', name: 'Chicken Thigh (Skinless)', category: 'Poultry/Egg', baseUnit: 'g', baseAmount: 100, calories: 120, protein: 20.0, carbs: 0.0, fats: 4.5 },
  { id: '5', name: 'Turkey Breast', category: 'Poultry/Egg', baseUnit: 'g', baseAmount: 100, calories: 104, protein: 24.0, carbs: 0.0, fats: 0.5 },
  { id: '6', name: 'Duck Egg', category: 'Poultry/Egg', baseUnit: 'pcs', baseAmount: 1, calories: 130, protein: 9.0, carbs: 1.0, fats: 9.6 },

  // DAIRY & ALTERNATIVES
  { id: '7', name: 'Paneer (Low Fat)', category: 'Dairy', baseUnit: 'g', baseAmount: 100, calories: 180, protein: 18.0, carbs: 4.0, fats: 10.0 },
  { id: '8', name: 'Paneer (Full Fat)', category: 'Dairy', baseUnit: 'g', baseAmount: 100, calories: 265, protein: 14.0, carbs: 3.0, fats: 21.0 },
  { id: '9', name: 'Curd/Yogurt (Non-fat)', category: 'Dairy', baseUnit: 'g', baseAmount: 100, calories: 59, protein: 10.0, carbs: 3.6, fats: 0.4 },
  { id: '10', name: 'Greek Yogurt', category: 'Dairy', baseUnit: 'g', baseAmount: 100, calories: 97, protein: 10.3, carbs: 3.4, fats: 5.0 },
  { id: '11', name: 'Milk (Double Toned)', category: 'Dairy', baseUnit: 'ml', baseAmount: 100, calories: 47, protein: 3.2, carbs: 4.8, fats: 1.5 },
  { id: '12', name: 'Milk (Whole)', category: 'Dairy', baseUnit: 'ml', baseAmount: 100, calories: 62, protein: 3.1, carbs: 4.7, fats: 3.4 },
  { id: '13', name: 'Skimmed Milk', category: 'Dairy', baseUnit: 'ml', baseAmount: 100, calories: 35, protein: 3.4, carbs: 5.0, fats: 0.1 },
  { id: '14', name: 'Cheese Slice', category: 'Dairy', baseUnit: 'pcs', baseAmount: 1, calories: 50, protein: 3.0, carbs: 1.0, fats: 4.0 },
  { id: '15', name: 'Mozzarella', category: 'Dairy', baseUnit: 'g', baseAmount: 100, calories: 280, protein: 22.0, carbs: 2.2, fats: 20.0 },

  // PLANT PROTEINS & LEGUMES
  { id: '16', name: 'Soya Chunks', category: 'Legumes', baseUnit: 'g', baseAmount: 100, calories: 345, protein: 52.0, carbs: 33.0, fats: 0.5 },
  { id: '17', name: 'Tofu (Extra Firm)', category: 'Legumes', baseUnit: 'g', baseAmount: 100, calories: 83, protein: 10.0, carbs: 2.0, fats: 5.0 },
  { id: '18', name: 'Tempeh', category: 'Legumes', baseUnit: 'g', baseAmount: 100, calories: 193, protein: 19.0, carbs: 9.0, fats: 11.0 },
  { id: '19', name: 'Lentils/Dal (Red Raw)', category: 'Legumes', baseUnit: 'g', baseAmount: 100, calories: 352, protein: 24.6, carbs: 63.3, fats: 1.1 },
  { id: '20', name: 'Moong Dal (Raw)', category: 'Legumes', baseUnit: 'g', baseAmount: 100, calories: 348, protein: 24.0, carbs: 60.0, fats: 1.2 },
  { id: '21', name: 'Chickpeas/Chana (Raw)', category: 'Legumes', baseUnit: 'g', baseAmount: 100, calories: 364, protein: 19.3, carbs: 60.6, fats: 6.0 },
  { id: '22', name: 'Rajma/Kidney Beans', category: 'Legumes', baseUnit: 'g', baseAmount: 100, calories: 333, protein: 23.5, carbs: 60.0, fats: 0.8 },
  { id: '23', name: 'Black Gram (Urad)', category: 'Legumes', baseUnit: 'g', baseAmount: 100, calories: 341, protein: 25.0, carbs: 59.0, fats: 1.6 },
  { id: '24', name: 'Soy Milk (Unsweetened)', category: 'Legumes', baseUnit: 'ml', baseAmount: 100, calories: 33, protein: 3.3, carbs: 1.0, fats: 1.8 },
  { id: '25', name: 'Edamame', category: 'Legumes', baseUnit: 'g', baseAmount: 100, calories: 122, protein: 11.0, carbs: 10.0, fats: 5.0 },

  // GRAINS & CARBS
  { id: '26', name: 'Oats (Instant)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 389, protein: 16.9, carbs: 66.3, fats: 6.9 },
  { id: '27', name: 'White Rice (Raw)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 365, protein: 7.1, carbs: 80.0, fats: 0.7 },
  { id: '28', name: 'Brown Rice (Raw)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 362, protein: 7.5, carbs: 76.2, fats: 2.7 },
  { id: '29', name: 'Quinoa (Raw)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 368, protein: 14.1, carbs: 64.2, fats: 6.1 },
  { id: '30', name: 'Wheat Flour / Atta', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 340, protein: 12.0, carbs: 72.0, fats: 2.0 },
  { id: '31', name: 'Poha (Rice Flakes)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 346, protein: 6.6, carbs: 77.3, fats: 1.2 },
  { id: '32', name: 'Daliya (Broken Wheat)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 342, protein: 12.0, carbs: 70.0, fats: 1.5 },
  { id: '33', name: 'Millet (Bajra)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 361, protein: 11.6, carbs: 67.5, fats: 4.8 },
  { id: '34', name: 'Millet (Jowar)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 349, protein: 10.4, carbs: 72.6, fats: 3.3 },
  { id: '35', name: 'Buckwheat', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 343, protein: 13.0, carbs: 71.0, fats: 3.4 },
  { id: '36', name: 'Sweet Potato (Raw)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 86, protein: 1.6, carbs: 20.1, fats: 0.1 },
  { id: '37', name: 'Potato (Raw)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 77, protein: 2.0, carbs: 17.0, fats: 0.1 },
  { id: '38', name: 'Whole Wheat Bread', category: 'Grains', baseUnit: 'pcs', baseAmount: 1, calories: 69, protein: 3.6, carbs: 12.0, fats: 0.9 },
  { id: '39', name: 'White Bread', category: 'Grains', baseUnit: 'pcs', baseAmount: 1, calories: 75, protein: 2.0, carbs: 14.0, fats: 1.0 },
  { id: '40', name: 'Pasta (Wheat)', category: 'Grains', baseUnit: 'g', baseAmount: 100, calories: 350, protein: 12.0, carbs: 71.0, fats: 1.5 },

  // FATS, NUTS & SEEDS
  { id: '41', name: 'Almonds', category: 'Nuts/Seeds', baseUnit: 'g', baseAmount: 10, calories: 58, protein: 2.1, carbs: 2.2, fats: 5.0 },
  { id: '42', name: 'Walnuts', category: 'Nuts/Seeds', baseUnit: 'g', baseAmount: 10, calories: 65, protein: 1.5, carbs: 1.4, fats: 6.5 },
  { id: '43', name: 'Cashews', category: 'Nuts/Seeds', baseUnit: 'g', baseAmount: 10, calories: 55, protein: 1.8, carbs: 3.0, fats: 4.4 },
  { id: '44', name: 'Peanut Butter', category: 'Nuts/Seeds', baseUnit: 'tbsp', baseAmount: 1, calories: 94, protein: 4.0, carbs: 3.1, fats: 8.1 },
  { id: '45', name: 'Peanuts', category: 'Nuts/Seeds', baseUnit: 'g', baseAmount: 10, calories: 57, protein: 2.6, carbs: 1.6, fats: 4.9 },
  { id: '46', name: 'Chia Seeds', category: 'Nuts/Seeds', baseUnit: 'g', baseAmount: 10, calories: 48, protein: 1.7, carbs: 4.2, fats: 3.1 },
  { id: '47', name: 'Flax Seeds', category: 'Nuts/Seeds', baseUnit: 'g', baseAmount: 10, calories: 53, protein: 1.8, carbs: 2.9, fats: 4.2 },
  { id: '48', name: 'Pumpkin Seeds', category: 'Nuts/Seeds', baseUnit: 'g', baseAmount: 10, calories: 56, protein: 3.0, carbs: 1.1, fats: 4.9 },
  { id: '49', name: 'Sunflower Seeds', category: 'Nuts/Seeds', baseUnit: 'g', baseAmount: 10, calories: 58, protein: 2.1, carbs: 2.0, fats: 5.1 },
  { id: '50', name: 'Olive Oil', category: 'Fats', baseUnit: 'ml', baseAmount: 10, calories: 88, protein: 0.0, carbs: 0.0, fats: 10.0 },
  { id: '51', name: 'Ghee/Clarified Butter', category: 'Fats', baseUnit: 'ml', baseAmount: 10, calories: 90, protein: 0.0, carbs: 0.0, fats: 10.0 },
  { id: '52', name: 'Butter', category: 'Fats', baseUnit: 'g', baseAmount: 10, calories: 72, protein: 0.1, carbs: 0.1, fats: 8.1 },
  { id: '53', name: 'Avocado', category: 'Fats', baseUnit: 'g', baseAmount: 100, calories: 160, protein: 2.0, carbs: 8.5, fats: 14.7 },
  { id: '54', name: 'Coconut Oil', category: 'Fats', baseUnit: 'ml', baseAmount: 10, calories: 86, protein: 0.0, carbs: 0.0, fats: 9.9 },

  // FISH & SEAFOOD
  { id: '55', name: 'Salmon', category: 'Seafood', baseUnit: 'g', baseAmount: 100, calories: 208, protein: 20.4, carbs: 0.0, fats: 13.4 },
  { id: '56', name: 'Tuna (Canned)', category: 'Seafood', baseUnit: 'g', baseAmount: 100, calories: 116, protein: 26.0, carbs: 0.0, fats: 0.8 },
  { id: '57', name: 'Rohu Fish', category: 'Seafood', baseUnit: 'g', baseAmount: 100, calories: 97, protein: 19.7, carbs: 0.0, fats: 2.0 },
  { id: '58', name: 'Surmai (Kingfish)', category: 'Seafood', baseUnit: 'g', baseAmount: 100, calories: 115, protein: 22.0, carbs: 0.0, fats: 3.0 },
  { id: '59', name: 'Prawns', category: 'Seafood', baseUnit: 'g', baseAmount: 100, calories: 99, protein: 20.0, carbs: 0.2, fats: 1.7 },

  // MEAT
  { id: '60', name: 'Mutton (Lean)', category: 'Meat', baseUnit: 'g', baseAmount: 100, calories: 143, protein: 21.0, carbs: 0.0, fats: 6.5 },
  { id: '61', name: 'Beef Lean', category: 'Meat', baseUnit: 'g', baseAmount: 100, calories: 136, protein: 22.0, carbs: 0.0, fats: 5.0 },
  { id: '62', name: 'Pork Tenderloin', category: 'Meat', baseUnit: 'g', baseAmount: 100, calories: 120, protein: 21.0, carbs: 0.0, fats: 3.5 },

  // FRUITS
  { id: '63', name: 'Banana', category: 'Fruit', baseUnit: 'pcs', baseAmount: 1, calories: 105, protein: 1.3, carbs: 27.0, fats: 0.4 },
  { id: '64', name: 'Apple (Medium)', category: 'Fruit', baseUnit: 'pcs', baseAmount: 1, calories: 95, protein: 0.5, carbs: 25.0, fats: 0.3 },
  { id: '65', name: 'Orange', category: 'Fruit', baseUnit: 'pcs', baseAmount: 1, calories: 62, protein: 1.2, carbs: 15.4, fats: 0.2 },
  { id: '66', name: 'Papaya', category: 'Fruit', baseUnit: 'g', baseAmount: 100, calories: 43, protein: 0.5, carbs: 10.8, fats: 0.3 },
  { id: '67', name: 'Watermelon', category: 'Fruit', baseUnit: 'g', baseAmount: 100, calories: 30, protein: 0.6, carbs: 7.6, fats: 0.2 },
  { id: '68', name: 'Guava', category: 'Fruit', baseUnit: 'g', baseAmount: 100, calories: 68, protein: 2.6, carbs: 14.3, fats: 1.0 },
  { id: '69', name: 'Mango', category: 'Fruit', baseUnit: 'g', baseAmount: 100, calories: 60, protein: 0.8, carbs: 15.0, fats: 0.4 },
  { id: '70', name: 'Grapes', category: 'Fruit', baseUnit: 'g', baseAmount: 100, calories: 69, protein: 0.7, carbs: 18.0, fats: 0.2 },
  { id: '71', name: 'Pomegranate', category: 'Fruit', baseUnit: 'g', baseAmount: 100, calories: 83, protein: 1.7, carbs: 18.7, fats: 1.2 },
  { id: '72', name: 'Strawberry', category: 'Fruit', baseUnit: 'g', baseAmount: 100, calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3 },

  // VEGETABLES
  { id: '73', name: 'Broccoli', category: 'Veg', baseUnit: 'g', baseAmount: 100, calories: 34, protein: 2.8, carbs: 6.6, fats: 0.4 },
  { id: '74', name: 'Spinach', category: 'Veg', baseUnit: 'g', baseAmount: 100, calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4 },
  { id: '75', name: 'Cauliflower', category: 'Veg', baseUnit: 'g', baseAmount: 100, calories: 25, protein: 1.9, carbs: 5.0, fats: 0.3 },
  { id: '76', name: 'Mushroom', category: 'Veg', baseUnit: 'g', baseAmount: 100, calories: 22, protein: 3.1, carbs: 3.3, fats: 0.3 },
  { id: '77', name: 'Carrot', category: 'Veg', baseUnit: 'g', baseAmount: 100, calories: 41, protein: 0.9, carbs: 9.6, fats: 0.2 },
  { id: '78', name: 'French Beans', category: 'Veg', baseUnit: 'g', baseAmount: 100, calories: 26, protein: 1.7, carbs: 4.5, fats: 0.1 },

  // SUPPLEMENTS
  { id: '79', name: 'Whey Protein Isolate', category: 'Supplement', baseUnit: 'scoop', baseAmount: 1, calories: 110, protein: 25.0, carbs: 1.0, fats: 0.5 },
  { id: '80', name: 'Whey Protein Blend', category: 'Supplement', baseUnit: 'scoop', baseAmount: 1, calories: 120, protein: 24.0, carbs: 3.0, fats: 1.5 },
  { id: '81', name: 'Casein Protein', category: 'Supplement', baseUnit: 'scoop', baseAmount: 1, calories: 115, protein: 24.0, carbs: 2.0, fats: 1.0 },
  { id: '82', name: 'Pea Protein', category: 'Supplement', baseUnit: 'scoop', baseAmount: 1, calories: 120, protein: 24.0, carbs: 1.0, fats: 2.0 },
  { id: '83', name: 'Seitan', category: 'Legumes', baseUnit: 'g', baseAmount: 100, calories: 370, protein: 75.0, carbs: 14.0, fats: 1.9 },
  { id: '84', name: 'Quail Egg', category: 'Poultry/Egg', baseUnit: 'pcs', baseAmount: 1, calories: 14, protein: 1.2, carbs: 0.1, fats: 1.0 }
];
