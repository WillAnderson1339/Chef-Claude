import React from 'react'

import '../css/IngredientsList.css'

function IngredientsList(props) {
    const ingredientListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    return (
        <section className="ingredients-section">
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list">{ingredientListItems}</ul>
            {props.ingredients.length > 3 && 
            <div>
                <div className="get-recipe-container">
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>
            </div>
            }
        </section>
    )
}

export default IngredientsList
