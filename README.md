# Curvy Church App - React Native

This is a React Native mobile app built with Expo for discovering, managing, and sharing hymns with a church community.

## Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main app component with navigation
│   ├── screens/                # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── HymnsScreen.tsx
│   │   ├── FavoritesScreen.tsx
│   │   └── ResourcesScreen.tsx
│   ├── data/
│   │   └── hymns.ts            # Hymns database
│   └── utils/
│       └── storage.ts          # State management with Zustand
├── styles/
│   └── tailwind.css            # Tailwind CSS styles
└── main.tsx                    # Not used in React Native (kept for reference)
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Expo CLI globally (optional but recommended):**
   ```bash
   npm install -g expo-cli
   ```

## Running the App

### Development Mode
```bash
npm start
```

This will start the Expo development server. You can then:
- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Scan the QR code with Expo Go app on your physical device

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web (Preview only)
```bash
npm run web
```

## Features

- 📖 Browse a collection of hymns
- ❤️ Save favorite hymns
- 🔍 Search hymns by title or author
- 📚 Access resources and educational materials
- 📱 Mobile-first responsive design
- 🎨 Clean, modern UI with Tailwind CSS

## Technology Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build system
- **React Navigation** - Native navigation library
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling (via NativeWind)
- **Lucide React Native** - Beautiful icons
- **TypeScript** - Type safety

## Original Design

The original project design is available at https://www.figma.com/design/F1zTlJ4rM5x2wq8G4WYIaP/Curvy-Church-App-Design

## Development

### Code Style
- TypeScript for type safety
- Functional components with hooks
- ESNext module syntax

### State Management
The app uses Zustand for state management, specifically for managing:
- Favorite hymns
- Recently opened hymns

### Styling
The app uses React Native's built-in styling API. Tailwind CSS classes can be used via NativeWind if needed, but native styles are preferred for React Native.

## Building for Production

```bash
npm run build
```

This will create optimized production builds for iOS and Android through the Expo build service.

## Troubleshooting

### Metro bundler issues
If you encounter bundler issues, clear cache:
```bash
npx expo start --clear
```

### Module resolution issues
Make sure all dependencies are installed:
```bash
npm install
```

And clear node_modules if needed:
```bash
rm -rf node_modules
npm install
```

## License

The original Figma design is the source of this project. All modifications and code are provided as-is.
