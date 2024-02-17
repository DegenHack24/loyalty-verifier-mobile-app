import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'loyalty.verifier.mobile.app',
  appName: 'loyalty-verifier-mobile-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
