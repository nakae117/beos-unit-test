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

<script lang="ts">
import ToastMixin from "@/components/UI/Toast/Toast.vue";
import { Tab2Data } from "@/Interfaces/global";
import { PropType } from "vue";

export default {
  name: "Tab-2",

  mixins: [ToastMixin],

  props: {
    value: {
      type: Object as PropType<Tab2Data>,
      default: () => ({ nro1: "", nro2: "" }),
    }, // PropType se utiliza para definir el tipo de una prop en un componente
  },

  data() {
    return {
      data: { nro1: "", nro2: "" } as Tab2Data,
      result: "",
    };
  },

  watch: {
    data: {
      handler(value: Tab2Data) {
        this.$emit("input", value);
      },
      deep: true,
    },

    "data.nro1": {
      handler(value: string) {
        if (!value || !this.data.nro2) {
          this.result = "";
        }
      },
      deep: true,
    },

    "data.nro2": {
      handler(value: string) {
        if (!value || !this.data.nro1) {
          this.result = "";
        }
      },
      deep: true,
    },
  },

  methods: {
    sum(): void {
      if (!this.data.nro1 || !this.data.nro2) {
        const message = "You must add both numbers";
        this.showToast({ title: "", message });
        return;
      }

      this.result = parseFloat(this.data.nro1) + parseFloat(this.data.nro2);
    },
  },
};
</script>