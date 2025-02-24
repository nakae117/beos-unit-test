<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title> <h3>Crear Materia</h3></v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row class="d-flex flex-row">
            <v-col>
              <v-text-field
                label="Nombre"
                v-model="form.name"
                outlined
                id="name"
                :rules="[rules.required, rules.name]"
                maxlength="32"
              />
              <v-text-field
                label="Creditos"
                v-model="form.credits"
                outlined
                type="number"
                id="credits"
                :rules="[rules.required, rules.number]"
                maxlength="2"
              />
              <v-text-field
                label="Code"
                v-model="form.code"
                outlined
                id="code"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-select
                label="Modes"
                v-model="form.mode"
                id="mode"
                ref="mode"
                :rules="[rules.required]"
                :items="modes"
                outlined
              />

              <v-text-field
                label="Estudiantes Inscritos"
                v-model="form.studentsEnrolled"
                outlined
                type="number"
                id="studentsEnrolled"
                :rules="[rules.required, rules.number]"
                maxlength="32"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end px-4 py-4">
        <v-spacer />
        <v-btn id="close-button" class="mr-4" @click="closeModal">Cerrar</v-btn>
        <v-btn id="save-button" color="primary" @click="saveStudent"
          >Guardar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import ToastMixin from "@/components/UI/Toast/Toast.vue";
import { Subject } from "@/Interfaces/subjects";
import rules from "@/utils/rules";
import axios from "axios";

export default {
  name: "CreateSubject",
  mixins: [ToastMixin],
  props: {
    value: { type: Boolean, default: false },
  },
  data() {
    return {
      form: {
        name: "",
        credits: 0,
        studentsEnrolled: 0,
        code: "",
        mode: "",
      } as Subject,
      valid: true,
      rules: rules,
      modes: ["online", "presencial", "híbrido"],
    };
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val: boolean) {
        this.$emit("input", val);
      },
    },
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    async saveStudent() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        await axios
          .post("student/store", this.form)
          .then((resp) => {
            console.log(resp.data);
          })
          .catch((error) => {
            console.error("Error making request:", error);
          });
      } else {
        const message = "Por favor, rellene los campos correctamente.";
        this.showToast({ title: "Error", message });
      }
    },
    closeModal() {
      this.dialog = false;
    },
  },
};
</script>
