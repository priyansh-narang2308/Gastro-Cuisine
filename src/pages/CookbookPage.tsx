
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { ChefHat, Search, X } from 'lucide-react';
import { recipes } from '@/data/mockData';
import { Recipe } from '@/types/recipe';

// In a real app, these would be from a user's saved recipes
// For this demo, we'll just use the first few recipes
const savedRecipes = recipes.slice(0, 4);
const plannedRecipes = recipes.slice(2, 5);

const CookbookPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(savedRecipes);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(savedRecipes);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = savedRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(query) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query))
    );
    setFilteredRecipes(filtered);
  }, [searchQuery]);
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  // Weekly meal plan structure (simplified)
  const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];
  
  const mealPlan = weekDays.map((day, index) => ({
    day,
    meals: {
      breakfast: index % 3 === 0 ? plannedRecipes[0] : null,
      lunch: index % 2 === 0 ? plannedRecipes[1] : null,
      dinner: index < 3 ? plannedRecipes[2] : null
    }
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="container flex-1 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Cookbook</h1>
          <p className="text-muted-foreground">
            Manage your saved recipes and plan your meals for the week
          </p>
        </div>
        
        <Tabs defaultValue="saved">
          <TabsList className="mb-6">
            <TabsTrigger value="saved">Saved Recipes</TabsTrigger>
            <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved" className="animate-fade-in">
            <div className="mb-6 max-w-md">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search your recipes..."
                  className="pl-8 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 rounded-full p-0"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
                <ChefHat className="mb-4 h-12 w-12 text-muted-foreground" />
                <h2 className="mb-2 text-xl font-medium">No recipes found</h2>
                <p className="mb-4 text-center text-muted-foreground">
                  {searchQuery
                    ? `No recipes match "${searchQuery}"`
                    : "You don't have any saved recipes yet"}
                </p>
                <Button asChild>
                  <Link to="/">Discover Recipes</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="meal-plan" className="animate-fade-in">
            <div className="overflow-auto">
              <table className="min-w-full divide-y rounded-md border">
                <thead>
                  <tr>
                    <th className="bg-muted px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Day
                    </th>
                    <th className="bg-muted px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Breakfast
                    </th>
                    <th className="bg-muted px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Lunch
                    </th>
                    <th className="bg-muted px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Dinner
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mealPlan.map((day) => (
                    <tr key={day.day}>
                      <td className="px-4 py-3 font-medium">
                        {day.day}
                      </td>
                      <td className="px-4 py-3">
                        {day.meals.breakfast ? (
                          <Link 
                            to={`/recipe/${day.meals.breakfast.id}`}
                            className="flex items-center gap-2 text-sm hover:underline"
                          >
                            <img 
                              src={day.meals.breakfast.image} 
                              alt={day.meals.breakfast.title}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            <span>{day.meals.breakfast.title}</span>
                          </Link>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-sm">
                            + Add Breakfast
                          </Button>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {day.meals.lunch ? (
                          <Link 
                            to={`/recipe/${day.meals.lunch.id}`}
                            className="flex items-center gap-2 text-sm hover:underline"
                          >
                            <img 
                              src={day.meals.lunch.image} 
                              alt={day.meals.lunch.title}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            <span>{day.meals.lunch.title}</span>
                          </Link>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-sm">
                            + Add Lunch
                          </Button>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {day.meals.dinner ? (
                          <Link 
                            to={`/recipe/${day.meals.dinner.id}`}
                            className="flex items-center gap-2 text-sm hover:underline"
                          >
                            <img 
                              src={day.meals.dinner.image} 
                              alt={day.meals.dinner.title}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            <span>{day.meals.dinner.title}</span>
                          </Link>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-sm">
                            + Add Dinner
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t bg-muted/40 py-6">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GastroGuru. All recipes and images are for demonstration purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CookbookPage;
