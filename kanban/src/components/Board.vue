<script>
import axios from 'axios';
import CreateBoard from './CreateBoard.vue';
export default {
  components: { CreateBoard },
  data() {
    return {
      isOpen: false,
      board: [],
    };
  },

  async mounted() {
    try {
      const storedUser = JSON.parse(localStorage.getItem('User'))
      const email = storedUser.email

      const response = await axios.get('http://localhost:3000/board', {
        params: { email }
      });
      this.board = response.data.board
      this.board = response.data.board.map(b => ({
        ...b,
        isEditing: false,
        newName: ''
      }));

    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    onToggle() {
      this.isOpen = !this.isOpen;
    },
    onClose() {
      this.isOpen = false;
    },
    editing(boardItem) {
      boardItem.isEditing = true;
      boardItem.newName = boardItem.board_name;
    },
    async saveEdit(boardItem) {
      try {
        this.newName = null
        const storedUser = JSON.parse(localStorage.getItem('User'))
        const email = storedUser.email
        const response = await axios.put(`http://localhost:3000/board/${boardItem.board_name}`, {
          new_board_name: boardItem.newName,
        }, {
          params: { email }
        });
        if (response.data.res === 0) {
          this.$emit('close')
          boardItem.board_name = boardItem.newName;
          boardItem.isEditing = false;
          window.location.reload()
        } else {
          this.error = response.data.errorMessage
        }

      } catch (error) {
        console.error(error);
      }
    },

    async deleteBoard(boardItem) {
      try {
        this.newName = null
        const storedUser = JSON.parse(localStorage.getItem('User'))
        const email = storedUser.email
        const response = await axios.delete(`http://localhost:3000/board/${boardItem.board_name}`, {
          params: { email }
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

    <section class="p-6">
      <div class="flex justify-end mb-6">
        <button @click="onToggle"
          class="px-6 h-12 text-white font-semibold rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-300 shadow-sm">
          + New Board
        </button>
      </div>

      <CreateBoard :show="isOpen" @close="onClose" />

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="boardItem in board" :key="boardItem.board_name"
          class="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
          <div class="flex justify-end">
            <button @click="deleteBoard(boardItem)" class="text-sm text-blue-600 hover:underline ml-2"><img
                class="h-6 w-auto" src="\src\assets\106830.png" /></button>
          </div>

          <div class="flex items-center gap-2">
            <template v-if="boardItem.isEditing">
              <input v-model="boardItem.newName" class="border px-2 py-1 rounded" />
              <button @click="saveEdit(boardItem)"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none">Save</button>
            </template>
            <template v-else>
              <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900"> {{ boardItem.board_name }}</h5>
              <button @click="editing(boardItem)" class="text-sm text-blue-600 hover:underline ml-2"><img
                  class="h-10 w-auto" src="\src\assets\edit-270.png" /></button>
            </template>
          </div>
          <RouterLink :to="`/column/${boardItem.board_name}`"
            class=" mt-6 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            Task
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
