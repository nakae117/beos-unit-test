<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title> <h3>Editar Materia</h3></v-card-title>
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
                label="Código"
                outlined
                disabled
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
        <v-btn
          id="save-button"
          data-testid="edit-button"
          color="primary"
          @click="updateSubject"
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
import { updateSubject } from "@/services/subject";

export default {
  name: "EditSubject",
  mixins: [ToastMixin],
  props: {
    value: { type: Boolean, default: false },
    subject: { type: Object as () => Subject, required: true },
  },
  data() {
    return {
      form: { ...this.subject },
      valid: false,
      rules: rules,
    };
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val: boolean) {
        this.$emit("update:value", val);
      },
    },
  },
  watch: {
    value(newVal) {
      this.dialog = newVal; // Sincroniza el estado del modal con la prop
    },
    subject: {
      handler(newSubject) {
        this.form = { ...newSubject };
      },
      deep: true,
    },
  },
  methods: {
    async updateSubject() {
      if (this.$refs.form.validate()) {
        try {
          await updateSubject(this.form.code, this.form);
          this.showToast({
            message: "Materia actualizada con éxito",
            type: "success",
          });
          this.$emit("update:update-data", true);
          this.closeModal();
        } catch (error) {
          this.showToast({
            message: "Error al actualizar la materia",
            type: "error",
          });
        }
      } else {
        this.showToast({
          message: "Por favor, complete los campos correctamente",
          type: "error",
        });
      }
    },
    closeModal() {
      this.$emit("update:value", false); // ✅ Cierra el modal correctamente
    },
  },
};
</script>
