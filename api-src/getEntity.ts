import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getEntity, getIntroAsPerson } from "./_openAIAPI.js";

export default async function handler(
    _: VercelRequest,
    response: VercelResponse,
) {

    const entity = await getEntity()
    const intro = await getIntroAsPerson({ entity })

    response.setHeader('Content-Type', 'application/json')
    response.status(200).json({
        entity,
        intro
    })
}