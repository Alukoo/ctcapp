import { 
  BookOpen, 
  Calendar, 
  Bell, 
  Mic2, 
  Settings, 
  Mail, 
  Users, 
  ChevronRight,
  Info,
  Share2
} from "lucide-react";
import { motion } from "motion/react";

export function ResourcesPage() {
  const resourceSections = [
    {
      title: "Spiritual Resources",
      items: [
        { icon: BookOpen, label: "Bible Readings", color: "from-blue-500 to-blue-600" },
        { icon: Calendar, label: "Order of Service", color: "from-purple-500 to-purple-600" },
        { icon: Mic2, label: "Audio Recordings", color: "from-pink-500 to-pink-600" },
      ],
    },
    {
      title: "Church Information",
      items: [
        { icon: Bell, label: "Announcements", color: "from-orange-500 to-orange-600" },
        { icon: Users, label: "Ministries", color: "from-green-500 to-green-600" },
        { icon: Mail, label: "Contact Us", color: "from-teal-500 to-teal-600" },
      ],
    },
    {
      title: "App Settings",
      items: [
        { icon: Settings, label: "Preferences", color: "from-gray-500 to-gray-600" },
        { icon: Share2, label: "Share App", color: "from-indigo-500 to-indigo-600" },
        { icon: Info, label: "About", color: "from-cyan-500 to-cyan-600" },
      ],
    },
  ];

  const bibleReadings = [
    { date: "Today", reading: "Psalm 23", type: "Morning Prayer" },
    { date: "Tomorrow", reading: "John 15:1-17", type: "Gospel Reading" },
    { date: "Wednesday", reading: "Romans 8:28-39", type: "Evening Devotion" },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Resources
        </h1>
      </motion.div>

      {/* Daily Bible Reading Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 mb-6 text-white shadow-lg"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold mb-3">This Week's Readings</h2>
            <div className="space-y-3">
              {bibleReadings.map((reading, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-xl p-3 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{reading.date}</span>
                    <span className="text-xs opacity-75">{reading.type}</span>
                  </div>
                  <p className="text-lg font-semibold">{reading.reading}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resource Sections */}
      {resourceSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + sectionIndex * 0.1 }}
          className="mb-6"
        >
          <h2 className="text-lg font-bold text-gray-700 mb-3">{section.title}</h2>
          <div className="space-y-2">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + sectionIndex * 0.1 + itemIndex * 0.05 }}
                  className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="flex-1 text-left font-medium text-gray-800">
                      {item.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* App Version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center py-6"
      >
        <p className="text-sm text-gray-400">Church Hymns App</p>
        <p className="text-xs text-gray-300 mt-1">Version 1.0.0</p>
      </motion.div>
    </div>
  );
}
