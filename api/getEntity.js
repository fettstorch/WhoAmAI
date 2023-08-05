var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEntity, getIntroAsPerson } from "./_openAIAPI.js";
export default function handler(_, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const entity = yield getEntity();
        const intro = yield getIntroAsPerson({ entity });
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json({
            entity,
            intro
        });
    });
}
