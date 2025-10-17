<template>
  <body class="font-inter min-h-screen overflow-x-hidden">
    <section class="min-h-screen flex items-center justify-center relative p-4">
      <img
        src="\src\assets\pastel-pink-blue.jpg"
        class="w-full h-full object-cover fixed inset-0 -z-10"
        alt="Background"
      />

      <div class="w-full max-w-lg my-8">
        <div class="rounded-2xl bg-white shadow-xl">
          <form @submit.prevent="login" class="p-6 sm:p-8 lg:p-11">
            <div class="mb-8 sm:mb-11">
              <div class="flex flex-col items-center">
                <img
                  class="h-16 sm:h-20 w-auto mb-3"
                  src="\src\assets\3429149.png"
                  alt="Kanban Board Logo"
                />
                <h1
                  class="text-gray-900 text-center font-manrope text-2xl sm:text-3xl font-bold leading-tight"
                >
                  Kanban Board
                </h1>
              </div>
            </div>

            <input
              type="email"
              v-model="form.email"
              required
              class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-base sm:text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent px-4 mb-4 sm:mb-6"
              placeholder="Email"
            />

            <input
              type="password"
              v-model="form.password"
              required
              class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-base sm:text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent px-4 mb-1"
              placeholder="Password"
            />

            <button
              type="submit"
              class="mt-4 sm:mt-6 w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-8 sm:mb-11 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            > Login
            </button>

            <RouterLink
              to="/register"
              class="flex flex-col sm:flex-row justify-center text-center sm:text-left text-gray-900 text-sm sm:text-base font-medium leading-6"
            >
              <span>Don't have an account?</span>
              <span class="text-indigo-600 font-semibold sm:pl-3 mt-1 sm:mt-0">
                Sign Up
              </span>
            </RouterLink>
          </form>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
import { login } from "../api/auth";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await login(this.form);
        localStorage.setItem("User", JSON.stringify(response.data.payload));

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        console.log(response.data);

        this.$router.push("/board");
      } catch (error) {
        toast.error(error.response.data, {
          position: "top-right",
        });
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  input::placeholder {
    font-size: 0.875rem;
  }
}
</style>
