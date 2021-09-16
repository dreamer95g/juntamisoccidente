<template>
  <div class="mt-0 bg-white rounded-md shadow-lg">
    <br />
    <h1
      v-if="!show_payroll && gridData.length !== 0 && !loading"
      class="mx-6 top-auto flex-auto text-lg font-semibold"
    >
      {{ title }}
    </h1>

    <div class="mt-4" v-if="gridData.length !== 0">
      <div class="p-6 bg-white">
        <div v-if="!show_payroll">
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
                  @click="goToPayroll()"
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
                <div class="row">
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
                      :selectionSettings="selectionSettings"
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
                          field="subtitle"
                          headerText="Informe"
                          :filter="filter"
                          width="50"
                          clipMode="EllipsisWithTooltip"
                          :required="true"
                          :isPrimaryKey="false"
                        ></e-column>
                        <e-column
                          field="month"
                          headerText="Mes"
                          :filter="filter"
                          width="50"
                          clipMode="EllipsisWithTooltip"
                          :required="true"
                          :isPrimaryKey="true"
                        ></e-column>
                        <e-column
                          field="year"
                          headerText="Año"
                          :filter="filter"
                          width="50"
                          clipMode="EllipsisWithTooltip"
                          :required="true"
                          :isPrimaryKey="true"
                        ></e-column>
                        <e-column
                          field="curriculum"
                          headerText="Obrero"
                          :filter="filter"
                          width="50"
                          clipMode="EllipsisWithTooltip"
                          :required="true"
                          :isPrimaryKey="true"
                        ></e-column>
                        <e-column
                          field="district"
                          headerText="Distrito"
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
        </div>

        <div v-else>
          <Payroll
            :action_p="action"
            :payroll_id_p="payroll_id"
            @show_payroll="show_payroll = $event"
          ></Payroll>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div v-if="gridData.length === 0 && !loading" align="center">
      <div>
        <h4 class="text-lg font-semibold">No hay planillas en la base de datos</h4>
        <div>
          <router-link to="/payroll" class="text-blue-700">Agregar +</router-link>
        </div>
      </div>
      <br />
      <br />
    </div>
    <div v-if="loading">
      <Loading></Loading>
    </div>
    <br />
    <br />
  </div>
</template>
<script>
import Vue from "vue";
import gql from "graphql-tag";
import Payroll from "./Payroll";
import Loading from "../../Loading";

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
// Vue.use(Table);

