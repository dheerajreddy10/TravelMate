import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiPrompt = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendPrompt = async () => {
    setIsLoading(true);
    setResponse("");

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(prompt);
      const text = await result.response.text();

      setResponse(text);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setResponse("❌ Failed to get response. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Ask Gemini ✨</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={sendPrompt}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Send Prompt"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h3 className="font-bold mb-2">Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiPrompt;
