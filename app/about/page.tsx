import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-10 p-4">
        <Link href="/about/details">
            <h1 className="text-4xl font-bold mb-4">About</h1>
        <p>
            React + Shadcn UI + PokeAPI
        </p>
        </Link>
    </div>
  )
}