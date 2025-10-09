"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.openaiProxy = void 0;
const functions = __importStar(require("firebase-functions"));
const secret_manager_1 = require("@google-cloud/secret-manager");
// Instantiate the Secret Manager client
const secretManagerClient = new secret_manager_1.SecretManagerServiceClient();
/**
 * Retrieves the OpenAI API key from Google Cloud Secret Manager.
 */
async function getOpenAIKey() {
    // IMPORTANT: Make sure the secret name 'OPENAI_API_KEY' exists in your Google Cloud project.
    const name = "projects/435822865745/secrets/OPENAI_API_KEY/versions/latest";
    try {
        const [version] = await secretManagerClient.accessSecretVersion({ name });
        const payload = version.payload?.data?.toString();
        if (!payload) {
            throw new Error("Secret payload is empty.");
        }
        return payload;
    }
    catch (error) {
        console.error("Error accessing secret from Secret Manager:", error);
        throw new functions.https.HttpsError("internal", "Could not retrieve API key. Make sure the secret exists and the Functions service account has permission to access it.");
    }
}
// HTTP function to proxy OpenAI requests, with manual CORS
exports.openaiProxy = functions.https.onRequest(async (req, res) => {
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
        const OpenAI = (await Promise.resolve().then(() => __importStar(require("openai")))).default;
        const openai = new OpenAI({ apiKey });
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: req.body.prompt || "Olá!" }],
        });
        console.log("OpenAI Response:", JSON.stringify(completion, null, 2));
        if (completion.choices && completion.choices.length > 0 && completion.choices[0].message) {
            res.status(200).json({ success: true, data: completion.choices[0].message });
        }
        else {
            throw new Error("Unexpected response format from OpenAI.");
        }
    }
    catch (err) {
        console.error("ERROR IN openaiProxy FUNCTION:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});
