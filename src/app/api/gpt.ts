import { ErrorWithCode } from "./error";
import { Models } from "./models";

const OPEN_ROUTER_KEY = process.env.NEXT_PUBLIC_OPEN_ROUTER_KEY || ""

const gpt = async (content: string, model: Models) => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPEN_ROUTER_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": model || "deepseek/deepseek-r1-distill-llama-70b:free",
          "messages": [
            {
              "role": "user",
              "content": content
            }
          ],
        })
      });    
    const data = await response.json();
    if (data?.error) {
        console.log(`code: ${data.error.code}, message: ${data.error.message}, metadata: ${JSON.stringify(data.error.metadata)}`)
        throw new ErrorWithCode("Something went wrong", data?.error?.code || 500)
    }
    const message = data.choices?.[0].message?.content

    return message
}

const generateJoke = async (jokeTopic:string, model: Models = Models.DEEPSEEK_R1_DISTILL_LLAMA_70B) => {
  const response = await gpt(`Generate a quick funny joke and response about ${jokeTopic}, return it to me in JSON format with keys question and answer`, model)
  const json = extractJson(response)
  return json
}

const extractJson = (input: string) => {
  // Step 1: Extract the JSON portion from the string
  const jsonStart = input.indexOf('{'); // Find the start of the JSON object
  const jsonEnd = input.indexOf('}') + 1; // Find the end of the JSON object
  const jsonString = input.slice(jsonStart, jsonEnd); // Extract the JSON portion

  // Step 2: Parse the JSON string into an object
  const jsonObject = JSON.parse(jsonString);

  return jsonObject
}

export { gpt, generateJoke }