<template>
<v-card>
  <v-card-title class="justify-center">
    {{ $t(`login_page.titles.${type}`) }}
  </v-card-title>
  <v-card-text>
    <v-form
      v-model="validForm"
      lazy-validation
    >
      <v-text-field
        v-model="form.login"
        :rules="rules.login"
        label="Email"
        prepend-icon="mdi-account-circle"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :rules="rules.password"
        label="Password"
        :prepend-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:prepend="showPassword = !showPassword"
      ></v-text-field>
      <v-text-field
        v-if="type === 'sign-up'"
        v-model="form.confirmPassword"
        :rules="rules.confirmPassword"
        label="Password confirmation"
        :prepend-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showConfirmPassword ? 'text' : 'password'"
        @click:prepend="showConfirmPassword = !showConfirmPassword"
      ></v-text-field>
    </v-form>
  </v-card-text>
  <v-card-text
    v-if="type === 'sign-in'"
  >
    <v-row class="justify-center mt-2 mb-2">
      <localized-link to="/reset-password">Forgot Password</localized-link>
    </v-row>
  </v-card-text>
  <v-card-actions class="justify-center">
    <v-btn class="bg-tertiary" @click="$router.go(-1)">{{ $t('buttons.go_back') }}</v-btn>
    <v-btn class="bg-secondary" @click="''">{{ $t('buttons.submit') }}</v-btn>
  </v-card-actions>
</v-card>
</template>

<style lang="scss">
.v-card {
  max-width: 500px;
  width: 100%;
  margin: auto auto;
  padding-bottom: 10px;
  &-text {
    padding: 0 20px;
  }
  &-title {
    text-transform: uppercase;
  }
}

.v-input__details {
  margin-bottom: 2px;
}

.v-text-field {
  margin: 10px 0;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import localizePath from '@/utils/i18n/localizePath';
import documentStore from '@/stores/document';
import userStore from '@/stores/user';
import errorHandlerStore from '@/stores/errorHandler';

interface Data {
  type: 'sign-in' | 'sign-up';
  form: {
    login: string;
    password: string;
    confirmPassword: string;
  };
  rules: {
    login: Array<(input: string) => string | true>;
    password: Array<(input: string) => string | true>;
    confirmPassword: Array<(input: string) => string | true>;
  },
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export default defineComponent({
  name: 'LoginPage',
  data() {
    const data: Data = {
      type: 'sign-in',
      form: {
        login: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        login: [
          (input: string) => !!input || 'The login is required',
          (input: string) => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input) || 'Login must be an email',
        ],
        password: [
          (input: string) => !!input || 'The password is required',
          (input: string) => input.length >= 6 || 'The password must be at least 6 characters',
        ],
        confirmPassword: [
          (input: string) => !!input || 'The password is required',
          (input: string) => this.checkPasswords(input) || 'The passwords do not match',
        ],
      },
      showPassword: false,
      showConfirmPassword: false,
    };

    return data;
  },
  setup() {
    const doc = documentStore();
    const user = userStore();
    const errorHandler = errorHandlerStore();
    return { doc, user, errorHandler };
  },
  computed: {
    validForm() {
      return true;
    },
  },
  mounted() {
    if (this.user.isUserLoggedIn()) {
      this.$router.push(localizePath(`/profile/${this.user.username.toLowerCase()}`, this.$i18n.locale, this.$route.path, this.$router));
      this.errorHandler.show('You are already logged in', { color: 'error' });
    }

    this.type = this.$router.currentRoute.value.name as Data['type'];
    this.doc.setPageTitle(this.$t(`login_page.titles.${this.type}`));
  },
  methods: {
    checkPasswords(input: string) {
      return this.form.password === input;
    },
  },
});
</script>
