<script>
import axios from 'axios';
export default {
    props: ['show'],
    emits: ['close'],

    data() {
        return {
            user: [],
            board_name: '',
            assigneeEmails: [],
        };
    },

    async mounted() {
        try {
            const storedUser = JSON.parse(localStorage.getItem('User'))
            const email = storedUser.email

            const response = await axios.get('http://localhost:3000/user', {
                params: { email }
            });
            this.user = response.data.user

        } catch (error) {
            console.error(error);
        }
    },

    methods: {
        async createBoard() {
            try {
                const storedUser = JSON.parse(localStorage.getItem('User'))
                const email = storedUser.email
                console.log(this.assigneeEmails)
                const response = await axios.post('http://localhost:3000/createBoard', {
                    board_name: this.board_name,
                    assigneeEmails: this.assigneeEmails,
                },{
                    params: { email }
                });
                if (response.data.res === 0) {
                    this.$emit('close')
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
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">

            <div @click="$emit('close')" class="absolute inset-0 bg-black opacity-70"></div>

            <div class="relative z-10 w-full max-w-lg p-6 mx-auto my-auto bg-white rounded-xl shadow-lg">
                <div class="text-center">
                    <h2 class="text-2xl font-bold py-4">Create New Board</h2>
                    <div class="mt-6">
                        <input type="text" v-model="board_name"
                            class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
                            placeholder="New Board">
                    </div>
                </div>
                <h2 class="font-bold py-4">Assignee</h2>
                <div v-for="userItem in user" :key="userItem.email" class="flex items-center mb-4">
                    <input type="checkbox" :value="userItem.email" v-model="assigneeEmails"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label class="ms-2 text-sm font-medium text-gray-900">{{ userItem.firstname }} {{ userItem.lastname}}</label>
                </div>

                <div class="p-3 mt-4 text-center space-x-4">
                    <button @click="createBoard"
                        class="bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:bg-gray-100">
                        Save
                    </button>
                    <button @click="$emit('close')"
                        class="bg-indigo-600 px-5 py-2 text-sm text-white font-medium rounded-md hover:bg-indigo-800">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>