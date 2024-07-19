const Groq = require('groq-sdk');
const LLM = require('./llm')


class GroqLLM extends LLM {

    constructor() {
        super();
        this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }


    async extract(availability) {
        try {
            const chatCompletion = await this.groq.chat.completions.create({
                "messages": [
                    {
                        "role": "system",
                        "content": "JSON"
                    },
                    {
                        "role": "user",
                        "content": this.createPrompt(availability)
                    }
                ],
                "model": "llama3-70b-8192",
                "temperature": 0,
                "max_tokens": 1024,
                "top_p": 1,
                "stream": false,
                "response_format": {
                    "type": "json_object"
                },
                "stop": null
            });

            return JSON.parse('[' + chatCompletion.choices[0]?.message?.content + ']') || "";
        } catch (err) {
            
            // TODO
            let error = err.error.error;
            if (error.code == 'json_validate_failed') {
                return JSON.parse('[' + error.failed_generation + ']') || "";
            }
            throw err;
        }
    }
}

module.exports = GroqLLM;