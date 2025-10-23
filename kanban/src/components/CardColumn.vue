<template>
  <div class="bg-white rounded-lg shadow-sm p-4">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
        <h2 class="text-lg font-semibold text-gray-800">
          {{ column.columnName }}
          <span class="ml-2 text-sm text-gray-500">{{ column.length }}</span>
        </h2>
        <div class="absolute top-4 right-4 flex gap-2 z-10">
          <button
            @click="editing(column)"
            class="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow-md group/edit"
            title="Edit Column"
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
            @click="deleteColumn(column)"
            class="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md group/delete"
            title="Delete Column"
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

      <div class="flex gap-2">
        <button
          @click="emit('openTaskModal', column.id)"
          class="text-orange-500 hover:text-orange-600"
        >
          <i class="fa fa-plus"></i>
        </button>
        <button
          @click="emit('deleteColumn', column.id)"
          class="text-gray-400 hover:text-red-500"
        >
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>

    <div class="space-y-3">
      <TaskCard
        v-for="task in column.tasks"
        :key="task.id"
        :task="task"
        :columnId="column.id"
        @deleteTask="emit('deleteTask', column.id, task.id)"
      />
    </div>

    <button
      @click="emit('openTaskModal', column.id)"
      class="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-purple-600 hover:border-purple-400 hover:bg-purple-50 flex items-center justify-center gap-2 transition-colors"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      <span>Add Task</span>
    </button>
  </div>
</template>

<script>
import { removeColumn, updateColumn } from "../api/column";
import { toast } from "vue3-toastify";

export default {
  props: ["column"],
  emits: ["updated"],

  methods: {
    editing(column) {
      column.isEditing = true;
      column.newName = column.columnName;
    },

    cancelEdit(column) {
      column.isEditing = false;
      column.newName = "";
    },

    async saveEdit(column) {
      try {
        console.log(column);
        const token = localStorage.getItem("token");
        const response = await updateColumn(token, column.id, {
          columnName: column.newName,
        });

        if (response.status === 200) {
          column.columnName = column.newName;
          column.isEditing = false;
          toast.success("Column updated successfully! 🎉");
          this.$emit("updated");
        } else {
          toast.error(response.data.errorMessage || "Failed to update column");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to update column. Please try again.");
      }
    },

    async deleteColumn(column) {
      if (!confirm(`Are you sure you want to delete "${column.columnName}"?`))
        return;

      try {
        const token = localStorage.getItem("token");
        const response = await removeColumn(token, column.id);

        if (response.status === 200) {
          toast.success("Column deleted successfully! 🗑️");
          this.$emit("updated");
        } else {
          toast.error(response.data.errorMessage || "Failed to delete column");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete column. Please try again.");
      }
    },
  },
};
</script>
