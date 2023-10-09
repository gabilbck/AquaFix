import React from "react";
import { PaperProvider } from "react-native-paper";
import RootNavigation from "./src";
import { themeDark, themeLight } from "./src/utils/theme";
import { useColorScheme } from "react-native";

/**
 * @function App
 * @author Adriano Ramos <adriano.ramos3208@gmail.com>
 * @since 0.1.0
 *
 * @description app função que
 * realiza a navegação entre as telas
 * @param {Object} navigation Objeto de navegação
 * @export {Function} App
 * @return {React.Component}
 */
export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? themeLight : themeDark;

  return (
    <PaperProvider theme={theme}>
      <RootNavigation />
    </PaperProvider>
  );
}
