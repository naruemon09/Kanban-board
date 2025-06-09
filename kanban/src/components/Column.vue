<script>
import axios from 'axios';
import CreateTask from './CreateTask.vue';
export default {
    components: { CreateTask },
    data() {
        return {
            column_name: '',
            isOpen: false,
            column: [],
            task: [],
            selectedColumnName: ''
        };
    },

    async mounted() {
        try {
            const storedUser = JSON.parse(localStorage.getItem('User'))
            const email = storedUser.email
            const responseColumn = await axios.get('http://localhost:3000/column', {
                params: { email }
            });
            const responseTask = await axios.get('http://localhost:3000/task', {
                params: { email }
            });
            this.column = responseColumn.data.column
            this.task = responseTask.data.task
            this.column = responseColumn.data.column.map(c => ({
                ...c,
                isEditing: false,
                newName: ''
            }));
            this.task = responseTask.data.task.map(t => ({
                ...t,
                isEditing: false,
                newName: ''
            }));

        } catch (error) {
            console.error(error);
        }
    },

    methods: {
        onToggle(columnName) {
            this.selectedColumnName = columnName;
            this.isOpen = !this.isOpen;
        },
        onClose() {
            this.isOpen = false;
            this.selectedColumnName = '';
        },
        editingColume(columnItem) {
            columnItem.isEditing = true;
            columnItem.newName = columnItem.column_name;
        },
        editingTask(taskItem) {
            taskItem.isEditing = true;
            taskItem.newName = taskItem.task_name;
        },

        async createColumn() {
            try {
                const storedUser = JSON.parse(localStorage.getItem('User'))
                const email = storedUser.email
                const response = await axios.post('http://localhost:3000/createColumn', {
                    column_name: this.column_name,
                    board_name: this.$route.params.board_name,
                }, {
                    params: { email }
                });
                if (response.data.res === 0) {
                    this.column = ''
                    window.location.reload()
                } else {
                    this.error = response.data.errorMessage
                }

            } catch (error) {
                console.error(error);
            }
        },
        async saveEditColumn(columnItem) {
            try {
                const storedUser = JSON.parse(localStorage.getItem('User'));
                const email = storedUser.email;
                const response = await axios.put(`http://localhost:3000/column/${columnItem.column_name}`, {
                    new_column_name: columnItem.newName,
                    board_name: this.$route.params.board_name
                }, {
                    params: { email }
                });
                if (response.data.res === 0) {
                    columnItem.column_name = columnItem.newName;
                    columnItem.isEditing = false;
                    window.location.reload();
                } else {
                    this.error = response.data.errorMessage;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async saveEditTask(taskItem) {
            try {
                const storedUser = JSON.parse(localStorage.getItem('User'));
                const email = storedUser.email;
                const response = await axios.put(`http://localhost:3000/task/${taskItem.task_name}`, {
                    new_task_name: taskItem.newName,
                    column_name: taskItem.column_name
                }, {
                    params: { email }
                });
                if (response.data.res === 0) {
                    taskItem.task_name = taskItem.newName;
                    taskItem.isEditing = false;
                    window.location.reload();
                } else {
                    this.error = response.data.errorMessage;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async deleteColumn(columnItem) {
            try {
                this.newName = null
                const storedUser = JSON.parse(localStorage.getItem('User'))
                const email = storedUser.email
                const response = await axios.delete(`http://localhost:3000/column/${columnItem.column_name}`,
                    {
                        params: { 
                            email ,
                            board_name: this.$route.params.board_name
                        }
                    });
                if (response.data.res === 0) {
                    window.location.reload()
                } else {
                    this.error = response.data.errorMessage
                }

            } catch (error) {
                console.error(error);
            }
        },
        async deleteTask(taskItem) {
            try {
                this.newName = null
                const storedUser = JSON.parse(localStorage.getItem('User'))
                const email = storedUser.email
                const response = await axios.delete(`http://localhost:3000/task/${taskItem.task_name}`,
                    {
                    params: { 
                        email ,
                        column_name: taskItem.column_name}
                    });
                if (response.data.res === 0) {
                    window.location.reload()
                } else {
                    this.error = response.data.errorMessage
                }

            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<template>
    <div class="relative h-screen overflow-y-auto font-inter">
        <div class="fixed inset-0 -z-10">
            <img src="\src\assets\pastel-pink-blue.jpg" class="w-full h-full object-cover" />
        </div>
        <div class="absolute justify-start m-8">
            <RouterLink to="/board"
                class="px-6 py-3 w-20 h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-red-800 transition-all duration-700 bg-red-600 shadow-sm">
                BACK</RouterLink>
        </div>

        <div class="flex justify-end m-6">
            <input type="text" v-model="column_name"
                class="w-80 h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1 bg-gray-200 mr-2"
                placeholder="New Column">
            <button @click="createColumn"
                class="w-20 h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-6">ADD</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
            <div v-for="columnItem in column.filter(t => t.board_name === $route.params.board_name)" 
                :key="columnItem.column_name"
                class="block p-6 bg-gray-100 rounded-lg shadow-sm">
                <div class="flex items-center justify-between mb-2">
                    <template v-if="columnItem.isEditing">
                        <input v-model="columnItem.newName" class="border px-2 py-1 rounded mr-2" />
                        <button @click="saveEditColumn(columnItem)"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none">Save</button>
                    </template>
                    <template v-else>
                        <h5 class="text-xl font-bold tracking-tight text-gray-900">{{ columnItem.column_name }}</h5>
                        <div class="flex justify-end gap-3">
                            <button @click="editingColume(columnItem)">
                                <img class="h-5 w-5" src="\src\assets\edit-270.png" />
                            </button>
                            <button @click="deleteColumn(columnItem)">
                                <img class="h-4 w-auto " src="\src\assets\106830.png" />
                            </button>
                        </div>
                    </template>
                </div>
                <div v-for="taskItem in task.filter(t => t.column_name === columnItem.column_name)"
                    :key="taskItem.task_name" class="block p-4 my-2 bg-white rounded shadow-sm">
                    <div class="flex justify-between items-center">
                        <template v-if="taskItem.isEditing">
                            <input v-model="taskItem.newName" class="border px-2 py-1 rounded mr-2 w-full" />
                            <button @click="saveEditTask(taskItem)"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none">Save</button>
                        </template>
                        <template v-else>
                            <h5 class="text-sm font-medium text-gray-800">{{ taskItem.task_name }}</h5>
                            <div class="flex justify-end gap-3">
                                <button @click="editingTask(taskItem)">
                                    <img class="h-5 w-5" src="\src\assets\edit-270.png" />
                                </button>
                                <button @click="deleteTask(taskItem)">
                                    <img class="h-4 w-auto " src="\src\assets\106830.png" />
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
                <button @click="onToggle(columnItem.column_name)"
                    class="w-full h-8 text-white text-center text-xs font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-6">+
                    New Task</button>
                <CreateTask v-if="isOpen && selectedColumnName === columnItem.column_name" :show="isOpen"
                    @close="onClose" :column_name="columnItem.column_name" />
            </div>
        </div>
    </div>
</template>