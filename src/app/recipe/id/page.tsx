import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Clock, Utensils, Users, Download, Pencil, Printer } from "lucide-react"

export const metadata: Metadata = {
  title: "Recipe Details - Memory Sharing",
  description: "View detailed recipe instructions and ingredients",
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipeId = params.id

  // Mock data for the recipe
  const recipe = {
    id: recipeId,
    title: "Grandma's Apple Pie",
    description: "A classic apple pie recipe passed down through generations",
    prepTime: "30 mins",
    cookTime: "45 mins",
    servings: 8,
    ingredients: [
      "6-7 medium apples, peeled, cored and sliced",
      "3/4 cup granulated sugar",
      "2 tablespoons all-purpose flour",
      "1 teaspoon ground cinnamon",
      "1/4 teaspoon ground nutmeg",
      "1/4 teaspoon salt",
      "1 tablespoon lemon juice",
      "2 pie crusts (homemade or store-bought)",
      "2 tablespoons butter, cut into small pieces",
      "1 egg, beaten (for egg wash)",
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "In a large bowl, combine sliced apples, sugar, flour, cinnamon, nutmeg, salt, and lemon juice. Mix well to coat the apples.",
      "Place one pie crust in a 9-inch pie dish.",
      "Pour the apple mixture into the pie crust and dot with butter pieces.",
      "Place the second pie crust on top. Trim and crimp the edges to seal. Cut several slits in the top crust to allow steam to escape.",
      "Brush the top crust with beaten egg for a golden finish.",
      "Bake for 45-50 minutes, or until the crust is golden brown and the filling is bubbly.",
      "Allow to cool for at least 30 minutes before serving.",
    ],
    tips: "For the best flavor, use a mix of tart and sweet apples such as Granny Smith and Honeycrisp.",
    imageUrl: "/placeholder.svg?height=400&width=800",
    category: "desserts",
    dateAdded: "March 15, 2023",
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild>
          <Link href="/recipes">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Recipes
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button size="sm" asChild>
            <Link href={`/recipes/edit/${recipeId}`}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden mb-8">
        <img src={recipe.imageUrl || "/placeholder.svg"} alt={recipe.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-muted-foreground mb-6">{recipe.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm mb-8 p-4 bg-muted rounded-lg">
            <span className="flex items-center">
              <Clock className="h-5 w-5 mr-2" /> Prep: {recipe.prepTime}
            </span>
            <span className="flex items-center">
              <Utensils className="h-5 w-5 mr-2" /> Cook: {recipe.cookTime}
            </span>
            <span className="flex items-center">
              <Users className="h-5 w-5 mr-2" /> Serves: {recipe.servings}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <ol className="space-y-4 list-decimal list-inside">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="pl-2">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {recipe.tips && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Chef's Tips</h3>
              <p>{recipe.tips}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
