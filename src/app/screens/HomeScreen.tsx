import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BookOpen } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// define the param list used by the bottom tabs
export type TabParamList = {
  Home: undefined;
  Hymns: undefined;
  Bible: undefined;
  Favorites: undefined;
  Resources: undefined;
};

// list of verses used for the "verse of the day"
const verseList = [
  "John 3:16",
  "Psalm 23:1",
  "Romans 8:28",
  "Philippians 4:13",
  "Proverbs 3:5-6",
  "Isaiah 41:10",
  "Matthew 6:33",
  "Jeremiah 29:11",
  "1 Corinthians 13:4-5",
  "Ephesians 2:8-9",
];

const churchEvents = [
  {
    id: "1",
    title: "Youth Service",
    image: "https://res.cloudinary.com/dh7qppo6t/image/upload/v1772461057/WhatsApp_Image_2026-03-01_at_18.59.56_abfxrn.jpg",
  },
  {
    id: "2",
    title: "Choir Performance",
    image: "https://res.cloudinary.com/dh7qppo6t/image/upload/v1772461057/WhatsApp_Image_2026-03-01_at_18.59.40_gyhq00.jpg",
  },
  {
    id: "3",
    title: "Bible Reading",
    image: "https://res.cloudinary.com/dh7qppo6t/image/upload/v1772461057/WhatsApp_Image_2026-03-01_at_18.55.27_uycloj.jpg",
  },
  {
    id: "4",
    title: "Youth Service",
    image: "https://res.cloudinary.com/dh7qppo6t/image/upload/v1772461058/WhatsApp_Image_2026-03-01_at_18.55.25_zhjm41.jpg",
  },
];

const announcements = [
  {
    id: "1",
    title: "Easter Service Schedule",
    description: "Join us for special services on Easter Sunday at 8 AM and 10:30 AM",
    date: "March 15, 2026",
  },
  {
    id: "2",
    title: "Choir Practice Resumes",
    description: "Wednesday evenings at 7 PM in the sanctuary. All are welcome!",
    date: "March 5, 2026",
  },
];


const HomeScreen = () => {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const [dailyVerse, setDailyVerse] = React.useState<{ text: string; reference: string }>({
    text: "",
    reference: "",
  });

  // determine which verse corresponds to today and fetch it
  React.useEffect(() => {
    const dayIndex = Math.floor(Date.now() / 86400000) % verseList.length;
    const ref = verseList[dayIndex];

    fetch(`https://bible-api.com/${encodeURIComponent(ref)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.text) {
          setDailyVerse({ text: data.text.trim(), reference: ref });
        }
      })
      .catch((err) => console.error("Bible API error", err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <MaskedView
            maskElement={
              <Text style={[styles.title, { backgroundColor: 'transparent' }]}>Welcome</Text>
            }
          >
            <View style={styles.gradientText}>
              <LinearGradient
                colors={["#1756A9", "#4A90E2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </View>
          </MaskedView>
          <Text style={styles.date}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        <View style={styles.dailyVerseContainer}>
          <LinearGradient
            colors={["#1756A9", "#003366"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.verseIconContainer}>
            <BookOpen color="#FFFFFF" size={28} />
          </View>
          <Text style={styles.verseTitle}>Daily Verse</Text>
          <Text style={styles.verseText}>
            {dailyVerse.text || "Loading verse..."}
          </Text>
          <Text style={styles.verseReference}>{dailyVerse.reference}</Text>
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.eventsSectionTitle}>Church Events</Text>
          <FlatList
            data={churchEvents}
            renderItem={({ item }: { item: { id: string; title: string; image: string } }) => (
              <View style={styles.eventCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                <View style={styles.eventOverlay}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item: { id: string }) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={styles.eventsList}
          />
        </View>

        <View style={styles.announcementsSection}>
          <View style={styles.announcementsHeader}>
            <Text style={styles.announcementsTitle}>Announcements</Text>
          </View>
          {announcements.map((announcement) => (
            <View key={announcement.id} style={styles.announcementCard}>
              <View style={styles.announcementDot} />
              <View style={styles.announcementContent}>
                <Text style={styles.announcementCardTitle}>{announcement.title}</Text>
                <Text style={styles.announcementDescription}>{announcement.description}</Text>
                <Text style={styles.announcementDate}>{announcement.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  gradientContainer: {
    paddingVertical: 4,
    marginBottom: 8,
    borderRadius: 8,
  },
  gradientText: {
    height: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 0,
  },
  date: {
    fontSize: 16,
    color: "#6B7280",
  },
  dailyVerseContainer: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 30,
    alignItems: "flex-start",
    minHeight: 140,
  },
  verseIconContainer: {
    marginBottom: 12,
  },
  verseTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  verseText: {
    fontSize: 15,
    color: "#FFFFFF",
    textAlign: "left",
    marginBottom: 12,
    lineHeight: 22,
  },
  verseReference: {
    fontSize: 13,
    color: "#E0E7FF",
    fontWeight: "500",
  },

  grid: {
    gap: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  announcementsSection: {
    marginBottom: 30,
  },
  announcementsHeader: {
    marginBottom: 16,
  },
  announcementsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  announcementCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "flex-start",
  },
  announcementDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1756A9",
    marginRight: 12,
    marginTop: 4,
    flexShrink: 0,
  },
  announcementContent: {
    flex: 1,
  },
  announcementCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  announcementDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  eventsSection: {
    marginBottom: 30,
  },
  eventsSectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  eventsList: {
    paddingRight: 20,
  },
  eventCard: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    width: 280,
    height: 180,
  },
  eventImage: {
    width: "100%",
    height: "100%",
  },
  eventOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default HomeScreen;
