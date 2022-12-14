import Link from "next/link";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useState } from "react";

export default function ActualHeader() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");
  const handleWalletConnect = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    signer.getAddress().then((value) => {
      setWalletAddress(`${value.substring(0, 10)}...`);
    });
  };
  return (
    <header className="flex justify-between items-center py-4 md:py-8">
      <Link href="/">
        <a
          href="#"
          className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
          aria-label="logo"
        >
          <svg
            width="95"
            height="94"
            viewBox="0 0 95 94"
            className="w-6 h-auto text-indigo-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M96 0V47L48 94H0V47L48 0H96Z" />
          </svg>
          WMDB
        </a>
      </Link>
      <nav className="hidden lg:flex gap-12">
        <Link href="/">
          <a
            href="#"
            className={`text-gray-600 hover:text-indigo-500 ${
              router.pathname === "/" && "text-indigo-700"
            } text-lg font-semibold transition duration-100 hover:bg-indigo-50 rounded-2xl p-3`}
          >
            Home
          </a>
        </Link>
        <Link href="/reviews">
          <a
            href="#"
            className={`text-gray-600 hover:text-indigo-500 ${
              router.pathname === "/reviews" && "text-indigo-700"
            } text-lg font-semibold transition duration-100 hover:bg-indigo-50 rounded-2xl p-3`}
          >
            Reviews
          </a>
        </Link>
        <Link href="/propose">
          <a
            href="#"
            className={`text-gray-600 hover:text-indigo-500 ${
              router.pathname === "/propose" && "text-indigo-700"
            } text-lg font-semibold transition duration-100 hover:bg-indigo-50 rounded-2xl p-3`}
          >
            Propose New Addition
          </a>
        </Link>
        <Link href="/vote">
          <a
            href="#"
            className={`text-gray-600 hover:text-indigo-500 ${
              router.pathname === "/vote" && "text-indigo-700"
            } text-lg font-semibold transition duration-100 hover:bg-indigo-50 rounded-2xl p-3`}
          >
            Vote
          </a>
        </Link>
      </nav>
      <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
        {walletAddress == "" ? (
          <a
            href="#"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            onClick={handleWalletConnect}
          >
            Connect Your Wallet
          </a>
        ) : (
          <div className="inline-block bg-gray-500 border-gray-500 text-sm md:text-base text-white font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
            <span>{walletAddress}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        className="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Menu
      </button>
    </header>
  );
}
