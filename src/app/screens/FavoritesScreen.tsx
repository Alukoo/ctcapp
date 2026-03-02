import React, { useState, useMemo } from "react";
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
import { Heart, Trash2 } from "lucide-react-native";
import { hymns } from "../data/hymns";
import { useFavoritesStore } from "../utils/storage";
import { useNavigation } from "@react-navigation/native";

const FavoritesScreen: React.FC = () => {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigation: any = useNavigation();

  const favoriteHymns = useMemo(() =>
    hymns.filter((hymn) =>
      favorites.includes(hymn.id) &&
      (searchTerm.trim() === "" || hymn.title.toLowerCase().includes(searchTerm.trim().toLowerCase()))
    ),
    [favorites, searchTerm]
  );

  const renderHymn = ({ item }: { item: typeof hymns[number] }) => {
    return (
      <TouchableOpacity
        style={styles.hymnCard}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('HymnDetail', { hymnId: item.id })}
      >
        <View style={styles.hymnContent}>
          <Text style={styles.hymnTitle}>{item.title}</Text>
          {item.author ? (
            <Text style={styles.hymnAuthor}>{item.author}</Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
          style={styles.removeButton}
        >
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.favoritesTitle}>Favorites</Text>
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search favorites..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
        <Text style={styles.countAligned}>
          {favoriteHymns.length} {favoriteHymns.length === 1 ? "hymn" : "hymns"}
        </Text>
        {favoriteHymns.length === 0 ? (
          <View style={styles.emptyState}>
            <Heart size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>
              Add hymns to your favorites to see them here
            </Text>
          </View>
        ) : (
          <FlatList<typeof hymns[number]>
            data={favoriteHymns}
            renderItem={renderHymn}
            keyExtractor={(item: typeof hymns[number]) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.list}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  favoritesTitle: {
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
  countAligned: {
    fontSize: 14,
    color: "#6B7280",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  hymnCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  hymnContent: {
    flex: 1,
  },
  hymnTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  hymnAuthor: {
    fontSize: 13,
    color: "#6B7280",
  },
  removeButton: {
    padding: 8,
    marginLeft: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default FavoritesScreen;
