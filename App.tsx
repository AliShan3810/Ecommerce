/**
 * @format
 */

import { enableScreens } from 'react-native-screens';
import { NativeBaseProvider } from 'native-base';
import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SimpleTopToastProvider } from './src/components/SimpleTopToast';
import { CartProvider } from './src/context/CartContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { appTheme } from './src/theme/nativeBaseTheme';

enableScreens(true);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={appTheme}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <SimpleTopToastProvider>
          <CartProvider>
            <View style={{ flex: 1 }}>
              <AppNavigator />
            </View>
          </CartProvider>
        </SimpleTopToastProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

export default App;
