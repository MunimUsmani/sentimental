import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Clock, Utensils, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Recipe Book - Memory Sharing",
  description: "Discover our favorite family recipes",
}

const recipes = [
  {
    id: 1,
    title: "Grandma's Apple Pie",
    description: "A classic apple pie recipe passed down through generations",
    prepTime: "30 mins",
    cookTime: "45 mins",
    category: "desserts",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Sunday Pot Roast",
    description: "A hearty pot roast perfect for family gatherings",
    prepTime: "20 mins",
    cookTime: "3 hours",
    category: "mains",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Summer Garden Salad",
    description: "Fresh salad using vegetables from our garden",
    prepTime: "15 mins",
    cookTime: "0 mins",
    category: "sides",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Homemade Bread",
    description: "Simple and delicious homemade bread recipe",
    prepTime: "2 hours",
    cookTime: "45 mins",
    category: "breads",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Blueberry Muffins",
    description: "Sweet and fluffy blueberry muffins for breakfast",
    prepTime: "15 mins",
    cookTime: "25 mins",
    category: "desserts",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Chicken Soup",
    description: "Comforting chicken soup for cold days",
    prepTime: "20 mins",
    cookTime: "1 hour",
    category: "mains",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
]

export default function RecipesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Recipe Book</h1>
          <p className="text-muted-foreground">Our favorite family recipes</p>
        </div>
        <Button asChild>
          <Link href="/recipes/add">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Recipe
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="mains">Main Dishes</TabsTrigger>
          <TabsTrigger value="sides">Side Dishes</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
          <TabsTrigger value="breads">Breads</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </TabsContent>

        {["mains", "sides", "desserts", "breads"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes
                .filter((recipe) => recipe.category === category)
                .map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <Card className="overflow-hidden">
      <img src={recipe.imageUrl || "/placeholder.svg"} alt={recipe.title} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" /> Prep: {recipe.prepTime}
          </span>
          <span className="flex items-center">
            <Utensils className="h-4 w-4 mr-1" /> Cook: {recipe.cookTime}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-between" asChild>
          <Link href={`/recipes/${recipe.id}`}>
            View Recipe <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
