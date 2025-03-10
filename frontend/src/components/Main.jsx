// import { useState } from 'react'
import React from 'react'

import '../css/Main.css'

function Main() {
    const [ingredients, setIngredients] = React.useState(["Salt", "Pepper"])
    const [recipeShown, setRecipeShown] = React.useState(false)

    // console.log("CURRENT INGREDIENTS: ", ingredients)
    
    const ingredientListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")

        // console.log("current Ingredients: ", ingredients)
        // console.log("new ingredient: ", newIngredient)
        
        setIngredients(prev => [...prev, newIngredient])
        
        // console.log("new Ingredients: ", ingredients)
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

        {ingredients.length > 0 && <section className="ingredients-section">
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list">{ingredientListItems}</ul>
            {ingredients.length > 3 && <div className="get-recipe-container">
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
                <button onClick={toggleRecipeShown}>Get a recipe</button>
            </div>}
        </section>}

        {recipeShown === true && <section className="recipe-section">
            <h2>Chef Claude recommends</h2>
            <article className="suggested-recipe-container">
                <p>Based on the ingredients you have available, I would recommend</p>
                <h3>Beef Bolognaise Pasta</h3>
                <strong>Ingredients:</strong>
                <ul>
                    <li>1 lb ground beef</li>
                    <li>1 onion</li>
                    <li>1 clove garlic</li>
                </ul>
                <strong>Instructions:</strong>
                <ol>
                    <li>1. Brown the beef in a skillet</li>
                    <li>2. Add the onion and garlic</li>
                    <li>3. Cook until onions are translucent</li>
                    <li>4. Serve over pasta</li>
                </ol>
            </article>
        </section>}
    </main>
  )
}

export default Main
