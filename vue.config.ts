import { defineConfig } from '@vue/cli-service';

export default defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: (config) => {
    config.resolve.extensions.add('.ts').add('.tsx').add('.vue');
  },
})
