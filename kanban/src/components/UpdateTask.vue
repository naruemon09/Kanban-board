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
        class="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center max-h-[80vh] overflow-y-auto"
      >
        <div class="text-center">
          <h2 class="text-2xl font-bold py-4">Update Task</h2>

          <div class="mb-4 text-left">
            <label class="block text-gray-700 font-medium mb-1"
              >Task Name</label
            >
            <input
              type="text"
              v-model="form.taskName"
              class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg border border-gray-300 rounded-full px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter task name"
            />
          </div>

          <div class="mb-4 text-left">
            <label class="block text-gray-700 font-medium mb-1"
              >Description</label
            >
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full text-gray-900 placeholder:text-gray-400 text-lg border border-gray-300 rounded-2xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div class="mb-4 text-left">
            <label class="block text-gray-700 font-medium mb-1">Tags</label>
            <div
              v-for="(tag, index) in form.tags"
              :key="index"
              class="flex items-center gap-2 mb-2"
            >
              <input
                type="text"
                v-model="form.tags[index]"
                class="flex-1 h-10 text-gray-900 placeholder:text-gray-400 text-md border border-gray-300 rounded-full px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Design, Bug"
              />
              <button
                @click="removeTag(index)"
                class="text-red-500 hover:text-red-700 font-bold text-lg"
                title="Remove tag"
              >
                <svg
                  class="w-5 h-5 text-red-500 group-hover/delete:text-red-600 transition-colors"
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
            <button
              @click="addTag"
              class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              + Add Tag
            </button>
          </div>

          <div class="mb-4 text-left relative">
            <label class="block text-gray-700 font-medium mb-1"
              >Assign To (Emails)</label
            >
            <div
              v-for="(email, index) in form.members"
              :key="index"
              class="flex flex-col mb-2 relative"
            >
              <div class="flex items-center gap-2">
                <input
                  type="text"
                  v-model="form.members[index]"
                  @input="handleInput(index)"
                  class="flex-1 h-10 text-gray-900 placeholder:text-gray-400 text-md border border-gray-300 rounded-full px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="user@example.com"
                />
                <button
                  @click="removeEmail(index)"
                  class="text-red-500 hover:text-red-700 font-bold text-lg"
                  title="Remove email"
                >
                  <svg
                    class="w-5 h-5 text-red-500 group-hover/delete:text-red-600 transition-colors"
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
              <ul
                v-if="suggestions.length > 0 && activeEmailIndex === index"
                class="absolute left-0 right-0 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg mt-2 max-h-56 overflow-y-auto z-20"
              >
                <li
                  v-for="(user, i) in suggestions"
                  :key="i"
                  @click="selectUser(user.email)"
                  class="px-4 py-3 text-left hover:bg-indigo-50 hover:shadow-sm cursor-pointer transition-all duration-200 border-b last:border-b-0 border-gray-100 flex flex-col"
                >
                  <span class="text-base font-semibold text-gray-900"
                    >{{ user.firstname }} {{ user.lastname }}</span
                  >
                  <span class="text-sm text-gray-600">{{ user.email }}</span>
                </li>
              </ul>
            </div>
            <button
              @click="addEmail"
              class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              + Add Email
            </button>
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
            @click="updateTask"
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
import { updateTask } from "../api/task";
import { searchUserByEmailInBoard } from "../api/user";
export default {
  props: ["show", "taskId", "task"],
  emits: ["close"],

  data() {
    return {
      form: {
        taskName: "",
        description: "",
        columnId: "",
        tags: [""],
        members: [""],
      },
      suggestions: [],
      typingTimer: null,
      activeEmailIndex: null,
    };
  },

  async mounted() {
    this.loadTask();
  },

  methods: {
    addTag() {
      this.form.tags.push("");
    },
    removeTag(index) {
      this.form.tags.splice(index, 1);
    },
    addEmail() {
      this.form.members.push("");
    },
    removeEmail(index) {
      this.form.members.splice(index, 1);
    },

    handleInput(index) {
      this.activeEmailIndex = index;
      clearTimeout(this.typingTimer);
      const val = this.form.members[index];

      if (val.includes("@")) {
        this.typingTimer = setTimeout(() => {
          this.searchUser(val);
        }, 400);
      } else {
        this.suggestions = [];
      }
    },

    async searchUser(email) {
      try {
        const token = localStorage.getItem("token");
        const id = this.$route.params.id;
        const res = await searchUserByEmailInBoard(token, email, id)
        this.suggestions = res.data.userAll || [];
      } catch (err) {
        console.error(err);
        this.suggestions = [];
      }
    },

    selectUser(selectedEmail) {
      if (this.activeEmailIndex !== null) {
        this.form.members[this.activeEmailIndex] = selectedEmail;
      }
      this.suggestions = [];
    },

    async loadTask() {
      try {
        this.form = {
          taskName: this.task.taskName,
          description: this.task.description,
          columnId: this.task.columnId,
          tags: this.task.tags,
          members: this.task.members.map((m) => m.email),
        };
      } catch (error) {
        console.error(error);
      }
    },

    async updateTask() {
      try {
        const token = localStorage.getItem("token");
        const response = await updateTask(token, this.taskId, this.form);

        if (response.status === 200) {
          this.$emit("close");
        } else {
          console.log(response.data || "Failed to update task");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 100, 100, 0.5);
}
</style>
