import { useState } from "react";
import axios from "axios";

export default function EmailChecker() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/email-check", { text: emailText });
      setResult(res.data.message);
    } catch (error) {
      setResult("Error checking email content");
    }
  };

  return (
    <div className="max-w-md mx-auto text-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Email Checker</h2>
      <textarea
        placeholder="Paste email content..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
        className="border p-2 w-full rounded mb-4 h-40"
      />
      <button
        onClick={handleCheck}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Analyze
      </button>
      {result && <p className="mt-4 text-gray-700">{result}</p>}
    </div>
  );
}
