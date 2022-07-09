import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed w-screen bg-red-200 px-5 h-16 flex justify-between items-center z-50">
      <Link href="/">
        <a>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            version="1.1"
            aria-labelledby="home"
            aria-hidden="false"
          >
            <title id="home">Home</title>
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
          </svg>
        </a>
      </Link>
    </nav>
  );
}
