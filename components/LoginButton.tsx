"use client"

import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Button disabled>...로딩 중</Button>
    }

    if (session) {
        return (
            <div>
                <span>{session.user?.name}님</span>
                <Button onClick={() => signOut()}>로그아웃</Button>
            </div>
        )
    }

    return <Button onClick={() => signIn()}>로그인</Button>
}