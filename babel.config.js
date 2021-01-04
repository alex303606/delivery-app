module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@interfaces': './src/interfaces/index.ts',
          '@screens': './src/screens/index.ts',
          '@components': './src/components/index.ts',
          '@navigators': './src/navigators/index.ts',
          '@utils': './src/utils/index.ts',
          '@config': './src/config/index.ts',
          '@hooks': './src/hooks/index.ts',
          '@actions': './src/store/actions/index.ts',
          '^@assets/(.+)': './assets/\\1',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
