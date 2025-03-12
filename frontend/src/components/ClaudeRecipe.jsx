import React from 'react'
import ReactMarkdown from 'react-markdown'

import '../css/ClaudeRecipe.css'

function ClaudeRecipe(props) {
    // console.log("Recipe props:", props)

    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Chef Claude recommends</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>        
    )
}

export default ClaudeRecipe
