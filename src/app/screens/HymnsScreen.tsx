
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import { Heart } from "lucide-react-native";
import { hymns } from "../data/hymns";
import { useFavoritesStore } from "../utils/storage";
import { useNavigation } from "@react-navigation/native";

const HymnsScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { favorites, toggleFavorite } = useFavoritesStore();

  // Safe categories extraction (handles undefined / string / array)
  const allCategories = useMemo(() => {
    const cats = hymns.flatMap((h) => {
      const c = (h as any).category;
      if (!c) return [];
      return Array.isArray(c) ? c : [c];
    });
    return Array.from(new Set(cats)).sort();
  }, []);

  const filteredHymns = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();

    return hymns.filter((hymn) => {
      const titleMatch =
        s === "" || hymn.title.toLowerCase().includes(s) || hymn.number.toString().includes(s);

      const hymnCatsRaw = (hymn as any).category;
      const hymnCats = !hymnCatsRaw
        ? []
        : Array.isArray(hymnCatsRaw)
        ? hymnCatsRaw
        : [hymnCatsRaw];

      const categoryMatch = !selectedCategory || hymnCats.includes(selectedCategory);

      return titleMatch && categoryMatch;
    });
  }, [searchTerm, selectedCategory]);

  const renderHymn = ({ item }: { item: (typeof hymns)[number] }) => {
    const isFavorite = favorites.includes(item.id);

    const itemCatsRaw = (item as any).category;
    const itemCats = !itemCatsRaw ? [] : Array.isArray(itemCatsRaw) ? itemCatsRaw : [itemCatsRaw];

    return (
      <TouchableOpacity
        style={styles.hymnCard}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('HymnDetail', { hymnId: item.id })}
      >
        <View style={styles.hymnIconBox}>
          <View style={styles.hymnIconBadge}>
            <Text style={styles.musicIcon}>🎵</Text>
          </View>
        </View>

        <View style={styles.hymnContent}>
          <Text style={styles.hymnTitle}>
            {item.number}. {item.title}
          </Text>
          <Text style={styles.hymnSubtitle}>{itemCats.slice(0, 2).join(" • ")}</Text>
        </View>

        <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
          <Heart
            size={22}
            color={isFavorite ? "#1D6FFF" : "#D1D5DB"}
            fill={isFavorite ? "#1D6FFF" : "none"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Removed Hymnal header as requested */}
        <View style={styles.quoteBox}>
          <Text style={styles.quoteIcon}>“</Text>
          <Text style={styles.quoteText}>Singing hymns uplifts the soul and unites the church</Text>
          <Text style={styles.quoteIconRight}>”</Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by title or number..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowCategoryFilter((v) => !v)}
          activeOpacity={0.8}
        >
          <Text style={styles.filterIcon}>🧩</Text>
          <Text style={styles.filterText}>
            {selectedCategory ? selectedCategory : "Filter by Category"}
          </Text>
        </TouchableOpacity>

        {showCategoryFilter && (
          <View style={styles.filterDropdown}>
            <TouchableOpacity
              style={[
                styles.filterDropdownItem,
                !selectedCategory && styles.filterDropdownItemActive,
              ]}
              onPress={() => {
                setSelectedCategory(null);
                setShowCategoryFilter(false);
              }}
            >
              <Text style={styles.filterDropdownText}>All Categories</Text>
            </TouchableOpacity>

            {allCategories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterDropdownItem,
                  selectedCategory === cat && styles.filterDropdownItemActive,
                ]}
                onPress={() => {
                  setSelectedCategory(cat);
                  setShowCategoryFilter(false);
                }}
              >
                <Text style={styles.filterDropdownText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.hymnCount}>{filteredHymns.length} hymns</Text>

        <FlatList
          data={filteredHymns}
          renderItem={renderHymn}
          keyExtractor={(item: import("../data/hymns").Hymn) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.list}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F6FA',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 6,
  },
  quoteIcon: {
    fontSize: 28,
    color: '#1D6FFF',
    fontWeight: 'bold',
    marginRight: 2,
  },
  quoteText: {
    fontSize: 16,
    color: '#1F2937',
    fontStyle: 'italic',
    flex: 1,
    textAlign: 'center',
  },
  quoteIconRight: {
    fontSize: 28,
    color: '#1D6FFF',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#F7FAFF",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },

  hymnalTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1D6FFF",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 8,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  searchIcon: {
    fontSize: 18,
    color: "#9CA3AF",
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    paddingVertical: 0,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  filterIcon: {
    fontSize: 16,
    color: "#1D6FFF",
    marginRight: 6,
  },

  filterText: {
    fontSize: 15,
    color: "#1D6FFF",
    fontWeight: "600",
  },

  filterDropdown: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 8,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  filterDropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  filterDropdownItemActive: {
    backgroundColor: "#E0EDFF",
  },

  filterDropdownText: {
    fontSize: 15,
    color: "#1D6FFF",
    fontWeight: "500",
  },

  hymnCount: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 24,
    marginBottom: 8,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  hymnCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },

  hymnIconBox: {
    marginRight: 12,
  },

  hymnIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#1D6FFF",
    alignItems: "center",
    justifyContent: "center",
  },

  musicIcon: {
    fontSize: 24,
    color: "#fff",
  },

  hymnContent: {
    flex: 1,
  },

  hymnTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },

  hymnSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  favoriteButton: {
    padding: 8,
    marginLeft: 12,
  },
});

export default HymnsScreen;