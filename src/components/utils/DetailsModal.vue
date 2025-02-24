<template>
  <!-- Colocar el If para que la prueba pueda verificar correctamente que esta o no el modal -->
  <v-dialog v-if="dialog" v-model="dialog" scrollable persistent :width="width">
    <v-card class="justify-center">
      <v-icon class="icon-close" small @click="close"> close </v-icon>

      <v-card-title class="d-flex justify-start">
        <h5>{{ title }}</h5>
      </v-card-title>

      <div class="d-flex flex-column px-6 py-4">
        <span> <strong>Nombre:</strong> {{ data.first_name }} </span>
        <span> <strong>Apellido:</strong> {{ data.last_name }} </span>
        <span> <strong>Email:</strong>{{ data.email }} </span>
        <span> <strong>Age:</strong> {{ data.age }} </span>
        <span> <strong>Gender:</strong> {{ data.gender }} </span>
        <span> <strong>Degree:</strong> {{ data.degree }} </span>
        <span> <strong>Phone:</strong> {{ data.phone }} </span>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Student } from "@/Interfaces/students-table";
export default {
  name: "DetailsModal",
  props: {
    title: { type: String, default: "Info" },
    width: { type: String, default: "500px" },
    value: { type: Boolean, default: false },
    data: { type: Object as PropType<Student>, default: () => ({}) },
  },

  computed: {
    dialog: {
      get(): boolean {
        return this.value;
      },
      set(val: boolean) {
        this.$emit("input", val);
      },
    },
  },

  methods: {
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  color: #3b3b3b !important;
}

.icon-close {
  position: absolute !important;
  right: 10px !important;
  top: 10px !important;
  z-index: 99 !important;
  margin: 3px !important;
  font-size: 14px !important;
}
</style>
