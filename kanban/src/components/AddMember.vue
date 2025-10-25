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
        <h2 class="text-2xl font-bold py-4">Invite member to the board</h2>

        <div class="mt-4 relative">
          <input
            type="text"
            v-model="form.email"
            @input="handleInput"
            class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 px-5 transition-all duration-200"
            placeholder="Member@example.com"
          />

          <ul
            v-if="suggestions.length > 0"
            class="absolute left-0 right-0 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg mt-2 max-h-56 overflow-y-auto z-20"
          >
            <li
              v-for="(user, index) in suggestions"
              :key="index"
              @click="selectUser(user.email)"
              class="px-4 py-3 text-left hover:bg-indigo-50 hover:shadow-sm cursor-pointer transition-all duration-200 border-b last:border-b-0 border-gray-100 flex items-center gap-3"
            >
              <div class="flex flex-col">
                <h2 class="text-base font-semibold text-gray-900">
                  {{ user.firstname }} {{ user.lastname }}
                </h2>
                <p class="text-sm text-gray-600">{{ user.email }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="p-3 mt-6 text-center space-x-4">
          <button
            @click="$emit('close')"
            class="bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:bg-gray-100"
          >
            Close
          </button>
          <button
            @click="member"
            class="bg-indigo-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-md hover:bg-indigo-800"
          >
            Add Member
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import { addMember } from "../api/user";
import { toast } from "vue3-toastify";

export default {
  props: ["show"],
  emits: ["close"],

  data() {
    return {
      form: {
        email: "",
        board_id: "",
      },
      suggestions: [],
      typingTimer: null,
    };
  },

  methods: {
    handleInput() {
      clearTimeout(this.typingTimer);
      const val = this.form.email;

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
        const res = await axios.get(
          `http://localhost:3000/api/user?email=${encodeURIComponent(email)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.suggestions = res.data.users || [];
      } catch (err) {
        console.error(err);
        this.suggestions = [];
      }
    },

    selectUser(email) {
      this.form.email = email;
      this.suggestions = [];
    },

    async member() {
      try {
        const token = localStorage.getItem("token");
        const id = this.$route.params.id;
        this.form.board_id = id;

        const response = await addMember(token, this.form);
        console.log(response.data);

        this.$emit("close");
        window.location.reload();
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
        });
      }
    },
  },
};
</script>
