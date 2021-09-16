<template>
  <div class="mx-4 my-4 mt-4">
    <div class="p-6 bg-white rounded-md shadow-lg">
      <h2 class="text-lg text-gray-700 font-semibold capitalize" v-if="!loading">
        {{ title }} {{ sponsor_name }}
      </h2>
      <br />
      <div v-if="!loading">
        <div class="flex-auto flex space-x-2">
          <div>
            <label class="text-gray-700">Patrocinador:</label>
            <div>
              <ThreeAutoComplete
                @sponsors="name = $event"
                query="sponsors"
                :default="name"
                placeholder="Patrocinador"
              ></ThreeAutoComplete>
            </div>
          </div>
          <div>
            <label class="text-gray-700">Trimestre:</label>
            <div>
              <a-auto-complete
                v-model="threeSelected"
                :dataSource="threeMonths"
                style="width: 300px"
                :placeholder="threePlaceholder"
                :filterOption="filterOption"
              />
            </div>
          </div>
          <div>
            <label class="text-gray-700">Año:</label>
            <div>
              <a-input-number
                v-model="year"
                :min="2010"
                :max="2050"
                :default="2021"
                style="width: 300px"
                placeholder="Año"
              />
            </div>
          </div>
          <div>
            <br />
            <button
              @click="controller()"
              class="py-1 px-4 text-center bg-blue-600 rounded-md text-white text-sm hover:bg-green-500"
              type="button"
            >
              Procesar
            </button>
          </div>
        </div>
        <br />
        <br />
        <div v-if="show_result">
          <ThreeMonthsBar :title_p="name" :series_data_p="seriesData"> </ThreeMonthsBar>
        </div>
      </div>
      <br />
      <div v-if="loading">
        <Loading></Loading>
      </div>

      <br />
      <div v-if="show_result">
        <button
          @click="wordExport()"
          class="py-2 px-4 text-center bg-blue-600 rounded-md text-white text-sm hover:bg-blue-500"
          type="button"
        >
          Exportar a .docx
        </button>
      </div>
      <div v-if="show_export" hidden>
        <WordExportThreeMonths
          title_p="Informe Trimestral"
          type_p="Patrocinador"
          :name_p="sponsor_name"
          :form_data_p="form_data"
        ></WordExportThreeMonths>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import gql from "graphql-tag";
import Loading from "../../../Loading";
import WordExportThreeMonths from "../../export/WordExportThreeMonths";
import ThreeAutoComplete from "../../util/AutoComplete";
import ThreeMonthsBar from "../../charts/ThreeMonthsBar";
import { Input } from "ant-design-vue";
import { Button } from "ant-design-vue";
import { AutoComplete } from "ant-design-vue";
Vue.use(AutoComplete);

Vue.use(Input);
Vue.use(Button);

