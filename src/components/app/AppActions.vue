<template>
  <v-dialog v-model="open" width="600px" persistent>
    <v-card>
      <v-toolbar dense elevation="1">
        App actions
        <v-spacer />

        <v-btn
          icon
          @click="open = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pt-1">
        <v-tabs v-model="tab">
          <v-tab
            v-for="(tab, key) in tabs"
            :key="`data-${key}`"
            :href="`#${tab.name}`"
          >
            {{ tab.label }}
          </v-tab>
        </v-tabs>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AppActions",

  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      tab: "first",
      tabs: [
        {
          name: "first",
          label: "First",
        },
        {
          name: "second",
          label: "Second",
        },
        {
          name: "third",
          label: "Third",
        },
      ],
    };
  },

  computed: {
    open: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    }
  },
}
</script>