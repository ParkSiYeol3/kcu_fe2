"use client"

import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

interface UserData {
    id: number;
    oauth_id: string;
    name: string | null;
    email: string | null;
    data: {
        points: number;
    }
    created_at: string;
}

export default function LoginButton() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect( () => {
        const fetchUserData = async () => {
            if(session) {
                const res = await fetch("/api/user");
                const data = await res.json();
                console.log('DB 유저 정보: ', data);
                setUserData(data);
            }
        }
        fetchUserData();
    }, [session]);

    if (status === "loading") {
        return <Button disabled>...로딩 중</Button>
    }

    if (session) {
        return (
            <div>
                <span>{session.user?.name}님</span>
                {userData && (
                    <Badge variant="secondary">
                        {userData.data.points.toLocaleString()}P
                    </Badge>
                )}
                <Button onClick={() => signOut()}>로그아웃</Button>
            </div>
        )
    }

    return <Button onClick={() => signIn()}>로그인</Button>
}