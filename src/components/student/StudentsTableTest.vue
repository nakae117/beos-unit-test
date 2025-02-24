<template>
  <div>
    <v-container>
      <span>Rendering Table</span>

      <v-btn id="create-button" color="primary" @click="openCreate">
        Crear Estudiante
      </v-btn>

      <v-skeleton-loader
        v-if="loading"
        type="table-heading, list-item-two-line, table-tfoot"
      />
      <v-data-table
        v-else
        title="tableDelete"
        class="elevation-1"
        :headers="headers"
        :items="students"
        :items-per-page.sync="options.per_page"
        :page.sync="options.page"
        :server-items-length="total"
        :footer-props="footerProps"
      >
        <template v-slot:[`item.actions`]="{ item, index }">
          <v-btn icon @click="showInfo(item)">
            <v-icon>visibility</v-icon>
          </v-btn>

          <v-btn
            icon
            data-test="edit-button"
            title="Editar"
            id="btn-edit"
            @click="openEditModal(item)"
          >
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn icon :title="`Delete${index}`" @click="setInfoDelete(item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>

    <CreateStudent :value="isOpenModal" @input="handleInput" />
    <UpdateStudent
      v-if="isEditModalOpen"
      :value="isEditModalOpen"
      :selected-student="selectedStudent"
      @save="handleSaveStudent"
      @close="closeEditModal"
    />
    <Confirmation
      v-model="confirmDelete"
      :confirm-action="deleteStudent"
      :title="title"
      :message="message"
      :text-confirm="textConfirm"
      :is-loading="isLoading"
    />

    <DetailsModal
      v-model="showDetails"
      :confirm-action="deleteStudent"
      title="Info"
      :data="details"
      width="500px"
    />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import CreateStudent from "./CreateStudent.vue";
import UpdateStudent from "./UpdateStudent.vue";
import ToastMixin from "@/components/UI/Toast/Toast.vue";
import Confirmation from "@/components/utils/Confirmation.vue";
import DetailsModal from "@/components/utils/DetailsModal.vue";
import {
  Header,
  Student,
  PaginationOptions,
  FooterProps,
  ApiResponse,
} from "@/Interfaces/students-table";

export default Vue.extend({
  name: "StudentTable",

  components: {
    CreateStudent,
    UpdateStudent,
    Confirmation,
    DetailsModal,
  },

  mixins: [ToastMixin],

  data() {
    return {
      isLoading: false,
      loading: false,
      confirmDelete: false,
      showDetails: false,
      details: {}  as Student,
      headers: [
        { text: "First Name", value: "first_name", sortable: false },
        { text: "Last Name", value: "last_name", sortable: false },
        { text: "Age", value: "age", sortable: false },
        { text: "Actions", value: "actions", width: 140, sortable: false },
      ] as Header[],
      students: [
        {
          id: 1,
          first_name: "David",
          last_name: "Williams",
          email: "david@gmail.com",
          age: "39",
          gender: "M",
          degree: "Dr.",
          phone: "+1 (910) 487-7111",
          created_at: "2025-01-10T13:38:50.000000Z",
          updated_at: "2025-01-10T13:38:50.000000Z",
        },
      ] as Student[],
      options: {
        page: 1,
        sort_by: "id",
        sort_desc: "asc",
        per_page: 20,
      } as PaginationOptions,
      total: 1,
      footerProps: {
        "items-per-page-options": [5, 10, 15, 20, 50, 100],
        "show-first-last-page": true,
      } as FooterProps,
      title: "",
      message: "",
      textConfirm: "",
      selectedStudent: null as Student | null, // Estudiante seleccionado
      isOpenModal: false,
      isEditModalOpen: false, // Estado del modal de edición
      detailStudent: {} as Partial<Student>,
    };
  },

  watch: {
    options: {
      handler() {
        // this.getStudent();
      },
      deep: true,
    },
  },

  mounted() {
    // this.getStudent();
  },

  methods: {
    async getStudent(): Promise<void> {
      this.loading = true;

      try {
        const resp = await axios.get<ApiResponse<Student>>("/student", {
          params: this.options,
        });
        this.students = resp.data.data;
        this.total = resp.data.total;
      } catch (error) {
        console.error("Error making request:", error);
      } finally {
        this.loading = false;
      }
    },
    showInfo(data: Student) {
      this.showDetails = true;
      this.details = { ...data };
    },
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

    closeEditModal(): void {
      this.isEditModalOpen = false;
      this.selectedStudent = null;
    },

    handleSaveStudent(updatedStudent: Student): void {
      const index = this.students.findIndex(
        (s: Student) => s.id === updatedStudent.id
      );
      if (index !== -1) {
        this.$set(this.students, index, { ...updatedStudent }); // Forzar reactividad
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
    handleInput(val: boolean) {
      this.isOpenModal = val;
    },

    setInfoDelete(item: Student) {
      this.detailStudent = item;
      this.title = "Confirmation";
      this.textConfirm = "Confirm";

      const name = item.first_name;
      const last = item.last_name;
      const email = item.email;

      const info = `${name} ${last}, Email: ${email}`;
      this.message = `Are you sure you want to delete ${info}?`;

      this.confirmDelete = true;
    },

    async deleteStudent(): Promise<void> {
      this.isLoading = true;

      const fullName = `${this.detailStudent.first_name} ${this.detailStudent.last_name}`;
      const message = `The record of ${fullName} has been deleted successfully`;
      this.showToast({ title: "", message, type: "success" });
      this.isLoading = false;
      this.confirmDelete = false;

      /* await axios.delete(`/student/delete/${this.detailStudent.id}`)
        .then(() => {
          const fullName = `${this.detailStudent.first_name} ${this.detailStudent.last_name}`
          const message = `The record of ${fullName} has been deleted successfully`;
          this.showToast({ title: "", message, type: "success" });
          this.isLoading = false;
          this.confirmDelete = false;
          this.getStudent();
        })
        .catch((error) => {
          console.error("Error making request:", error);
          const message = "Failed to delete record. Please try again later";
          this.showToast({ title: "Error", message, type: "error"});
          this.isLoading = false;
        }); */
    },
  },
});
</script>
