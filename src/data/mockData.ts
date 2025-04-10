import { Recipe } from '@/types/recipe';

// Mock Recipes Data
export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Mushroom Risotto',
    description: 'A delicious Italian classic made with arborio rice and fresh mushrooms.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1000',
    cookTime: 30,
    prepTime: 15,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Italian',
    dietTypes: ['Vegetarian'],
    tags: ['Italian', 'Vegetarian', 'Dinner', 'Rice'],
    ingredients: [
      { id: '1-1', name: 'Arborio rice', quantity: '1.5', unit: 'cups' },
      { id: '1-2', name: 'Mushrooms', quantity: '8', unit: 'oz' },
      { id: '1-3', name: 'Vegetable broth', quantity: '4', unit: 'cups' },
      { id: '1-4', name: 'White wine', quantity: '1/2', unit: 'cup' },
      { id: '1-5', name: 'Parmesan cheese', quantity: '1/2', unit: 'cup' },
      { id: '1-6', name: 'Onion', quantity: '1', unit: 'medium' },
      { id: '1-7', name: 'Garlic', quantity: '2', unit: 'cloves' },
      { id: '1-8', name: 'Butter', quantity: '2', unit: 'tbsp' },
      { id: '1-9', name: 'Olive oil', quantity: '2', unit: 'tbsp' },
      { id: '1-10', name: 'Fresh thyme', quantity: '1', unit: 'tsp' },
      { id: '1-11', name: 'Salt and pepper', quantity: '', unit: 'to taste' },
    ],
    steps: [
      {
        id: '1-s1',
        description: 'In a large pan, heat the olive oil and 1 tbsp of butter. Add the finely chopped onion and cook until translucent.',
      },
      {
        id: '1-s2',
        description: 'Add the garlic and sliced mushrooms, cooking until the mushrooms release their moisture and turn golden brown.',
        timer: 5,
      },
      {
        id: '1-s3',
        description: 'Add the arborio rice, stirring to coat each grain with oil. Toast for about 2 minutes.',
        timer: 2,
      },
      {
        id: '1-s4',
        description: 'Pour in the white wine, stirring until it\'s absorbed.',
        timer: 2,
      },
      {
        id: '1-s5',
        description: 'Begin adding the vegetable broth one ladle at a time, stirring constantly. Wait until each addition is absorbed before adding more.',
        timer: 20,
      },
      {
        id: '1-s6',
        description: 'Once the rice is creamy and al dente, stir in the remaining butter, parmesan cheese, and thyme. Season with salt and pepper to taste.',
      },
      {
        id: '1-s7',
        description: 'Cover and let rest for 2 minutes before serving.',
        timer: 2,
      },
    ],
    author: {
      id: 'a1',
      name: 'Priyansh Narang',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      bio: 'Indian chef specializing in traditional cuisine with a modern twist.',
    },
    createdAt: '2023-08-12T12:00:00Z',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Spicy Thai Basil Chicken (Pad Krapow Gai)',
    description: 'An authentic Thai street food dish that\'s quick, spicy and full of flavor.',
    image: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?q=80&w=1000',
    cookTime: 15,
    prepTime: 10,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'Thai',
    dietTypes: [],
    tags: ['Thai', 'Spicy', 'Quick', 'Chicken'],
    ingredients: [
      { id: '2-1', name: 'Chicken', quantity: '1', unit: 'lb' },
      { id: '2-2', name: 'Thai basil leaves', quantity: '1', unit: 'cup' },
      { id: '2-3', name: 'Thai chili peppers', quantity: '3-5', unit: '' },
      { id: '2-4', name: 'Garlic', quantity: '4', unit: 'cloves' },
      { id: '2-5', name: 'Soy sauce', quantity: '2', unit: 'tbsp' },
      { id: '2-6', name: 'Oyster sauce', quantity: '1', unit: 'tbsp' },
      { id: '2-7', name: 'Fish sauce', quantity: '1', unit: 'tbsp' },
      { id: '2-8', name: 'Sugar', quantity: '1', unit: 'tsp' },
      { id: '2-9', name: 'Vegetable oil', quantity: '2', unit: 'tbsp' },
    ],
    steps: [
      {
        id: '2-s1',
        description: 'Mince the garlic and chili peppers together.',
      },
      {
        id: '2-s2',
        description: 'In a small bowl, mix the soy sauce, oyster sauce, fish sauce, and sugar.',
      },
      {
        id: '2-s3',
        description: 'Heat a wok or large frying pan over high heat. Add the oil, then add the garlic and chilies. Stir-fry for about 30 seconds.',
        timer: 0.5,
      },
      {
        id: '2-s4',
        description: 'Add the chicken and stir-fry until it\'s no longer pink, about 2-3 minutes.',
        timer: 3,
      },
      {
        id: '2-s5',
        description: 'Pour in the sauce mixture and stir to coat the chicken. Cook for another minute.',
        timer: 1,
      },
      {
        id: '2-s6',
        description: 'Turn off the heat and fold in the Thai basil leaves, stirring until they wilt.',
      },
      {
        id: '2-s7',
        description: 'Serve over hot jasmine rice, optionally topped with a fried egg.',
      },
    ],
    author: {
      id: 'a2',
      name: 'Chai Saechao',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Street food enthusiast and Thai cuisine expert.',
    },
    createdAt: '2023-09-05T15:30:00Z',
    rating: 4.7,
  },
  {
    id: '3',
    title: 'Avocado Toast with Poached Eggs',
    description: 'A nutritious breakfast that\'s both simple and satisfying.',
    image: 'https://images.unsplash.com/photo-1603046891744-56464352f88d?q=80&w=1000',
    cookTime: 10,
    prepTime: 5,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'American',
    dietTypes: ['Vegetarian'],
    tags: ['Breakfast', 'Vegetarian', 'Healthy', 'Quick'],
    ingredients: [
      { id: '3-1', name: 'Bread', quantity: '2', unit: 'slices' },
      { id: '3-2', name: 'Avocado', quantity: '1', unit: 'ripe' },
      { id: '3-3', name: 'Eggs', quantity: '2', unit: 'large' },
      { id: '3-4', name: 'Lemon juice', quantity: '1', unit: 'tsp' },
      { id: '3-5', name: 'Red pepper flakes', quantity: '1/4', unit: 'tsp' },
      { id: '3-6', name: 'Salt and pepper', quantity: '', unit: 'to taste' },
      { id: '3-7', name: 'Vinegar', quantity: '1', unit: 'tbsp' },
    ],
    steps: [
      {
        id: '3-s1',
        description: 'Toast the bread until golden and crisp.',
      },
      {
        id: '3-s2',
        description: 'In a bowl, mash the avocado with lemon juice, salt, and pepper.',
      },
      {
        id: '3-s3',
        description: 'Bring a pot of water to a gentle simmer. Add vinegar.',
      },
      {
        id: '3-s4',
        description: 'Crack each egg into a small bowl, then gently slide it into the simmering water. Poach for 3-4 minutes for a runny yolk.',
        timer: 4,
      },
      {
        id: '3-s5',
        description: 'Spread the avocado mixture onto the toast slices.',
      },
      {
        id: '3-s6',
        description: 'Using a slotted spoon, remove the poached eggs and place on top of the avocado toast.',
      },
      {
        id: '3-s7',
        description: 'Sprinkle with red pepper flakes and additional salt and pepper if desired.',
      },
    ],
    author: {
      id: 'a3',
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      bio: 'Nutritionist and healthy eating advocate.',
    },
    createdAt: '2023-10-17T08:15:00Z',
    rating: 4.5,
  },
  {
    id: '4',
    title: 'Classic French Coq au Vin',
    description: 'A traditional French dish of chicken braised with wine, mushrooms, and garlic.',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000',
    cookTime: 90,
    prepTime: 30,
    servings: 6,
    difficulty: 'Hard',
    cuisine: 'French',
    dietTypes: [],
    tags: ['French', 'Chicken', 'Dinner', 'Wine', 'Classic'],
    ingredients: [
      { id: '4-1', name: 'Chicken thighs and legs', quantity: '3', unit: 'lbs' },
      { id: '4-2', name: 'Bacon', quantity: '6', unit: 'oz' },
      { id: '4-3', name: 'Red wine', quantity: '3', unit: 'cups' },
      { id: '4-4', name: 'Chicken broth', quantity: '2', unit: 'cups' },
      { id: '4-5', name: 'Mushrooms', quantity: '1', unit: 'lb' },
      { id: '4-6', name: 'Pearl onions', quantity: '1', unit: 'cup' },
      { id: '4-7', name: 'Carrots', quantity: '2', unit: 'large' },
      { id: '4-8', name: 'Garlic', quantity: '4', unit: 'cloves' },
      { id: '4-9', name: 'Tomato paste', quantity: '2', unit: 'tbsp' },
      { id: '4-10', name: 'Fresh thyme', quantity: '4', unit: 'sprigs' },
      { id: '4-11', name: 'Bay leaves', quantity: '2', unit: '' },
      { id: '4-12', name: 'Butter', quantity: '3', unit: 'tbsp' },
      { id: '4-13', name: 'Flour', quantity: '3', unit: 'tbsp' },
      { id: '4-14', name: 'Brandy', quantity: '1/4', unit: 'cup' },
      { id: '4-15', name: 'Fresh parsley', quantity: '1/4', unit: 'cup' },
      { id: '4-16', name: 'Salt and pepper', quantity: '', unit: 'to taste' },
    ],
    steps: [
      {
        id: '4-s1',
        description: 'Season the chicken pieces with salt and pepper.',
      },
      {
        id: '4-s2',
        description: 'In a large Dutch oven, cook the bacon until crisp. Remove and set aside, leaving the fat in the pot.',
      },
      {
        id: '4-s3',
        description: 'Brown the chicken in batches in the bacon fat, about 5 minutes per side. Remove and set aside.',
        timer: 10,
      },
      {
        id: '4-s4',
        description: 'Add carrots, pearl onions, and mushrooms to the pot, cooking until they begin to brown.',
        timer: 8,
      },
      {
        id: '4-s5',
        description: 'Add garlic and tomato paste, cooking for another minute.',
        timer: 1,
      },
      {
        id: '4-s6',
        description: 'Pour in the brandy, scraping up any browned bits from the bottom of the pot.',
      },
      {
        id: '4-s7',
        description: 'Return the chicken and bacon to the pot. Add the red wine, chicken broth, thyme, and bay leaves.',
      },
      {
        id: '4-s8',
        description: 'Bring to a simmer, then cover and reduce heat. Cook for about 1 hour until the chicken is very tender.',
        timer: 60,
      },
      {
        id: '4-s9',
        description: 'In a small bowl, mix butter and flour to form a paste (beurre manié).',
      },
      {
        id: '4-s10',
        description: 'Remove the chicken from the pot. Whisk the beurre manié into the sauce and simmer until thickened.',
        timer: 5,
      },
      {
        id: '4-s11',
        description: 'Return the chicken to the pot, warming through. Remove thyme sprigs and bay leaves.',
      },
      {
        id: '4-s12',
        description: 'Garnish with fresh parsley and serve with mashed potatoes or crusty bread.',
      },
    ],
    author: {
      id: 'a4',
      name: 'Jean-Pierre Laurent',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      bio: 'Classical French cuisine expert and culinary instructor.',
    },
    createdAt: '2023-07-29T14:45:00Z',
    rating: 4.9,
  },
  {
    id: '5',
    title: 'Simple Vegetable Curry',
    description: 'A flavorful and nutritious vegetable curry that\'s perfect for a weeknight dinner.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1000',
    cookTime: 25,
    prepTime: 15,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Indian',
    dietTypes: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    tags: ['Indian', 'Vegetarian', 'Vegan', 'Curry'],
    ingredients: [
      { id: '5-1', name: 'Mixed vegetables', quantity: '4', unit: 'cups' },
      { id: '5-2', name: 'Coconut milk', quantity: '1', unit: 'can' },
      { id: '5-3', name: 'Curry powder', quantity: '2', unit: 'tbsp' },
      { id: '5-4', name: 'Onion', quantity: '1', unit: 'large' },
      { id: '5-5', name: 'Garlic', quantity: '3', unit: 'cloves' },
      { id: '5-6', name: 'Ginger', quantity: '1', unit: 'inch' },
      { id: '5-7', name: 'Tomatoes', quantity: '2', unit: 'medium' },
      { id: '5-8', name: 'Vegetable broth', quantity: '1', unit: 'cup' },
      { id: '5-9', name: 'Olive oil', quantity: '2', unit: 'tbsp' },
      { id: '5-10', name: 'Salt', quantity: '1', unit: 'tsp' },
      { id: '5-11', name: 'Fresh cilantro', quantity: '1/4', unit: 'cup' },
      { id: '5-12', name: 'Lime', quantity: '1', unit: '' },
    ],
    steps: [
      {
        id: '5-s1',
        description: 'Heat oil in a large pot over medium heat. Add chopped onion and cook until translucent.',
        timer: 5,
      },
      {
        id: '5-s2',
        description: 'Add minced garlic and ginger, cooking for another minute until fragrant.',
        timer: 1,
      },
      {
        id: '5-s3',
        description: 'Stir in curry powder, cooking for 30 seconds to bloom the spices.',
        timer: 0.5,
      },
      {
        id: '5-s4',
        description: 'Add chopped tomatoes and cook until they begin to break down.',
        timer: 3,
      },
      {
        id: '5-s5',
        description: 'Add your mixed vegetables and stir to coat with the spice mixture.',
      },
      {
        id: '5-s6',
        description: 'Pour in coconut milk and vegetable broth. Bring to a simmer.',
      },
      {
        id: '5-s7',
        description: 'Cover and cook until vegetables are tender, about 15-20 minutes.',
        timer: 15,
      },
      {
        id: '5-s8',
        description: 'Season with salt to taste. Add a squeeze of lime juice.',
      },
      {
        id: '5-s9',
        description: 'Garnish with fresh cilantro and serve with rice or naan bread.',
      },
    ],
    author: {
      id: 'a5',
      name: 'Priya Sharma',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      bio: 'Plant-based cooking specialist with a passion for Indian cuisine.',
    },
    createdAt: '2023-11-02T18:20:00Z',
    rating: 4.6,
  },
  {
    id: '6',
    title: 'Homemade Neapolitan Pizza',
    description: 'Authentic Italian pizza with a thin, crispy crust and classic toppings.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1000',
    cookTime: 15,
    prepTime: 120,
    servings: 4,
    difficulty: 'Hard',
    cuisine: 'Italian',
    dietTypes: ['Vegetarian'],
    tags: ['Italian', 'Pizza', 'Baking', 'Dinner'],
    ingredients: [
      { id: '6-1', name: 'Pizza flour (00 flour)', quantity: '500', unit: 'g' },
      { id: '6-2', name: 'Water', quantity: '325', unit: 'ml' },
      { id: '6-3', name: 'Salt', quantity: '10', unit: 'g' },
      { id: '6-4', name: 'Yeast', quantity: '3', unit: 'g' },
      { id: '6-5', name: 'San Marzano tomatoes', quantity: '1', unit: 'can' },
      { id: '6-6', name: 'Fresh mozzarella', quantity: '200', unit: 'g' },
      { id: '6-7', name: 'Fresh basil leaves', quantity: '1', unit: 'handful' },
      { id: '6-8', name: 'Extra virgin olive oil', quantity: '2', unit: 'tbsp' },
    ],
    steps: [
      {
        id: '6-s1',
        description: 'In a large bowl, combine flour and salt.',
      },
      {
        id: '6-s2',
        description: 'Dissolve yeast in water and gradually add to the flour mixture, mixing until a dough forms.',
      },
      {
        id: '6-s3',
        description: 'Knead the dough on a floured surface for about 10 minutes until smooth and elastic.',
        timer: 10,
      },
      {
        id: '6-s4',
        description: 'Place the dough in a lightly oiled bowl, cover, and let rise for at least 2 hours, or up to 24 hours in the refrigerator.',
        timer: 120,
      },
      {
        id: '6-s5',
        description: 'Preheat your oven to the highest temperature (ideally 500°F/260°C or more) with a pizza stone or steel if you have one.',
      },
      {
        id: '6-s6',
        description: 'Divide the dough into 4 equal portions and shape each into a ball.',
      },
      {
        id: '6-s7',
        description: 'On a floured surface, stretch or roll each ball into a thin circle, about 10-12 inches in diameter.',
      },
      {
        id: '6-s8',
        description: 'Crush San Marzano tomatoes by hand and spread a thin layer over the dough, leaving a border for the crust.',
      },
      {
        id: '6-s9',
        description: 'Tear fresh mozzarella into pieces and distribute over the tomato sauce.',
      },
      {
        id: '6-s10',
        description: 'Transfer the pizza to the preheated stone or a baking sheet, and bake for 8-10 minutes until the crust is golden and the cheese is bubbling.',
        timer: 10,
      },
      {
        id: '6-s11',
        description: 'Garnish with fresh basil leaves and a drizzle of olive oil. Slice and serve immediately.',
      },
    ],
    author: {
      id: 'a6',
      name: 'Priyansh Narang',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      bio: 'Third-generation pizza maker from Naples.',
    },
    createdAt: '2023-08-26T20:15:00Z',
    rating: 4.9,
  },
];

