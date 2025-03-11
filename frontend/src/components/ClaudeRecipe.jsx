import React from 'react'

import '../css/ClaudeRecipe.css'

function ClaudeRecipe() {
    return (
        <section className="recipe-section">
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
        </section>        
    )
}

export default ClaudeRecipe
