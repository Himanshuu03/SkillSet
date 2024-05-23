// components/Navbar.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check local storage for username
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("username");
    setUsername(null);
    router.push("/login");
  };

  return (
    <nav className="bg-slate-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="">
          <span className="text-4xl text-gray-100 font-bold shadow-md">S</span>
        <span className="text-2xl text-gray-100 font-light shadow-md">kill </span>
        <span className="text-4xl text-gray-100 font-bold shadow-md">S</span>
        <span className="text-2xl text-gray-100 font-light shadow-md">et</span>
        </div>
        <div className="space-x-4 flex items-center">
          <Link href="/">
            <p className="text-white cursor-pointer hover:scale-110">Home</p>
          </Link>
          {username ? (
            <>
              <button
                onClick={handleSignOut}
                className="text-white cursor-pointer hover:scale-110"
              >
                Sign Out
              </button>
              <p className="text-white cursor-pointer"><span className="text-xl">👨🏻‍💻</span>{username}</p>
            </>
          ) : (
            <>
              <Link href="/login">
                <p className="text-white cursor-pointer hover:scale-110">
                  Login
                </p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
