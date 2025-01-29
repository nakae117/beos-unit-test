<template>
  <div>
    <v-container>
      <v-btn id="create-button" color="primary" @click="openCreate">Crear Estudiante</v-btn>
      <v-skeleton-loader
        v-if="loading"
        type="table-heading, list-item-two-line, table-tfoot"
      />
  
      <v-data-table
        v-else
        :headers="headers"
        :items="students"
        :items-per-page.sync="options.per_page"
        class="elevation-1"
        :page.sync="options.page"
        :server-items-length="total"
        :footer-props="footerProps"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="item.id">
            <v-icon>visibility</v-icon>
          </v-btn>

          <v-btn icon @click="item.id">
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn icon @click="item.id">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
    <CreateStudent :value="isOpenModal" @input="handleInput"/>
    </div>
</template>

<script>
import axios from 'axios';
import CreateStudent from './CreateStudent.vue';

export default {
  name: "StudentTable",
  components: {
    CreateStudent,
  },
  data() {
    return {
      headers: [
        { text: 'First Name', value: 'first_name', sortable: false },
        { text: 'Last Name', value: 'last_name', sortable: false },
        { text: 'Age', value: 'age', sortable: false },
        { text: 'Actions', value: 'actions', width: 140, sortable: false },
      ],
      students: [],
      options: {
        page: 1,
        sort_by: 'id',
        sort_desc: 'asc',
        per_page: 20,
      },
      total: 0,
      loading: false,
      footerProps: {
        "items-per-page-options": [5, 10, 15, 20, 50, 100],
        "show-first-last-page": true,
      },
      isOpenModal: false,
    };
  },

  watch: {
    options: {
      handler() {
        this.getStudent();
      },
      deep: true
    },
  },

  mounted() {
    this.getStudent();
  },

  methods: {
    async getStudent() {
      this.loading = true;
      await axios.get("/student", {
        params: this.options,
      })
      .then((resp) => {
        this.students = resp.data.data;
        this.total = resp.data.total;
        this.loading = false;
      })
      .catch((error) => {
        console.error("Error making request:", error);
        this.loading = false;
      });
    },
    openCreate(){
      this.isOpenModal = true;
    },
     handleInput(val) {
      this.isOpenModal = val;
    },
  }
};
</script>