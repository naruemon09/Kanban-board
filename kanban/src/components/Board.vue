<template>
  <div class="relative overflow-y-auto font-inter ">
    <section class="p-4 sm:p-6 lg:p-8">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">My Boards</h1>
          <p class="text-gray-600 mt-1">Manage and organize your kanban boards</p>
        </div>
        <div v-if="board.length > 0">
          <button
            @click="onToggle"
            class="px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Board
          </button>
        </div>
      </div>

      <CreateBoard :show="isOpen" @close="onClose" />

      <div v-if="board.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">No boards yet</h3>
        <p class="text-gray-600 mb-6">Create your first board to get started</p>
        <button
          @click="onToggle"
          class="px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
        >
          Create First Board
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="boardItem in board"
          :key="boardItem.id"
          class="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          :style="{ backgroundColor: boardItem.color }"
        >
          <CardBoard :board="boardItem" @updated="loadBoards" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CreateBoard from "./CreateBoard.vue";
import CardBoard from "./CardBoard.vue";
import { listBoard } from "../api/board";
import { toast } from "vue3-toastify";

export default {
  components: { CreateBoard, CardBoard },
  data() {
    return {
      isOpen: false,
      board: [],
      pastelColors: [
        "#FFE5E5", "#FFE5CC", "#FFFFCC", "#E5FFCC", "#CCFFE5",
        "#CCF5FF", "#CCE5FF", "#E5CCFF", "#FFCCF5", "#FFE5F5",
        "#F5E5FF", "#E5F5FF", "#FFF5E5", "#F5FFE5", "#FFE5EB"
      ],
    };
  },

  async mounted() {
    this.loadBoards();
  },

  methods: {
    async loadBoards() {
      try {
        const token = localStorage.getItem("token");
        const response = await listBoard(token);
        this.board = response.data.map(b => ({
          ...b,
          color: this.getRandomPastelColor(),
        }));
      } catch (error) {
        console.error(error);
        toast.error("Failed to load boards", { position: "top-right" });
      }
    },

    getRandomPastelColor() {
      return this.pastelColors[Math.floor(Math.random() * this.pastelColors.length)];
    },

    onToggle() {
      this.isOpen = !this.isOpen;
    },

    onClose() {
      this.isOpen = false;
      this.loadBoards();
    },
  },
};
</script>
