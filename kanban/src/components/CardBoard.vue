<template>
  <div class="relative">
    <div class="absolute top-4 right-4 flex gap-2 z-10">
      <button
        @click="editing(board)"
        class="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow-md group/edit"
        title="Edit Board"
      >
        <svg
          class="w-5 h-5 text-gray-700 group-hover/edit:text-indigo-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
      <button
        @click="deleteBoard(board)"
        class="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md group/delete"
        title="Delete Board"
      >
        <svg
          class="w-5 h-5 text-gray-700 group-hover/delete:text-red-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>

    <div class="p-6 pt-16">
      <template v-if="board.isEditing">
        <div class="space-y-3">
          <input
            v-model="board.newName"
            class="w-full px-4 py-3 bg-white/95 border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 font-semibold text-lg"
            @keyup.enter="saveEdit(board)"
            @keyup.esc="cancelEdit(board)"
            placeholder="Board name"
            autofocus
          />
          <div class="flex gap-2">
            <button
              @click="saveEdit(board)"
              class="flex-1 px-4 py-2.5 text-white font-medium bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save
            </button>
            <button
              @click="cancelEdit(board)"
              class="flex-1 px-4 py-2.5 text-gray-700 font-medium bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <h5
          class="text-2xl font-bold text-gray-900 mb-6 line-clamp-2 min-h-[3.5rem]"
        >
          {{ board.boardName }}
        </h5>

        <RouterLink
          :to="`/column/${board.id}`"
          class="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg group/view"
        >
          <span>Open Board</span>
          <svg
            class="w-4 h-4 ml-2 transform group-hover/view:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<script>
import { removeBoard, updateBoard } from "../api/board";
import { toast } from "vue3-toastify";

export default {
  props: ["board"],
  emits: ["updated"],

  methods: {
    editing(board) {
      board.isEditing = true;
      board.newName = board.boardName;
    },

    cancelEdit(board) {
      board.isEditing = false;
      board.newName = "";
    },

    async saveEdit(board) {
      try {
        console.log(board);
        const token = localStorage.getItem("token");
        const response = await updateBoard(token, board.id, {
          boardName: board.newName,
        });

        if (response.status === 200) {
          board.boardName = board.newName;
          board.isEditing = false;
          toast.success("Board updated successfully! 🎉");
          this.$emit("updated");
        } else {
          toast.error(response.data.errorMessage || "Failed to update board");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to update board. Please try again.");
      }
    },

    async deleteBoard(board) {
      if (!confirm(`Are you sure you want to delete "${board.boardName}"?`))
        return;

      try {
        const token = localStorage.getItem("token");
        const response = await removeBoard(token, board.id);

        if (response.status === 200) {
          toast.success("Board deleted successfully! 🗑️");
          this.$emit("updated");
        } else {
          toast.error(response.data.errorMessage || "Failed to delete board");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete board. Please try again.");
      }
    },
  },
};
</script>
