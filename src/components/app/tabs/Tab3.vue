<template>
  <v-row class="justify-space-around px-2 mt-1">
    <v-col cols="6" class="py-0">
      <label> Note </label>

      <v-text-field
        v-model="data.note"
        placeholder="Name"
        outlined
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Tab3Data } from '@/Interfaces/global';
import { PropType } from "vue";

export default {
  name: "Tab-3",

  props: {
    value: { 
      type: Object as PropType<Tab3Data>,
      default: () => ({ note: "" }) },
  },

  data() {
    return {
      data: { note: "" } as Tab3Data,
    };
  },
}
</script>