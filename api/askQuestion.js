var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { askQuestionAboutEntity } from "./_openAIAPI.js";
export default function handler(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { question, entity } = request.query;
        if (!entity
            || !question
            || typeof question !== 'string'
            || typeof entity !== 'string') {
            console.error('Bad Request');
            response.status(400).send('Bad Request');
            return;
        }
        const answer = yield askQuestionAboutEntity({ entity, question });
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json({
            answer
        });
    });
}
