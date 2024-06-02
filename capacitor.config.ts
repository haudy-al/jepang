import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jepang.myapp',
  appName: 'jepang',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '6706918885-j27o0njr2jsb94osijhphk4jc7o129ao.apps.googleusercontent.com',
      androidClientId: "6706918885-j27o0njr2jsb94osijhphk4jc7o129ao.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
