<template>
  <header
    class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-blue-600"
  >
    <div class="flex items-center">
      <button @click="openSideBar()" class="text-gray-500 focus:outline-none">
        <svg
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <!-- DROP DOWN USER -->
    <div class="flex items-center">
      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
        >
          <img class="h-full w-full object-cover" alt="User" :src="image" />
        </button>
        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 h-full w-full z-10"
        ></div>

        <div
          v-show="dropdownOpen"
          class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
        >
          <button
            @click="dropdownOpen = false"
            class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
          >
            {{ email }}
          </button>

          <button
            @click="show_modal = true"
            class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
          >
            Invitanos a un Café
          </button>
          <button
            @click="logOut()"
            class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
          >
            Salir
          </button>
        </div>
      </div>
      <div v-if="show_modal">
        <a-modal :title="modal_title" v-model="show_modal">
          <template slot="footer">
            <a-button key="back" @click="handleCancel"> Entiendo </a-button>
          </template>
          <h1 align="center"></h1>
          <p>-Si quiere constribuir al desarrollo de este software, puede hacerlo a:</p>

          <p><b>Bitcoin:</b> bc1qvt3yl4rfpqfmd6ltrt9tqa9gkatqkte049n00j</p>
          <p><b>Cualquier duda o sugerencia a:</b> gabry95g@gmail.com</p>
        </a-modal>
      </div>
    </div>
  </header>
</template>

<script>
import Vue from "vue";
import gql from "graphql-tag";
import { Modal } from "ant-design-vue";
Vue.use(Modal);
export default {
  data() {
    return {
      dropdownOpen: false,
      show_modal: false,
      modal_title: " Somos el Grupo Maranatha Labs ",
      token: "",
    };
  },

  mounted() {
    this.token = this.$store.state.token;
  },

  methods: {
    handleCancel(e) {
      this.show_modal = false;
      this.dropdownOpen = false;
    },
    openSideBar() {
      this.$store.commit("set", ["isOpenSideBar", true]);
    },

    logOut() {
        this.dropdownOpen = false;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation {
              logout {
                status
                message
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
        })
        .then((data) => {
            this.$store.commit("set", ["token", ""]);
            this.$store.commit("set", ["authUser", {}]);
            this.$store.commit("set", ["layout", "empty-layout"]);
            this.$router.push("/");
        })
        .catch((error) => {
          // console.error(error);
        });
    },
  },
  computed: {
    image() {
      return "http://graphoikos.oikos/img/" + this.$store.state.authUser.images[0].name;
    },
    email() {
      return this.$store.state.authUser.email;
    },
    isOpenSideBar() {
      return this.$store.state.isOpenSideBar;
    },
  },
};
</script>
