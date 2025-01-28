<template>
  <div>
    <v-container>
      <v-btn color="primary" @click="openCreate">Crear Estudiante</v-btn>
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
          <v-btn icon @click="viewStudent(item)">
            <v-icon>visibility</v-icon>
          </v-btn>

          <v-btn icon  data-test="edit-button" id="btn-edit" @click="openEditModal(item)">
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn icon @click="deleteStudent(item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>

    <CreateStudent :value="isOpenModal" @input="(val) => (isOpenModal = val)" />
    <UpdateStudent
    v-if="isEditModalOpen"
      :value="isEditModalOpen"
      :selected-student="selectedStudent"
      @save="handleSaveStudent"
      @close="closeEditModal"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import CreateStudent from "./CreateStudent.vue";
import UpdateStudent from "./UpdateStudent.vue";
import { Student } from "@/Interfaces/Student.interface";

export default Vue.extend({
  name: "StudentTable",
  components: {
    CreateStudent,
    UpdateStudent,
  },
  data() {
    return {
      headers: [
        { text: "First Name", value: "first_name", sortable: false },
        { text: "Last Name", value: "last_name", sortable: false },
        { text: "Age", value: "age", sortable: false },
        { text: "Actions", value: "actions", width: 140, sortable: false },
      ],
      students: [] as Student[], // Lista de estudiantes tipada
      options: {
        page: 1,
        sort_by: "id",
        sort_desc: "asc",
        per_page: 20,
      },
      total: 0,
      loading: false,
      footerProps: {
        "items-per-page-options": [5, 10, 15, 20, 50, 100],
        "show-first-last-page": true,
      },
      selectedStudent: null as Student | null, // Estudiante seleccionado
      isOpenModal: false,
      isEditModalOpen: false, // Estado del modal de edición
    };
  },
  methods: {
    openCreate() {
      this.isOpenModal = true;
    },

    openEditModal(student: Student) {
      // console.log(student)
      this.selectedStudent = { ...student };
      this.isEditModalOpen = true;
    },
    viewStudent(student: Student) {
      console.log("Viewing student:", student);
    },

    deleteStudent(student: Student) {
      console.log("Deleting student:", student);
    },

    closeEditModal(): void {
      this.isEditModalOpen = false;
      this.selectedStudent = null;
    },

    handleSaveStudent(updatedStudent: Student): void {
      const index = this.students.findIndex((s:Student) => s.id === updatedStudent.id);
      if (index !== -1) {
        this.students[index] = { ...updatedStudent };
      }
      this.isEditModalOpen = false;
    },
    async getStudents() {
      this.loading = true;
      try {
        const response = await axios.get("/student", {
          params: this.options,
        });
        this.students = response.data.data;
        this.total = response.data.total;
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getStudents();
  },
});
</script>
