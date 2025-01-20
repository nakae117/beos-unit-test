<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/students.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Registro de Estudiantes
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <v-btn color="primary" @click="openActions = true">
          Crear Estudiante
        </v-btn>
      </v-col>
    </v-row>

    <app-actions v-model="openActions" />
  </v-container>
</template>

<script lang="ts">


export default {
  name: 'StudentModule',

  props: {
    msg: String
  },

  data: () => ({
    openActions: false,
  }),
}
</script>
