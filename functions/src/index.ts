import * as functions from "firebase-functions";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

// Instantiate the Secret Manager client
const secretManagerClient = new SecretManagerServiceClient();

/**
 * Retrieves the OpenAI API key from Google Cloud Secret Manager.
 */
async function getOpenAIKey(): Promise<string> {
  // IMPORTANT: Make sure the secret name 'OPENAI_API_KEY' exists in your Google Cloud project.
  const name = "projects/435822865745/secrets/OPENAI_API_KEY/versions/latest";

  try {
    const [version] = await secretManagerClient.accessSecretVersion({ name });
    const payload = version.payload?.data?.toString();

    if (!payload) {
      throw new Error("Secret payload is empty.");
    }
    return payload;
  } catch (error) {
    console.error("Error accessing secret from Secret Manager:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Could not retrieve API key. Make sure the secret exists and the Functions service account has permission to access it."
    );
  }
}

// HTTP function to proxy OpenAI requests, with manual CORS
export const openaiProxy = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response) => {
  // Set CORS headers to allow any origin
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Respond to preflight OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }

  // Handle the main POST request
  try {
    const apiKey = await getOpenAIKey();
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: req.body.prompt || "Olá!" }],
    });

    console.log("OpenAI Response:", JSON.stringify(completion, null, 2));

    if (completion.choices && completion.choices.length > 0 && completion.choices[0].message) {
      res.status(200).json({ success: true, data: completion.choices[0].message });
    } else {
      throw new Error("Unexpected response format from OpenAI.");
    }
  } catch (err: any) {
    console.error("ERROR IN openaiProxy FUNCTION:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
