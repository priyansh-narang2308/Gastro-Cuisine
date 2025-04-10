
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Check, ChefHat, Clock, Filter, X 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Cuisine, DietType, Difficulty } from '@/types/recipe';

interface RecipeFiltersProps {
  cuisines: Cuisine[];
  dietTypes: DietType[];
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  cuisines: Cuisine[];
  dietTypes: DietType[];
  difficulty: Difficulty | null;
  maxCookTime: number;
}

export function RecipeFilters({ 
  cuisines, 
  dietTypes, 
  onFilterChange,
  className = '', 
}: RecipeFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    cuisines: [],
    dietTypes: [],
    difficulty: null,
    maxCookTime: 120,
  });
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleCuisineToggle = (cuisine: Cuisine) => {
    const newCuisines = filters.cuisines.includes(cuisine)
      ? filters.cuisines.filter(c => c !== cuisine)
      : [...filters.cuisines, cuisine];
    
    updateFilters({ ...filters, cuisines: newCuisines });
  };

  const handleDietTypeToggle = (dietType: DietType) => {
    const newDietTypes = filters.dietTypes.includes(dietType)
      ? filters.dietTypes.filter(d => d !== dietType)
      : [...filters.dietTypes, dietType];
    
    updateFilters({ ...filters, dietTypes: newDietTypes });
  };

  const handleDifficultyChange = (difficulty: Difficulty) => {
    updateFilters({ 
      ...filters, 
      difficulty: filters.difficulty === difficulty ? null : difficulty 
    });
  };

  const handleCookTimeChange = (value: number[]) => {
    updateFilters({ ...filters, maxCookTime: value[0] });
  };

  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      cuisines: [],
      dietTypes: [],
      difficulty: null,
      maxCookTime: 120,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.cuisines.length > 0 || 
      filters.dietTypes.length > 0 || 
      filters.difficulty !== null || 
      filters.maxCookTime < 120
    );
  };

  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  const filterContent = (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        {hasActiveFilters() && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 text-sm">
            Clear all
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <Accordion type="multiple" defaultValue={["cuisines", "diet", "difficulty", "cookTime"]} className="w-full">
        <AccordionItem value="cuisines">
          <AccordionTrigger>Cuisines</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {cuisines.map((cuisine) => (
                <Button
                  key={cuisine}
                  variant="outline"
                  size="sm"
                  className={`justify-start ${
                    filters.cuisines.includes(cuisine) 
                      ? 'bg-primary text-primary-foreground' 
                      : ''
                  }`}
                  onClick={() => handleCuisineToggle(cuisine)}
                >
                  {filters.cuisines.includes(cuisine) && (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  {cuisine}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="diet">
          <AccordionTrigger>Diet Type</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {dietTypes.map((dietType) => (
                <Button
                  key={dietType}
                  variant="outline"
                  size="sm"
                  className={`justify-start ${
                    filters.dietTypes.includes(dietType) 
                      ? 'bg-primary text-primary-foreground' 
                      : ''
                  }`}
                  onClick={() => handleDietTypeToggle(dietType)}
                >
                  {filters.dietTypes.includes(dietType) && (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  {dietType}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="difficulty">
          <AccordionTrigger>Difficulty</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2">
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant="outline"
                  size="sm"
                  className={`flex-1 ${
                    filters.difficulty === difficulty 
                      ? 'bg-primary text-primary-foreground' 
                      : ''
                  }`}
                  onClick={() => handleDifficultyChange(difficulty)}
                >
                  <ChefHat className="mr-2 h-4 w-4" />
                  {difficulty}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="cookTime">
          <AccordionTrigger>
            <div className="flex items-center">
              Cook Time <Clock className="ml-2 h-4 w-4" />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-2">
              <div className="mb-6">
                <Slider
                  defaultValue={[filters.maxCookTime]}
                  max={120}
                  step={5}
                  onValueChange={handleCookTimeChange}
                />
              </div>
              <div className="text-center text-sm">
                Up to <span className="font-medium">{filters.maxCookTime}</span> minutes
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters() && (
            <Badge className="ml-1 rounded-full bg-primary text-primary-foreground">
              {filters.cuisines.length + filters.dietTypes.length + 
              (filters.difficulty ? 1 : 0) + 
              (filters.maxCookTime < 120 ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </div>

      {/* Mobile Filters Overlay */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden animate-fade-in">
          <div className="h-full overflow-auto p-6">
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden md:block ${className}`}>
        {filterContent}
      </div>
    </>
  );
}
