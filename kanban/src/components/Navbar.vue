<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="mx-auto px-2">
        <div class="relative flex h-16 items-center justify-between">
          <div
            class="flex flex-1 justify-start items-center sm:items-stretch sm:justify-start"
          >
            <div class="flex shrink-0 items-center ml-2 sm:ml-0">
              <img
                class="h-10 w-auto"
                src="\src\assets\3429149.png"
                alt="Logo"
              />
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:items-center">
              <h1 class="text-gray-700 rounded-md py-2 text-xl font-bold">
                Kanban Board
              </h1>
            </div>
          </div>

          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <template v-if="user && user.email">
              <div class="relative">
                <button
                  @click.stop="toggleNotifications"
                  type="button"
                  class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                  <span class="sr-only">View notifications</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </button>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
                  <div v-if="isNotificationsOpen"
                    class="absolute right-0 mt-2 w-80 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5 z-50">
                    <Notification />
                  </div>
                </transition>
              </div>
              
              <div class="relative ml-3">
                <button
                  @click="toggleUserMenu"
                  class="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="User avatar"
                  />
                </button>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div
                    v-if="isUserMenuOpen"
                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  >
                    <div class="px-4 py-3 border-b border-gray-200">
                      <p class="text-sm font-semibold text-gray-900">
                        Your Profile
                      </p>
                    </div>
                    <div class="px-4 py-3 border-b border-gray-200">
                      <p class="text-xs text-gray-500">Name</p>
                      <p class="text-sm font-medium text-gray-900">
                        {{ user.firstname }} {{ user.lastname }}
                      </p>
                      <p class="text-xs text-gray-500 mt-2">Email</p>
                      <p class="text-sm font-medium text-gray-900">
                        {{ user.email }}
                      </p>
                    </div>
                    <button
                      @click="signOut"
                      class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg
                        class="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </transition>
              </div>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import Notification from "./Notification.vue";
import { io } from "socket.io-client";

export default {
  components: { Notification },
  data() {
    return {
      user: {},
      isUserMenuOpen: false,
      isNotificationsOpen: false,
      socket: null,
    };
  },

  async mounted() {
    try {
      const storedUser = JSON.parse(localStorage.getItem("User"));

      if (!storedUser || !storedUser.email) {
        this.$router.push("/");
        return;
      }

      this.user = storedUser;
      this.initializeSocket();
    } catch (error) {
      this.$router.push("/");
    }

    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    if (this.socket) {
      this.socket.disconnect();
    }
  },

  methods: {
    initializeSocket() {
      this.socket = io("http://localhost:3000");

      this.socket.on("connect", () => {
        console.log("✅ Connected to Socket.IO server");
        
        if (this.user && this.user.id) {
          this.socket.emit("join", this.user.id);
        }
      });

      this.socket.on("notification:new", (data) => {
        console.log("🔔 New notification:", data);
        
        toast.info(data.message, {
          position: "top-right",
          autoClose: 5000,
          icon: "🔔",
        });
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });
    },

    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },

    toggleNotifications() {
      this.isNotificationsOpen = !this.isNotificationsOpen;
    },

    handleClickOutside(event) {
      const userMenu = this.$el.querySelector('.relative.ml-3')
      if (userMenu && !userMenu.contains(event.target)) {
        this.isUserMenuOpen = false
      }

      const notificationMenu = this.$el.querySelector('.relative > .absolute')
      const bellButton = this.$el.querySelector('.relative button')
      if (bellButton && !bellButton.contains(event.target) && notificationMenu && !notificationMenu.contains(event.target)) {
        this.isNotificationsOpen = false
      }
    },

    signOut() {
      if (this.socket) {
        this.socket.disconnect();
      }

      localStorage.removeItem("User");
      localStorage.removeItem("token");
      this.user = {};

      this.isUserMenuOpen = false;

      toast.success("Logged out successfully! 👋", {
        position: "top-right",
        autoClose: 2000,
      });

      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.router-link-active {
  transition: all 0.2s ease;
}
</style>