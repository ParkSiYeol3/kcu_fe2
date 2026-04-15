import { useUserInfo } from "@/contexts/UserInfoContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { useUserStore } from "@/store/userStore";

interface favoritesProps {
  open: boolean,
  onOpenChange: (open: boolean) => void;
  pokemonId: number;
  pokemonName: string;
}

export default function FavoriteDialog({
  open, onOpenChange, pokemonId, pokemonName
} : favoritesProps) {
  const favorites = useUserStore((state)=> state.favorites);
  const addFavorite = useUserStore((state)=> state.addFavorite);
  const removeFavorite = useUserStore((state)=> state.removeFavorite);

  const isFavorited = favorites.includes(pokemonId);

  async function handleConfirm() {
    if(isFavorited) {
      // DB에서 좋아요 삭제
      await fetch(`/api/favorites?pokemon_id=${pokemonId}`, {method: "DELETE"})
      removeFavorite(pokemonId);
    } else {
      // DB에서 좋아요 추가
      await fetch('api/favorites', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({pokemon_id:pokemonId})
      });
      addFavorite(pokemonId);
    }
    onOpenChange(false);
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-xs!">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isFavorited ? `${pokemonName} 찜하기 취소` : `${pokemonName} 찜하기`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isFavorited ? '찜 목록에서 제거하시겠습니까?' : '찜 목록에 추가하시겠습니까?'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}