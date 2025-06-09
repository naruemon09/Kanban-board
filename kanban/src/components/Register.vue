<script>
import axios from 'axios';
export default {
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: ''
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('http://localhost:3000/register', {
                    firstname:this.firstname,
                    lastname:this.lastname,
                    email:this.email,
                    password:this.password,
                    confirmPassword:this.confirmPassword
                });
                if (response.data.res === 0) {
                    this.$router.push('/')
                } else {
                    this.error = response.data.errorMessage
                }
                
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<template>
    <body class="font-inter overflow-hidden">
        <section class="flex justify-center relative">
            <img src="\src\assets\pastel-pink-blue.jpg" class="w-full h-full object-cover fixed">
            <div class="mx-auto py-15 fixed">
                <div class="rounded-2xl bg-white shadow-xl ">
                    <form @submit.prevent="register" class="lg:p-11 p-7 mx-auto">
                        <div class="mb-11">
                            <h1 class="text-gray-900 font-manrope text-3xl font-bold leading-10 mb-2">
                                Sign UP</h1>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <input type="text" v-model="firstname"
                                class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                                placeholder="Firstname">
                            <input type="text" v-model="lastname"
                                class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                                placeholder="Lastname">
                            
                        </div>
                        <input type="email" v-model="email"
                            class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                            placeholder="Email">
                        <input type="password" v-model="password"
                            class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                            placeholder="Password">
                        <input type="password" v-model="confirmPassword"
                            class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                            placeholder="Confirm Password">

                        <p class="text-red-500 font-bold mb-6">{{ error }}</p>

                        <button
                            class="w-30 h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-6">Register</button>
                        <RouterLink to="/" class="flex text-gray-900 text-base font-medium leading-6">
                            Already have an account? <span class="text-indigo-600 font-semibold pl-3"> Sign in here
                            </span>
                        </RouterLink>
                    </form>
                </div>
            </div>
        </section>
    </body>
</template>