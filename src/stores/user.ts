import { defineStore } from 'pinia';
import { Router } from 'vue-router';

interface User {
  id: number | null;
  username: string
  token: {
    access: string | null;
    refresh: string | null;
    expires: number | null;
  };
}

const defaultUser: User = {
  id: null,
  username: '',
  token: {
    access: '',
    refresh: '',
    expires: 0,
  },
};

const CLIENT_ID = process.env.VUE_APP_OAUTH2_ID;
const CLIENT_TOKEN = process.env.VUE_APP_OAUTH2_TOKEN;
const REDIRECT_URI = `${process.env.VUE_APP_BASE_URL}login/callback`;

export default defineStore('user', {
  state: () => defaultUser,
  actions: {
    isUserLoggedIn(): boolean {
      return this.token.expires !== null && this.token.expires > Date.now();
    },
    logout(router: Router): void {
      this.token.expires = 0;
      localStorage.setItem('token', '{}');
      router.push('/');
    },
    login(): void {
      this.token = JSON.parse(
        localStorage.getItem('token') || '{ "access": null, "refresh": null, "expires": null}',
      );

      if (!this.token.expires || this.token.expires <= Date.now()) {
        window.location.replace(`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&scope=identify&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`);
      }
    },
    refresh(): void {
      this.token = JSON.parse(localStorage.getItem('token') || '{ "access": null, "refresh": null, "expires": null}');
      if (!this.token.refresh) return; // No refresh token, can't refresh
      if (this.token.expires && this.token.expires > Date.now()) return; // Token is still valid

      const params = new URLSearchParams();
      params.append('client_id', CLIENT_ID || '');
      params.append('client_secret', CLIENT_TOKEN || '');
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', this.token.refresh);

      fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: params,
      })
        .then((response) => response.json())
        .then((json) => {
          this.token.access = json.access_token;
          this.token.refresh = json.refresh_token;
          this.token.expires = Date.now() + json.expires_in * 1000;
        })
        .catch((err) => console.error(err));
    },
    auth(router: Router): void {
      const params = new URLSearchParams();
      params.append('client_id', CLIENT_ID || '');
      params.append('client_secret', CLIENT_TOKEN || '');
      params.append('grant_type', 'authorization_code');
      params.append('code', router.currentRoute.value.query.code as string);
      params.append('redirect_uri', REDIRECT_URI);
      params.append('scope', 'identify');

      fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: params,
      })
        .then((response) => response.json())
        .then((json) => {
          this.token.access = json.access_token;
          this.token.refresh = json.refresh_token;
          this.token.expires = Date.now() + json.expires_in * 1000;

          localStorage.setItem('token', JSON.stringify(this.token));
        })
        .finally(() => {
          router.push('/');
        });
    },
  },
});
