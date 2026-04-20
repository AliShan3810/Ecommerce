module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-native-svg|native-base|@react-native-aria/.*|@react-stately/.*|@internationalized/.*|@react-navigation/.*|react-native-curved-bottom-bar|react-native-size-scaling)',
  ],
};
