import Navbar from "./components/Navbar"
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
        <Navbar />
            <h1 className="text-4xl font-bold text-center">
                Patient records at your fingertips
            </h1>
            <p className="text-center">
                Quickly find patient records and their treatment history
            </p>
            <Image
                src="/placeholder-hero.jpg"
                alt="Dotplot Hero"
                width={200}
                height={200}
            />
    </div>
  )
}

