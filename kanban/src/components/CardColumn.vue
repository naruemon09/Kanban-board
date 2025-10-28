<template>
  <div class="bg-white rounded-lg shadow-sm p-4 relative flex flex-col h-full">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2 w-full">
        <template v-if="column.isEditing">
          <div class="flex gap-2 w-full">
            <input
              v-model="column.newName"
              class="w-full px-2 py-1.5 bg-white/95 border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 font-semibold text-lg"
              @keyup.enter="saveEdit(column)"
              @keyup.esc="cancelEdit(column)"
              placeholder="Column name"
              autofocus
            />
            <button
              @click="saveEdit(column)"
              class="flex-1 px-2 py-1.5 text-white font-medium bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
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
              @click="cancelEdit(column)"
              class="flex-1 px-2 py-1.5 text-gray-600 font-medium bg-white rounded-lg border hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </template>

        <template v-else>
          <h2 class="text-lg font-semibold text-gray-800">
            {{ column.columnName }}
            <span
              class="px-2 py-1 ml-2 text-sm text-gray-500 bg-gray-200 rounded-3xl"
              >{{ task.length }}</span
            >
          </h2>

          <div class="ml-auto flex gap-2">
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
        </template>
      </div>
    </div>

    <draggable
      v-model="task"
      group="tasks"
      item-key="id"
      :animation="200"
      @change="onChange"
      class="space-y-3 flex-1 min-h-[100px]"
    >
      <template #item="{ element }">
        <div>
          <CardTask :task="element" @updated="loadTask" />
        </div>
      </template>
    </draggable>

    <button
      @click="onToggle(column.id)"
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

    <CreateTask :show="isOpen" @close="onClose" :columnId="selectedColumnId" />
  </div>
</template>

<script>
import { removeColumn, updateColumn } from "../api/column";
import { toast } from "vue3-toastify";
import { listTask, moveTask } from "../api/task";
import CreateTask from "./CreateTask.vue";
import CardTask from "./CardTask.vue";
import draggable from "vuedraggable";

export default {
  props: ["column"],
  emits: ["updatedColumn"],
  components: { CreateTask, CardTask, draggable },

  data() {
    return {
      isOpen: false,
      selectedColumnId: null,
      task: [],
      drag: false,
    };
  },

  async mounted() {
    await this.loadTask();
  },

  methods: {
    editing(column) {
      column.isEditing = true;
      column.newName = column.columnName;
    },

    cancelEdit(column) {
      column.isEditing = false;
      column.newName = "";
    },

    onToggle(id) {
      this.selectedColumnId = id;
      this.isOpen = true;
    },

    async onClose() {
      this.isOpen = false;
      await this.loadTask();
    },

    async onChange(evt) {
      console.log("Change event:", evt);
      
      if (evt.added) {
        const movedTask = evt.added.element;
        const newColumnId = this.column.id;
        
        if (movedTask.columnId !== newColumnId) {
          await this.MoveTask(movedTask.id, newColumnId);
        }
      }
    },

    async saveEdit(column) {
      try {
        const token = localStorage.getItem("token");
        const response = await updateColumn(token, column.id, {
          columnName: column.newName,
        });

        if (response.status === 200) {
          column.columnName = column.newName;
          column.isEditing = false;
          toast.success("Column updated successfully!");
          this.$emit("updatedColumn");
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
          this.$emit("updatedColumn");
        } else {
          toast.error(response.data.errorMessage || "Failed to delete column");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete column. Please try again.");
      }
    },

    async loadTask() {
      try {
        const token = localStorage.getItem("token");
        const response = await listTask(token);
        this.task = response.data.filter((t) => t.columnId === this.column.id);
      } catch (error) {
        console.error(error);
      }
    },

    async MoveTask(taskId, newColumnId) {
      try {
        const token = localStorage.getItem("token");
        const response = await moveTask(token, taskId, {columnId:newColumnId});

        if (response.status === 200) {
          toast.success("Task moved successfully!");
          this.$emit("updatedColumn");
        } else {
          toast.error("Failed to move task");
          await this.loadTask();
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to move task. Please try again.");
        await this.loadTask();
      }
    },
  },
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.3s;
}
</style>