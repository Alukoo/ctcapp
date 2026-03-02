import { useState, useEffect } from "react";
import { Search, Bell, BookOpen, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { hymns } from "../data/hymns";
import { storage } from "../utils/storage";
import { HymnCard } from "./HymnCard";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentHymns, setRecentHymns] = useState<typeof hymns>([]);

  useEffect(() => {
    const recentIds = storage.getRecentlyOpened();
    const recent = recentIds
      .map((id) => hymns.find((h) => h.id === id))
      .filter(Boolean) as typeof hymns;
    setRecentHymns(recent);
  }, []);

  const announcements = [
    {
      id: "1",
      title: "Easter Service Schedule",
      date: "March 15, 2026",
      preview: "Join us for special services on Easter Sunday at 8 AM and 10:30 AM",
    },
    {
      id: "2",
      title: "Choir Practice Resumes",
      date: "March 5, 2026",
      preview: "Wednesday evenings at 7 PM in the sanctuary. All are welcome!",
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/hymns?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Welcome
          </h1>
          <div className="relative">
            <Bell className="w-6 h-6 text-blue-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>
        <p className="text-gray-600">Monday, March 2, 2026</p>
      </motion.div>

      {/* Daily Verse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 mb-6 text-white shadow-lg"
      >
        <div className="flex items-start gap-3">
          <BookOpen className="w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold mb-1">Daily Verse</p>
            <p className="text-sm leading-relaxed opacity-95 mb-2">
              "For God so loved the world that he gave his one and only Son, that
              whoever believes in him shall not perish but have eternal life."
            </p>
            <p className="text-xs opacity-75">John 3:16</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search hymns by title or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-blue-400 focus:outline-none shadow-sm transition-all"
          />
        </div>
      </motion.div>

      {/* Recently Opened Hymns */}
      {recentHymns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-800">Recently Opened</h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {recentHymns.slice(0, 3).map((hymn, index) => (
              <HymnCard key={hymn.id} hymn={hymn} delay={index * 0.05} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Announcements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-800">Announcements</h2>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + index * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {announcement.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {announcement.preview}
                  </p>
                  <p className="text-xs text-gray-400">{announcement.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
