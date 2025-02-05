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
          <v-btn icon @click="item.id">
            <v-icon>visibility</v-icon>
          </v-btn>

          <v-btn icon @click="item.id">
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn
            icon
            :title="`Delete${index}`"
            @click="setInfoDelete(item)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>

    <CreateStudent :value="isOpenModal" @input="handleInput"/>

    <Confirmation
      v-model="confirmDelete"
      :confirm-action="deleteStudent"
      :title="title"
      :message="message"
      :text-confirm="textConfirm"
      :is-loading="isLoading"
    />
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import ToastMixin from "@/components/UI/Toast/Toast.vue";
import Confirmation from "@/components/utils/Confirmation.vue";
import CreateStudent from './CreateStudent.vue';
import {
  Header,
  Student,
  PaginationOptions,
  FooterProps,
  ApiResponse
} from "@/Interfaces/students-table";

export default {
  name: "StudentTable",

  components: {
    CreateStudent,
    Confirmation,
  },

  mixins: [ToastMixin],

  data() {
    return {
      isLoading: false,
      loading: false,
      confirmDelete: false,
      headers: [
        { text: 'First Name', value: 'first_name', sortable: false },
        { text: 'Last Name', value: 'last_name', sortable: false },
        { text: 'Age', value: 'age', sortable: false },
        { text: 'Actions', value: 'actions', width: 140, sortable: false },
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
          updated_at: "2025-01-10T13:38:50.000000Z"
        }
      ] as Student[],
      options: {
        page: 1,
        sort_by: 'id',
        sort_desc: 'asc',
        per_page: 20,
      } as PaginationOptions,
      total: 1,
      footerProps: {
        "items-per-page-options": [5, 10, 15, 20, 50, 100],
        "show-first-last-page": true,
      } as FooterProps,
      isOpenModal: false,
      title: "",
      message: "",
      textConfirm: "",
      detailStudent: {} as Partial<Student>
    };
  },

  watch: {
    options: {
      handler() {
        // this.getStudent();
      },
      deep: true
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

    openCreate() {
      this.isOpenModal = true;
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

      const fullName = `${this.detailStudent.first_name} ${this.detailStudent.last_name}`
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
  }
};
</script>