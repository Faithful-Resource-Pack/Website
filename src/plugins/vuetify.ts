// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import backgroundLight from '@/assets/images/backgrounds/light.png';
import backgroundDark from '@/assets/images/backgrounds/dark.png';
import foregroundLight from '@/assets/images/foregrounds/light.png';
import foregroundDark from '@/assets/images/foregrounds/dark.png';

// custom theme override here
const light: ThemeDefinition = {
  dark: false,
  colors: {},
  variables: {
    'background-image': `url(${backgroundLight})`,
    'foreground-image': `url(${foregroundLight})`,
  },
};
const dark: ThemeDefinition = {
  dark: true,
  colors: {},
  variables: {
    'background-image': `url(${backgroundDark})`,
    'foreground-image': `url(${foregroundDark})`,
  },
};
const colorblindLight: ThemeDefinition = {
  dark: false,
  colors: {},
  variables: {
    'background-image': `url(${backgroundLight})`,
    'foreground-image': `url(${foregroundLight})`,
  },
};
const colorblindDark: ThemeDefinition = {
  dark: true,
  colors: {},
  variables: {
    'background-image': `url(${backgroundDark})`,
    'foreground-image': `url(${foregroundDark})`,
  },
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