export default {
  data() {
    return {
      //AUTO COMPLETE DEL TRIMESTRE
      threeSelected: "",
      threeMonths: [
        "Enero-Marzo",
        "Abril-Junio",
        "Julio-Septiembre",
        "Octubre-Diciembre",
      ],
      threePlaceholder: "Trimestre",
      year: "",
      //atributos propios
      loading: false,
      title: "Informe Trimestral Patrocinador",
      placeholder: "Patrocinador",
      name: "",
      sponsor_name: "",
      sponsor_id: "",

      //RESPUESTA
      year: "",
      month: "",
      members: "",
      discipleship: "",
      kids: "",
      teens: "",
      youngs: "",
      men: "",
      ladies: "",
      baptist_family: "",
      ministered_lives: "",

      //PARA GRAFICO
      seriesData: [],

      show_result: false,
      show_export: false,
      form_data: Object,
      token: "",
    };
  },

  mounted() {
    this.token = this.$store.state.token;
    this.year = new Date().getFullYear();
  },

  created() {},

  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    notify: function (type, title, description) {
      //TYPES
      //success, info, warning, error
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    controller: function () {
      if (this.name !== "" && this.threeSelected !== "" && this.year !== "") {
        this.loading = true;
        let name = this.name;

        this.getId(name);
      } else {
        this.notify("warning", "Atencion", "Tiene que escribir un nombre valido");
      }
    },

    getResults: async function (id, three_selected, year) {
      await this.$apollo
        .query({
          query: gql`
            query($id: Int!, $three_selected: String!, $year: Int!) {
              threeMonthsSponsor(
                sponsor_id: $id
                three_selected: $three_selected
                year: $year
              ) {
                year
                month
                members
                discipleship
                kids
                teens
                youngs
                men
                ladies
                baptist_family
                ministered_lives
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
          variables: {
            id: id,
            three_selected: three_selected,
            year: year,
          },
          fetchPolicy: "no-cache",
        })
        .then((data) => {
          //console.log(data.data.threeMonthsSponsor);
          let result = data.data.threeMonthsSponsor;

          this.form_data = result;

          if (result.members !== null) {
            this.year = result.year;
            this.month = result.month;

            this.members = result.members;
            this.discipleship = result.discipleship;
            this.kids = result.kids;
            this.teens = result.teens;
            this.youngs = result.youngs;
            this.men = result.men;
            this.ladies = result.ladies;
            this.baptist_family = result.baptist_family;
            this.ministered_lives = result.ministered_lives;

            this.seriesData = [
              { x: "Miembros", y: result.members },
              { x: "Discipulado", y: result.discipleship },
              { x: "Niños", y: result.kids },
              { x: "Adolescentes", y: result.teens },
              { x: "Jovenes", y: result.youngs },
              { x: "Hombres", y: result.men },
              { x: "Damas", y: result.ladies },
              { x: "Familia Bautista", y: result.baptist_family },
              { x: "Vidas ministradas", y: result.ministered_lives },
            ];
            this.loading = false;
            this.name = "";
            this.sponsor_id = "";
            this.threeSelected = "";
            this.year = new Date().getFullYear();
          } else {
            this.notify("warning", "Informacion", "No se encontraron resultados");
            this.loading = false;
            this.name = "";
            this.sponsor_id = "";
            this.threeSelected = "";
            this.year = new Date().getFullYear();
          }
        })
        .catch((error) => {
          //console.error(error);
          this.notify("error", "Error", "No se encontro ningun elemento");
          this.loading = false;
          this.name = "";
          this.sponsor_id = "";
          this.threeSelected = "";
          this.year = new Date().getFullYear();
        });
    },

    wordExport: function () {
      this.show_export = true;
      this.show_result = false;
      this.name = "";
      this.church_id = "";
      this.threeSelected = "";
    },

    async getId(name) {
      await this.$apollo
        .query({
          query: gql`
            query($name: Mixed) {
              sponsorWhere(where: { column: NAME, operator: LIKE, value: $name }) {
                id
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
          variables: {
            name: name,
          },
          fetchPolicy: "no-cache",
        })
        .then((data) => {
          //console.log(data.data.sponsorWhere);
          this.sponsor_id = data.data.sponsorWhere.id;
        })
        .catch((error) => {
          //console.error(error);
          this.notify("error", "Error", "No se encontro ningun elemento");
          this.name = "";
          this.church_id = "";
          this.loading = false;
        });
    },
  },

  watch: {
    name: function (val) {
      if (val !== "") {
        this.show_result = false;
        this.show_export = false;
        this.sponsor_name = val;
      } else {
        this.sponsor_id = "";
      }
    },

    year: function (val) {
      if (val !== "") {
        this.show_result = false;
        this.show_export = false;
      }
    },

    threeSelected: function (val) {
      if (val !== "") {
        this.show_result = false;
        this.show_export = false;
      }
    },

    show_export: function (val) {
      if (val) {
        //this.show_result = false;
        //this.name = "";
      }
    },

    sponsor_id: function (val) {
      if (val !== "") {
        const id = val;
        const three_selected = this.threeSelected;
        const year = this.year;
        this.getResults(id, three_selected, year);
      }
    },

    seriesData: function (val) {
      this.show_result = true;
      //this.show_export = true;
      this.loading = false;
    },
  },

  computed: {},

  components: {
    ThreeAutoComplete: ThreeAutoComplete,
    Loading: Loading,
    WordExportThreeMonths: WordExportThreeMonths,
    ThreeMonthsBar: ThreeMonthsBar,
  },
};
</script>
