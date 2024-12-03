<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Pruebas unitaria 2
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h3 class="h3">
          {{ msg }}
        </h3>

        <v-btn color="primary" @click="openActions = true">
          1er Test
        </v-btn>
      </v-col>
    </v-row>

    <app-actions v-model="openActions" />
  </v-container>
</template>

<script>
import AppActions from "@/components/app/AppActions.vue"

export default {
  name: 'HelloWorld',

  props: {
    msg: String
  },

  components: { AppActions },

  data: () => ({
    openActions: false,
  }),
}
</script>
