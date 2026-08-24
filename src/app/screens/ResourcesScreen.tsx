import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bell, Users, BookOpen, HandCoins, Mail, ChevronRight, Facebook, Twitter, Instagram, Send } from "lucide-react-native";
import { Linking } from "react-native";

export const PrayerRequestScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    setSending(true);
    setSent(false);
    try {
      // Use mailto: to open the user's email client with prefilled fields
      const subject = encodeURIComponent("Prayer Request from " + name);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:ctc@gmail.com?subject=${subject}&body=${body}`;
      await Linking.openURL(mailto);
      setSent(true);
    } catch (e) {
      setSent(false);
    }
    setSending(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAFA', padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: '#8B5CF6', marginBottom: 16 }}>Send a Prayer Request</Text>
      <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>Name</Text>
      <View style={{ backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 12 }}>
        <TextInput
          style={{ fontSize: 16, padding: 10, color: '#222' }}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
      </View>
      <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>Email</Text>
      <View style={{ backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 12 }}>
        <TextInput
          style={{ fontSize: 16, padding: 10, color: '#222' }}
          value={email}
          onChangeText={setEmail}
          placeholder="Your Email"
          keyboardType="email-address"
        />
      </View>
      <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>Prayer Request</Text>
      <View style={{ backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16 }}>
        <TextInput
          style={{ fontSize: 16, padding: 10, color: '#222', minHeight: 80, textAlignVertical: 'top' }}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your prayer request here..."
          multiline
        />
      </View>
      <TouchableOpacity
        onPress={handleSend}
        style={{ backgroundColor: '#8B5CF6', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginBottom: 12 }}
        disabled={sending || !name || !email || !message}
      >
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>{sending ? 'Sending...' : 'Send Prayer Request'}</Text>
      </TouchableOpacity>
      {sent && (
        <Text style={{ color: '#22C55E', fontSize: 16, textAlign: 'center' }}>Prayer request ready to send in your email app.</Text>
      )}
    </View>
  );
};


const cardData = [
  {
    id: 1,
    title: "Order of Service",
    icon: <BookOpen color="#fff" size={24} />, // blue
    iconBg: "#1D6FFF",
    route: "OrderOfService",
  },
  {
    id: 2,
    title: "Announcements",
    icon: <Bell color="#fff" size={24} />, // orange
    iconBg: "#FF6B00",
    route: "Announcements",
  },
  {
    id: 3,
    title: "Offering & Tithe",
    icon: <HandCoins color="#fff" size={24} />, // gold
    iconBg: "#FFD600",
    route: "OfferingTithe",
  },
    {
    id: 5,
    title: "Send a Prayer Request",
    icon: <Send color="#fff" size={24} />, // purple
    iconBg: "#8B5CF6",
    route: "PrayerRequest",
  },
  {
    id: 4,
    title: "Contact Us",
    icon: <Mail color="#fff" size={24} />, // green
    iconBg: "#22C55E",
    route: "ContactUs",
  },
];

const ResourcesScreen: React.FC = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingVertical: 24 }}>
        <View style={styles.cardsWrapper}>
          {cardData.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(card.route)}
            >
              <View style={[styles.iconBox, { backgroundColor: card.iconBg }]}> {card.icon} </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <ChevronRight color="#9CA3AF" size={22} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
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
  },
  cardsWrapper: {
    paddingHorizontal: 12,
    gap: 18,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  chevron: {
    fontSize: 22,
    color: '#9CA3AF',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

// Placeholder screens for each card
export const OrderOfServiceScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#FAFAFA', padding: 24 }}>
    <Text style={{ fontSize: 22, fontWeight: '700', color: '#1D6FFF', marginBottom: 16 }}>Order of Service</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>1. Opening Hymn</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>2. Opening Prayer</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>3. Praise & Worship</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>4. Bible Reading</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>5. Sermon</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>6. Offering & Tithe</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>7. Announcements</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>8. Closing Hymn</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>9. Closing Prayer</Text>
  </View>
);

export const AnnouncementsScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#FAFAFA', padding: 24 }}>
    <Text style={{ fontSize: 22, fontWeight: '700', color: '#FF6B00', marginBottom: 16 }}>Announcements</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 12 }}>- Youth fellowship meets every Friday at 6pm.</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 12 }}>- Women's prayer meeting: Wednesdays at 5pm.</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 12 }}>- Next Sunday is Holy Communion service.</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 12 }}>- Volunteers needed for the outreach program.</Text>
  </View>
);

export const OfferingTitheScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#FAFAFA', padding: 24 }}>
    <Text style={{ fontSize: 22, fontWeight: '700', color: '#FFD600', marginBottom: 16 }}>Offering & Tithe</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 12 }}>You can give your offering and tithe via:</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>Bank: FCMB</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>Account Name: Christ Triumphant Church </Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>Account Number: 0300321011</Text>
    <Text style={{ fontSize: 16, color: '#222', marginTop: 16 }}>Thank you for your generosity!</Text>
  </View>
);

export const ContactUsScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#FAFAFA', padding: 24 }}>
    <Text style={{ fontSize: 22, fontWeight: '700', color: '#22C55E', marginBottom: 16 }}>Contact Us</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>Curvy Church</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>123 Faith Avenue</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>Lagos, Nigeria</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>Phone: +234 800 000 0000</Text>
    <Text style={{ fontSize: 16, color: '#222', marginBottom: 8 }}>Email: info@curvychurch.org</Text>
    <Text style={{ fontSize: 16, color: '#222', marginTop: 16, marginBottom: 16 }}>We'd love to hear from you!</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 8 }}>
      <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/curvychurch')} accessibilityLabel="Facebook">
        <Facebook color="#1877F3" size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/curvychurch')} accessibilityLabel="Twitter">
        <Twitter color="#1DA1F2" size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/curvychurch')} accessibilityLabel="Instagram">
        <Instagram color="#E1306C" size={32} />
      </TouchableOpacity>
    </View>
  </View>
);

export default ResourcesScreen;
