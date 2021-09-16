<template>
  <div class="mt-4">
    <!-- <h2 class="text-lg text-gray-700 font-semibold capitalize">Planilla</h2> -->
    <form>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 mx-6 my-6">
        <div>
          <label class="text-gray-700">Nombre(s) y Apellidos:</label>
          <AutoComplete
            @curricula="curriculum_name = $event"
            query="curricula"
            placeholder="Nombre y Apellidos"
            :default="curriculum_name"
          ></AutoComplete>
        </div>

        <!-------------------------------------------  -->

        <div>
          <label class="text-gray-700">Pastor o Misionero:</label>
          <div>
            <a-radio-group @change="onChangeRadio" v-model="radioPastor">
              <a-radio :value="1">Pastor</a-radio>
              <a-radio :value="0">Misionero</a-radio>
            </a-radio-group>
          </div>
        </div>

        <!-- -------------------------------------------- -->

        <div>
          <label class="text-gray-700">Distrito:</label>
          <AutoComplete
            @districts="district_name = $event"
            query="districts"
            placeholder="Distrito"
            :default="district_name"
          ></AutoComplete>
        </div>

        <!-- --------------------------------------- -->

        <div>
          <label class="text-gray-700">Año:</label>
          <div>
            <a-input-number
              v-model="year"
              :min="1990"
              :max="2050"
              :defaultValue="2021"
              style="width: 200px"
            />
          </div>
        </div>
        <!-- --------------------------------------- -->
        <div>
          <label class="text-gray-700">Mes:</label>
          <AutoComplete
            @months="month = $event"
            query="months"
            placeholder="Mes"
            :default="month"
          ></AutoComplete>
        </div>
        <!-- -------------------------------------- -->
        <div>
          <label class="text-gray-700">Iglesia:</label>
          <AutoComplete
            @churches="church_name = $event"
            query="churches"
            placeholder="Iglesia"
            :default="church_name"
          ></AutoComplete>
        </div>
        <!-- -------------------------------------- -->
        <div>
          <label class="text-gray-700">Mision en que ministra:</label>
          <AutoComplete
            id="missions_input"
            @missions="mission_name = $event"
            query="missions"
            placeholder="Mision"
            :default="mission_name"
          ></AutoComplete>
        </div>
        <!-- -------------------------------------- -->
        <div>
          <label class="text-gray-700">Ministerio que lo patrocina:</label>
          <div>
            <PayrollSponsors
              :checkedList_p="sponsors_ids_p"
              @sponsors="sponsors_ids = $event"
            ></PayrollSponsors>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
.ant-input-number {
  margin-right: 100px;
}
</style>
<script>
import gql from "graphql-tag";
import Vue from "vue";
import AutoComplete from "../util/AutoComplete";
import PayrollSponsors from "./PayrollSponsors";
import { Radio } from "ant-design-vue";
import { Checkbox } from "ant-design-vue";
import { Col } from "ant-design-vue";
import { Row } from "ant-design-vue";
import { InputNumber } from "ant-design-vue";

Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);

