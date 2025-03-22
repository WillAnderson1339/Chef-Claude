// import { useState } from 'react'
import React from 'react'

import IngredientsList from './IngredientsList'
import ClaudeRecipe from './ClaudeRecipe'
import { getRecipefromChefClaude, getRecipeFromMistral, getRecipeFromOpenAI } from '../services/ai-combined'

import '../css/Main.css'

function Main() {
    const [ingredients, setIngredients] = React.useState(["All the main spices", "Mushrooms", "Asperagus"])
    // const [recipeShown, setRecipeShown] = React.useState(false)
    const [recipe, setRecipe] = React.useState("")
    const [aiChoice, setAiChoice] = React.useState("OpenAI")
    const recipeSection = React.useRef(null)
    const [defaultIngredient, setDefaultIngredient] = React.useState("Beef")
    const [removingItem, setRemovingItem] = React.useState(null)

    const handleAIChoiceChange = (event) => {
        setAiChoice(event.target.value);
        console.log('Selected value:', event.target.value);
      };
       
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prev => [...prev, newIngredient])
        setDefaultIngredient("")
    }

    function removeIngredient(id) {
        // Filter out the item
        /*
        const updatedIngredients = ingredients.filter(
          ingredient => ingredient !== id.ingredient
        );
    
        setIngredients(updatedIngredients);
        */

      setRemovingItem(id.ingredient);

    // Delay state update to let animation play
    setTimeout(() => {
        setIngredients(prev => prev.filter(item => item !== id.ingredient));
        setRemovingItem(null);
    }, 400); // match your CSS animation duration
}

    async function getRecipe() {
        console.log("ai choice:", aiChoice)
        // setRecipeShown(prevShown => !prevShown)

        setRecipe("") // clear the recipe before getting a new one"")

        // const newRecipe = getRecipefromChefClaude(ingredients)

        // let recipeMarkdown = ""
        // recipeMarkdown = await getRecipeFromMistral(ingredients)
        // setRecipe(recipeMarkdown)

        // alternative: remove the async and await and use .then
        // getRecipefromChefClaude(ingredients).then(setRecipe)

        // getRecipeFromMistral(ingredients).then(setRecipe)

        if (aiChoice === "chef-claude") {
            getRecipefromChefClaude(ingredients).then(setRecipe)
        } 
        else if (aiChoice === "mistral") {
            getRecipeFromMistral(ingredients).then(setRecipe)
        }
        else if (aiChoice === "OpenAI") {
            getRecipeFromOpenAI(ingredients).then(setRecipe)
        }
        else {
            console.log("Invalid AI choice")
        }
        
    }
    
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
            
            /*
            // interesting alternative to scrolling something into view
            const yCoord = recipeSection.current.getBoundingClientRect().top
            window.scroll({
            top: yCoord,
            behavior: "smooth"
            })
            */
        }
    }, [recipe]) 

  return (
    <main>
        <div className="ai-choice-container">
        <label htmlFor="ai-choice">Choose an AI to generate your recipe:</label>
        <select id="ai-choice" value={aiChoice} onChange={handleAIChoiceChange}>
            <option value="chef-claude">Anthropic</option>
            <option value="mistral">Mistral</option>
            <option value="OpenAI">OpenAI</option>
        </select>
        </div>
        <form className="add-ingredient-form" action={addIngredient}>

            <input 
            type="text" 
            // placeholder="e.g. oregano"
            // defaultValue="Prawns"
            defaultValue={defaultIngredient}
            aria-label="Add ingredient"
            name="ingredient"
            />
            <button>Add Ingredient</button>
        </form>

        {ingredients.length > 0 && 
        <IngredientsList 
            ref={recipeSection} 
            ingredients={ingredients} 
            getRecipe={getRecipe} 
            removeIngredient={removeIngredient}
            removingItem={removingItem}
        />}

        {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}

export default Main
