import Image from "next/image"
import { Search } from "./ui/search"

export default function Page() {
  return (
    <div className="hero flex flex-col justify-center items-center">
      <Image src="/hero.png" alt="Hero section movies banner" width={500} height={300} />
      <h1 className="text-3xl text-center font-bold text-white md:text-5xl">Find <span className="bg-gradient-to-l from-indigo-300 to-indigo-100 bg-clip-text text-transparent">movies</span> you'll enjoy, easily.</h1>
      <Search />
    </div>
  )
}