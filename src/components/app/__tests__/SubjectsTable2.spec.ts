import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Vue from 'vue';
import Vuetify from 'vuetify';
import SubjectTable from '@/components/subject/SubjectTable.vue';
import { server } from "@/mocks/server";
import { getSubjects } from "@/services/subject";
import { Subject } from '@/Interfaces/subjects';
Vue.use(Vuetify);

describe('SubjectTable.vue', () => {
    beforeAll(() => server.listen());
    afterEach(() => {
        cleanup();
        server.resetHandlers();
    });
    afterAll(() => server.close());
    let mockSubjects: Subject[];

    beforeEach(async () => {
        const app = document.createElement('div');
        app.setAttribute('data-app', 'true');
        document.body.appendChild(app);

        const subjects = await getSubjects();
        mockSubjects = subjects.data;
    });

    const renderComponent = () => {
        const vuetify = new Vuetify();
        return render(SubjectTable, {
            vuetify,
            data() {
                return {
                    isOpenModal: false,
                    loading: false,
                    updateData: false,
                    total: 1,
                };
            },
        });
    };
    describe('before data is loaded', () => {
        it('renders a loading', async () => {
            renderComponent();
            waitFor(() => {
                expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
                expect(screen.queryByRole('table')).not.toBeInTheDocument();
            });
        });
    });


    describe('after data is loaded', () => {
        it("render data", async () => {
            renderComponent();

            await waitFor(() => expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument());

            const rows = await screen.findAllByRole('row');
            expect(rows.length).toBeGreaterThan(0);

            const subjects = (await getSubjects()).data;

            subjects.forEach((subject, index) => {
                const cells = rows[index + 1].querySelectorAll("td");
                expect(cells.length).toBe(6);
                expect(cells[0].textContent).toBe(subject.code);
                expect(cells[1].textContent).toBe(subject.name);
                expect(cells[2].textContent).toBe(String(subject.credits));
                expect(cells[3].textContent).toBe(String(subject.studentsEnrolled));
                expect(cells[4].textContent).toBe(subject.mode);
            });

        });

        describe("pagination", () => {
            it("should verify if pagination is rendered", async () => {
                renderComponent();

                waitFor(() => {
                    expect(screen.findByRole("navigation")).toBeTruthy();
                });
            });

            // it("should verify when next page is clicked", async () => {
            //     renderComponent();

            //     waitFor(() => {
            //         const nextPageButton = screen.getByLabelText("Next page");
            //         expect(nextPageButton).toBeEnabled();
            //         fireEvent.click(nextPageButton);
            //     });

            //     waitFor(() => {
            //         expect(screen.getByText("Page 2")).toBeInTheDocument();
            //     });
            // });

            // it("should verify when previous page is clicked", async () => {
            //     renderComponent();
            //     const nextPageButton = screen.getByLabelText("Next page");
            //     fireEvent.click(nextPageButton);

            //     waitFor(() => {
            //         const prevPageButton = screen.getByLabelText("Previous page");
            //         expect(prevPageButton).toBeEnabled();
            //         fireEvent.click(prevPageButton);
            //     });

            //     waitFor(() => {
            //         expect(screen.getByText("Page 1")).toBeInTheDocument();
            //     });
            // });
        });

        describe("actions", () => {
            it("should verify if actions are rendered", async () => {
                renderComponent();
                await waitFor(() => expect(screen.getByRole("table")).toBeInTheDocument());

                const rows = await screen.findAllByRole("row");

                expect(rows.length).toBeGreaterThan(0);
                rows.slice(1).forEach((row) => {
                    const actionButtons = row.querySelectorAll("button");

                    expect(actionButtons.length).toBe(3);

                    const visibilityButton = row.querySelector("#visibility");
                    const editButton = row.querySelector("#edit");
                    const deleteButton = row.querySelector("#delete");

                    expect(visibilityButton).toBeTruthy();
                    expect(editButton).toBeTruthy();
                    expect(deleteButton).toBeTruthy();
                });
            });

        });
    });

});