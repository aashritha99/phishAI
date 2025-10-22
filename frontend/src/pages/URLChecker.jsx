import { useState } from "react";
import axios from "axios";

export default function URLChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/url-check", { url });
      setResult(res.data.message);
    } catch (error) {
      setResult("Error checking URL");
    }
  };

  return (
    <div className="max-w-md mx-auto text-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">URL Checker</h2>
      <input
        type="text"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      />
      <button
        onClick={handleCheck}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check
      </button>
      {result && <p className="mt-4 text-gray-700">{result}</p>}
    </div>
  );
}
