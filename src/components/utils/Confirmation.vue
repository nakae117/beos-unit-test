<template>
  <!-- Colocar el If para que la prueba pueda verificar correctamente que esta o no el modal -->
  <v-dialog v-if="dialog" v-model="dialog" scrollable persistent :width="width">
    <v-card class="justify-center">
      <v-icon
        class="icon-close"
        small
        @click="close"
      >
        close
      </v-icon>

      <v-card-title class="d-flex justify-start">
        <h5>{{ title }}</h5>
      </v-card-title>

      <v-card-subtitle>
        <v-col cols="12" class="text justify-start">
          <span>
            {{ message }}
          </span>
        </v-col>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          id="cancel-btn"
          title="cancel-btn"
          color="primary"
          class="px-7"
          text
          rounded
          depressed
          :loading="isLoading"
          @click="close"
        >
          {{ textCancel }}
        </v-btn>

        <v-spacer />

        <v-btn
          id="confirm-btn"
          title="confirm-btn"
          color="primary"
          class="white--text px-7"
          rounded
          depressed
          :loading="isLoading"
          @click="confirmAction"
        >
          {{ textConfirm }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  name: "ConfirmationModal",

  props: {
    title: { type: String, default: "Confirmation" },
    message: { type: String, default: "" },
    textConfirm: { type: String, default: "Yes" },
    textCancel: { type: String, default: "Cancel" },
    width: { type: String, default: "500px" },
    value: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    confirmAction: {
      type: Function as PropType<() => void>,
      default: () => {
        // Función predeterminada para evitar el error de ESLint
        return () => console.log("confirmAction invoked");
      },
    },
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
  font-size: 14px !important
  }
</style>
