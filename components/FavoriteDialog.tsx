import { useUserInfo } from "@/contexts/UserInfoContext";
import { AlertDialog, AlertDialogContent, AlertDialogDescription } from "./ui/alert-dialog";
import { AlertDialogHeader } from "./ui/alert-dialog";
import { AlertDialogTitle } from "./ui/alert-dialog";

interface favoriteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pokemonId: number;
    pokemonName: string;
}

export default function FavoriteDialog ({
    open, onOpenChange, pokemonId, pokemonName
}: favoriteProps) {
    const {favorites, setFavorites} = useUserInfo();
    const isFavorited = favorites.includes(pokemonId);

    async function handleConfirm() {
        if(isFavorited) {
            // DB에서 좋아요 삭제
            await fetch(`/api/favorites?pokemon_id=${pokemonId}`, {method: "DELETE"});
            setFavorites(favorites.filter(id => id !== pokemonId));
        } else {
            // DB에 좋아요 추가
            await fetch('/api/favorites', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ pokemon_id: pokemonId })
            });
            setFavorites((prev) => [...prev, pokemonId]);
        }
        onOpenChange(false);
    }
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-xs!">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {isFavorited ? `${pokemonName} 즐겨찾기 취소` : `${pokemonName} 즐겨찾기 추가`}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {isFavorited ? '을(를) 즐겨찾기에서 제거하시겠습니까?' : '을(를) 즐겨찾기에 추가하시겠습니까?'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}
