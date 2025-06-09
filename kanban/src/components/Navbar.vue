<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import axios from 'axios';

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Bars3Icon,
    BellIcon,
    XMarkIcon
  },
  data() {
    return {
      user: {}
    };
  },

  async mounted() {
    try {
      const storedUser = JSON.parse(localStorage.getItem('User'))
      const email = storedUser.email

      const response = await axios.get('http://localhost:3000/profile', {
        params: { email }
      });
      console.log(response.data.user)
      this.user = response.data.user

    } catch (error) {
      console.error(error);
    }
  },
  
  methods: {
    signOut() {
      localStorage.removeItem("User");
      this.user = null;
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <Disclosure as="nav" class="bg-white">
    <div class="mx-auto max-w-8xl px-2">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        </div>
        <div class="flex flex-1 justify-start">
          <div class="flex shrink-0 items-start">
            <img class="h-10 w-auto" src="\src\assets\3429149.png" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <h1 class="text-gray-700 rounded-md py-2 text-xl font-bold">Kanban Board</h1>
          </div>
        </div>

        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <template v-if="user">
            <button type="button"
              class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-800 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img class="size-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User avatar" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                  <strong class="block px-4 py-2 text-sm text-gray-700">Your Profile</strong>
                  <div class="px-4 py-2 text-sm text-gray-700 border-t border-gray-200">
                    <p><strong>Name:</strong> {{ user.firstname }} {{ user.lastname }}</p>
                    <p><strong>Email:</strong> {{ user.email }}</p>
                  </div>
                  <MenuItem v-slot="{ active }">
                  <button @click="signOut"
                    :class="[active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']">Sign
                    out</button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </template>

          <template v-else>
            <RouterLink to="/"
              class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
              Sign In</RouterLink>
            <RouterLink to="/register"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Sign Up</RouterLink>
          </template>
        </div>
      </div>
    </div>

  </Disclosure>
</template>
