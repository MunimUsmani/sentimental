'use client'
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Download, Star } from "lucide-react"
import { useEffect, useState } from "react"
import RecipeModal from "@/app/components/RecipeModal"
              
export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(`${process.env.NEXT_BASE_API_URL}/api/recipes`);
      const data = await response.json();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  const handleAddRecipe = async (newRecipe) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`, {
      method: "POST",
      body: formData,
    });

    // Optionally, refetch recipes or update state
    setRecipes((prev) => [...prev, newRecipe]); // Update local state
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-800">Family Recipe Books</h1>
          <p className="text-muted-foreground">Our collection of treasured family recipes</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Recipe
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6 bg-amber-50">
          <TabsTrigger value="all" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
            All Books
          </TabsTrigger>
          <TabsTrigger value="mains" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
            Main Dishes
          </TabsTrigger>
          <TabsTrigger value="sides" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
            Side Dishes
          </TabsTrigger>
          <TabsTrigger value="desserts" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
            Desserts
          </TabsTrigger>
          <TabsTrigger value="breads" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
            Breads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipes.map((recipe) => (
              <RecipeBookCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </TabsContent>

        {["mains", "sides", "desserts", "breads"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recipes
                .filter((recipe) => recipe.category === category)
                .map((recipe) => (
                  <RecipeBookCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <RecipeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddRecipe} 
      />
    </div>
  )
}

function RecipeBookCard({ recipe }: { recipe: any }) {
  return (
    <Card className="overflow-hidden flex flex-col md:flex-row border-none shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-full md:w-2/5 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-800/20 to-transparent"></div>
        <img
          src={recipe.imageUrl || "/placeholder.svg"}
          alt={recipe.title}
          className="w-full h-full object-cover aspect-[3/4]"
        />
        <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
          FAMILY RECIPE
        </div>
      </div>

      <div className="w-full md:w-3/5 p-5 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>

          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="mr-1">By</span>
            <span className="font-medium text-amber-800">{recipe.author}</span>
          </div>

          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(recipe.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 text-sm font-medium">{recipe.rating}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" className="text-amber-700 border-amber-200 hover:bg-amber-50" asChild>
            <Link href={`/recipes/${recipe.id}`}>View Recipes</Link>
          </Button>

          <Button variant="ghost" size="icon" className="text-amber-700 hover:bg-amber-50" title="Download Recipe Book">
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
