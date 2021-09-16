<template>
  <div class="flex justify-center items-center h-screen bg-white px-6">
    <div v-if="!loading" class="p-6 max-w-sm w-full bg-white shadow-lg rounded-md">
      <div class="flex justify-center items-center">
        <span class="text-gray-700 text-xl font-semibold "
          >Juntamisoccidente {{ year }}</span
        >
      </div>

      <div>
        <form class="mt-4">
          <label class="block">
            <span class="text-gray-700 text-sm">Email</span>
            <input
              v-model="email"
              placeholder="Email"
              @keydown.enter="login()"
              type="email"
              class="form-input mt-1 block w-full rounded-md focus:border-indigo-600"
            />
          </label>

          <label class="block mt-3">
            <span class="text-gray-700 text-sm">Password</span>
            <input
              v-model="password"
              placeholder="Password"
              @keydown.enter="login()"
              type="password"
              class="form-input mt-1 block w-full rounded-md focus:border-indigo-600"
            />
          </label>

          <div class="flex justify-between items-center mt-4">
            <div>
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-checkbox text-indigo-600" />
                <span class="mx-2 text-gray-600 text-sm">Remember me</span>
              </label>
            </div>

            <div>
              <span class="block text-sm fontme text-indigo-700 hover:underline"
                >Forgot your password?</span
              >
            </div>
          </div>

          <div class="mt-6">
            <button
              type="button"
              class="py-2 px-4 text-center bg-blue-600 rounded-md w-full text-white text-sm hover:bg-blue-500"
              @click="login"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="loading">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Input } from "ant-design-vue";
import gql from "graphql-tag";

Vue.use(Input);
import Loading from "./Loading.vue";

export default {
  components: {
    Loading: Loading,
  },
  data() {
    return {
      email: "",
      password: "",
      loading: "",
      year: "",
    };
  },

  mounted() {
    //console.log(this);
    this.year = new Date().getFullYear();
  },

  methods: {
    login() {
      if (this.email === "" || this.password === "") {
        this.$notification["warning"]({
          message: "Atencion",
          description: "!! Llene correctamente los campos !!",
        });
      } else {
        this.loading = true;
        this.$apollo
          .mutate({
            mutation: gql`
              mutation($data: LoginInput!) {
                login(input: $data) {
                  access_token
                  user {
                    email
                    roles {
                      name
                      token
                    }
                    images {
                      name
                    }
                  }
                }
              }
            `,
            fetchPolicy: "no-cache",
            // Parameters
            variables: {
              data: {
                username: this.email,
                password: this.password,
              },
            },
          })
          .then((data) => {
            this.loading = false;
            // SETTEAR EL STORE
            this.$store.commit("set", ["token", data.data.login.access_token]);
            this.$store.commit("set", ["authUser", data.data.login.user]);
            this.$store.commit("set", ["layout", "default-layout"]);
            //onLogin(this.$apollo.provider.defaultClient, data.data.login.access_token);
            this.$router.push("/home");
          })
          .catch((error) => {
            this.$notification["error"]({
              message: "Error",
              description: "!! No de reconoce usuario y clave !!",
            });

            this.email = "";
            this.password = "";
            this.loading = false;
            console.error(error);
          });
      }
    },
  },
};
</script>
