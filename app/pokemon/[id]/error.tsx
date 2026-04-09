"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error, reset
}:{
  error:Error, reset: ()=>void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">문제가 발생하였습니다.</h1>
      <p className="text-xl">포켓몬 데이터를 불러올 수 없습니다.</p>
      <p className="text-xl">{error.message}</p>
      <div className="flex gap-3">
        <Button onClick={reset}>
          다시 시도
        </Button>
        <Button
          render={<Link href="/"/>}
          nativeButton={false}
        >
          홈으로 돌아가기
        </Button>

      </div>
    </div>
  )
}