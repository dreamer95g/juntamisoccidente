<template>
  <div class="mt-0 bg-white rounded-md shadow-lg">
    <div class="p-6 bg-white rounded-md shadow-lg">
      <div v-if="!loading" align="center">
        <br />
        <h1 class="mx-6 top-auto flex-auto text-lg font-semibold">
          {{ title }}
        </h1>
        <br />
        <h1 class="mx-6 top-auto flex-auto text-lg font-semibold">
          {{ subtitle }}
        </h1>
        <br />
        <h1 class="mx-6 top-auto flex-auto text-lg font-semibold">
          {{ year }}
        </h1>
      </div>
      <br />

      <!--INSERT-->
      <div v-if="action === 'insert' && !loading">
        <Atributes
          @mission_id="mission_id = $event"
          @pastor="pastor = $event"
          @sponsors_ids="sponsors_ids = $event"
          @year="year = $event"
          @district_id="district_id = $event"
          @month_id="month_id = $event"
          @church_id="church_id = $event"
          @curriculum_id="curriculum_id = $event"
        ></Atributes>
        <br />
        <br />
        <Concepts
          @current_membership="current_membership = $event"
          @congregants_count="congregants_count = $event"
          @cells_count="cells_count = $event"
          @missions_count="missions_count = $event"
          @baptism_candidates="baptism_candidates = $event"
          @baptism="baptism = $event"
          @new_believers_discipled="new_believers_discipled = $event"
          @trained_leaders="trained_leaders = $event"
          @founded_cells="founded_cells = $event"
          @founded_missions="founded_missions = $event"
          @founded_churches="founded_churches = $event"
          @evangelistic_visits="evangelistic_visits = $event"
          @discipleship_visits="discipleship_visits = $event"
          @building_visits="building_visits = $event"
          @faith_professions="faith_professions = $event"
          @reconciled_brothers="reconciled_brothers = $event"
          @ministered_lives="ministered_lives = $event"
          @cults_held="cults_held = $event"
        ></Concepts>
        <br />
        <Sundays @grid="gridData = $event"></Sundays>
      </div>

      <!--UPDATE-->
      <div v-if="action === 'update' && !loading">
        <Atributes
          :curriculum_id_p="curriculum_id"
          :pastor_p="pastor"
          :district_id_p="district_id"
          :year_p="year"
          :month_p="month_id"
          :church_id_p="church_id"
          :sponsors_ids_p="sponsors_ids"
          :mission_id_p="mission_id"
          @mission_id="mission_id = $event"
          @pastor="pastor = $event"
          @sponsors_ids="sponsors_ids = $event"
          @year="year = $event"
          @district_id="district_id = $event"
          @month_id="month_id = $event"
          @church_id="church_id = $event"
          @curriculum_id="curriculum_id = $event"
        ></Atributes>
        <br />
        <br />
        <Concepts
          :current_membership_p="current_membership"
          :congregants_count_p="congregants_count"
          :cells_count_p="cells_count"
          :missions_count_p="missions_count"
          :baptism_candidates_p="baptism_candidates"
          :baptism_p="baptism"
          :new_believers_discipled_p="new_believers_discipled"
          :trained_leaders_p="trained_leaders"
          :founded_cells_p="founded_cells"
          :founded_missions_p="founded_missions"
          :founded_churches_p="founded_churches"
          :evangelistic_visits_p="evangelistic_visits"
          :discipleship_visits_p="discipleship_visits"
          :building_visits_p="building_visits"
          :faith_professions_p="faith_professions"
          :reconciled_brothers_p="reconciled_brothers"
          :ministered_lives_p="ministered_lives"
          :cults_held_p="cults_held"
          @current_membership="current_membership = $event"
          @congregants_count="congregants_count = $event"
          @cells_count="cells_count = $event"
          @missions_count="missions_count = $event"
          @baptism_candidates="baptism_candidates = $event"
          @baptism="baptism = $event"
          @new_believers_discipled="new_believers_discipled = $event"
          @trained_leaders="trained_leaders = $event"
          @founded_cells="founded_cells = $event"
          @founded_missions="founded_missions = $event"
          @founded_churches="founded_churches = $event"
          @evangelistic_visits="evangelistic_visits = $event"
          @discipleship_visits="discipleship_visits = $event"
          @building_visits="building_visits = $event"
          @faith_professions="faith_professions = $event"
          @reconciled_brothers="reconciled_brothers = $event"
          @ministered_lives="ministered_lives = $event"
          @cults_held="cults_held = $event"
        ></Concepts>
        <br />
        <Sundays @grid="gridData = $event" :grid_p="gridData"></Sundays>
      </div>

      <div v-if="!loading" class="bg-white">
        <form class="flex-auto p-6">
          <div v-if="action === 'insert'" class="flex-auto flex space-x-3">
            <button
              @click="controller()"
              class="py-2 px-4 text-center bg-green-600 rounded-md w-1/6 text-white text-sm hover:bg-green-500"
              type="button"
            >
              {{ method }}
            </button>
            <button
              @click="exportToWord()"
              class="py-2 px-4 text-center bg-blue-600 rounded-md w-1/6 text-white text-sm hover:bg-blue-500"
              type="button"
              v-if="!show_export"
            >
              Exportar a .docx
            </button>
          </div>
          <div v-else>
            <div class="flex-auto flex space-x-3">
              <button
                @click="controller()"
                class="py-2 px-4 text-center bg-green-600 rounded-md w-1/6 text-white text-sm hover:bg-green-500"
                type="button"
              >
                {{ method }}
              </button>
              <button
                @click="cancel()"
                class="py-2 px-4 text-center bg-red-600 rounded-md w-1/6 text-white text-sm hover:bg-red-500"
                type="button"
              >
                Cancelar
              </button>
              <button
                @click="exportToWord()"
                class="py-2 px-4 text-center bg-blue-600 rounded-md w-1/6 text-white text-sm hover:bg-blue-500"
                type="button"
                v-if="!show_export"
              >
                Exportar a .docx
              </button>
            </div>
          </div>
        </form>
      </div>

      <!--<br />-->
      <div v-if="show_export" hidden>
        <WordExportPayroll
          :atributes_p="atributesToExport"
          :concepts_p="conceptsToExport"
          :sunday_grid_p="sunday_gridToExport"
        ></WordExportPayroll>
      </div>
      <div v-if="loading">
        <Loading></Loading>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Vue from "vue";
