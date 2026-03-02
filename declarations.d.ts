// provide a basic declaration for React Native when types are missing
// if you've installed @types/react-native, you can remove this file later

declare module 'react-native';

declare module '@react-native-masked-view/masked-view' {
  import { ComponentType } from 'react';
  const MaskedView: ComponentType<any>;
  export default MaskedView;
}

declare module 'expo-linear-gradient' {
  import { ComponentType } from 'react';
  interface LinearGradientProps {
    colors: string[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    style?: any;
  }
  export const LinearGradient: ComponentType<LinearGradientProps>;
}

