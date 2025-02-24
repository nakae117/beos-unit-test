<template>
  <v-dialog v-model="dialog" max-width="600" persistent>
    <v-card>
      <v-card-title>Edit Student</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            id="firstName"
            v-model="formStudent.first_name"
            label="Nombre"
            :rules="nameRules"
          />
          <v-text-field
            id="lastName"
            v-model="formStudent.last_name"
            label="Apellido"
            :rules="nameRules"
          />
          <v-text-field
            id="email"
            v-model="formStudent.email"
            label="Correo Electrónico"
            :rules="emailRules"
          />
          <v-text-field
            id="age"
            v-model.number="formStudent.age"
            label="Edad"
            :rules="ageRules"
          />
          <v-select
            id="gender"
            v-model="formStudent.gender"
            label="Género"
            :items="['M', 'F', 'O']"
            :rules="genderRules"
          />
          <v-text-field
            id="degree"
            v-model="formStudent.degree"
            label="Grado o Curso"
            :rules="degreeRules"
          />
          <v-text-field
            id="phone"
            v-model="formStudent.phone"
            label="Teléfono"
            :rules="phoneRules"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" outlined @click="$emit('close')" id="btn-cancel">
          Cancelar
        </v-btn>
        <v-btn color="primary" @click="saveStudent" id="btn-save">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Student } from "@/Interfaces/Student.interface";

export default Vue.extend({
  name: "EditStudentModal",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    selectedStudent: {
      type: Object as () => Student | null,
      required: true,
    },
  },
  data() {
    return {
      formStudent: { ...this.selectedStudent }, // Inicializa como copia de selectedStudent
      nameRules: [
        (v: string) => !!v || "El campo es obligatorio.",
        (v: string) =>
          /^[a-zA-Z\s]*$/.test(v) ||
          "No pueden contener números ni caracteres especiales.",
      ] as Array<(v: string) => boolean | string>,
      emailRules: [
        (v: string) => !!v || "El campo es obligatorio.",
        (v: string) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ||
          "Debe ser un correo electrónico válido.",
      ],
      ageRules: [
        (v: string) => !!v || "El campo es obligatorio.",
        (v: string) =>
          /^\d+$/.test(v) || "Debe contener solo números.",
        (v: string) => +v >= 4 || "La edad mínima es 4 años.",
        (v: string) => +v <= 99 || "La edad máxima es 99 años.",
      ],
      genderRules: [
        (v: string) => !!v || "Debe seleccionar un género.",
      ],
      degreeRules: [
        (v: string) => !!v || "El campo es obligatorio.",
        (v: string) =>
          /^[a-zA-Z\s]*$/.test(v) ||
          "Debe contener solo letras y espacios.",
      ],
      phoneRules: [
        (v: string) => !!v || "El campo es obligatorio.",
        (v: string) =>
          /^\d{11}$/.test(v) ||
          "Debe contener exactamente 11 dígitos, sin espacios ni guiones.",
      ],
    };
  },
  computed: {
    dialog: {
      get(): boolean {
        return this.value;
      },
      set(val: boolean) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    saveStudent(): void {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.$emit("save", this.formStudent); // Emitimos el formulario actualizado
        this.$emit("close"); // Cerramos el modal
      }
    },
  },
});
</script>
