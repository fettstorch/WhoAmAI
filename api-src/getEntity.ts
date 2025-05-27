import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getEntity, getIntroAsPerson } from "./_openAIAPI.js";

export default async function handler(
    _: VercelRequest,
    response: VercelResponse,
) {
    // Add CORS headers for local development
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const entity = await getEntity()
    const intro = await getIntroAsPerson({ entity })

    response.setHeader('Content-Type', 'application/json')
    response.status(200).json({
        entity,
        intro
    })
}