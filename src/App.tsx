import { Link } from "react-router-dom";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center text-center p-6">
      <img
        src="/logo.png"
        alt="Winora Logo"
        className="w-24 h-24 mb-6 rounded-full shadow-sm"
      />
      <h1 className="text-4xl font-bold mb-3 text-gray-800 tracking-tight">
        Winora
      </h1>
      <p className="max-w-md text-gray-600 leading-relaxed text-base">
        A transparent random raffle platform designed for fair draws,
        giveaways, and prize events.
        <br />
        Powered by randomness, built on trust.
      </p>

      <Link
        to="/winners"
        className="absolute top-6 right-6 text-sm font-medium text-indigo-600 hover:underline"
      >
        Winners
      </Link>

      <BottomNav />
    </div>
  );
}
