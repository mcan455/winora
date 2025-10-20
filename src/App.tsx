import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center text-center text-gray-900">
      {page === "home" && (
        <>
          <h1 className="text-4xl font-bold mb-4">Winora</h1>
          <p className="text-lg max-w-md">
            A transparent random raffle platform for fair draws and giveaways.
            <br />
            Powered by randomness, built on trust.
          </p>

          <div className="flex gap-4 mt-8">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setPage("raffles")}
            >
              Raffles
            </button>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              onClick={() => setPage("profile")}
            >
              Profile
            </button>
          </div>
        </>
      )}

      {page === "raffles" && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Active Raffles</h2>
          <p className="mb-4">No raffles yet.</p>
          <button
            className="bg-gray-700 text-white px-3 py-2 rounded-lg"
            onClick={() => setPage("home")}
          >
            ← Back
          </button>
        </>
      )}

      {page === "profile" && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Your Profile</h2>
          <p className="mb-4">Profile details will appear here.</p>
          <button
            className="bg-gray-700 text-white px-3 py-2 rounded-lg"
            onClick={() => setPage("home")}
          >
            ← Back
          </button>
        </>
      )}
    </div>
  );
}

export default App;
