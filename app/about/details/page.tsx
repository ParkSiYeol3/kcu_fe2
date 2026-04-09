export default async function AboutPage() {
  await new Promise(r=>setTimeout(r,2000))
  return (
    <div className="container mx-10 p-4">
      <h1 className="text-4xl font-bold mb-4">About Details</h1>
      <p>React + Shadcn UI + PokeAPI</p>
    </div>
  )
}