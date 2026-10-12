import { X } from "lucide-react";
import { useEffect } from "react";

export function VideoModal({ id, onClose }: { id: string | null; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  if (!id) return null;
  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4" onClick={onClose}>
      <button aria-label="Close video" className="absolute right-6 top-6 text-foreground hover:text-primary"><X className="h-8 w-8" /></button>
      <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title="Performance video" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
      </div>
    </div>
  );
}
