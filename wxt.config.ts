import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  manifest: {
    permissions: ['activeTab', 'scripting', 'cookies', 'tabs', 'storage'],
    host_permissions: ["https://b40f-103-122-142-236.ngrok-free.app/*"],

  }
});
