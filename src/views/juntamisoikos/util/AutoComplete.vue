<template>
  <div>
    <a-auto-complete
      v-model="name"
      :dataSource="src"
      style="width: 300px"
      :placeholder="placeholder"
      :filterOption="filterOption"
    />
  </div>
</template>
<script>
import gql from "graphql-tag";
import Vue from "vue";
import { AutoComplete } from "ant-design-vue";
//COMPOSITION API
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

Vue.use(AutoComplete);

export default {
  props: {
    default: "",
    placeholder: "",
    query: "",
  },

  data() {
    return {
      src: [],
      name: "",
      elems: "",
      token: "",
    };
  },

  mounted() {
    this.token = this.$store.state.token;

    this.init();
  },

  created() {
    if (this.default !== "") {
      this.name = this.default;
    }
  },

  methods: {
    clean() {
      this.name = "";
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },

    init() {
      let query = this.query;

      if (query === "months") {
        this.src = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];
      } else {
        this.getElems(query);
      }
    },

    async getElems(query) {
      switch (query) {
        case "sponsors": {
          await this.$apollo
            .query({
              query: gql`
                query {
                  sponsors {
                    name
                  }
                }
              `,
              context: {
                headers: {
                  Authorization: this.token !== "" ? "Bearer " + this.token : "",
                },
              },
              fetchPolicy: "no-cache",
            })
            .then((data) => {
              ////console.log(data.data);
              this.elems = data.data.sponsors;
            })
            .catch((error) => {
              //console.error(error);
            });
          break;
        }

        case "levels": {
          await this.$apollo
            .query({
              query: gql`
                query {
                  levels {
                    name
                  }
                }
              `,
              context: {
                headers: {
                  Authorization: this.token !== "" ? "Bearer " + this.token : "",
                },
              },
              //fetchPolicy: "no-cache",
            })
            .then((data) => {
              //console.log(data.data);
              this.elems = data.data.levels;
            })
            .catch((error) => {
              //console.error(error);
            });
          break;
        }

        case "languages": {
          await this.$apollo
            .query({
              query: gql`
                query {
                  languages {
                    name
                  }
                }
              `,
              context: {
                headers: {
                  Authorization: this.token !== "" ? "Bearer " + this.token : "",
                },
              },
              //fetchPolicy: "no-cache",
            })
            .then((data) => {
              //console.log(data.data);
              this.elems = data.data.languages;
            })
            .catch((error) => {
              //console.error(error);
            });
          break;
        }

        case "churches": {
          await this.$apollo
            .query({
              query: gql`
                query {
                  churches(first: 1000) {
                    data {
                      name
                    }
                  }
                }
              `,
              context: {
                headers: {
                  Authorization: this.token !== "" ? "Bearer " + this.token : "",
                },
              },
              //fetchPolicy: "no-cache",
            })
            .then((data) => {
              //console.log(data.data);
              this.elems = data.data.churches.data;
            })
            .catch((error) => {
              //console.error(error);
            });
          break;
        }

        case "missions": {
          await this.$apollo
            .query({
              query: gql`
                query {
                  missions(first: 1000) {
                    data {
                      name
                    }
                  }
                }
              `,
              context: {
                headers: {
                  Authorization: this.token !== "" ? "Bearer " + this.token : "",
                },
              },
              //fetchPolicy: "no-cache",
            })
            .then((data) => {
              //console.log(data.data);
              this.elems = data.data.missions.data;
            })
            .catch((error) => {
              //console.error(error);
            });
          break;
        }

        case "curricula": {
          await this.$apollo
            .query({
              query: gql`
                query {
                  curricula(first: 1000) {
                    data {
                      name
                    }
                  }
                }
              `,
              context: {
                headers: {
                  Authorization: this.token !== "" ? "Bearer " + this.token : "",
                },
              },
              //fetchPolicy: "no-cache",
            })
            .then((data) => {
              //console.log(data.data);
              this.elems = data.data.curricula.data;
            })
            .catch((error) => {
              //console.error(error);
            });
          break;
        }

        case "districts": {
          await this.$apollo
            .query({
              query: gql`
                query {
                  districts {
                    name
                  }
                }
              `,
              context: {
                headers: {
                  Authorization: this.token !== "" ? "Bearer " + this.token : "",
                },
              },
              //fetchPolicy: "no-cache",
            })
            .then((data) => {
              //console.log(data.data);
              this.elems = data.data.districts;
            })
            .catch((error) => {
              //console.error(error);
            });
          break;
        }
      }
    },
  },

  watch: {
    elems: function (val) {
      if (val.length !== 0) {
        for (let i in val) {
          let elem = val[i];
          this.src.push(elem.name);
        }
      }
    },
    name: function (val) {
      if (val !== undefined) {
        // alert("entro");
        this.$emit(this.query, val);
      }
    },
    default: function (val) {
      if (val !== undefined) {
        this.name = val;
      }
    },
  },
};
</script>
<style></style>
