import { useState } from "react";
import Raffles from "./pages/Raffles";
import Profile from "./pages/Profile";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center text-gray-900">
      {page === "home" && (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <img
            src="/logo.png"
            alt="Winora Logo"
            className="w-24 h-24 mb-4 rounded-full shadow-lg"
          />
          <h1 className="text-4xl font-bold mb-4">Winora</h1>
          <p className="text-lg max-w-md mb-8">
            A transparent random raffle platform designed for fair draws,
            giveaways, and prize events. <br />
            Powered by randomness, built on trust.
          </p>

          <div className="flex gap-4 mt-4">
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              onClick={() => setPage("raffles")}
            >
              View Raffles
            </button>
            <button
              className="bg-gray-700 text-white px-5 py-2 rounded-lg"
              onClick={() => setPage("profile")}
            >
              Profile
            </button>
          </div>
        </div>
      )}

      {page === "raffles" && (
        <>
          <Raffles />
          <button
            className="mt-4 mb-8 bg-gray-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setPage("home")}
          >
            ← Back to Home
          </button>
        </>
      )}

      {page === "profile" && (
        <>
          <Profile />
          <button
            className="mt-4 mb-8 bg-gray-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setPage("home")}
          >
            ← Back to Home
          </button>
        </>
      )}
    </div>
  );
}

export default App;
