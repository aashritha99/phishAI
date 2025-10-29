const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:8000" // local FastAPI
    : "https://phishai.onrender.com"; // Render URL

export async function getURLPrediction(url) {
  const response = await fetch(`${API_BASE_URL}/predict/url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  return await response.json();
}

export async function getEmailPrediction(email_text) {
  const response = await fetch(`${API_BASE_URL}/predict/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email_text }),
  });
  return await response.json();
}
