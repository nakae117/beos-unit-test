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
          <v-btn icon @click="showInfo(item)">
            <v-icon>visibility</v-icon>
          </v-btn>

          <v-btn icon @click="item.id">
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn icon :title="`Delete${index}`" @click="setInfoDelete(item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
    <CreateStudent :value="isOpenModal" @input="handleInput" />
  </div>
</template>

<script lang="ts">
import CreateStudent from "./CreateSubject.vue";
import {
  Header,
  Subject,
  PaginationOptions,
  FooterProps,
} from "@/Interfaces/subjects";
export default {
  components: { CreateStudent },
  data() {
    return {
      subjects: [],
      isOpenModal: false,
      loading: false,
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
  methods: {
    openCreate() {
      this.isOpenModal = true;
    },
    handleInput(val: boolean) {
      this.isOpenModal = val;
    },
  },
};
</script>