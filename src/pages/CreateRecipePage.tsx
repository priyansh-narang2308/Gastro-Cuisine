import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Save,
  Eye,
  Upload,
  Clock,
  ChefHat,
  Users,
  Square,
} from 'lucide-react';
import { allCuisines, allDietTypes } from '@/data/mockData';
import { Recipe, Ingredient, Step, Difficulty } from '@/types/recipe';

const CreateRecipePage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('edit');
  
  const [recipeData, setRecipeData] = useState<Partial<Recipe>>({
    title: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1000',
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: 'Medium',
    cuisine: 'American',
    dietTypes: [],
    tags: [],
    ingredients: [],
    steps: [],
  });
  
  const [newTag, setNewTag] = useState('');
  const [newIngredient, setNewIngredient] = useState<Partial<Ingredient>>({
    name: '',
    quantity: '',
    unit: '',
  });
  const [newStep, setNewStep] = useState<Partial<Step>>({
    description: '',
    timer: undefined,
  });
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };
  
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      setRecipeData({ ...recipeData, [name]: numValue });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setRecipeData({ ...recipeData, [name]: value });
  };
  
  const handleDietTypeToggle = (dietType: string) => {
    const currentDietTypes = recipeData.dietTypes || [];
    const updatedDietTypes = currentDietTypes.includes(dietType)
      ? currentDietTypes.filter(dt => dt !== dietType)
      : [...currentDietTypes, dietType];
      
    setRecipeData({ ...recipeData, dietTypes: updatedDietTypes });
  };
  
  const addTag = () => {
    if (newTag.trim() && !(recipeData.tags || []).includes(newTag.trim())) {
      setRecipeData({
        ...recipeData,
        tags: [...(recipeData.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setRecipeData({
      ...recipeData,
      tags: (recipeData.tags || []).filter(tag => tag !== tagToRemove)
    });
  };
  
  const addIngredient = () => {
    if (newIngredient.name?.trim()) {
      const ingredient: Ingredient = {
        id: `ing-${Date.now()}`,
        name: newIngredient.name.trim(),
        quantity: newIngredient.quantity || '',
        unit: newIngredient.unit || '',
      };
      
      setRecipeData({
        ...recipeData,
        ingredients: [...(recipeData.ingredients || []), ingredient]
      });
      
      setNewIngredient({
        name: '',
        quantity: '',
        unit: '',
      });
    }
  };
  
  const removeIngredient = (id: string) => {
    setRecipeData({
      ...recipeData,
      ingredients: (recipeData.ingredients || []).filter(ing => ing.id !== id)
    });
  };
  
  const addStep = () => {
    if (newStep.description?.trim()) {
      const step: Step = {
        id: `step-${Date.now()}`,
        description: newStep.description.trim(),
        timer: newStep.timer,
      };
      
      setRecipeData({
        ...recipeData,
        steps: [...(recipeData.steps || []), step]
      });
      
      setNewStep({
        description: '',
        timer: undefined,
      });
    }
  };
  
  const removeStep = (id: string) => {
    setRecipeData({
      ...recipeData,
      steps: (recipeData.steps || []).filter(step => step.id !== id)
    });
  };
  
  const handleImageUpload = () => {
    toast({
      description: "File upload would be implemented in a production app"
    });
  };
  
  const saveRecipe = (isDraft = true) => {
    if (!recipeData.title) {
      toast({
        title: "Missing title",
        description: "Please add a title for your recipe",
        variant: "destructive",
      });
      return;
    }
    
    if (!(recipeData.ingredients || []).length) {
      toast({
        title: "Missing ingredients",
        description: "Please add at least one ingredient",
        variant: "destructive",
      });
      return;
    }
    
    if (!(recipeData.steps || []).length) {
      toast({
        title: "Missing instructions",
        description: "Please add at least one instruction step",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: isDraft ? "Recipe saved as draft" : "Recipe published",
      description: `Your recipe "${recipeData.title}" has been ${isDraft ? 'saved' : 'published'} successfully!`,
    });
    
    console.log("Recipe data:", recipeData);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="container flex-1 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Recipe</h1>
          <p className="text-muted-foreground">
            Share your culinary creations with the GastroGuru community
          </p>
        </div>
        
        <div className="mb-8 flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="edit">Edit Recipe</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-1"
              onClick={() => saveRecipe(true)}
            >
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button 
              className="gap-1"
              onClick={() => saveRecipe(false)}
            >
              <Upload className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TabsContent value="edit" className="mt-0">
              {/* Basic Info */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <label htmlFor="title" className="mb-2 block text-sm font-medium">
                      Recipe Title
                    </label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter recipe title"
                      value={recipeData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Briefly describe your recipe"
                      rows={3}
                      value={recipeData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium">
                      Cover Image
                    </label>
                    <div 
                      className="relative flex h-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed bg-muted/50"
                      onClick={handleImageUpload}
                    >
                      {recipeData.image ? (
                        <>
                          <img 
                            src={recipeData.image} 
                            alt="Recipe cover" 
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                            <Button variant="secondary" className="gap-1">
                              <ImageIcon className="h-4 w-4" />
                              Change Image
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <ImageIcon className="mb-2 h-8 w-8" />
                          <span>Click to upload an image</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cuisine" className="mb-2 block text-sm font-medium">
                        Cuisine
                      </label>
                      <Select
                        value={recipeData.cuisine}
                        onValueChange={(value) => handleSelectChange('cuisine', value)}
                      >
                        <SelectTrigger id="cuisine">
                          <SelectValue placeholder="Select cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                          {allCuisines.map(cuisine => (
                            <SelectItem key={cuisine} value={cuisine}>
                              {cuisine}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="difficulty" className="mb-2 block text-sm font-medium">
                        Difficulty
                      </label>
                      <Select
                        value={recipeData.difficulty}
                        onValueChange={(value) => handleSelectChange('difficulty', value as Difficulty)}
                      >
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="prepTime" className="mb-2 block text-sm font-medium">
                        Prep Time (minutes)
                      </label>
                      <Input
                        id="prepTime"
                        name="prepTime"
                        type="number"
                        min="0"
                        value={recipeData.prepTime || ''}
                        onChange={handleNumberChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cookTime" className="mb-2 block text-sm font-medium">
                        Cook Time (minutes)
                      </label>
                      <Input
                        id="cookTime"
                        name="cookTime"
                        type="number"
                        min="0"
                        value={recipeData.cookTime || ''}
                        onChange={handleNumberChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="servings" className="mb-2 block text-sm font-medium">
                        Servings
                      </label>
                      <Input
                        id="servings"
                        name="servings"
                        type="number"
                        min="1"
                        value={recipeData.servings || ''}
                        onChange={handleNumberChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Diet Types */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-medium">Diet Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {allDietTypes.map(dietType => (
                      <Button
                        key={dietType}
                        variant={(recipeData.dietTypes || []).includes(dietType) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleDietTypeToggle(dietType)}
                      >
                        {dietType}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Tags */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-medium">Tags</h3>
                  <div className="mb-4 flex">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="mr-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button onClick={addTag}>Add</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {(recipeData.tags || []).map(tag => (
                      <div 
                        key={tag}
                        className="flex items-center rounded-full bg-secondary px-3 py-1 text-sm"
                      >
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-5 w-5"
                          onClick={() => removeTag(tag)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Ingredients */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-medium">Ingredients</h3>
                  <div className="mb-4 grid grid-cols-12 gap-2">
                    <div className="col-span-3">
                      <Input
                        placeholder="Quantity"
                        value={newIngredient.quantity}
                        onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Unit"
                        value={newIngredient.unit}
                        onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                      />
                    </div>
                    <div className="col-span-6 flex">
                      <Input
                        placeholder="Ingredient name"
                        value={newIngredient.name}
                        onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                        className="mr-2"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addIngredient();
                          }
                        }}
                      />
                      <Button onClick={addIngredient}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {(recipeData.ingredients || []).map(ingredient => (
                      <li 
                        key={ingredient.id}
                        className="flex items-center justify-between rounded-md border bg-card p-3"
                      >
                        <span>
                          {ingredient.quantity} {ingredient.unit} {ingredient.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeIngredient(ingredient.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  
                  {(recipeData.ingredients || []).length === 0 && (
                    <p className="py-4 text-center text-sm text-muted-foreground">
                      No ingredients added yet
                    </p>
                  )}
                </CardContent>
              </Card>
              
              {/* Steps */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-4 text-lg font-medium">Instructions</h3>
                  <div className="mb-4 flex">
                    <div className="mr-2 flex-1">
                      <Textarea
                        placeholder="Describe this step"
                        value={newStep.description}
                        onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                        rows={2}
                      />
                      <div className="mt-2 flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="mr-2 text-sm text-muted-foreground">Timer (minutes):</span>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Optional"
                          value={newStep.timer || ''}
                          onChange={(e) => {
                            const value = e.target.value ? parseInt(e.target.value, 10) : undefined;
                            setNewStep({ ...newStep, timer: value });
                          }}
                          className="w-20"
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={addStep}
                      className="mt-4 self-start"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <ul className="space-y-4">
                    {(recipeData.steps || []).map((step, index) => (
                      <li 
                        key={step.id}
                        className="rounded-md border bg-card p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Step {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeStep(step.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p>{step.description}</p>
                        {step.timer && (
                          <div className="mt-2 flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>Timer: {step.timer} minutes</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                  
                  {(recipeData.steps || []).length === 0 && (
                    <p className="py-4 text-center text-sm text-muted-foreground">
                      No steps added yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              {recipeData.title ? (
                <div className="rounded-lg border">
                  {/* Recipe Preview */}
                  <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                    <img 
                      src={recipeData.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1000'} 
                      alt={recipeData.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h1 className="mb-2 text-3xl font-bold">{recipeData.title}</h1>
                      <p className="text-lg opacity-90">{recipeData.description}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6 grid grid-cols-3 gap-4 rounded-lg bg-muted p-4">
                      <div className="flex flex-col items-center">
                        <Clock className="mb-2 h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Prep Time</p>
                        <p className="font-medium">{recipeData.prepTime} min</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Clock className="mb-2 h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Cook Time</p>
                        <p className="font-medium">{recipeData.cookTime} min</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Users className="mb-2 h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Servings</p>
                        <p className="font-medium">{recipeData.servings}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="mb-3 text-xl font-bold">Details</h2>
                      <div className="flex flex-wrap gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Cuisine</p>
                          <p className="font-medium">{recipeData.cuisine}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Difficulty</p>
                          <p className="font-medium">{recipeData.difficulty}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Diet Types</p>
                          <p className="font-medium">
                            {(recipeData.dietTypes || []).length
                              ? recipeData.dietTypes?.join(', ')
                              : 'None specified'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="mb-3 text-xl font-bold">Ingredients</h2>
                      {(recipeData.ingredients || []).length ? (
                        <ul className="space-y-2">
                          {(recipeData.ingredients || []).map(ingredient => (
                            <li key={ingredient.id} className="flex items-center gap-2">
                              <Square className="h-5 w-5" />
                              <span>
                                {ingredient.quantity} {ingredient.unit} {ingredient.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No ingredients added yet</p>
                      )}
                    </div>
                    
                    <div>
                      <h2 className="mb-3 text-xl font-bold">Instructions</h2>
                      {(recipeData.steps || []).length ? (
                        <ol className="space-y-4">
                          {(recipeData.steps || []).map((step, index) => (
                            <li key={step.id} className="rounded-lg bg-muted p-4">
                              <h3 className="mb-2 font-medium">Step {index + 1}</h3>
                              <p>{step.description}</p>
                              {step.timer && (
                                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                                  <Clock className="mr-1 h-4 w-4" />
                                  <span>Timer: {step.timer} minutes</span>
                                </div>
                              )}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="text-muted-foreground">No steps added yet</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                  <Eye className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h2 className="mb-2 text-xl font-medium">Nothing to preview yet</h2>
                  <p className="text-muted-foreground">
                    Add at least a title to see a preview of your recipe
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-4 text-lg font-medium">Publishing Tips</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <ChefHat className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Be detailed in your instructions to help others succeed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ImageIcon className="mt-0.5 h-4 w-4 text-primary" />
                    <span>High-quality photos will make your recipe more appealing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Add timers to steps that require waiting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Plus className="mt-0.5 h-4 w-4 text-primary" />
                    <span>Include specific quantities and units for all ingredients</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-2 text-lg font-medium">Completion Status</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Complete these sections to publish your recipe:
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Basic Info</span>
                    <span className={`text-sm ${recipeData.title ? 'text-primary' : 'text-muted-foreground'}`}>
                      {recipeData.title ? 'Complete' : 'Incomplete'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ingredients</span>
                    <span className={`text-sm ${(recipeData.ingredients || []).length ? 'text-primary' : 'text-muted-foreground'}`}>
                      {(recipeData.ingredients || []).length ? 'Complete' : 'Incomplete'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Instructions</span>
                    <span className={`text-sm ${(recipeData.steps || []).length ? 'text-primary' : 'text-muted-foreground'}`}>
                      {(recipeData.steps || []).length ? 'Complete' : 'Incomplete'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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

export default CreateRecipePage;
