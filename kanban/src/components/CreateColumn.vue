<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div
        @click="$emit('close')"
        class="absolute inset-0 bg-black opacity-70"
      ></div>

      <div
        class="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center"
      >
        <div class="text-center">
          <h2 class="text-2xl font-bold py-4">Create New Column</h2>
          <div class="mt-6">
            <input
              type="text"
              v-model="form.column_name"
              class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg border border-gray-300 rounded-full px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="New Column"
            />
          </div>
        </div>

        <div class="p-3 mt-4 text-center space-x-4">
          <button
            @click="$emit('close')"
            class="bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:bg-gray-100"
          >
            Close
          </button>
          <button
            @click="createColumn"
            class="bg-indigo-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-md hover:bg-indigo-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { createColumn } from "../api/column";
export default {
  props: ["show"],
  emits: ["close"],

  data() {
    return {
      form: {
        column_name: "",
        board_id: "",
      },
    };
  },

  methods: {
    async createColumn() {
      try {
        const token = localStorage.getItem("token");
        const id = this.$route.params.id;
        this.form.board_id = id;
        const response = await createColumn(token, this.form);
        this.$emit("close");
        window.location.reload();
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
