
export enum MatchType {
  PROTEIN = 'Protein',
  CALORIES = 'Calories'
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  baseUnit: string; // e.g., "pcs", "g", "ml"
  baseAmount: number; // e.g., 1 (for 1 piece) or 100 (for 100g)
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface SelectedFoodState {
  foodId: string;
  quantity: number;
}
