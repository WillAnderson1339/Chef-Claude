import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'
import { ANTHROPIC_KEY } from './api-secret-keys'
import { HF_APIKEY } from './api-secret-keys'
import { OPENAI_APIKEY } from './api-secret-keys'
import axios from "axios";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`
// get the key value from the file: 
const anthropic_key = ANTHROPIC_KEY

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
  }

const anthropic = new Anthropic({
    apiKey: anthropic_key,
    // baseURL: 'https://gateway.ai.cloudflare.com/v1/b0758b7460a85a7fc28c4d6e12675269/chefclaude/anthropic',
    dangerouslyAllowBrowser: true,
    // corsHeaders: corsHeaders,
})

export async function getRecipefromChefClaude(ingredientsArr) {
    console.log("SYSTEM_PROMPT:", SYSTEM_PROMPT)
    console.log("anthropic_key:", anthropic_key)

    const ingredientsString = ingredientsArr.join(", ")
    try {
        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ]

        const msg = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages
        })

        return msg.content[0].text
    } catch (err) {
        console.error(err.message)
    }
}


const hf_apiKey = HF_APIKEY
const hf = new HfInference(hf_apiKey)


export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })

        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}

export async function getRecipeFromOpenAI(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4o",  // Use "gpt-3.5-turbo" for a cheaper option
            // model: "gpt-3.5-turbo",  // Use "gpt-3.5-turbo" for a cheaper option
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
            //   { role: "user", content: `I have these ingredients: ${ingredients}. Can you suggest a recipe?` }
              { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            temperature: 0.7,
            max_tokens: 500,
          },
          {
            headers: {
              "Authorization": `Bearer ${OPENAI_APIKEY}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        return(response.data.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        return("Sorry, something went wrong. Try again!");
      }
  }

export async function getRecipeFromOpenAI_orig(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    const ingredientsTest = "beef, onion, garlic, tomato, salt, pepper, olive oil"
    
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_APIKEY}`
            },
            body: JSON.stringify({
                model: "davinci-codex",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    // { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
                    { role: "user", content: `I have ${ingredientsTest}. Please give me a recipe you'd recommend I make!` },
                ],
                max_tokens: 1024,
            })
        })

        const data = await response.json()
        return data.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}

