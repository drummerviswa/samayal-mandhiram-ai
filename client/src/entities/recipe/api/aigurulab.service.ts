import axios from "axios";

const BASE_URL = "https://aigurulab.tech";
export const GenerateAiImage = async (input: string) =>
	await axios.post(
		BASE_URL + "/api/generate-image",
		{
			width: 1024,
			height: 1024,
			input: input,
			model: "sdxl", //'flux'
			aspectRatio: "1:1" //Applicable to Flux model only
		},
		{
			headers: {
				"x-api-key": process.env.EXPO_PUBLIC_AI_GURU_LAB_API_KEY, // Your API Key
				"Content-Type": "application/json" // Content Type
			}
		}
	);
