
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { useToast } from '@/components/ui/use-toast';
import {
  Bookmark,
  BookmarkCheck,
  Clock,
  Copy,
  ChefHat,
  Heart,
  Share2,
  PlayCircle,
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  Users,
  Timer,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getRecipeById, getSimilarRecipes } from '@/data/mockData';
import { Recipe, Ingredient } from '@/types/recipe';

interface TimerState {
  remaining: number;
  interval: NodeJS.Timeout | null;
}

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = getRecipeById(id || '');
  const similarRecipes = getSimilarRecipes(id || '', 3);
  const { toast } = useToast();
  
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<boolean>(true);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Timers
  const [activeTimers, setActiveTimers] = useState<Record<string, TimerState>>({});
  
  useEffect(() => {
    // Save last viewed recipe to localStorage
    if (recipe) {
      localStorage.setItem('lastViewedRecipe', JSON.stringify({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        timestamp: new Date().toISOString()
      }));
    }
    
    // Clean up active timers and speech synthesis on unmount
    return () => {
      // Stop all timers
      Object.values(activeTimers).forEach(timer => {
        if (timer.interval) {
          clearInterval(timer.interval);
        }
      });
      
      // Stop speech synthesis
      if (isReadingAloud) {
        window.speechSynthesis.cancel();
      }
    };
  }, [recipe, activeTimers, isReadingAloud]);
  
  if (!recipe) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container flex-1 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <ChefHat className="mb-4 h-16 w-16 text-muted-foreground" />
            <h1 className="mb-2 text-2xl font-bold">Recipe not found</h1>
            <p className="mb-6 text-muted-foreground">
              The recipe you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Back to Recipes</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      description: isBookmarked ? "Removed from cookbook" : "Added to cookbook"
    });
  };
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
    toast({
      description: isLiked ? "Removed from favorites" : "Added to favorites"
    });
  };
  
  const shareRecipe = () => {
    navigator.clipboard.writeText(`https://gastroguru.app/recipe/${recipe.id}`);
    toast({ description: "Link copied to clipboard" });
  };
  
  const copyIngredients = () => {
    const ingredientList = recipe.ingredients
      .map(ing => `• ${ing.quantity} ${ing.unit} ${ing.name}`)
      .join('\n');
    navigator.clipboard.writeText(`Ingredients for ${recipe.title}:\n${ingredientList}`);
    toast({ description: "Ingredients copied to clipboard" });
  };
  
  const toggleIngredientCheck = (id: string) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedIngredients(newChecked);
  };
  
  const adjustServings = (multiplier: number) => {
    setServingMultiplier(multiplier);
  };
  
  const formatQuantity = (quantity: string, multiplier: number) => {
    if (!quantity) return '';
    
    // Handle fraction strings like "1/2"
    if (quantity.includes('/')) {
      const [numerator, denominator] = quantity.split('/').map(Number);
      const decimal = (numerator / denominator) * multiplier;
      if (decimal === Math.floor(decimal)) {
        return decimal.toString();
      }
      return decimal.toFixed(1);
    }
    
    // Handle regular numbers
    const num = parseFloat(quantity);
    if (isNaN(num)) return quantity;
    
    const adjusted = num * multiplier;
    return adjusted === Math.floor(adjusted)
      ? adjusted.toString()
      : adjusted.toFixed(1);
  };
  
  const startStepTimer = (stepId: string, duration: number) => {
    if (activeTimers[stepId] && activeTimers[stepId].interval) {
      // Timer already running - cancel it
      clearInterval(activeTimers[stepId].interval);
      setActiveTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[stepId];
        return newTimers;
      });
      return;
    }
    
    // Start a new timer
    const seconds = duration * 60;
    const interval = setInterval(() => {
      setActiveTimers(prev => {
        const timer = prev[stepId];
        if (!timer || timer.remaining <= 1) {
          // Timer finished
          clearInterval(timer.interval!);
          toast({ 
            title: "Timer finished!",
            description: `The timer for step ${recipe.steps.findIndex(s => s.id === stepId) + 1} is complete.`
          });
          const newTimers = { ...prev };
          delete newTimers[stepId];
          return newTimers;
        }
        
        return {
          ...prev,
          [stepId]: {
            ...timer,
            remaining: timer.remaining - 1
          }
        };
      });
    }, 1000);
    
    setActiveTimers(prev => ({
      ...prev,
      [stepId]: {
        remaining: seconds,
        interval
      }
    }));
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleReadAloud = (stepText: string) => {
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(stepText);
    utterance.rate = 0.9;
    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    
    utterance.onend = () => {
      setIsReadingAloud(false);
    };
    
    setIsReadingAloud(true);
  };
  
  const navigateStep = (direction: 'prev' | 'next') => {
    if (activeStep === null) {
      setActiveStep(direction === 'next' ? 0 : recipe.steps.length - 1);
      return;
    }
    
    if (direction === 'next' && activeStep < recipe.steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else if (direction === 'prev' && activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const toggleExpandSteps = () => {
    setExpandedSteps(!expandedSteps);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Recipe Hero */}
        <section className="relative h-[500px] overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="container relative z-10 flex h-full flex-col justify-end pb-12 text-white">
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map(tag => (
                <Badge key={tag} className="bg-black/30 hover:bg-black/50 backdrop-blur-sm">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mb-2 text-4xl font-bold md:text-5xl">{recipe.title}</h1>
            <p className="mb-6 max-w-2xl text-lg opacity-90">{recipe.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="outline" 
                className="gap-2 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 hover:text-white"
                onClick={toggleBookmark}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-5 w-5 text-accent" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
                {isBookmarked ? 'Saved' : 'Save Recipe'}
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 hover:text-white"
                onClick={toggleLike}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-tomato-500 text-tomato-500' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 hover:text-white"
                onClick={shareRecipe}
              >
                <Share2 className="h-5 w-5" />
                Share
              </Button>
              
              {recipe.video && (
                <Button 
                  variant="outline" 
                  className="gap-2 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 hover:text-white"
                >
                  <PlayCircle className="h-5 w-5" />
                  Watch Video
                </Button>
              )}
            </div>
          </div>
        </section>
        
        {/* Recipe Info */}
        <section className="border-b">
          <div className="container grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
            <div className="flex flex-col items-center">
              <Clock className="mb-2 h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Prep Time</p>
              <p className="font-medium">{recipe.prepTime} min</p>
            </div>
            <div className="flex flex-col items-center">
              <Timer className="mb-2 h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Cook Time</p>
              <p className="font-medium">{recipe.cookTime} min</p>
            </div>
            <div className="flex flex-col items-center">
              <ChefHat className="mb-2 h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Difficulty</p>
              <p className="font-medium">{recipe.difficulty}</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="mb-2 h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Servings</p>
              <p className="font-medium">{recipe.servings * servingMultiplier}</p>
            </div>
          </div>
        </section>
        
        {/* Main Recipe Content */}
        <section className="container py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              {/* Author Card */}
              <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <img 
                    src={recipe.author.avatar} 
                    alt={recipe.author.name} 
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{recipe.author.name}</h3>
                    <p className="text-sm text-muted-foreground">Recipe Author</p>
                  </div>
                </div>
                <p className="mt-3 text-sm">{recipe.author.bio}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  View All Recipes
                </Button>
              </div>
              
              {/* Ingredients */}
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="border-b p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Ingredients</h2>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={copyIngredients}
                        className="gap-1"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button 
                      variant={servingMultiplier === 1 ? "default" : "outline"} 
                      size="sm"
                      onClick={() => adjustServings(1)}
                    >
                      1x
                    </Button>
                    <Button 
                      variant={servingMultiplier === 2 ? "default" : "outline"} 
                      size="sm"
                      onClick={() => adjustServings(2)}
                    >
                      2x
                    </Button>
                    <Button 
                      variant={servingMultiplier === 3 ? "default" : "outline"} 
                      size="sm"
                      onClick={() => adjustServings(3)}
                    >
                      3x
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient) => (
                      <li 
                        key={ingredient.id}
                        className={`flex items-center gap-3 ${
                          checkedIngredients.has(ingredient.id) 
                            ? 'text-muted-foreground line-through' 
                            : ''
                        }`}
                      >
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => toggleIngredientCheck(ingredient.id)}
                        >
                          {checkedIngredients.has(ingredient.id) ? (
                            <CheckSquare className="h-5 w-5" />
                          ) : (
                            <Square className="h-5 w-5" />
                          )}
                        </Button>
                        <span>
                          {formatQuantity(ingredient.quantity, servingMultiplier)} {ingredient.unit} {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {/* Instructions */}
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="flex items-center justify-between border-b p-4">
                  <h2 className="text-xl font-bold">Instructions</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={toggleExpandSteps}
                  >
                    {expandedSteps ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                
                {activeStep !== null ? (
                  // Step by step view
                  <div className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        Step {activeStep + 1} of {recipe.steps.length}
                      </h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigateStep('prev')}
                          disabled={activeStep === 0}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleReadAloud(recipe.steps[activeStep].description)}
                        >
                          {isReadingAloud ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigateStep('next')}
                          disabled={activeStep === recipe.steps.length - 1}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-accent/50 p-6">
                      <p className="text-lg">{recipe.steps[activeStep].description}</p>
                      
                      {recipe.steps[activeStep].timer && (
                        <div className="mt-4">
                          <Button 
                            className="gap-2"
                            onClick={() => startStepTimer(
                              recipe.steps[activeStep].id, 
                              recipe.steps[activeStep].timer || 0
                            )}
                          >
                            <Timer className="h-4 w-4" />
                            {activeTimers[recipe.steps[activeStep].id] 
                              ? `${formatTime(activeTimers[recipe.steps[activeStep].id].remaining)} - Cancel` 
                              : `Start ${recipe.steps[activeStep].timer} Min Timer`
                            }
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={() => setActiveStep(null)}
                    >
                      View All Steps
                    </Button>
                  </div>
                ) : (
                  // All steps view
                  <div className="divide-y">
                    {recipe.steps.map((step, index) => (
                      <div 
                        key={step.id}
                        className={`p-4 transition-all duration-200 ${
                          expandedSteps ? 'block' : 'h-16 overflow-hidden'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="mb-2 font-medium">Step {index + 1}</h3>
                            <p>{step.description}</p>
                            
                            {step.timer && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="mt-3 gap-1"
                                onClick={() => startStepTimer(step.id, step.timer || 0)}
                              >
                                <Timer className="h-4 w-4" />
                                {activeTimers[step.id] 
                                  ? `${formatTime(activeTimers[step.id].remaining)} - Cancel` 
                                  : `Start ${step.timer} Min Timer`
                                }
                              </Button>
                            )}
                          </div>
                          
                          <div className="flex flex-shrink-0 flex-col gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => toggleReadAloud(step.description)}
                              className="h-8 w-8"
                            >
                              {isReadingAloud ? (
                                <VolumeX className="h-4 w-4" />
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => setActiveStep(index)}
                              className="h-8 w-8"
                            >
                              <PlayCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Similar Recipes */}
              {similarRecipes.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-xl font-bold">Similar Recipes</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {similarRecipes.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
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

export default RecipePage;
