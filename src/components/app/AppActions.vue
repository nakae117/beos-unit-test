<template>
  <v-dialog v-model="open" :width="checkWidth" persistent>
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

      <v-card-text class="pt-1">
        <v-tabs-items v-model="tab">
          <v-tab-item value="tab1">
            <tab1
              ref="componentTab1"
              v-model="data.tab1"
            />
          </v-tab-item>

          <v-tab-item value="tab2">
            <tab2
              ref="componentTab2"
              v-model="data.tab2"
            />
          </v-tab-item>

          <v-tab-item value="tab3">
            <tab3
              ref="componentTab3"
              v-model="data.tab3"
            />
          </v-tab-item>
           <v-tab-item value="tab4">
            <tab4
              ref="componentTab4"
              v-model="data.tab4"
            />
          </v-tab-item>

        </v-tabs-items>
      </v-card-text>

      <v-card-actions class="pt-0">
          <v-spacer />

          <div>
            <v-btn
              v-if="tab !== 'tab1'"
              id="back-button"
              class="px-7 mr-2"
              text
              rounded
              @click="back()"
            >
              Back
            </v-btn>

            <v-btn
              v-if="tab !== 'tab4'"
              id="next-button"
              class="px-7 white--text mr-2"
              color="primary"
              rounded
              depressed
              @click="next()"
            >
              Next
            </v-btn>

            <v-btn
              v-if="tab === 'tab3'"
              id="save-button"
              class="px-7 white--text mr-2"
              color="primary"
              rounded
              depressed
              @click="save()"
            >
              save
            </v-btn>
          </div>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Tab1 from "@/components/app/tabs/Tab1.vue";
import Tab2 from "@/components/app/tabs/Tab2.vue";
import Tab3 from "@/components/app/tabs/Tab3.vue";
import Tab4 from "./tabs/Tab4.vue";
import showToast from "@/components/UI/Toast/Toast.vue";

export default {
  name: "AppActions",

  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4
  },

  mixins: [showToast],

  props: {
    value: { type: Boolean, default: false }
  },

  data() {
    return {
      tab: "tab1",
      tabs: [
        { name: "tab1", label: "First" },
        { name: "tab2", label: "Second" },
        { name: "tab3", label: "Third" },
        { name: "tab4", label: "Fourth" },
      ],
      data: {
        tab1: { name: "", description: "" },
        tab2: { nro1: "", nro2: "" },
        tab3: { note: "" },
        tab4: { nro1: "", nro2: "" },
      },
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
    },

    checkWidth() {
      return this.tab !== "tab2" ? "600px" : "1000px";
    },
  },

  watch: {},

  methods: {
    next() {
      if (this.tab === "tab1") {
        const tab1 = this.data.tab1;
        if (!tab1.name || !tab1.description) {
          const message = "Complete the fields in tab 1";
          return this.showToast("", message, "warning");
        }

        this.tab = "tab2";
      } else if(this.tab==='tab2') {
        this.tab = "tab3";
      }
        else{
         this.tab = "tab4";
      }
    },

    back() {
       if (this.tab === "tab4"){
          this.tab = "tab3";
       } 
      else if (this.tab === "tab3") {
        this.tab = "tab2";
      } else  {
        this.tab = "tab1";
      }
    },

    save() {
      if (!this.validTab1) {
        const message = "Complete the fields in tab 1";
        return this.showToast("", message, "warning");
      }

      console.log("DATA", this.data);
    },
  },
}
</script>