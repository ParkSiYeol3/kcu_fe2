"use client"

import { getAllTypeNames, PokemonTypeKey } from "@/config/pokemonTypes";
import { useState } from "react";
import TypeBadge from "./TypeBadge";
import { useRouter, useSearchParams } from "next/navigation";

export default function TypeFilter() {
    // const [seclectedTypes, setSelectedTypes] = useState<PokemonTypeKey[]>([]);
    const route = useRouter();
    const searchParams = useSearchParams();

    const typeParam = searchParams.get("type");
    const seclectedTypes = typeParam ? typeParam.split(",") : [];

    const handleClick = (type:PokemonTypeKey) => {
        const params = new URLSearchParams(searchParams.toString())

        let newSelectedTypes: string[];
        if (seclectedTypes.includes(type)) {
            newSelectedTypes = seclectedTypes.filter(t => t !== type)
        } else {
            newSelectedTypes = [...seclectedTypes, type]
        }
        if (newSelectedTypes.length === 0) {
        params.delete('type')
        } else {
            params.set('type', newSelectedTypes.join(','))
        }
        params.set('page', '1') // 타입 필터링 시 페이지는 1로 초기화
        route.push(`/?${params.toString()}`)
    }

return (
    <div className="m-4 p-4 border-2 rounded-2xl">
        <div className="flex items-start gap-3">
            <h3 className="font-semibold">타입</h3>
            <div className="flex flex-wrap gap-2.5">
                {getAllTypeNames().map((type:PokemonTypeKey) => {
                    return <TypeBadge
                        key={type}
                        typeName={type}
                        onClick={() => handleClick(type)}
                        isSelected={seclectedTypes.includes(type)}
                    />
                })}
            </div>
        </div>
    </div>
    )
}