<template>
  <v-form ref="formTab1">
    <v-row class="justify-space-around px-2 mt-1">
      <v-col cols="6" class="py-0">
        <v-text-field id="name" v-model="data.name" label="Name*" outlined />
      </v-col>

      <v-col cols="6" class="py-0">
        <v-text-field
          id="description"
          v-model="data.description"
          label="Description*"
          outlined
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Tab1Data } from '@/Interfaces/global';
import { PropType } from 'vue';

export default {
  name: "Tab-1",

  props: {
    value: {
      type: Object as PropType<Tab1Data>,
      default: () => ({ name: "", description: "" }),
    },
  },

  data() {
    return {
      data: { name: "", description: "" } as Tab1Data,
    };
  },

  watch: {
    data: {
      handler(value: Tab1Data) {
        this.$emit("input", value);
      },
      deep: true,
    },
  },
};
</script>