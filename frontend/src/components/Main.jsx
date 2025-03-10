// import { useState } from 'react'
import React from 'react'

import '../css/Main.css'

function Main() {
    const [ingredients, setIngredients] = React.useState([])

    console.log("CURRENT INGREDIENTS: ", ingredients)
    
    const ingredientListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        console.log("new ingredient: ", newIngredient)

        console.log("current Ingredients: ", ingredients)
        setIngredients(prev => [...prev, newIngredient])
        console.log("new Ingredients: ", ingredients)
    }

  return (
    <main>
        <form className="add-ingredient-form" onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            name="ingredient"
            />
            <button>Add Ingredient</button>
        </form>

        <ul className="ingredient-list">
            {ingredientListItems}
        </ul>
    </main>
  )
}

export default Main