export default {
  data() {
    return {
      title: "Lista de Planillas",
      show_payroll: false,
      loading: false,
      action: "",
      deleted: false,
      selecteds: "",
      payroll_ids: "",

      //PARA EDITAR LA PLANILLA SELECCIONADA
      payroll_id: "",
      //SINCFHUSION
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
      selectionSettings: { checkboxMode: "ResetOnRowClick", type: "Single" },
      query: "",
      gridData: [],
      token: "",
    };
  },

  mounted() {
    this.loading = true;
    this.token = this.$store.state.token;
    this.getList();
  },
  created() {},

  methods: {
    goToPayroll() {
      this.$router.push("/payroll");
    },
    updateFlow() {
      //this.loading = true;
      if (this.selecteds.length !== 0) {
        this.action = "update";
        this.show_payroll = true;
      } else {
        this.notify("warning", "Atencion", " Tiene que seleccionar una planilla ");
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

    notifyConfirm() {
      if (this.selecteds.length !== 0) {
        const key = `open${Date.now()}`;
        this.$notification.open({
          message: "Confirmacion",
          description: " Desea realmente eliminar la planilla? ",
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
        this.notify("warning", "Atencion", "Debe seleccionar una planilla");
      }
    },

    deleteFlow() {
      if (this.selecteds !== "") {
        this.action = "delete";
        this.loading = true;
        this.deletePayrolls(this.payroll_ids);
        this.$notification.destroy();
      } else {
        this.notify("warning", "Atencion", "Debe seleccionar una planilla");
      }
    },

    //OBTENER LA LISTA DE PLANILLAS
    async getList() {
      await this.$apollo
        .query({
          query: gql`
            query {
              payrolls(first: 1000) {
                data {
                  id
                  subtitle
                  month
                  year
                  curriculum {
                    name
                  }
                  district {
                    name
                  }
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
          let payrolls = data.data.payrolls.data;
          //console.log(data.data.payrolls);

          for (let i in payrolls) {
            let id = payrolls[i].id;
            let subtitle = payrolls[i].subtitle;
            let month = payrolls[i].month;
            let year = payrolls[i].year;
            let curriculum = payrolls[i].curriculum.name;
            let district = payrolls[i].district.name;

            let month_esp = "";
            switch (month) {
              case 1:
                month_esp = "Enero";
                //this.$emit("month_id", this.month_id);
                break;
              case 2:
                month_esp = "Febrero";
                //this.$emit("month_id", this.month_id);
                break;
              case 3:
                month_esp = "Marzo";
                //this.$emit("month_id", this.month_id);
                break;
              case 4:
                month_esp = "Abril";
                // this.$emit("month_id", this.month_id);
                break;
              case 5:
                month_esp = "Mayo";
                //this.$emit("month_id", this.month_id);
                break;
              case 6:
                month_esp = "Junio";
                //this.$emit("month_id", this.month_id);
                break;
              case 7:
                month_esp = "Julio";
                //this.$emit("month_id", this.month_id);
                break;
              case 8:
                month_esp = "Agosto";
                //this.$emit("month_id", this.month_id);
                break;
              case 9:
                month_esp = "Septiembre";
                //this.$emit("month_id", this.month_id);
                break;
              case 10:
                month_esp = "Octubre";
                //this.$emit("month_id", this.month_id);
                break;
              case 11:
                month_esp = "Noviembre";
                //this.$emit("month_id", this.month_id);
                break;
              case 12:
                month_esp = "Diciembre";
                //this.$emit("month_id", this.month_id);
                break;
            }

            let elem = {
              id: id,
              subtitle: subtitle,
              month: month_esp,
              year: year,
              curriculum: curriculum,
              district: district,
            };

            this.gridData.push(elem);
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
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
          //this.loading = false;
          //console.log(data);
          this.notify("success", "Planilla", "Eliminada correctamente");
          this.getList();
          this.selecteds = [];
        })
        .catch((error) => {
          //console.error(error);
        });
    },

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
        //console.log(sel);
      }

      //PARA SELECCIONARLO INDIVIDUALMENTE
      // let rowObj = this.$refs.grid.ej2Instances.getRowObjectFromUID(
      //   rows.getAttribute("data-uid")
      // );

      //let id = rowObj.data.id;

      //this.selected = id;

      //alert(this.selected);

      //console.log(rows);
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
    Payroll: Payroll,
    Loading: Loading,
  },

  computed: {
    // auth() {
    //     return this.$store.getters.isAuthenticated;
    // },
  },

  watch: {
    selecteds: function (val) {
      this.payroll_ids = val;
      //let rows = this.$refs.grid.ej2Instances.getSelectedRows()[0];
      //console.log(rows);
      // let rowObj = this.$refs.grid.ej2Instances.getRowObjectFromUID(
      //   rows.getAttribute("data-uid")
      // );
      // let id = rowObj.data.id;
    },

    gridData: function (val) {
      //console.log(val);
    },

    show_payroll: function (val) {
      // alert("asdasdasd");
      if (val === false) {
        this.loading = true;
        //this.gridData = [];
        this.getList();
        this.selecteds = [];
        // this.payroll_ids = [];
      }
    },

    payroll_ids: function (val) {
      if (val.length !== 0) {
        this.payroll_id = val[0];
      }
    },
  },
};
</script>
<style></style>
