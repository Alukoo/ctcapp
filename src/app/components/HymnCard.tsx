import { useState, useEffect } from "react";
import { Heart, Music } from "lucide-react";
import { motion } from "motion/react";
import { Hymn } from "../data/hymns";
import { storage } from "../utils/storage";

interface HymnCardProps {
  hymn: Hymn;
  delay?: number;
  onClick?: () => void;
}

export function HymnCard({ hymn, delay = 0, onClick }: HymnCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(storage.isFavorite(hymn.id));
  }, [hymn.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      storage.removeFavorite(hymn.id);
    } else {
      storage.addFavorite(hymn.id);
    }
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    storage.addRecentlyOpened(hymn.id);
    if (onClick) onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={handleClick}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 truncate">
                {hymn.number}. {hymn.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {hymn.category.slice(0, 2).join(" • ")}
              </p>
            </div>
            <button
              onClick={handleFavoriteClick}
              className="p-2 rounded-full hover:bg-blue-50 transition-colors flex-shrink-0"
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-400"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