export default {
  data() {
    return {
      //action

      //atributos de la planilla
      district_id: "",
      year: "",
      month_id: "",
      curriculum_id: "",
      pastor: false,
      radioPastor: "",
      church_id: "",
      mission_id: "",
      sponsors_ids: [],

      //atributos necesarios
      district_name: "",
      curriculum_name: "",
      church_name: "",
      mission_name: "",

      month: "",

      //para llenar los check box de sponsors
      // sponsors_from_server: [],
      // sponsors_selected: [],

      //numeric text edit plugin
      max: 2050,
      min: 1990,
      step: 1,
      value: "2020",
      decimals: "0",
      token: "",
    };
  },

  components: {
    AutoComplete: AutoComplete,
    PayrollSponsors: PayrollSponsors,
  },

  mounted() {
    this.token = this.$store.state.token;

    if (this.pastor_p !== undefined) {
      this.pastor = this.pastor_p;
      switch (this.pastor) {
        case true:
          this.radioPastor = 1;
          break;
        case false:
          this.radioPastor = 0;
          break;
      }
    }

    //UPDATE
    if (this.district_id_p !== "") {
      this.getDistrictName(this.district_id_p);
    }

    if (this.year_p !== undefined) {
      this.year = this.year_p;
    } else {
      this.year = new Date().getFullYear();
    }

    if (this.month_p !== "") {
      this.month_id = this.month_p;
      switch (this.month_id) {
        case 1:
          this.month = "Enero";
          //this.$emit("month_id", this.month_id);
          break;
        case 2:
          this.month = "Febrero";
          //this.$emit("month_id", this.month_id);
          break;
        case 3:
          this.month = "Marzo";
          //this.$emit("month_id", this.month_id);
          break;
        case 4:
          this.month = "Abril";
          // this.$emit("month_id", this.month_id);
          break;
        case 5:
          this.month = "Mayo";
          //this.$emit("month_id", this.month_id);
          break;
        case 6:
          this.month = "Junio";
          //this.$emit("month_id", this.month_id);
          break;
        case 7:
          this.month = "Julio";
          //this.$emit("month_id", this.month_id);
          break;
        case 8:
          this.month = "Agosto";
          //this.$emit("month_id", this.month_id);
          break;
        case 9:
          this.month = "Septiembre";
          //this.$emit("month_id", this.month_id);
          break;
        case 10:
          this.month = "Octubre";
          //this.$emit("month_id", this.month_id);
          break;
        case 11:
          this.month = "Noviembre";
          //this.$emit("month_id", this.month_id);
          break;
        case 12:
          this.month = "Diciembre";
          //this.$emit("month_id", this.month_id);
          break;
      }
    }

    if (this.curriculum_id_p !== "") {
      this.getCurriculumName(this.curriculum_id_p);
    }
    if (this.pastor_p !== "") {
      this.pastor = this.pastor_p;
    }

    if (this.church_id_p !== "") {
      this.getChurchName(this.church_id_p);
    }
    if (this.mission_id_p !== "") {
      this.getMissionName(this.mission_id_p);
    }

    if (this.sponsors_ids_p !== "") {
      this.sponsors_ids = this.sponsors_ids_p;
    }
  },

  created() {},

  methods: {
    //--------------------------EXTERNAL COMPONENTS METHODS-------------------------//

    onChangeCheck(checkedValues) {
      //console.log("checked = ", checkedValues);
    },
    onChangeRadio(e) {
      //console.log("radio checked", e.target.value);
    },

    async getDistrictId(name) {
      if (name !== "") {
        await this.$apollo
          .query({
            query: gql`
              query($name: Mixed!) {
                districtWhere(where: { column: NAME, operator: LIKE, value: $name }) {
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
            //fetchPolicy: "no-cache",
          })
          .then((data) => {
            let district = data.data.districtWhere;
            this.district_id = district.id;
            this.$emit("district_id", this.district_id);
          })
          .catch((error) => {
            //console.error(error);
          });
      }
    },

    async getDistrictName(id) {
      //alert(id);
      if (id !== "" && id !== undefined) {
        await this.$apollo
          .query({
            query: gql`
              query($id: Mixed!) {
                districtWhere(where: { column: ID, operator: LIKE, value: $id }) {
                  name
                }
              }
            `,
            context: {
              headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
            },
            variables: {
              id: id,
            },
            //fetchPolicy: "no-cache",
          })
          .then((data) => {
            let district = data.data.districtWhere;
            this.district_name = district.name;
            //this.$emit("district_id", this.district_id);
          })
          .catch((error) => {
            //console.error(error);
          });
      }
    },

    async getChurchId(name) {
      if (name !== "" && name !== undefined) {
        await this.$apollo
          .query({
            query: gql`
              query($name: Mixed!) {
                churchWhere(where: { column: NAME, operator: LIKE, value: $name }) {
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
            //fetchPolicy: "no-cache",
          })
          .then((data) => {
            let church = data.data.churchWhere;
            this.church_id = church.id;
            this.$emit("church_id", this.church_id);
          })
          .catch((error) => {
            //console.error(error);
          });
      }
    },

    async getChurchName(id) {
      if (id !== "" && id !== undefined) {
        await this.$apollo
          .query({
            query: gql`
              query($id: Mixed!) {
                churchWhere(where: { column: ID, operator: LIKE, value: $id }) {
                  name
                }
              }
            `,
            context: {
              headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
            },
            variables: {
              id: id,
            },
            //fetchPolicy: "no-cache",
          })
          .then((data) => {
            let church = data.data.churchWhere;
            this.church_name = church.name;
            //this.$emit("church_id", this.church_id);
          })
          .catch((error) => {
            //console.error(error);
          });
      }
    },

    async getMissionId(name) {
      if (name !== "" && name !== undefined) {
        await this.$apollo
          .query({
            query: gql`
              query($name: Mixed!) {
                missionWhere(where: { column: NAME, operator: LIKE, value: $name }) {
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
            //fetchPolicy: "no-cache",
          })
          .then((data) => {
            let mission = data.data.missionWhere;
            this.mission_id = mission.id;
            this.$emit("mission_id", this.mission_id);
          })
          .catch((error) => {
            //console.log("es este");
            //console.error(error);
          });
      }
    },

    async getMissionName(id) {
      if (id !== "" && id !== undefined) {
        await this.$apollo
          .query({
            query: gql`
              query($id: Mixed!) {
                missionWhere(where: { column: ID, operator: LIKE, value: $id }) {
                  name
                }
              }
            `,
            context: {
              headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
            },
            variables: {
              id: id,
            },
            //fetchPolicy: "no-cache",
          })
          .then((data) => {
            let mission = data.data.missionWhere;
            this.mission_name = mission.name;
            //this.$emit("mission_id", this.mission_id);
          })
          .catch((error) => {
            //console.error(error);
          });
      }
    },

    async getCurriculumId(name) {
      if (name !== "" && name !== undefined) {
        await this.$apollo
          .query({
            query: gql`
              query($name: Mixed!) {
                curriculumWhere(where: { column: NAME, operator: LIKE, value: $name }) {
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
            //fetchPolicy: "no-cache",
          })
          .then((data) => {
            let curriculum = data.data.curriculumWhere;
            this.curriculum_id = curriculum.id;
            this.$emit("curriculum_id", this.curriculum_id);
          })
          .catch((error) => {
            //console.error(error);
          });
      }
    },

    async getCurriculumName(id) {
      if (id !== "" && id !== undefined) {
        await this.$apollo
          .query({
            query: gql`
              query($id: Mixed!) {
                curriculumWhere(where: { column: ID, operator: LIKE, value: $id }) {
                  name
                }
              }
            `,
            context: {
              headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
            },
            variables: {
              id: id,
            },
            //fetchPolicy: "no-cache",
          })
          .then((data) => {
            let curriculum = data.data.curriculumWhere;
            this.curriculum_name = curriculum.name;
            //this.$emit("curriculum_id", this.curriculum_id);
          })
          .catch((error) => {
            //console.error(error);
          });
      }
    },

    //PARA QUE SALGAN LAS NOTIFICACIONES
    notify(type, title, description) {
      //TYPES
      //success, info, warning, error
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    initYear() {
      let year = new Date().getFullYear();
      //console.log(year);
      this.year = year;
    },
  },

  computed: {},

  watch: {
    mission_name: function (val) {
      // console.log(val);
      if (val !== undefined) {
        this.getMissionId(val);
      }
    },

    pastor: function (val) {
      if (val) {
        this.radioPastor = 1;
      } else {
        this.radioPastor = 0;
      }
      this.$emit("pastor", val);
    },

    radioPastor: function (val) {
      //alert(val);
      if (val === 1) {
        this.pastor = true;
      } else {
        this.pastor = false;
      }
    },

    sponsors_ids: function (val) {
      if (val !== []) {
        this.$emit("sponsors_ids", this.sponsors_ids);
      }
    },

    year: function (val) {
      if (val !== null) {
        this.$emit("year", this.year);
      }
    },

    district_name: function (val) {
      //alert(val);
      if (val !== undefined) {
        this.getDistrictId(val);
      }
    },
    month: function (val) {
      if (val !== null && this.month_p === undefined) {
        switch (val) {
          case "Enero":
            this.month_id = 1;
            this.$emit("month_id", this.month_id);
            break;
          case "Febrero":
            this.month_id = 2;
            this.$emit("month_id", this.month_id);
            break;
          case "Marzo":
            this.month_id = 3;
            this.$emit("month_id", this.month_id);
            break;
          case "Abril":
            this.month_id = 4;
            this.$emit("month_id", this.month_id);
            break;
          case "Mayo":
            this.month_id = 5;
            this.$emit("month_id", this.month_id);
            break;
          case "Junio":
            this.month_id = 6;
            this.$emit("month_id", this.month_id);
            break;
          case "Julio":
            this.month_id = 7;
            this.$emit("month_id", this.month_id);
            break;
          case "Agosto":
            this.month_id = 8;
            this.$emit("month_id", this.month_id);
            break;
          case "Septiembre":
            this.month_id = 9;
            this.$emit("month_id", this.month_id);
            break;
          case "Octubre":
            this.month_id = 10;
            this.$emit("month_id", this.month_id);
            break;
          case "Noviembre":
            this.month_id = 11;
            this.$emit("month_id", this.month_id);
            break;
          case "Diciembre":
            this.month_id = 12;
            this.$emit("month_id", this.month_id);
            break;
        }

        //alert(this.month_id);
      } else if (val !== null) {
        switch (val) {
          case "Enero":
            this.month_id = 1;
            this.$emit("month_id", this.month_id);
            break;
          case "Febrero":
            this.month_id = 2;
            this.$emit("month_id", this.month_id);
            break;
          case "Marzo":
            this.month_id = 3;
            this.$emit("month_id", this.month_id);
            break;
          case "Abril":
            this.month_id = 4;
            this.$emit("month_id", this.month_id);
            break;
          case "Mayo":
            this.month_id = 5;
            this.$emit("month_id", this.month_id);
            break;
          case "Junio":
            this.month_id = 6;
            this.$emit("month_id", this.month_id);
            break;
          case "Julio":
            this.month_id = 7;
            this.$emit("month_id", this.month_id);
            break;
          case "Agosto":
            this.month_id = 8;
            this.$emit("month_id", this.month_id);
            break;
          case "Septiembre":
            this.month_id = 9;
            this.$emit("month_id", this.month_id);
            break;
          case "Octubre":
            this.month_id = 10;
            this.$emit("month_id", this.month_id);
            break;
          case "Noviembre":
            this.month_id = 11;
            this.$emit("month_id", this.month_id);
            break;
          case "Diciembre":
            this.month_id = 12;
            this.$emit("month_id", this.month_id);
            break;
        }
      }
    },
    curriculum_name: function (val) {
      if (val !== undefined) {
        this.getCurriculumId(val);
      }
    },
    church_name: function (val) {
      if (val !== undefined) {
        this.getChurchId(val);
      }
    },

    pastor_p: function (val) {
      if (val !== "") {
        this.pastor = val;
      }
    },
  },

  props: {
    district_id_p: "",
    year_p: "",
    month_p: "",
    curriculum_id_p: "",
    pastor_p: "",
    church_id_p: "",
    mission_id_p: "",
    sponsors_ids_p: Array,
  },
};
</script>
