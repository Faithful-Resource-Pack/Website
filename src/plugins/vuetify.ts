// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// custom theme override here
const light: ThemeDefinition = {
  dark: false,
  colors: {},
};
const dark: ThemeDefinition = {
  dark: true,
  colors: {},
};
const colorblindLight: ThemeDefinition = {
  dark: false,
  colors: {},
};
const colorblindDark: ThemeDefinition = {
  dark: true,
  colors: {},
};

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      colorblindLight,
      colorblindDark,
      light,
      dark,
    },
  },
});
