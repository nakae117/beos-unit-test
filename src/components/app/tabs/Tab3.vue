<template>
  <v-row class="justify-space-around px-2 mt-1">
    <v-col cols="6" class="py-0">
      <label> Note {{ isValid }}</label>

      <v-text-field
        id="note"
        v-model="data.note"
        placeholder="Name"
        outlined
      />
    </v-col>
    <v-col cols="6" class="py-0">
      <span class="mt-4" v-if="!isValid">no es valido</span>
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
      // isValid: true as boolean,
    };
  },

  computed: {
    isValid: {
      get(): boolean {
        const regex = /^[a-zA-Z]*$/;
        return regex.test(this.data.note);
      },
      set(val: boolean) {
        this.$emit("input", val);
      },
    },
  },
}
</script>