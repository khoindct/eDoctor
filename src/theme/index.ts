import { createMuiTheme } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";
import defaultTheme from "./default";

import "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface TypeBackground {
    dark?: string;
  }
  interface TypeBackgroundOptions {
    dark?: string;
  }
  // interface Theme {
  //   customShadows?: any;
  // }
  // interface ThemeOptions {
  //   customShadows?: any;
  // }
}

const theme = createMuiTheme({
  ...defaultTheme,
  shadows,
  typography,
});

export default theme;
