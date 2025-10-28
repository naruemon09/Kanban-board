<template>
  <div
    :class="[
      'rounded-lg p-4 shadow-sm border-l-4 transition-all duration-200 transform hover:scale-[1.02] cursor-move group',
      bgColor,
      borderColor,
    ]"
  >
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-medium text-gray-800">{{ task.taskName }}</h3>

      <div
        class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <button
          @click="onToggle(task.id)"
          class="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow-md group/edit"
          title="Update Task"
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
          @click="deleteTask(task)"
          class="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md group/delete"
          title="Delete Task"
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
    </div>

    <p class="text-sm text-gray-600 mb-3">{{ task.description }}</p>

    <div class="flex flex-wrap gap-2 mb-3">
      <span
        v-for="(tag, idx) in task.tags"
        :key="idx"
        class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
      >
        #{{ tag }}
      </span>
    </div>

    <div class="flex flex-wrap gap-2 mb-3">
      <div
        v-for="(assignee, idx) in task.members"
        :key="idx"
        class="px-2 py-1 flex items-center gap-1 text-green-700 text-xs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ assignee.firstname }} {{ assignee.lastname }}</span>
      </div>
    </div>
  </div>
  <UpdateTask
    :show="isOpen"
    @close="onClose"
    :taskId="selectedTaskId"
    :task="task"
  />
</template>

<script>
import { toast } from "vue3-toastify";
import UpdateTask from "./UpdateTask.vue";
import { removeTask } from "../api/task";

export default {
  props: ["task"],
  emits: ["updated"],
  components: { UpdateTask },

  data() {
    return {
      bgColor: "",
      borderColor: "",
      isOpen: false,
      selectedTaskId: null,
    };
  },
  created() {
    const colorPairs = [
      { bg: "bg-blue-50", border: "border-blue-500" },
      { bg: "bg-pink-50", border: "border-pink-500" },
      { bg: "bg-green-50", border: "border-green-500" },
      { bg: "bg-yellow-50", border: "border-yellow-500" },
      { bg: "bg-purple-50", border: "border-purple-500" },
      { bg: "bg-indigo-50", border: "border-indigo-500" },
      { bg: "bg-teal-50", border: "border-teal-500" },
      { bg: "bg-orange-50", border: "border-orange-500" },
    ];

    const random = colorPairs[Math.floor(Math.random() * colorPairs.length)];
    this.bgColor = random.bg;
    this.borderColor = random.border;
  },

  methods: {
    onToggle(id) {
      this.selectedTaskId = id;
      this.isOpen = true;
    },

    onClose() {
      this.isOpen = false;
      this.$emit("updated");
    },

    async deleteTask(task) {
      if (!confirm(`Are you sure you want to delete "${task.taskName}"?`))
        return;

      try {
        const token = localStorage.getItem("token");
        const response = await removeTask(token, task.id);

        if (response.status === 200) {
          toast.success("Task deleted successfully! 🗑️");
          this.$emit("updated");
        } else {
          toast.error(response.data.errorMessage || "Failed to delete task");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete task. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.sortable-ghost {
  opacity: 0.5;
  background: #f3f4f6;
  border: 2px dashed #9ca3af;
}

.sortable-drag {
  opacity: 0.8;
  transform: rotate(3deg);
}
</style>