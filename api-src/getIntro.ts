import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getIntroAsPerson } from "./_openAIAPI.js";

export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {

    const entity = (request.query.entity ?? 'Normal Person') as string

    const intro = await getIntroAsPerson({ entity })

    response.setHeader('Content-Type', 'application/json')
    response.status(200).json({
        intro
    })
}