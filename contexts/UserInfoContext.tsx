"use client"

import { useState, ReactNode, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";

interface UserInfoContextType {
    favorites: number[];
    setFavorites: Dispatch<SetStateAction<number[]>>;
}

const UserInfoContext = createContext<UserInfoContextType>({
    favorites: [],
    setFavorites: () => {}
})

export function UserInfoProvider({children}: {children: ReactNode}) {
    const {data: session} = useSession();
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const getUserFavorites = async () => {
            if(session) {
                const res = await fetch("/api/favorites");
                const data = await res.json();
                setFavorites(data);
            } else {
                setFavorites([]);
            }
        }
        getUserFavorites();
    }, [session]);

    return (
        <UserInfoContext.Provider value={{favorites, setFavorites}}>
            {children}
        </UserInfoContext.Provider>
    )
}

export const useUserInfo = () => useContext(UserInfoContext);