import PayrollAtributes from "./PayrollAtributes";
import PayrollConcepts from "./PayrollConcepts";
import PayrollSundays from "./PayrollSundays";
import Loading from "../../Loading";
import WordExportPayroll from "../export/WordExportPayroll";

export default {
  data() {
    return {
      show_payroll: false,
      action: "",
      //method: "Insertar",
      loading: false,
      //INTERNAL ATRIBUTES
      title: "Junta Misionera - Convencion Bautista de Cuba Oriental",
      subtitle: "Planilla de Informe Mensual",

      //DEPARTMENTS
      dapartments_from_server: [],

      //ATRIBUTE COMPONENT
      district_id: "",
      year: "",
      month_id: "",
      curriculum_id: "",
      pastor: "",
      church_id: "",
      mission_id: "",
      sponsors_ids: [],
      //son los ids que retorna el response

      payroll_id: "",

      //necesarios para editar la planilla
      //para llenar componente de atributos
      // district_id_p: "",
      // curriculum_id_p: "",
      // church_id_p: "",

      //CONCEPT
      concept_id: "",
      current_membership: "0",
      congregants_count: "0",
      cells_count: "0",
      missions_count: "0",
      baptism_candidates: "0",
      baptism: "0",
      new_believers_discipled: "0",
      trained_leaders: "0",
      founded_cells: "0",
      founded_missions: "0",
      founded_churches: "0",
      evangelistic_visits: "0",
      discipleship_visits: "0",
      building_visits: "0",
      faith_professions: "0",
      reconciled_brothers: "0",
      ministered_lives: "0",
      cults_held: "0",

      //SUNDAY
      gridData: [],
      sundays: [],
      //WATCHERS
      ready_concept: false,
      ready_payroll: false,
      ready_delete_flow: false,
      ready_obtain_flow: false,
      //VALIDATE
      validate: true,
      token: "",

      //WORD EXPORT
      atributesToExport: {
        district: "",
        year: "",
        month: "",
        curriculum: "",
        pastor: "",
        missionary: "",
        church: "",
        mission: "",
        sponsors: "",
      },
      conceptsToExport: {
        current_membership: "0",
        congregants_count: "0",
        cells_count: "0",
        missions_count: "0",
        baptism_candidates: "0",
        baptism: "0",
        new_believers_discipled: "0",
        trained_leaders: "0",
        founded_cells: "0",
        founded_missions: "0",
        founded_churches: "0",
        evangelistic_visits: "0",
        discipleship_visits: "0",
        building_visits: "0",
        faith_professions: "0",
        reconciled_brothers: "0",
        ministered_lives: "0",
        cults_held: "0",
      },
      sunday_gridToExport: [
        { id: "", department: "", s1: "", s2: "", s3: "", s4: "", average: "" },
        { id: "", department: "", s1: "", s2: "", s3: "", s4: "", average: "" },
        { id: "", department: "", s1: "", s2: "", s3: "", s4: "", average: "" },
        { id: "", department: "", s1: "", s2: "", s3: "", s4: "", average: "" },
        { id: "", department: "", s1: "", s2: "", s3: "", s4: "", average: "" },
        { id: "", department: "", s1: "", s2: "", s3: "", s4: "", average: "" },
      ],

      sponsorsFromServer: [],
      show_export: false,
    };
  },

  mounted() {
    this.token = this.$store.state.token;
    if (this.action_p === "update" && this.payroll_id_p !== undefined) {
      this.loading = true;
      this.action = this.action_p;
      this.payroll_id = this.payroll_id_p;
      this.getPayroll(this.payroll_id);
    } else if (this.payroll_id_p === undefined) {
      //this.loading = true;
      this.action = "insert";
    }

    this.getSponsorsFromServer();
  },

  created() {},

  methods: {
    exportToWord() {
      this.checkValidate();
      if (this.validate === true) {
        //ATRIBUTOS

        this.atributesToExport.district = this.$children[0].district_name;
        this.atributesToExport.year = this.year;
        this.atributesToExport.month = this.$children[0].month;
        this.atributesToExport.curriculum = this.$children[0].curriculum_name;
        if (this.pastor) {
          this.atributesToExport.pastor = " X ";
          this.atributesToExport.missionary = "___";
        } else {
          this.atributesToExport.pastor = "___";
          this.atributesToExport.missionary = " X ";
        }

        this.atributesToExport.church = this.$children[0].church_name;
        this.atributesToExport.mission = this.$children[0].mission_name;

        let sponsorsIds = this.sponsors_ids;
        let spNames = "";

        if (sponsorsIds.length === 1) {
          let id = sponsorsIds[0];

          spNames = this.getNameFromList(this.sponsorsFromServer, id);
        } else {
          for (let i in sponsorsIds) {
            if (i < sponsorsIds.length - 1) {
              let id = sponsorsIds[i];
              let name = this.getNameFromList(this.sponsorsFromServer, id);
              spNames += name + ",";
            } else {
              let id = sponsorsIds[i];

              spNames += this.getNameFromList(this.sponsorsFromServer, id);
            }
          }
        }

        //console.log(spNames);

        this.atributesToExport.sponsors = spNames;

        //CONCEPTOS
        this.conceptsToExport.current_membership = this.current_membership;
        this.conceptsToExport.congregants_count = this.congregants_count;
        this.conceptsToExport.cells_count = this.cells_count;
        this.conceptsToExport.missions_count = this.missions_count;
        this.conceptsToExport.baptism_candidates = this.baptism_candidates;
        this.conceptsToExport.baptism = this.baptism;
        this.conceptsToExport.new_believers_discipled = this.new_believers_discipled;
        this.conceptsToExport.trained_leaders = this.trained_leaders;
        this.conceptsToExport.founded_cells = this.founded_cells;
        this.conceptsToExport.founded_missions = this.founded_missions;
        this.conceptsToExport.founded_churches = this.founded_churches;
        this.conceptsToExport.evangelistic_visits = this.evangelistic_visits;
        this.conceptsToExport.discipleship_visits = this.discipleship_visits;
        this.conceptsToExport.building_visits = this.building_visits;
        this.conceptsToExport.faith_professions = this.faith_professions;
        this.conceptsToExport.reconciled_brothers = this.reconciled_brothers;
        this.conceptsToExport.ministered_lives = this.ministered_lives;
        this.conceptsToExport.cults_held = this.cults_held;

        //SUNDAYS
        this.sunday_gridToExport = [];
        this.sunday_gridToExport = this.gridData;

        this.show_export = true;
      }
    },

    getNameFromList: function (list, id) {
      let name = "";
      for (let i in list) {
        let elem = list[i];

        let identifier = elem.id;
        let nomenclator = elem.name;

        if (identifier === id) {
          name = nomenclator;
          return name;
        }
      }
      return name;
    },

    async getSponsorsFromServer() {
      await this.$apollo
        .query({
          query: gql`
            query {
              sponsors {
                id
                name
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
          //fetchPolicy: "no-cache",
        })
        .then((data) => {
          //console.log(data.data);
          let sponsors = data.data.sponsors;
          for (let i in sponsors) {
            let id = sponsors[i].id;
            let name = sponsors[i].name;

            let elem = {
              id: id,
              name: name,
            };

            this.sponsorsFromServer.push(elem);
          }
        })
        .catch((error) => {
          //console.error(error);
        });
    },

    cancel() {
      this.$emit("show_payroll", false);
    },

    notify: function (type, title, description) {
      //TYPES
      //success, info, warning, error
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    checkValidate() {
      let check = true;

      if (
        this.district_id === "" ||
        this.year === "" ||
        this.month_id === "" ||
        this.curriculum_id === "" ||
        this.pastor === "" ||
        this.church_id === "" ||
        this.mission_id === ""
        // this.sponsors_ids.length === 0
      ) {
        this.notify("warning", "Atencion", "Algun campo de los atributos esta vacio");
        check = false;
      }

      if (
        this.current_membership === "" ||
        this.congregants_count === "" ||
        this.cells_count === "" ||
        this.missions_count === "" ||
        this.baptism_candidates === "" ||
        this.baptism === "" ||
        this.new_believers_discipled === "" ||
        this.trained_leaders === "" ||
        this.founded_cells === "" ||
        this.founded_missions === "" ||
        this.founded_churches === "" ||
        this.evangelistic_visits === "" ||
        this.discipleship_visits === "" ||
        this.building_visits === "" ||
        this.faith_professions === "" ||
        this.reconciled_brothers === "" ||
        this.ministered_lives === "" ||
        this.cults_held === ""
      ) {
        this.notify("warning", "Atencion", "Algun campo de los conceptos esta vacio");
        check = false;
      }

      this.validate = check;
    },

    controller() {
      if (this.action === "insert") {
        //VALIDACIONES
        this.checkValidate();
        if (this.validate === false) {
          this.notify(
            "warning",
            "Campos Vacios",
            " Por favor debe llenar todos los campos "
          );
        } else {
          this.loading = true;
          this.insertFlow();
        }
      } else if (this.action === "update") {
        //VALIDACIONES
        this.checkValidate();
        if (this.validate === false) {
          this.notify(
            "warning",
            "Campos Vacios",
            " Por favor debe llenar todos los campos "
          );
        } else {
          this.loading = true;
          this.updateFlow();
        }
      }
    },

    insertFlow() {
      this.createPayroll();
    },

    updateFlow() {
      let ids = [];
      ids.push(this.payroll_id);
      this.deletePayroll(ids);
      this.createPayroll();
    },

    createPayroll() {
      let pastor = this.pastor;
      let sunds = [];

      let grd = this.gridData;

      //CONSTRUIR EL INPUT DE SUNDAYS
      for (let i = 0; i < grd.length - 1; i++) {
        let elem = grd[i];
        let row = {
          s1: elem.s1,
          s2: elem.s2,
          s3: elem.s3,
          s4: elem.s4,
          department: {
            connect: i + 1,
          },
        };
        sunds.push(row);
      }

      let sundayInput = {
        create: sunds,
      };

      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $title: String!
              $subtitle: String!
              $year: Int!
              $month: Int!
              $pastor: Boolean!
              $curriculum: ID!
              $district: ID!
              $church: ID!
              $mission: ID!
              $current_membership: Int!
              $congregants_count: Int!
              $cells_count: Int!
              $missions_count: Int!
              $baptism_candidates: Int!
              $baptism: Int!
              $new_believers_discipled: Int!
              $trained_leaders: Int!
              $founded_cells: Int!
              $founded_missions: Int!
              $founded_churches: Int!
              $evangelistic_visits: Int!
              $discipleship_visits: Int!
              $building_visits: Int!
              $faith_professions: Int!
              $reconciled_brothers: Int!
              $ministered_lives: Int!
              $cults_held: Int!
              $sponsors: [ID!]
              $sundays: PayrollSundaysInput
            ) {
              createPayroll(
                input: {
                  title: $title
                  subtitle: $subtitle
                  year: $year
                  month: $month
                  pastor: $pastor
                  curriculum: { connect: $curriculum }
                  district: { connect: $district }
                  church: { connect: $church }
                  mission: { connect: $mission }
                  concept: {
                    create: {
                      current_membership: $current_membership
                      congregants_count: $congregants_count
                      cells_count: $cells_count
                      missions_count: $missions_count
                      baptism_candidates: $baptism_candidates
                      baptism: $baptism
                      new_believers_discipled: $new_believers_discipled
                      trained_leaders: $trained_leaders
                      founded_cells: $founded_cells
                      founded_missions: $founded_missions
                      founded_churches: $founded_churches
                      evangelistic_visits: $evangelistic_visits
                      discipleship_visits: $discipleship_visits
                      building_visits: $building_visits
                      faith_professions: $faith_professions
                      reconciled_brothers: $reconciled_brothers
                      ministered_lives: $ministered_lives
                      cults_held: $cults_held
                    }
                  }
                  sponsors: { connect: $sponsors }
                  sundays: $sundays
                }
              ) {
                id
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
          // Parameters
          variables: {
            title: this.title,
            subtitle: this.subtitle,
            year: this.year,
            month: this.month_id,
            pastor: pastor,
            curriculum: this.curriculum_id,
            district: this.district_id,
            church: this.church_id,
            mission: this.mission_id,
            current_membership: this.current_membership,
            congregants_count: this.congregants_count,
            cells_count: this.cells_count,
            missions_count: this.missions_count,
            baptism_candidates: this.baptism_candidates,
            baptism: this.baptism,
            new_believers_discipled: this.new_believers_discipled,
            trained_leaders: this.trained_leaders,
            founded_cells: this.founded_cells,
            founded_missions: this.founded_missions,
            founded_churches: this.founded_churches,
            evangelistic_visits: this.evangelistic_visits,
            discipleship_visits: this.discipleship_visits,
            building_visits: this.building_visits,
            faith_professions: this.faith_professions,
            reconciled_brothers: this.reconciled_brothers,
            ministered_lives: this.ministered_lives,
            cults_held: this.cults_held,
            sponsors: this.sponsors_ids,
            sundays: sundayInput,
          },
        })
        .then((data) => {
          //this.loading = false;

          if (this.action === "insert") {
            this.notify("success", "Planilla", "Planilla creada");

            this.$router.push("/payrolls");
          } else {
            this.notify("success", "Planilla", "Planilla actualizada");
            this.$emit("show_payroll", false);
          }
        })
        .catch((error) => {
          //console.error(error);
        });
    },

    getPayroll: async function (id) {
      await this.$apollo
        .query({
          query: gql`
            query($id: ID!) {
              payroll(id: $id) {
                id
                title
                subtitle
                year
                month
                pastor
                district {
                  id
                  name
                }
                church {
                  id
                  name
                }
                mission {
                  id
                  name
                }
                concept {
                  id
                  current_membership
                  congregants_count
                  cells_count
                  missions_count
                  baptism_candidates
                  baptism
                  new_believers_discipled
                  trained_leaders
                  founded_cells
                  founded_missions
                  founded_churches
                  evangelistic_visits
                  discipleship_visits
                  building_visits
                  faith_professions
                  reconciled_brothers
                  ministered_lives
                  cults_held
                }
                curriculum {
                  id
                  name
                }
                sponsors {
                  id
                  name
                }
                sundays {
                  id
                  s1
                  s2
                  s3
                  s4
                  department {
                    id
                    name
                  }
                }
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
          //console.log("PAYROLL"+data.data.payroll);
          let payroll = data.data.payroll;

          //ASOCIAR LOS VALORES CON LOS ATRIBUTOS
          //ATRIBUTES
          this.curriculum_id = payroll.curriculum.id;
          this.pastor = payroll.pastor;
          this.district_id = payroll.district.id;
          this.year = payroll.year;
          this.month_id = payroll.month;
          this.church_id = payroll.church.id;

          let spns = payroll.sponsors;
          for (let i in spns) {
            let recipe = spns[i];
            this.sponsors_ids.push(recipe.id);
          }

          this.mission_id = payroll.mission.id;

          //CONCEPTOS
          this.concept_id = payroll.concept.id;
          this.current_membership = payroll.concept.current_membership;
          this.congregants_count = payroll.concept.congregants_count;
          this.cells_count = payroll.concept.cells_count;
          this.missions_count = payroll.concept.missions_count;
          this.baptism_candidates = payroll.concept.baptism_candidates;
          this.baptism = payroll.concept.baptism;

          this.new_believers_discipled = payroll.concept.new_believers_discipled;
          this.trained_leaders = payroll.concept.trained_leaders;
          this.founded_cells = payroll.concept.founded_cells;
          this.founded_missions = payroll.concept.founded_missions;
          this.founded_churches = payroll.concept.founded_churches;
          this.evangelistic_visits = payroll.concept.evangelistic_visits;
          this.discipleship_visits = payroll.concept.discipleship_visits;
          this.building_visits = payroll.concept.building_visits;
          this.faith_professions = payroll.concept.faith_professions;
          this.reconciled_brothers = payroll.concept.reconciled_brothers;
          this.ministered_lives = payroll.concept.ministered_lives;
          this.cults_held = payroll.concept.cults_held;

          //SUNDAYS
          //this.gridData = [];
          let sun = payroll.sundays;
          // console.log(sun);
          for (let i in sun) {
            let recipe = sun[i];

            let elem = {
              id: recipe.id,
              department: recipe.department.name,
              s1: recipe.s1,
              s2: recipe.s2,
              s3: recipe.s3,
              s4: recipe.s4,
              average: 0,
            };

            this.gridData.push(elem);
          }
        })
        .catch((error) => {
          //console.error(error);
        });
    },

    deletePayroll(ids) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($ids: [Int]) {
              deletePayrolls(ids: $ids) {
                id
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
          // Parameters
          variables: {
            ids: ids,
          },
        })
        .then((data) => {
          //this.loading = false;
          //this.notify("success", "Planilla", "Eliminada correctamente");
        })
        .catch((error) => {
          //console.error(error);
        });
    },
  },

  watch: {
    action(val) {},

    sundays(val) {},

    payroll_id_p(val) {
      //this.payroll_id = val;
    },

    show_payroll(val) {},

    // sponsors_ids(val) {
    //   if (val.length !== 0 && this.action === "insert") this.loading = false;
    // },

    show_export(val) {},

    gridData(val) {
      if (val.length !== 0 && this.action === "update") this.loading = false;
    },
  },

  computed: {
    method() {
      if (this.action === "insert") {
        return "Crear";
      } else {
        return "Actualizar";
      }
    },
    // auth() {
    //   return this.$store.getters.isAuthenticated;
    // },
  },
  components: {
    Atributes: PayrollAtributes,
    Concepts: PayrollConcepts,
    Sundays: PayrollSundays,
    Loading: Loading,
    WordExportPayroll: WordExportPayroll,
  },

  props: {
    payroll_id_p: "",
    action_p: "",
  },
};
</script>
