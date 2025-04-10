
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Clock, ChefHat, Bookmark, BookmarkCheck, Share2, Heart 
} from 'lucide-react';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

export function RecipeCard({ recipe, featured = false }: RecipeCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Recipe removed from cookbook" : "Recipe added to cookbook",
      description: isBookmarked ? "The recipe has been removed from your cookbook" : "The recipe has been saved to your cookbook",
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`https://gastroguru.app/recipe/${recipe.id}`);
    toast({
      title: "Link copied!",
      description: "Recipe link has been copied to clipboard",
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast({
      description: isLiked ? "Removed from favorites" : "Added to favorites",
    });
  };

  return (
    <Link 
      to={`/recipe/${recipe.id}`} 
      className={`recipe-card group block ${featured ? 'col-span-full md:col-span-2' : ''}`}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="recipe-card-image"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h3 className="text-lg font-bold line-clamp-2">{recipe.title}</h3>
          <p className="text-sm opacity-90">{recipe.author.name}</p>
        </div>
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
            onClick={handleBookmark}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-accent" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-tomato-500 text-tomato-500' : ''}`} />
          </Button>
        </div>
      </div>
      <div className="p-4 bg-card">
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="tag">
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 3 && (
            <Badge variant="outline" className="tag">
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
