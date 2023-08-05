import { HttpClient } from "./HttpClient";

export class WhoAmAiClient {
    private readonly client = new HttpClient("https://who-am-ai.vercel.app/");

    getEntity() {
        return this.client.get<{
            entity: string
            intro: string
        }>("/api/getEntity");
    }

    askQuestion(params: { entity: string, question: string}) {
        return this.client.get<{
            answer: string
        }>("/api/askQuestion", params);
    }

    getImage(params: { entity: string }) {
        return this.client.get<{
            imageUrl: string
        }>("/api/getImage", params);
    }
}