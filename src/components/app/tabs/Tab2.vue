<template>
  <div>
    <v-row class="justify-space-around px-2 mt-1">
      <v-col cols="5" class="py-0">
        <v-text-field
          id="nro1"
          v-model="data.nro1"
          label="First Nro"
          outlined
          onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
        />
      </v-col>

      <v-col cols="5" class="py-0">
        <v-text-field
          id="nro2"
          v-model="data.nro2"
          label="Second Nro"
          outlined
          onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
        />
      </v-col>

      <v-col cols="2" class="py-0">
        <v-text-field
          id="result"
          v-model="result"
          label="Result"
          outlined
          readonly
        />
      </v-col>
    </v-row>

    <div class="px-2 mt-1 text-center">
      <v-btn
        id="sum-button"
        class="px-7 white--text mr-2"
        color="primary"
        rounded
        depressed
        @click="sum()"
      >
        Addition
      </v-btn>
    </div>
  </div>
</template>

<script>
import showToast from "@/components/UI/Toast/Toast.vue";

export default {
  name: "Tab-2",

  mixins: [showToast],

  props: {
    value: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      data: { nro1: "", nro2: "" },
      result: "",
    };
  },

  watch: {
    data: {
      handler(value) {
        this.$emit("input", value);
      },
      deep: true,
    },

    "data.nro1": {
      handler(value) {
        if (!value || !this.data.nro2) {
          this.result = "";
        }
      },
      deep: true,
    },

    "data.nro2": {
      handler(value) {
        if (!value || !this.data.nro1) {
          this.result = "";
        }
      },
      deep: true,
    },
  },

  methods: {
    sum() {
      if (!this.data.nro1 || !this.data.nro2) {
        const message = "You must add both numbers";
        return this.showToast("", message, "warning");
      }

      this.result = parseFloat(this.data.nro1) + parseFloat(this.data.nro2);
    },
  },
}
</script>