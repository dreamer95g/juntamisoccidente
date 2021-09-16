<template>
  <div class="mt-0 bg-white rounded-md shadow-lg">
    <br />
    <h1
      v-if="!show_curriculum && gridData.length !== 0 && !loading"
      class="mx-6 top-auto flex-auto text-lg font-semibold"
    >
      {{ title }}
    </h1>

    <div class="mt-4" v-if="gridData.length !== 0">
      <div class="p-6 bg-white rounded-md">
        <div v-if="!show_curriculum">
          <div v-if="!loading">
            <div class="grid grid-cols-2 gap-1 align-baseline">
              <div class="flex space-x-3">
                <button
                  @click="updateFlow()"
                  class="py-2 px-4 text-center bg-green-600 rounded-md w-1/4 text-white text-sm hover:bg-green-500"
                  type="button"
                >
                  Actualizar
                </button>
                <button
                  @click="notifyConfirm()"
                  class="py-2 px-4 text-center bg-red-600 rounded-md w-1/4 text-white text-sm hover:bg-red-500"
                  type="button"
                >
                  Eliminar
                </button>
                <button
                  @click="goToCurriculum()"
                  class="w-1/4 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-300"
                  type="button"
                >
                  Agregar +
                </button>
              </div>
              <div></div>
              <div></div>
            </div>
          </div>

          <br />
          <br />
          <br />
          <div v-if="!loading">
            <div v-if="gridData.length !== 0">
              <div v-if="loadingGrid !== true" :class="blockedcomponent">
                <div
                  class="col-xs-12 col-sm-12 col-lg-12 col-md-12"
                  style="margin-top: -17px"
                >
                  <ejs-grid
                    ref="grid"
                    class="r-space"
                    :load="onGridLoad"
                    :toolbarClick="toolbarClick"
                    :actionBegin="onActionBegin"
                    :actionComplete="onload"
                    :toolbar="toolbar"
                    :dataSource="gridData"
                    :allowExcelExport="false"
                    :query="query"
                    :allowSorting="true"
                    :allowSelection="true"
                    :selectionSettings="selectionOptions"
                    :allowFiltering="true"
                    :allowPaging="true"
                    :allowGrouping="false"
                    :pageSettings="pageSettings"
                    :editSettings="editSettings"
                    :filterSettings="filterSettings"
                    :rowSelected="rowSelected"
                  >
                    <e-columns>
                      <e-column type="checkbox" width="10"></e-column>
                      <e-column
                        :visible="false"
                        field="id"
                        headerText
                        textAlign="Left"
                        width="15"
                      ></e-column>
                      <e-column
                        field="dni"
                        headerText="CI"
                        :filter="filter"
                        width="50"
                        clipMode="EllipsisWithTooltip"
                        :required="true"
                        :isPrimaryKey="false"
                      ></e-column>
                      <e-column
                        field="name"
                        headerText="Nombre"
                        :filter="filter"
                        width="50"
                        clipMode="EllipsisWithTooltip"
                        :required="true"
                        :isPrimaryKey="true"
                      ></e-column>
                      <e-column
                        field="profession"
                        headerText="Profesion"
                        :filter="filter"
                        width="50"
                        clipMode="EllipsisWithTooltip"
                        :required="true"
                        :isPrimaryKey="true"
                      ></e-column>
                    </e-columns>
                  </ejs-grid>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <Curriculum
            :action_p="action"
            :curriculum_id_p="curriculum_id"
            @show_curriculum="show_curriculum = $event"
          ></Curriculum>
        </div>
      </div>
    </div>

    <div v-if="gridData.length === 0 && !loading" align="center">
      <div>
        <h4 class="text-lg font-semibold">No hay curriculums en la base de datos</h4>
        <div>
          <router-link to="/curriculum" class="text-blue-700">Agregar +</router-link>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <Loading></Loading>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>
<style></style>
<script>
import Vue from "vue";
import Curriculum from "./Curriculum";
import Loading from "../../Loading";
import gql from "graphql-tag";
import store from "../../../store/index";
import { setCulture } from "@syncfusion/ej2-base";
setCulture("es");

import {
  GridPlugin,
  Edit,
  Filter,
  Group,
  Page,
  Selection,
  Toolbar,
} from "@syncfusion/ej2-vue-grids";
import { TooltipPlugin, Tooltip } from "@syncfusion/ej2-vue-popups";

Vue.use(GridPlugin);
Vue.use(TooltipPlugin);

import { Button } from "ant-design-vue";
// import { Table } from "ant-design-vue";
Vue.use(Button);

