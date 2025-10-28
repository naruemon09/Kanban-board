<template>
  <div v-if="noti.length > 0">
    <div
      v-for="item in noti"
      :key="item.id"
      class="px-4 py-3 border-b border-gray-200 flex items-start gap-3"
    >
      <div
        :class="[
          'w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold shadow-sm',
          item.type === 'board'
            ? 'bg-gradient-to-br from-indigo-400 to-purple-500'
            : 'bg-gradient-to-br from-green-400 to-emerald-500',
        ]"
      >
        <svg
          v-if="item.type === 'board'"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 
               2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192
               a48.424 48.424 0 0 0-1.123-.08m-5.801 0
               c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5
               a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664
               m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15
               c1.012 0 1.867.668 2.15 1.586
               m-5.8 0c-.376.023-.75.05-1.124.08
               C9.095 4.01 8.25 4.973 8.25 6.108V8.25
               m0 0H4.875c-.621 0-1.125.504-1.125 1.125
               v11.25c0 .621.504 1.125 1.125 1.125h9.75
               c.621 0 1.125-.504 1.125-1.125V9.375
               c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Z
               m0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      </div>

      <div class="flex flex-col text-left">
        <p class="text-sm font-semibold text-gray-900">
          <template v-if="item.type === 'board'">
            You were added to board
            <span class="text-indigo-600 font-semibold">{{
              item.data.boardName
            }}</span>
          </template>
          <template v-else>
            You were added to task
            <span class="text-emerald-600 font-semibold">{{
              item.data.taskName
            }}</span>
          </template>
        </p>
        <p class="text-xs text-gray-500">
          {{ new Date(item.createdAt).toLocaleString() }}
        </p>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-6 text-gray-500">
    No notifications found.
  </div>
</template>

<script>
import { notifications } from "../api/user";

export default {
  data() {
    return {
      noti: [],
    };
  },

  async mounted() {
    await this.loadNotification();
  },

  methods: {
    async loadNotification() {
      try {
        const token = localStorage.getItem("token");
        const response = await notifications(token);
        this.noti = response.data || [];
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    },
  },
};
</script>
