"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button";
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

export default function LoginButton(){
  const { data: session, status} = useSession();
  const [userData, setUserData] = useState<UserData | null>(null)
  const points = userData?.data?.points;

  useEffect( ()=>{
    const fetchUserData = async () => {
      if(session) {
        const res = await fetch('/api/users');
        const data = await res.json();

        if (!res.ok) {
          setUserData(null);
          return;
        }

        console.log('DB 유저 정보: ', data)
        setUserData(data.user ?? null)
      } else {
        setUserData(null);
      }
    }
    fetchUserData()
  }, [session])

  if( status === "loading") {
    return <Button disabled>...로딩중</Button> 
  }

  if( session ) {
    return (
      <div>
        <span>{session.user?.name}님</span>
        {typeof points === "number" && (
          <Badge variant="secondary">
            {points.toLocaleString()}P
          </Badge>
        )}
        <Button onClick={ ()=>signOut() }>로그아웃</Button>
      </div>
    )
  }

  return <Button onClick={ ()=>signIn() }>로그인</Button>
}
