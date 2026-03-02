import { useState, useEffect } from "react";
import { Heart, Clock } from "lucide-react";
import { motion } from "motion/react";
import { hymns } from "../data/hymns";
import { storage } from "../utils/storage";
import { HymnCard } from "./HymnCard";

export function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<"favorites" | "recent">("favorites");
  const [favoriteHymns, setFavoriteHymns] = useState<typeof hymns>([]);
  const [recentHymns, setRecentHymns] = useState<typeof hymns>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const favoriteIds = storage.getFavorites();
    const favorites = favoriteIds
      .map((id) => hymns.find((h) => h.id === id))
      .filter(Boolean) as typeof hymns;
    setFavoriteHymns(favorites);

    const recentIds = storage.getRecentlyOpened();
    const recent = recentIds
      .map((id) => hymns.find((h) => h.id === id))
      .filter(Boolean) as typeof hymns;
    setRecentHymns(recent);
  };

  const currentHymns = activeTab === "favorites" ? favoriteHymns : recentHymns;

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
          My Collection
        </h1>

        {/* Tab Switcher */}
        <div className="bg-gray-100 rounded-2xl p-1 flex">
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              activeTab === "favorites"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Favorites</span>
            {favoriteHymns.length > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === "favorites"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {favoriteHymns.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("recent")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
              activeTab === "recent"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Recent</span>
            {recentHymns.length > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === "recent"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {recentHymns.length}
              </span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Content */}
      {currentHymns.length > 0 ? (
        <div className="space-y-3">
          {currentHymns.map((hymn, index) => (
            <HymnCard
              key={hymn.id}
              hymn={hymn}
              delay={index * 0.03}
              onClick={loadData}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-4">
            {activeTab === "favorites" ? (
              <Heart className="w-12 h-12 text-blue-400" />
            ) : (
              <Clock className="w-12 h-12 text-blue-400" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {activeTab === "favorites"
              ? "No favorites yet"
              : "No recent hymns"}
          </h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            {activeTab === "favorites"
              ? "Tap the heart icon on any hymn to add it to your favorites"
              : "Hymns you open will appear here for quick access"}
          </p>
        </motion.div>
      )}
    </div>
  );
}
