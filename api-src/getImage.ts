import type { VercelRequest, VercelResponse } from '@vercel/node';
import {getEntityImageUrl, getIntroAsPerson} from "./_openAIAPI.js";

export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {

    const entity = request.query.entity

    if(!entity || typeof entity !== 'string') {
        console.error('Bad Request')
        response.status(400).send('Bad Request')
        return
    }

    const imageUrl = await getEntityImageUrl({ entity })

    response.setHeader('Content-Type', 'application/json')
    response.status(200).json({
        imageUrl
    })
}