const { GoogleGenerativeAI, FunctionDeclarationSchemaType } = require("@google/generative-ai");
const LLM = require('./llm');

class GeminiLLM extends LLM {

    constructor() {
        super();
        this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        this.responseSchema = {
            type: FunctionDeclarationSchemaType.ARRAY,
            items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                    start: {
                        type: FunctionDeclarationSchemaType.STRING,
                    },
                    end: {
                        type: FunctionDeclarationSchemaType.STRING
                    }
                },
            }
        }
        this.generationConfig = {
            responseMimeType: "application/json",
            responseSchema: this.responseSchema
        }
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro", generationConfig: this.generationConfig });

    }


    async extract(availability) {
        const result = await this.model.generateContent(this.createPrompt(availability));
        console.log('model output: ' + result.response.text())

        return JSON.parse(result.response.text())
    }
}

module.exports = GeminiLLM;