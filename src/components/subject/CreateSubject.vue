<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title> <h3>Crear Materia</h3></v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row class="d-flex flex-row">
            <v-col>
              <v-text-field
                id="name"
                v-model="form.name"
                label="Nombre"
                outlined
                maxlength="32"
                :rules="[rules.required, rules.name]"
              />
              <v-text-field
                id="credits"
                v-model="form.credits"
                label="Creditos"
                outlined
                type="number"
                maxlength="2"
                :rules="[rules.required, rules.number]"
              />
              <v-text-field
                id="code"
                v-model="form.code"
                label="Code"
                outlined
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-select
                id="mode"
                ref="mode"
                v-model="form.mode"
                label="Modalidad"
                outlined
                :items="['online', 'presencial', 'híbrido']"
                :rules="[rules.required]"
              />

              <v-text-field
                id="studentsEnrolled"
                v-model="form.studentsEnrolled"
                label="Estudiantes Inscritos"
                outlined
                type="number"
                maxlength="32"
                :rules="[rules.required, rules.number]"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end px-4 py-4">
        <v-spacer />
        <v-btn id="close-button" class="mr-4" @click="closeModal">Cerrar</v-btn>
        <v-btn id="save-button" color="primary" @click="saveSubject"
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
import { postSubjects } from "@/services/subject";
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
      valid: false,
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
    async saveSubject() {
      if (this.$refs.form.validate()) {
        const payload = {
          name: this.form.name,
          code: this.form.code,
          credits: Number(this.form.credits),
          studentsEnrolled: Number(this.form.studentsEnrolled),
          mode: this.form.mode,
        };

        const response = await postSubjects(payload);
        this.showToast({
          message: response.message,
          type: "success",
        });
        this.$emit("update:update-data", true);
        this.$emit("input", false);
        this.clearInputs();
      } else {
        const message = "Por favor, rellene los campos correctamente.";
        this.showToast({ title: "Error", message });
      }
    },
    clearInputs() {
      this.form = {
        name: "",
        credits: 0,
        studentsEnrolled: 0,
        code: "",
        mode: "",
      };
    },
    closeModal() {
      this.dialog = false;
    },
  },
};
</script>
