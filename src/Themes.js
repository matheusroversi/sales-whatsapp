import { createTheme } from "@material-ui/core/styles";
import { pink, blue, red, black, white } from "@material-ui/core/colors";

import storage from "./core/app/storage/AppStorage";

export const THEMES = {
  light: "light",
  dark: "dark"
};

export const toggleTheme = currentTheme => {
  const { light, dark } = THEMES;

  const newTheme = currentTheme === light ? dark : light;

  return newTheme;
};

export const getDefaultTheme = () => {
  const { dark, light } = THEMES;
  /* try {
    return window.matchMedia("(prefers-color-scheme: dark)").match
      ? dark
      : light;
  } catch (e) {
    return light;
  } */

  return dark;
};

/**
 * @deprecated This function is temporary while login is isolated.
 */
export const isDarkTheme = () => {
  let theme;
  try {
    theme = storage.getTheme();
  } catch (e) {}

  if (!theme) {
    theme = getDefaultTheme();
  }

  return theme === THEMES.dark;
};

export default {
  [THEMES.light]: createTheme({
    palette: {
      primary: {
        main: "#000000"
      },
      secondary: {
        main: "#da641f"
      }
    }
  }),
  [THEMES.dark]: createTheme({
    palette: {
      primary: { main: "#000000" },
      secondary: { main: "#ffffff" },
      type: "dark"
    }
  })
};
