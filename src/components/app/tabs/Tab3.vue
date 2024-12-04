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

<script>
export default {
  name: "Tab-3",

  props: {
    value: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      data: { note: "" },
    };
  },
}
</script>