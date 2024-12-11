<template>
  <v-layout column>
    <div v-if="title.length > 0" class="margin-b">
      <strong>{{ title }}</strong>
    </div>
    <div>{{ message }}</div>

    <div v-if="errors && Object.keys(errors).length > 0">
      <ul>
        <li v-for="(error, key) in errors" :key="'error-' + key">
          {{ error[0] }}
        </li>
      </ul>
    </div>
  </v-layout>
</template>

<script lang="ts">
export default {
  name: "ToastComponent",

 
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    errors: {
      type: Object as () => Record<string, string[]>,
      default: () => ({}),
    },
  },

  computed: {
    hasErrors(): boolean {
      return Object.keys(this.errors).length > 0;
    },

    errorList(): string[] {
      return Object.values(this.errors).flat() as string[];
    },
  },
};
</script>

<style lang="scss">
@import "../../../styles/UI/styleToast.scss";
</style>
