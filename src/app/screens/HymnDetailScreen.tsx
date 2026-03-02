
import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { hymns } from "../data/hymns";
import { useNavigation } from "@react-navigation/native";

const HymnDetailScreen = (props: any) => {
  const { route, navigation } = props;
  const { hymnId } = route.params;
  const hymn = hymns.find((h) => h.id === hymnId);
  const [activeTab, setActiveTab] = useState<'English' | 'Yoruba'>(hymn?.language === 'Yoruba' ? 'Yoruba' : 'English');

  if (!hymn) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Hymn not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backArrowButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>{hymn.number}. {hymn.title}</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'English' && styles.tabActive]}
            onPress={() => setActiveTab('English')}
          >
            <Text style={[styles.tabText, activeTab === 'English' && styles.tabTextActive]}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Yoruba' && styles.tabActive]}
            onPress={() => setActiveTab('Yoruba')}
          >
            <Text style={[styles.tabText, activeTab === 'Yoruba' && styles.tabTextActive]}>Yoruba</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.lyricsBox}>
        <Text style={styles.lyrics}>
          {activeTab === 'English'
            ? hymn.lyrics
            : hymn.lyricsYoruba || hymn.lyrics || 'No Yoruba version available.'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  backArrowButton: {
    marginTop: 16,
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  backArrowText: {
    color: '#1D6FFF',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 28,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D6FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8,
    justifyContent: 'center',
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
  },
  tabActive: {
    backgroundColor: '#1D6FFF',
  },
  tabText: {
    color: '#1D6FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  tabTextActive: {
    color: '#fff',
  },
  lyricsBox: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  lyrics: {
    fontSize: 16,
    color: '#222',
    lineHeight: 26,
  },
  notFound: {
    fontSize: 18,
    color: '#B91C1C',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default HymnDetailScreen;
