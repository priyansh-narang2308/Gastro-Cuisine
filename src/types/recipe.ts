
export type Cuisine = 
  | 'Italian' 
  | 'Mexican' 
  | 'Chinese' 
  | 'Indian' 
  | 'American' 
  | 'Japanese' 
  | 'Thai' 
  | 'French' 
  | 'Mediterranean' 
  | 'Greek';

export type DietType = 
  | 'Vegetarian' 
  | 'Vegan' 
  | 'Gluten-Free' 
  | 'Dairy-Free' 
  | 'Keto' 
  | 'Paleo' 
  | 'Low-Carb' 
  | 'Pescatarian';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

export interface Step {
  id: string;
  description: string;
  image?: string;
  timer?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: Difficulty;
  cuisine: Cuisine;
  dietTypes: DietType[];
  tags: string[];
  ingredients: Ingredient[];
  steps: Step[];
  video?: string;
  author: Author;
  createdAt: string;
  rating: number;
}
