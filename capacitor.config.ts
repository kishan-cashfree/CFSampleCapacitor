import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'CF Sample Capacitor',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#ffffff',
      overlaysWebView: false
    },
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: true,
      statusBarColor: '#ffffff',
      statusBarStyle: 'Dark',
      offset: 0
    }
  }
};

export default config;
