import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { hymns, categories, languages } from "../data/hymns";
import { HymnCard } from "./HymnCard";

export function HymnsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  const filteredHymns = hymns.filter((hymn) => {
    const matchesSearch =
      searchQuery === "" ||
      hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hymn.number.toString().includes(searchQuery);

    const matchesCategory =
      selectedCategory === "All" || hymn.category.includes(selectedCategory);

    const matchesLanguage =
      selectedLanguage === "All" || hymn.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
          Hymnal
        </h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-blue-400 focus:outline-none shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-400 transition-all shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
          {(selectedCategory !== "All" || selectedLanguage !== "All") && (
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          )}
        </button>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              {/* Categories */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-blue-50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Language
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => setSelectedLanguage(language)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedLanguage === language
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-blue-50"
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          {filteredHymns.length} {filteredHymns.length === 1 ? "hymn" : "hymns"}
        </p>
      </div>

      {/* Hymns List */}
      <div className="space-y-3">
        {filteredHymns.map((hymn, index) => (
          <HymnCard key={hymn.id} hymn={hymn} delay={index * 0.02} />
        ))}
      </div>

      {filteredHymns.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-blue-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No hymns found
          </h3>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filters
          </p>
        </motion.div>
      )}
    </div>
  );
}
