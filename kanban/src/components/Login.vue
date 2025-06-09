<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3000/login', {
                    email:this.email,
                    password:this.password,
                });
                if (response.data.res === 0) {
                    localStorage.setItem("User", JSON.stringify(response.data.user[0]));
                    this.$router.push('/board')
                    console.log(response.data.user)
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
            <img src="\src\assets\pastel-pink-blue.jpg"
                class="w-full h-full object-cover fixed">
            <div class="mx-auto max-w-lg px-6 lg:px-8 py-30 fixed">
                <div class="rounded-2xl bg-white shadow-xl">
                    <form @submit.prevent="login" class="lg:p-11 p-7 mx-auto">
                        <div class="mb-11">
                            <h1 class="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                                Sign In</h1>
                        </div>
                        <input type="text" v-model="email"
                            class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                            placeholder="Email">
                        <input type="password" v-model="password"
                            class="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
                            placeholder="Password">

                        <p class="text-red-500 font-bold mt-6">{{ error }}</p>
                        
                        <button
                            class="mt-6 w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-11">Login</button>
                        <RouterLink to="/register"
                            class="flex justify-center text-gray-900 text-base font-medium leading-6"> Don’t have an
                            account? <span class="text-indigo-600 font-semibold pl-3"> Sign Up</span>
                        </RouterLink>
                    </form>
                </div>
            </div>
        </section>
    </body>
</template>