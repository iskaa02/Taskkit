module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],

    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      [
        "module-resolver",
        {
          root: ["."],
          alias: { "@": "./src" },
        },
      ],
      "react-native-reanimated/plugin"
    ],
  };
};
