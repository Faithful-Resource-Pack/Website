import { defineStore } from 'pinia';

export default defineStore('errorHandler', {
  state: () => ({
    displayed: false,
    message: '',
    color: 'error',
    timeout: 4000,
  }),
  actions: {
    show(message: string, options?: { stack?: Error, color?: string, timeout?: number }) {
      this.message = message;
      if (options) {
        this.color = options.color || '#222';
        this.timeout = options.timeout || 4000;
        if (options.stack) console.error(options.stack);
      }

      this.displayed = true;
    },
  },
});
