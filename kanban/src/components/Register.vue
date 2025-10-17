<template>
  <body class="font-inter min-h-screen overflow-x-hidden">
    <section class="min-h-screen flex items-center justify-center relative p-4">
      <img
        src="\src\assets\pastel-pink-blue.jpg"
        class="w-full h-full object-cover fixed inset-0 -z-10"
        alt="Background"
      />

      <div class="w-full max-w-2xl my-8">
        <div class="rounded-2xl bg-white shadow-xl">
          <form @submit.prevent="register" class="p-6 sm:p-8 lg:p-11">
            <div class="mb-8 sm:mb-11">
              <h1
                class="text-gray-900 font-manrope text-2xl sm:text-3xl font-bold leading-tight mb-2"
              >
                Sign Up
              </h1>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <input
                type="text"
                v-model="form.firstname"
                required
                class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-base sm:text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent px-4 mb-4 sm:mb-6"
                placeholder="Firstname"
              />
              <input
                type="text"
                v-model="form.lastname"
                required
                class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-base sm:text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent px-4 mb-4 sm:mb-6"
                placeholder="Lastname"
              />
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
              minlength="6"
              class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-base sm:text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent px-4 mb-4 sm:mb-6"
              placeholder="Password"
            />

            <input
              type="password"
              v-model="form.confirmPassword"
              required
              minlength="6"
              class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-base sm:text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent px-4 mb-4 sm:mb-6"
              placeholder="Confirm Password"
            />

            <button
              type="submit"
              class="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-4 sm:mb-6"
            >
              Register
            </button>

            <RouterLink
              to="/"
              class="flex flex-col sm:flex-row text-center sm:text-left text-gray-900 text-sm sm:text-base font-medium leading-6"
            >
              <span>Already have an account?</span>
              <span class="text-indigo-600 font-semibold sm:pl-3 mt-1 sm:mt-0">
                Sign in here
              </span>
            </RouterLink>
          </form>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
import { register } from "../api/auth";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        if (this.form.password !== this.form.confirmPassword) {
          toast.error("Passwords do not match", {
            position: "top-right",
          });
          return;
        }
        if (this.form.password.length < 6) {
          toast.error("Password must be at least 6 characters", {
            position: "top-right",
          });
          return;
        }
        const response = await register(this.form);
        this.$router.push("/");
        toast.success(response.data, {
          position: "top-right",
        });
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