export const allCuisines = [
  'Italian',
  'Mexican',
  'Chinese',
  'Indian',
  'American',
  'Japanese',
  'Thai',
  'French',
  'Mediterranean',
  'Greek'
];

export const allDietTypes = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Paleo',
  'Low-Carb',
  'Pescatarian'
];

// Get all recipe tags
export const getAllTags = () => {
  const tagsSet = new Set<string>();
  recipes.forEach(recipe => {
    recipe.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
};

// Filter recipes by multiple criteria
export const filterRecipes = (
  recipesList: Recipe[],
  filters: {
    cuisines?: Cuisine[],
    dietTypes?: DietType[],
    difficulty?: string | null,
    maxCookTime?: number,
    tags?: string[],
    search?: string
  }
) => {
  return recipesList.filter(recipe => {
    // Filter by cuisine
    if (filters.cuisines && filters.cuisines.length > 0) {
      if (!filters.cuisines.includes(recipe.cuisine)) {
        return false;
      }
    }

    // Filter by diet type
    if (filters.dietTypes && filters.dietTypes.length > 0) {
      if (!filters.dietTypes.some(diet => recipe.dietTypes.includes(diet as any))) {
        return false;
      }
    }

    // Filter by difficulty
    if (filters.difficulty) {
      if (recipe.difficulty !== filters.difficulty) {
        return false;
      }
    }

    // Filter by cook time
    if (filters.maxCookTime !== undefined) {
      if (recipe.cookTime > filters.maxCookTime) {
        return false;
      }
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      if (!filters.tags.some(tag => recipe.tags.includes(tag))) {
        return false;
      }
    }

    // Filter by search query
    if (filters.search && filters.search.trim() !== '') {
      const searchLower = filters.search.toLowerCase();
      const titleMatches = recipe.title.toLowerCase().includes(searchLower);
      const descriptionMatches = recipe.description.toLowerCase().includes(searchLower);
      const ingredientMatches = recipe.ingredients.some(ing =>
        ing.name.toLowerCase().includes(searchLower)
      );

      if (!(titleMatches || descriptionMatches || ingredientMatches)) {
        return false;
      }
    }

    return true;
  });
};

// Get a recipe by ID
export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

// Get recipes by author
export const getRecipesByAuthor = (authorId: string): Recipe[] => {
  return recipes.filter(recipe => recipe.author.id === authorId);
};

// Get similar recipes (based on tags and cuisine)
export const getSimilarRecipes = (recipeId: string, limit = 3): Recipe[] => {
  const currentRecipe = getRecipeById(recipeId);
  if (!currentRecipe) return [];

  return recipes
    .filter(recipe => recipe.id !== recipeId)
    .map(recipe => {
      // Count matching tags
      const matchingTags = recipe.tags.filter(tag =>
        currentRecipe.tags.includes(tag)
      ).length;

      // Extra point for same cuisine
      const cuisineMatch = recipe.cuisine === currentRecipe.cuisine ? 1 : 0;

      return {
        ...recipe,
        score: matchingTags + cuisineMatch
      };
    })
    .sort((a, b) => (b as any).score - (a as any).score)
    .slice(0, limit);
};
