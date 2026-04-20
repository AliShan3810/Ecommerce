import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));
