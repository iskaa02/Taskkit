let packageName = "com.iskaa.taskkit";
let name = "Taskkit";
let plugins = [
  ["expo-notifications", { icon: "./src/assets/notification-icon.png" }],
];
if (process.env.PROFILE === "development") {
  packageName += ".dev";
  name += " Dev";
}
export default {
  plugins,
  name,
  slug: "Taskkit",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/icon.png",
  scheme: "taskkit",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./src/assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#174582",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: packageName,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/adaptive-icon.png",
      backgroundColor: "#174582",
    },
    icon: "./src/assets/android-icon.png",
    package: packageName,
    jsEngine: "hermes"
  }
};
