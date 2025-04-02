<template>
  <div>
    <v-container>
      <span>Rendering Table</span>

      <v-btn id="create-button" color="primary" @click="openCreate">
        Crear Materia
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
        :items="subjects"
        :items-per-page.sync="options.per_page"
        :page.sync="options.page"
        :server-items-length="total"
        :footer-props="footerProps"
      >
        <template v-slot:[`item.actions`]="{ item, index }">
          <v-btn id="visibility" title="Editar" icon @click="showInfo(item)">
            <v-icon>visibility</v-icon>
          </v-btn>

          <v-btn id="edit" title="View" icon @click="openEdit(item)">
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn
            id="delete"
            icon
            :title="`Delete${index}`"
            @click="setInfoDelete(item)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
    <CreateStudent
      :value="isOpenModal"
      :update-data.sync="updateData"
      @input="handleInput"
    />
    <ViewSubject
      :value="isOpenViewModal"
      :data="data"
      @input="handleViewInput"
    />
    <EditSubject
      :value.sync="isOpenEditModal"
      :subject="data"
      :update-data.sync="updateEditData"
      @input="handleEditInput"
    />
    <Confirmation
      v-model="confirmDelete"
      :confirm-action="deleteSub"
      :title="title"
      :message="message"
      :text-confirm="textConfirm"
      :is-loading="isLoading"
    />
  </div>
</template>

<script lang="ts">
import CreateStudent from "./CreateSubject.vue";
import EditSubject from "./EditSubject.vue";
import ViewSubject from "./ViewSubject.vue";
import Confirmation from "@/components/utils/Confirmation.vue";
import { getSubjects, deleteSubject } from "@/services/subject";
import {
  Header,
  //Subject,
  PaginationOptions,
  FooterProps,
  Subject,
} from "@/Interfaces/subjects";
export default {
  components: { CreateStudent, ViewSubject, EditSubject, Confirmation },
  data() {
    return {
      subjects: [] as Subject[],
      isOpenModal: false,
      loading: false,
      isLoading: false,
      updateData: false,
      confirmDelete: false,
      updateEditData: false,
      isOpenEditModal: false,
      isOpenViewModal: false,
      title: "Eliminar Materia",
      textConfirm: "Confirmar",
      message: "¿Estás seguro de que quieres eliminar esta materia?",
      data: {
        name: "",
        credits: 0,
        studentsEnrolled: 0,
        code: "",
        mode: "",
      },
      total: 1,
      modes: ["online", "presencial", "híbrido"],
      options: {
        page: 1,
        sort_by: "id",
        sort_desc: "asc",
        per_page: 20,
      } as PaginationOptions,
      headers: [
        {
          text: "Code",
          value: "code",
          sortable: false,
        },
        { text: "Name", value: "name", sortable: false },
        { text: "Credits", value: "credits", sortable: false },
        {
          text: "Students Enrolled",
          value: "studentsEnrolled",
          sortable: false,
        },
        {
          text: "Mode",
          value: "mode",
          sortable: false,
        },
        { text: "Actions", value: "actions", width: 140, sortable: false },
      ] as Header[],
      footerProps: {
        "items-per-page-options": [5, 10, 15, 20, 50, 100],
        "show-first-last-page": true,
      } as FooterProps,
    };
  },
  mounted() {
    this.getSubjects();
  },
  watch: {
    updateData(val) {
      if (val) {
        this.getSubjects();
      }
      this.updateData = false;
    },
    updateEditData(val) {
      if (val) {
        this.getSubjects();
      }
      this.updateEditData = false;
    },
  },
  methods: {
    async getSubjects() {
      this.loading = true;

      try {
        const { data, total } = await getSubjects();
        this.subjects = data;
        this.total = total;
      } catch (error) {
        console.error("Error making request:", error);
      } finally {
        this.loading = false;
      }
    },

    openCreate() {
      this.isOpenModal = true;
    },
    showInfo(item: Subject) {
      this.data = { ...item };
      this.isOpenViewModal = true;
    },
    openEdit(item: Subject) {
      this.data = { ...item }; // Asegurar una copia fresca del objeto
      this.isOpenEditModal = false; // Cerrar el modal temporalmente para forzar la reactividad
      this.$nextTick(() => {
        this.isOpenEditModal = true; // Volver a abrir después de que Vue procese los cambios
      });
    },
    async deleteSub() {
      this.isLoading = true;

      try {
        const response = await deleteSubject(this.data.code);
        // Eliminar la materia del listado
        this.subjects = this.subjects.filter(
          (subject) => subject.code !== this.data.code
        );
        this.confirmDelete = false; // Cerrar el modal de confirmación
        this.$emit("update-data", true); // Trigger to reload data
        this.$toast.success(response.message); // Mostrar mensaje de éxito
      } catch (error) {
        console.error("Error deleting subject:", error);
        this.$toast.error("Error al eliminar la materia");
      } finally {
        this.isLoading = false;
      }
    },
    setInfoDelete(item: Subject) {
      this.data = { ...item };
      this.title = "Confirmation";
      this.textConfirm = "Confirm";
      this.confirmDelete = true;
    },
    handleViewInput(val: boolean) {
      this.isOpenViewModal = val;
    },
    handleInput(val: boolean) {
      this.isOpenModal = val;
    },
    handleEditInput(val: boolean) {
      this.isOpenEditModal = val;
    },
  },
};
</script>