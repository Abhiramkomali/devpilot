"use client";
import { useState } from "react";
export default function Home() {
  const [repositoryUrl, setRepositoryUrl] = useState("");

  const analyzeRepository = async () => {
    alert("Analyze function started");

  try {
    const response = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repositoryUrl,
      }),
    });
    const data = await response.json();

    alert(data.message);
    console.log("Backend response:", data);
  } catch (error) {
    console.error("Request failed:", error);
    alert("Request failed");
  }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold">
        DevPilot
      </h1>

      <p className="mt-4 text-xl text-gray-400">
        Understand your codebase.
      </p>

      <p className="mt-2 max-w-xl text-center text-gray-500">
        Analyze your GitHub repository and discover its structure,
        dependencies, and relationships.
      </p>

      <div className="mt-8 flex w-full max-w-xl gap-3">
        <input
          type="text"
          placeholder="Enter your GitHub repository URL"
          value={repositoryUrl}
          onChange={(e) => setRepositoryUrl(e.target.value)}
          className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 outline-none"
        />

        <button
        type="button"
          onClick={analyzeRepository}
         className="rounded-lg bg-white px-6 py-3 font-semibold text-black"
         >
          Analyze
        </button>
      </div>
    </main>
  );
}