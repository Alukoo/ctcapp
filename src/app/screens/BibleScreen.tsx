
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { bibleBooks } from '../data/bible';

export type BibleStackParamList = {
  BibleList: undefined;
  BibleChapters: { book: string; chapters: number };
  BibleVerses: { book: string; chapter: number };
};

export function BibleListScreen(props: any) {
  const { navigation } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [testament, setTestament] = useState<'Old' | 'New'>('Old');

  // Old and New Testament book names
  const oldTestamentBooks = useMemo(() => [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
  ], []);
  const newTestamentBooks = useMemo(() => [
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
  ], []);

  const filteredBooks = useMemo(() => {
    const books = testament === 'Old' ? oldTestamentBooks : newTestamentBooks;
    return bibleBooks.filter(b =>
      books.includes(b.name) &&
      (searchTerm.trim() === '' || b.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
    );
  }, [searchTerm, testament, bibleBooks, oldTestamentBooks, newTestamentBooks]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7FAFF' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.quoteBox}>
            <Text style={styles.quoteIcon}>“</Text>
            <Text style={styles.quoteText}>One verse a day brings you closer to God</Text>
            <Text style={styles.quoteIconRight}>”</Text>
          </View>
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a book..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, testament === 'Old' && styles.tabActive]}
            onPress={() => setTestament('Old')}
          >
            <Text style={[styles.tabText, testament === 'Old' && styles.tabTextActive]}>Old Testament</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, testament === 'New' && styles.tabActive]}
            onPress={() => setTestament('New')}
          >
            <Text style={[styles.tabText, testament === 'New' && styles.tabTextActive]}>New Testament</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredBooks}
          renderItem={({ item }: { item: { name: string; chapters: number } }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('BibleChapters', { book: item.name, chapters: item.chapters })}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item: { name: string; chapters: number }) => item.name}
          scrollEnabled={false}
          contentContainerStyle={styles.list}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export function BibleChaptersScreen(props: any) {
  const { route, navigation } = props;
  const { book, chapters } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7FAFF' }}>
      <TouchableOpacity style={styles.backArrowButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>
      <FlatList
        data={Array.from({ length: chapters }, (_, i) => i + 1)}
        keyExtractor={(n: number) => n.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: number }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('BibleVerses', { book, chapter: item })}
          >
            <Text style={styles.itemText}>{book} {item}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export function BibleVersesScreen(props: any) {
  const { route, navigation } = props;
  const { book, chapter } = route.params;
  const [loading, setLoading] = React.useState(true);
  const [verses, setVerses] = React.useState<string[]>([]);

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.verses) {
          setVerses(data.verses.map((v: any) => `${v.verse}. ${v.text.trim()}`));
        }
      })
      .catch((err) => console.error('Verse fetch error', err))
      .finally(() => setLoading(false));
  }, [book, chapter]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7FAFF' }}>
      <TouchableOpacity style={styles.backArrowButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>
      <FlatList
        data={verses}
        keyExtractor={(_item: string, idx: number) => idx.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: string }) => <Text style={styles.verseText}>{item}</Text>}
      />
    </SafeAreaView>
  );
}

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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  bibleTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1D6FFF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 18,
    color: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingVertical: 0,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8,
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
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
  list: {
    padding: 20,
  },
  item: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemText: {
    fontSize: 16,
    color: '#1F2937',
  },
  verseText: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
