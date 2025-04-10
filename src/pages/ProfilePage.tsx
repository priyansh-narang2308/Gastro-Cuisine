
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { recipes } from '@/data/mockData';
import { BookOpen, Star, Settings, ExternalLink, Edit } from 'lucide-react';

// For demo purposes, use first author from recipes
const mockUser = {
  id: recipes[0].author.id,
  name: recipes[0].author.name,
  avatar: recipes[0].author.avatar,
  bio: recipes[0].author.bio,
  memberSince: '2022-05-15',
  website: 'https://example.com/chef',
  social: {
    instagram: '@chefcooking',
    twitter: '@foodiechef'
  }
};

const userRecipes = recipes.filter(recipe => recipe.author.id === mockUser.id);
const userFavorites = [recipes[1], recipes[3]];

const ProfilePage = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState(mockUser);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    toast({
      description: "Profile updated successfully!"
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="container flex-1 py-8">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex flex-col items-center">
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name} 
                  className="mb-4 h-24 w-24 rounded-full object-cover"
                />
                <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(userProfile.memberSince).toLocaleDateString()}
                </p>
              </div>
              
              {editMode ? (
                <form onSubmit={handleProfileUpdate}>
                  <div className="mb-4">
                    <label htmlFor="bio" className="mb-1 block text-sm font-medium">Bio</label>
                    <Input
                      id="bio"
                      name="bio"
                      value={userProfile.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="website" className="mb-1 block text-sm font-medium">Website</label>
                    <Input
                      id="website"
                      name="website"
                      value={userProfile.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="instagram" className="mb-1 block text-sm font-medium">Instagram</label>
                      <Input
                        id="instagram"
                        name="instagram"
                        value={userProfile.social.instagram}
                        onChange={(e) => setUserProfile({
                          ...userProfile,
                          social: { ...userProfile.social, instagram: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="twitter" className="mb-1 block text-sm font-medium">Twitter</label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={userProfile.social.twitter}
                        onChange={(e) => setUserProfile({
                          ...userProfile,
                          social: { ...userProfile.social, twitter: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Save</Button>
                    <Button type="button" variant="outline" onClick={toggleEditMode}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="mb-4">{userProfile.bio}</p>
                  
                  {userProfile.website && (
                    <div className="mb-2 flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={userProfile.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm hover:underline"
                      >
                        {userProfile.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  
                  <div className="mb-4 flex flex-wrap gap-3">
                    {userProfile.social.instagram && (
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                        {userProfile.social.instagram}
                      </span>
                    )}
                    {userProfile.social.twitter && (
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                        {userProfile.social.twitter}
                      </span>
                    )}
                  </div>
                  
                  <Button onClick={toggleEditMode} variant="outline" className="w-full gap-1">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </>
              )}
            </div>
            
            <div className="mt-4 rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-bold">Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md bg-muted p-3 text-center">
                  <span className="text-2xl font-bold">{userRecipes.length}</span>
                  <p className="text-xs text-muted-foreground">Recipes</p>
                </div>
                <div className="rounded-md bg-muted p-3 text-center">
                  <span className="text-2xl font-bold">{userFavorites.length}</span>
                  <p className="text-xs text-muted-foreground">Favorites</p>
                </div>
                <div className="rounded-md bg-muted p-3 text-center">
                  <span className="text-2xl font-bold">120</span>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
                <div className="rounded-md bg-muted p-3 text-center">
                  <span className="text-2xl font-bold">15</span>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="recipes">
              <TabsList>
                <TabsTrigger value="recipes" className="gap-1">
                  <BookOpen className="h-4 w-4" />
                  My Recipes
                </TabsTrigger>
                <TabsTrigger value="favorites" className="gap-1">
                  <Star className="h-4 w-4" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-1">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="recipes" className="mt-6 animate-fade-in">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">My Recipes</h2>
                  <Button asChild size="sm">
                    <a href="/create">Create New Recipe</a>
                  </Button>
                </div>
                
                {userRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {userRecipes.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                    <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-medium">No recipes yet</h3>
                    <p className="mb-4 text-muted-foreground">
                      You haven't created any recipes yet.
                    </p>
                    <Button asChild>
                      <a href="/create">Create Your First Recipe</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-6 animate-fade-in">
                <h2 className="mb-4 text-xl font-bold">Favorite Recipes</h2>
                
                {userFavorites.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {userFavorites.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                    <Star className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-medium">No favorites yet</h3>
                    <p className="mb-4 text-muted-foreground">
                      You haven't added any recipes to your favorites yet.
                    </p>
                    <Button asChild>
                      <a href="/">Discover Recipes</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6 animate-fade-in">
                <h2 className="mb-4 text-xl font-bold">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 text-lg font-medium">Email Notifications</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Comments</p>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone comments on your recipe
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="comments" 
                            defaultChecked 
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Likes</p>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone likes your recipe
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="likes" 
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Weekly Digest</p>
                          <p className="text-sm text-muted-foreground">
                            Receive a weekly summary of activity
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="digest" 
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 text-lg font-medium">Privacy Settings</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Public Profile</p>
                          <p className="text-sm text-muted-foreground">
                            Make your profile visible to other users
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="public-profile" 
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Show Email</p>
                          <p className="text-sm text-muted-foreground">
                            Display your email address on your profile
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="show-email" 
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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

export default ProfilePage;
