// import { useState } from 'react'
import React from 'react'

import IngredientsList from './IngredientsList'
import ClaudeRecipe from './ClaudeRecipe'

import '../css/Main.css'

function Main() {
    const [ingredients, setIngredients] = React.useState(["Salt", "Pepper"])
    const [recipeShown, setRecipeShown] = React.useState(false)

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prev => [...prev, newIngredient])
    }

    function toggleRecipeShown() {
        setRecipeShown(prevShown => !prevShown)
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

        {ingredients.length > 0 && 
        <IngredientsList ingredients={ingredients} toggleRecipeShown={toggleRecipeShown}/>}

        {recipeShown === true && <ClaudeRecipe />}
    </main>
  )
}

export default Main
