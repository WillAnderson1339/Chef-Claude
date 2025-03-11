// import { useState } from 'react'
import React from 'react'

import IngredientsList from './IngredientsList'
import ClaudeRecipe from './ClaudeRecipe'
import { getRecipefromChefClaude, getRecipeFromMistral } from '../services/ai-combined'

import '../css/Main.css'

function Main() {
    const [ingredients, setIngredients] = React.useState(["All the main spices", "Mushrooms", "Asperagus"])
    // const [recipeShown, setRecipeShown] = React.useState(false)
    const [recipe, setRecipe] = React.useState("")
    
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prev => [...prev, newIngredient])
    }

    async function getRecipe() {
        // setRecipeShown(prevShown => !prevShown)

        // const newRecipe = getRecipefromChefClaude(ingredients).then(setRecipe)
        // const newRecipe = getRecipefromChefClaude(ingredients)
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        console.log("received recipe Markdown", recipeMarkdown)
        setRecipe(recipeMarkdown)

        // getRecipeFromMistral(ingredients).then(setRecipe)
    }

  return (
    <main>
        <form className="add-ingredient-form" action={addIngredient}>
            <input 
            type="text" 
            // placeholder="e.g. oregano"
            defaultValue="Beef"
            aria-label="Add ingredient"
            name="ingredient"
            />
            <button>Add Ingredient</button>
        </form>

        {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />}

        {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}

export default Main
