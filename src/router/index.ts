import { createWebHistory, RouteRecordRaw } from 'vue-router';
import { createLangRouter } from 'vue-lang-router';

import { localizedURLs, translations } from '@/lang/index';
import { dateTimeFormats, getBrowserLocale, numberFormats } from '@/utils/i18n';

/**
 * --- Vue routes setup ---
 * Set up translations for routes:
 * >- add the route below
 * >- add the name in the @/lang/en/urls.json file
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/downloads',
    name: 'downloads',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: ':pack',
        name: 'downloads-pack',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/addons',
    name: 'addons',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: 'new',
        name: 'addon-new',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'page/:name',
        name: 'addon-page',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: ':pack',
        name: 'addons-per-pack',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/tweaks',
    name: 'tweaks',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: 'new',
        name: 'tweak-new',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: ':pack',
        name: 'tweaks-per-pack',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/modpacks',
    name: 'modpacks',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: 'new',
        name: 'modpack-new',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: ':pack',
        name: 'modpacks-per-pack',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/mods',
    name: 'mods',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: 'new',
        name: 'modpack-new',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: ':pack',
        name: 'mods-per-pack',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    children: [
      {
        path: ':id',
        name: 'profile-of',
        component: () => import('@/views/ProfileView.vue'),
      },
    ],
  },
  {
    path: '/review',
    name: 'review',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: 'addons',
        name: 'addons-review',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'tweaks',
        name: 'tweaks-review',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'modding',
        name: 'modding-review',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/login/callback',
    name: 'login-callback',
    component: () => import('@/views/LoginCallbackView.vue'),
  },
];

// i18n routes adapter (to modify routes to the matching locale equivalent)
const langRouterOptions = {
  defaultLanguage: getBrowserLocale({ countryCodeOnly: true }),
  translations,
  localizedURLs,
  i18nOptions: {
    dateTimeFormats,
    numberFormats,
  },
};

// Vue router options
const routerOptions = {
  routes,
  history: createWebHistory(process.env.BASE_URL), // we don't want the '#' in the routes system
};

const router = createLangRouter(langRouterOptions, routerOptions);

router.beforeEach((to, from, next) => {
  if (to.fullPath.endsWith('/')) next(to.fullPath.slice(0, -1));
  else next();
});

export default router;
