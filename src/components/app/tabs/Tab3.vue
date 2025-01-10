<template>
  <v-row class="justify-space-around px-2 mt-1">
    <v-col cols="6" class="py-0">
      <label> Note </label>

      <v-text-field
        v-model="data.note"
        placeholder="Name"
        outlined
      />
      <v-btn @click="getStudents">
      
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Tab3Data } from '@/Interfaces/global';
import { PropType } from "vue";
import axios from 'axios';

export default {
  name: "Tab-3",

  props: {
    value: { 
      type: Object as PropType<Tab3Data>,
      default: () => ({ note: "" }) },
  },

  data() {
    return {
      data: { note: "" } as Tab3Data,
      loading:false,
      student:[],
      options:{
        sort_by: 'id',
        sort_desc: 'asc',
        per_page: '20',
      }
    };
  },

  methods:{
   getStudents(){
    this.loading = true;

    axios.get("/student", {
      params: this.options,
    })
      .then((resp) => {
        this.students = resp.data;
        this.loading = false;
        console.log(resp)
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
        this.loading = false;
      });
    }
  }
}
</script>