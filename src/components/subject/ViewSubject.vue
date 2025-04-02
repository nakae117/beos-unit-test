<template>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-title>
                <h3>Info Materia</h3>
            </v-card-title>
            <v-card-text v-if="data">
                <v-list>
                    <v-list-item>
                        <v-list-item-title><strong>Nombre:</strong> {{ data.name }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title><strong>Código:</strong> {{ data.code }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title><strong>Créditos:</strong> {{ data.credits }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title><strong>Modo:</strong> {{ data.mode }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title><strong>Estudiantes Inscritos:</strong> {{ data.studentsEnrolled
                            }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-card-actions class="d-flex justify-end px-4 py-4">
                <v-spacer />
                <v-btn id="close-button" class="mr-4" @click="closeModal">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Subject } from '@/Interfaces/subjects';
export default {
    name: "ViewSubject",
    props: {
        data: { type: Object as () => Subject, required: true },
        value: { type: Boolean, default: false },
    },
    data() {
        return {
        };
    },
    computed: {
        dialog: {
            get() {
                return this.value;
            },
            set(val: boolean) {
                this.$emit("input", val);
            },
        },
    },
    watch: {
        value(val) {
            this.dialog = val;
        },
        dialog(val) {
            this.$emit("input", val);
        },
    },
    methods: {

        closeModal() {
            this.dialog = false;
        },
    },
};
</script>