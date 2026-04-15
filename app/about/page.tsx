"use client"

import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/store/counterStore";
import Link from "next/link";

export default function AboutPage() {
  const {count, increment, decrement, reset} = useCounterStore();
  return (
    <div className="container mx-10 p-4">
        <Link href="/about/details">
            <h1 className="text-4xl font-bold mb-4">About</h1>
        <p>
            React + Shadcn UI + PokeAPI
        </p>
        <div className="flex flex-col items-center w-3xs mb-10">
          <div className="text-3xl">{count}</div>
          <div className="flex gap-2">
            <Button onClick={increment}>+</Button>
            <Button onClick={decrement}>-</Button>
            <Button onClick={reset}>초기화</Button>
          </div>
        </div>
        </Link>
    </div>
  )
}