
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { RecipeFilters, FilterState } from '@/components/recipe/RecipeFilters';
import { 
  ChefHat, Clock, Shuffle, ChevronDown, ChevronUp 
} from 'lucide-react';
import { recipes, allCuisines, allDietTypes, filterRecipes, getAllTags } from '@/data/mockData';
import { Recipe, Cuisine, DietType } from '@/types/recipe';

const HomePage = () => {
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    cuisines: [],
    dietTypes: [],
    difficulty: null,
    maxCookTime: 120,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [visibleRecipes, setVisibleRecipes] = useState<number>(6);
  const { toast } = useToast();

  // Get filtered recipes
  const filteredRecipes = filterRecipes(recipes, {
    ...activeFilters,
    tags: activeTags,
    search: searchQuery,
  });
  
  // Featured recipe is the first one with highest rating
  const featuredRecipe = [...recipes].sort((a, b) => b.rating - a.rating)[0];
  
  // All tags from recipes
  const allTags = getAllTags();
  
  const handleFilterChange = (newFilters: FilterState) => {
    setActiveFilters(newFilters);
  };
  
  const handleTagToggle = (tag: string) => {
    setActiveTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };
  
  const handleLoadMore = () => {
    setVisibleRecipes(prev => prev + 6);
  };
  
  const handleRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    const randomRecipe = filteredRecipes[randomIndex];
    
    if (randomRecipe) {
      toast({
        title: "Found a surprise recipe!",
        description: `How about trying ${randomRecipe.title}?`,
      });
      // In a full app, this would navigate to the recipe
    } else {
      toast({
        title: "No recipes found",
        description: "Try adjusting your filters to find more recipes.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] overflow-hidden">
          <img 
            src={featuredRecipe.image} 
            alt={featuredRecipe.title} 
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="container relative z-10 flex h-full flex-col justify-end pb-12 text-white">
            <Badge className="mb-4 w-fit bg-primary text-primary-foreground">
              Featured Recipe
            </Badge>
            <h1 className="mb-2 text-4xl font-bold md:text-5xl">{featuredRecipe.title}</h1>
            <p className="mb-6 max-w-2xl text-lg opacity-90">{featuredRecipe.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="gap-2">
                <a href={`/recipe/${featuredRecipe.id}`}>
                  <ChefHat className="h-5 w-5" />
                  Cook Now
                </a>
              </Button>
              <Button variant="outline" className="gap-2 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 hover:text-white">
                <Clock className="h-5 w-5" />
                {featuredRecipe.cookTime} min
              </Button>
            </div>
          </div>
        </section>
        
        {/* Tags Section */}
        <section className="border-b py-4">
          <div className="container overflow-auto">
            <div className="flex gap-2">
              {allTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={activeTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="container py-8">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Sidebar */}
            <aside className="md:w-64 lg:w-72">
              <RecipeFilters 
                cuisines={allCuisines}
                dietTypes={allDietTypes}
                onFilterChange={handleFilterChange}
                className="sticky top-24"
              />
            </aside>
            
            {/* Recipe Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  All Recipes 
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({filteredRecipes.length})
                  </span>
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={handleRandomRecipe}
                >
                  <Shuffle className="h-4 w-4" />
                  Surprise Me
                </Button>
              </div>
              
              {filteredRecipes.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredRecipes.slice(0, visibleRecipes).map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                  
                  {filteredRecipes.length > visibleRecipes && (
                    <div className="mt-8 flex justify-center">
                      <Button 
                        variant="outline" 
                        onClick={handleLoadMore}
                        className="gap-1"
                      >
                        Load More <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
                  <ChefHat className="mb-4 h-10 w-10 text-muted-foreground" />
                  <h3 className="mb-1 text-lg font-medium">No recipes found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or tags to find more recipes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
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

export default HomePage;
