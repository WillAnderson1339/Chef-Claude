import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'
import { ANTHROPIC_KEY } from './api-keys'
import { HF_APIKEY } from './api-keys'

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
    // baseURL: 'https://gateway.ai.cloudflare.com/v1/b0758b7460a85a7fc28c4d6e12675269/chefclaude/anthropic'
    dangerouslyAllowBrowser: true,
})

export async function getRecipefromChefClaude(ingredientsArr) {
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


// const apiKey = import.meta.env.VITE_HF_ACCESS_TOKEN // Replace 'your-api-key-here' with your actual API key
// const hf_apiKey = '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'
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


