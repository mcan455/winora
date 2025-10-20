import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/raffles", label: "Raffles" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-3">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`text-sm font-medium ${
            location.pathname === link.path
              ? "text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

