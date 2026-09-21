export default function Home() {
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
          className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 outline-none"
        />

        <button className="rounded-lg bg-white px-6 py-3 font-semibold text-black">
          Analyze
        </button>
      </div>
    </main>
  );
}