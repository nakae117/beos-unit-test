import { defineConfig } from '@vue/cli-service';

export default defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: (config) => {
    config.resolve.extensions.add('.ts').add('.tsx').add('.vue');

    // Asegurar que todas las dependencias usen la misma instancia de Vue
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
  },
});