export default {
  data() {
    return {
      title: "Lista de Curriculums",
      show_curriculum: false,
      loading: false,
      action: "",
      selecteds: [],
      //atributos de grid syncfushion
      loadingGrid: false,
      blockedcomponent: "",
      tooltip: "",
      editSettings: {
        showDeleteConfirmDialog: false,
        allowEditing: false,
        allowAdding: false,
      },
      toolbar: ["Search"],

      editparams: { params: { popupHeight: "300px" } },
      pageSettings: { pageCount: 1000, pageSize: 10 },
      filterSettings: { type: "Menu", columns: [] },
      filter: { type: "CheckBox" },
      selectionOptions: {
        checkboxMode: "ResetOnRowClick",
      },
      query: "",
      gridData: [],

      //updateFlow
      curriculum_ids: "",
      curriculum_id: "",
      token: "",
    };
  },

  created() {},

  mounted() {
    this.loading = true;
    this.token = store.state.token;
    this.getList();
  },

  methods: {
    goToCurriculum() {
      this.$router.push("/curriculum");
    },
    updateFlow() {
      if (this.curriculum_ids.length !== 0) {
        if (this.curriculum_ids.length === 1) {
          //
          this.action = "update";
          this.show_curriculum = true;
          this.loading = false;
        } else {
          this.notify(
            "warning",
            "Atencion",
            " Solo puede actualizar un curriculum a la vez "
          );
          this.selecteds = [];
          this.curriculum_ids = [];
          //this.$apollo.queries.list.refetch();
          //this.$emit("gridData");
        }
      } else {
        this.notify("warning", "Atencion", " Tiene que seleccionar un curriculum ");
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

    async getList() {
      await this.$apollo
        .query({
          query: gql`
            query {
              curricula(first: 1000) {
                data {
                  id
                  dni
                  name
                  profession
                }
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
          fetchPolicy: "no-cache",
        })
        .then((data) => {
          this.gridData = [];
          this.gridData = data.data.curricula.data;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          //console.error(error);
        });
    },

    notifyConfirm() {
      if (this.selecteds.length !== 0) {
        const key = `open${Date.now()}`;
        this.$notification.open({
          message: "Confirmacion",
          description: " Desea realmente eliminar el curriculum? ",
          btn: (h) => {
            return h(
              "a-button",
              {
                props: {
                  type: "danger",
                  size: "default",
                },
                on: {
                  click: () => this.deleteFlow(),
                },
              },
              "Confirmar"
            );
          },
          key,
          onClose: close,
        });
      } else {
        this.notify("warning", "Atencion", "Debe seleccionar un curriculum");
      }
    },

    //------------------------------DELETE FLOW----------------------------------------------------//

    deleteFlow() {
      if (this.curriculum_ids.length !== 0) {
        this.loading = true;
        this.deleteCurricula(this.curriculum_ids);
        this.$notification.destroy();
      } else {
        this.notify("error", "Atencion", " Tiene que seleccionar un curriculum ");
      }
    },

    deleteCurricula(ids) {
      //ELIMINAR LAS PLANILLAS ASOCIADAS
      for (let i in ids) {
        let id_c = ids[i];
        this.getPayrollsAtached(id_c);
      }

      //ELIMINAR EL CURRICULO
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($ids: [Int]) {
              deleteCurricula(ids: $ids) {
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
          //console.log(data);
          this.notify("success", "Curriculum", "Eliminado correctamente");
          this.getList();
          this.selecteds = [];
          // this.$router.push("/curricula");
        })
        .catch((error) => {
          //console.error(error);
        });
    },

    //ELIMINAR MULTIPLES PLANILLAS
    deletePayrolls(ids) {
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
          //this.gridData = [];
          this.loading = false;
          //console.log(data);
          // this.notify("success", "Planilla", "Eliminada correctamente");
          //this.getList();
          //this.selecteds = [];
        })
        .catch((error) => {
          //console.error(error);
        });
    },

    async getPayrollsAtached(curriculum_id) {
      await this.$apollo
        .query({
          query: gql`
            query($id: Mixed!) {
              payrollsWhere(where: { column: CURRICULUM_ID, operator: EQ, value: $id }) {
                id
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
          variables: {
            id: curriculum_id,
          },
          fetchPolicy: "no-cache",
        })
        .then((data) => {
          //console.log(data.data.payrollsWhere);
          let recipes = data.data.payrollsWhere;
          let p_ids = [];
          for (let i in recipes) {
            let elem = recipes[i];
            p_ids.push(elem.id);
          }

          if (p_ids.length !== 0) {
            this.deletePayrolls(p_ids);
          }
        })
        .catch((error) => {
          //console.error(error);
        });
    },

    //-----------------------------SYNCFUSHION METHODS---------------------------//
    toolbarClick: function (args) {
      // console.log(args.item);
      switch (
        args.item.text
        // case "Excel Export":
        //   this.$refs.grid.excelExport();
        //   break;
      ) {
      }
    },

    rowSelected: function (args) {
      this.selecteds = [];
      let sel = [];
      // let rows = this.$refs.grid.ej2Instances.getSelectedRows()[0];
      let rows = this.$refs.grid.ej2Instances.getSelectedRows();

      for (let i in rows) {
        let elem = rows[i];
        let rowObj = this.$refs.grid.ej2Instances.getRowObjectFromUID(
          elem.getAttribute("data-uid")
        );
        let id = rowObj.data.id;
        sel.push(id);
        this.selecteds = sel;
        //console.log(id);
      }
    },

    onGridLoad: function () {},

    onActionBegin: function (args) {},

    onload: function () {},

    editToolClicked: function (args) {
      if (args.item.id === "editTool") {
      }
    },

    showTooltip: function (args) {
      this.tooltip = new Tooltip(
        {
          beforeOpen: (e) => {
            if (
              e.target.classList.contains("e-unboundcell") ||
              e.target.lastChild.classList.contains("e-unboundcell")
            ) {
              // e.cancel = true
            }
          },
          content: args.data["Note"].toString(),
        },
        args.row
      );
    },
  },

  provide: {
    grid: [Group, Filter, Page, Selection, Toolbar],
  },

  components: {
    Curriculum: Curriculum,
    Loading: Loading,
  },

  computed: {
    // auth() {
    //   return this.$store.getters.isAuthenticated;
    // },
  },

  watch: {
    selecteds: function (val) {
      this.curriculum_ids = val;
    },

    gridData: function (val) {
      //console.log(val);
    },

    show_curriculum: function (val) {
      if (val === false) {
        this.loading = true;
        this.getList();
        this.selecteds = [];
      }
    },

    curriculum_ids: function (val) {
      if (val.length !== 0) {
        this.curriculum_id = val[0];
      }
    },
  },
};
</script>
