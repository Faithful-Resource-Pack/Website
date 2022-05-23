import { defineStore } from 'pinia';

export default defineStore('document', {
  state: () => ({
    title: 'Faithful',
  }),
  actions: {
    setPageTitle(str: string) {
      this.title = `${str} - Faithful`;
      this.updateTitle();
    },
    resetPageTitle() {
      this.title = 'Faithful';
      this.updateTitle();
    },
    updateTitle() {
      document.title = this.title;
    },
  },
});
