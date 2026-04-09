import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">포켓몬을 찾을 수 없습니다.</p>
      <p className="text-xl">1-151번 포켓몬만 조회 가능</p>
      <Button
        render={<Link href="/"/>}
        nativeButton={false}
      >
        홈으로 돌아가기
      </Button>
    </div>
  )
}