<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title> <h3>Crear Estudiante</h3></v-card-title>
      <v-card-text>
         <v-form ref="form" v-model="valid" >
          <v-row class="d-flex flex-row">
            <v-col>
              <v-text-field 
                label="Nombre" 
                v-model="form.first_name" 
                outlined
                :rules="[rules.required, rules.name]" 
                maxlength="32"
              />
              <v-text-field 
                label="Email" 
                type="email" 
                v-model="form.email" 
                outlined
                :rules="[rules.required, rules.email]"
              /> 
              <v-text-field 
                label="Telefono" 
                v-model="form.phone" 
                outlined
                :rules="[rules.phone]"
              />
            </v-col>
            <v-col>
              <v-text-field 
                label="Apellido" 
                v-model="form.last_name" 
                outlined
                :rules="[rules.required, rules.name]" 
                maxlength="32"
              />
              <v-text-field 
                label="Edad" 
                type="number" 
                v-model="form.age" 
                outlined
                :rules="[rules.age]"
                maxlength="2"
              />
              <v-select 
                label="Genero" 
                v-model="form.gender" 
                :items="['Masculino', 'Femenino']" 
                outlined
              />
            </v-col>
            <v-col>
              <v-text-field 
                label="Cedula" 
                v-model="form.identity" 
                outlined
                :rules="[rules.required, rules.identity]" 
                maxlength="9"
              />
              <v-text-field 
                label="Curso" 
                v-model="form.degree" 
                outlined
                :rules="[rules.required, rules.grade]"
              /> 
              <v-text-field 
                label="Direccion" 
                v-model="form.address" 
                outlined
                :rules="[rules.address]"
                maxlength="50"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end px-4 py-4">
        <v-spacer/>
        <v-btn class="mr-4" @click="closeModal">Cerrar</v-btn>
        <v-btn color="primary" @click="saveStudent">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import ToastMixin from "@/components/UI/Toast/Toast.vue";
import { StudentForm } from '@/Interfaces/student';
import rules from '@/utils/rules';
import axios from 'axios';

export default {
  name: 'CreateStudent',
  mixins: [ToastMixin],
  props: {
    value: { type: Boolean, default: false },
  },
  data() {
    return {
      form: {
        first_name: '',
        email: '',
        identity: '',
        phone: '',
        last_name: '',
        age: null,
        address: '',
        degree: '',
        gender: ''
      } as StudentForm,
      valid: true,
      rules: rules
    };
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val: boolean) {
        this.$emit('input', val);
      },
    },
  },
  methods: {
    async saveStudent() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        await axios.post('student/store', this.form)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.error('Error making request:', error);
        });
      }
      else {
        const message='Por favor, rellene los campos correctamente.';
        this.showToast({ title: "Error", message });
      }
    },
    closeModal() {
      this.dialog = false;
    },
  },
};

</script>
