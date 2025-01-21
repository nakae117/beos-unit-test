<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title> <h3>Crear Estudiante</h3></v-card-title>
      <v-card-text>
        <v-row class="d-flex flex-row">
          <v-col>
            <v-text-field label="Nombre" v-model="form.name" outlined/>
            <v-text-field label="Email" type="email" v-model="form.email" outlined/> 
            <v-text-field label="Telefono" v-model="form.phone" outlined/>
          </v-col>
          <v-col>
           <v-text-field label="Apellido" v-model="form.lastName" outlined/>
           <v-text-field label="Edad" type="number" v-model="form.age" outlined/>
           <v-select label="Genero" v-model="form.gender" :items="['Masculino', 'Femenino']" outlined/>
          </v-col>
          <v-col>
            <v-text-field label="Cedula" v-model="form.indentity" outlined/>
            <v-text-field label="Curso" v-model="form.grade" outlined/> 
            <v-text-field label="Direccion" v-model="form.address" outlined/>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-action class="d-flex justify-end px-4 py-4">
        <v-spacer/>
        <v-btn class="mr-4" @click="closeModal">Cerrar</v-btn>
        <v-btn color="primary" @click="saveStudent">Guardar</v-btn>
      </v-card-action>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from 'axios';
export default {
  name: "CreateStudent",
  props: {
    value: { type: Boolean, default: false },
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        indentity:'',
        phone: '',
        lastName: '',
        age: '',
        address:'',
        grade:'',
        gender:''
      }
    }
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    async saveStudent() {
      this.dialog = false;
       await axios.post("student/store", this.form)
      .then((resp) => {
       console.log(resp.data);
      })
      .catch((error) => {
        console.error("Error making request:", error);
        this.loading = false;
      });
    },
    closeModal() {
      this.dialog = false;
    },
  },
};
  
</script>