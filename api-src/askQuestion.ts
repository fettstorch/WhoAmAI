import type { VercelRequest, VercelResponse } from '@vercel/node';
import {askQuestionAboutEntity, getIntroAsPerson} from "./_openAIAPI.js";

export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    // Add CORS headers for local development
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { question, entity } = request.query

    if(
        !entity
        ||!question
        ||typeof question !== 'string'
        ||typeof entity !== 'string'
    ) {
        console.error('Bad Request')
        response.status(400).send('Bad Request')
        return
    }

    const answer = await askQuestionAboutEntity({ entity, question })

    response.setHeader('Content-Type', 'application/json')
    response.status(200).json({
        answer
    })
}