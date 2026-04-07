"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Home() {
  const [activate, setActivate] = useState(false)
  const [roundLevel, setRoundLevel] = useState(0);
  const radiusLevels = [
    "rounded-sm", "rounded-md", "rounded-lg", "rounded-full"
  ];
  
  return (
    <div>
      <Button
        onClick={() => {
          setActivate((prev)=>(!prev))
          setRoundLevel((prev)=>((prev+1)%4))
        }}
        className={cn(
          "cursor-pointer",
          "transition",
          "duration-3000",
          "rounded-sm",
          activate && ("bg-red-500 hover:bg-red-500/30 text-black"),
          radiusLevels[roundLevel]
        )}
      >
        버튼
      </Button>
    </div>
  )
}
