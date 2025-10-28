<template>
  <section class="bg-gradient-to-br">
    <div class="max-w-7xl mx-auto">
      <div class="mb-3">
        <RouterLink
          to="/board"
          class="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-800 hover:bg-gray-100 shadow-md rounded-lg transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 1024 1024"
            class="text-gray-600"
          >
            <path
              fill="currentColor"
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
            />
            <path
              fill="currentColor"
              d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
            />
          </svg>
          <span class="font-medium">Back</span>
        </RouterLink>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              {{ board }}
            </h1>
            <div class="flex flex-wrap gap-2 mt-3">
              <div
                v-for="memberItem in member"
                :key="memberItem.id"
                class="relative inline-flex items-center group"
              >
                <span
                  class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {{ memberItem.firstname }} {{ memberItem.lastname }}
                </span>

                <button
                  @click="deleteMember(memberItem)"
                  class="absolute -right-2 -top-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow opacity-0 group-hover:opacity-100 transition"
                  title="Remove Member"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              @click="toggleAddMember"
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg
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
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              Add Member
            </button>

            <button
              @click="toggleAddColumn"
              class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Column
            </button>
          </div>
        </div>
      </div>

      <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="columnItem in column"
          :key="columnItem.id"
          class="bg-white group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform"
        >
          <CardColumn :column="columnItem" @updatedColumn="loadColumn" />
        </div>
      </div>
    </div>

    <AddMember
      :show="isMemberOpen"
      @close="closeAddMember"
      :memberOnBoard="member"
    />
    <CreateColumn :show="isColumnOpen" @close="closeAddColumn" />
  </section>
</template>

<script>
import CreateColumn from "./CreateColumn.vue";
import CardColumn from "./CardColumn.vue";
import AddMember from "./AddMember.vue";
import { readBoard } from "../api/board";
import { listColumn } from "../api/column";
import { listMember, removeMember } from "../api/user";
import { toast } from "vue3-toastify";

export default {
  components: { CreateColumn, CardColumn, AddMember },
  data() {
    return {
      board: "",
      column: [],
      member: [],
      isMemberOpen: false,
      isColumnOpen: false,
    };
  },
  async mounted() {
    this.loadColumn();
  },
  methods: {
    async loadColumn() {
      try {
        const token = localStorage.getItem("token");
        const id = this.$route.params.id;
        const responseBoard = await readBoard(token, id);
        const responseMember = await listMember(token, id);
        const responseColumn = await listColumn(token, id);
        console.log(responseMember)
        this.board = responseBoard.data.boardName;
        this.member = responseMember.data;
        this.column = responseColumn.data;
      } catch (error) {
        console.error(error);
      }
    },

    toggleAddMember() {
      this.isMemberOpen = !this.isMemberOpen;
    },
    toggleAddColumn() {
      this.isColumnOpen = !this.isColumnOpen;
    },
    closeAddMember() {
      this.isMemberOpen = false;
    },
    closeAddColumn() {
      this.isColumnOpen = false;
      this.loadColumn();
    },

    async deleteMember(member) {
      if (!confirm(`Are you sure you want to delete "${member.firstname} ${member.lastname}"?`))
        return;

      try {
        const token = localStorage.getItem("token");
        const response = await removeMember(token, member.memberId);

        if (response.status === 200) {
          toast.success("Member deleted successfully! 🗑️");
          this.$emit("updated");
          window.location.reload()
        } else {
          toast.error(response.data.errorMessage || "Failed to delete member");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete member. Please try again.");
      }
    },
  },
};
</script>
