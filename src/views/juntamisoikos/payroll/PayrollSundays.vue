<template>
  <div class="mt-4">
    <h2
      align="center"
      class="text-lg text-gray-700 font-semibold capitalize"
      v-if="show_grid"
    >
      Escuelas Dominicales:
    </h2>
    <br />
    <div v-if="show_grid" class="mx-6 my-6">
      <div v-if="loadingGrid !== true" :class="blockedcomponent">
        <div class="row" table table-hover>
          <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12" style="margin-top: -17px">
            <ejs-grid
              ref="gridObjs"
              class="r-space"
              :load="onGridLoad"
              :toolbarClick="toolbarClick"
              :actionBegin="onActionBegin"
              :actionComplete="onload"
              :toolbar="toolbar"
              :dataSource="grid"
              :allowExcelExport="false"
              :allowPdfExport="false"
              :query="query"
              :allowSorting="true"
              :allowSelection="true"
              :selectionSettings="selectionSettings"
              :allowFiltering="false"
              :allowPaging="true"
              :allowGrouping="true"
              :pageSettings="pageSettings"
              :editSettings="editSettings"
              :filterSettings="filterSettings"
              :rowSelected="rowSelected"
            >
              <e-columns>
                <!-- <e-column type="checkbox" width="10"></e-column> -->
                <e-column
                  :visible="false"
                  field="id"
                  headerText
                  textAlign="Left"
                  width="10"
                  :isPrimaryKey="true"
                ></e-column>

                <e-column
                  field="department"
                  :isPrimaryKey="true"
                  headerText="Asistencia"
                  width="20"
                  clipMode="EllipsisWithTooltip"
                  :required="true"
                ></e-column>

                <e-column
                  field="s1"
                  :isPrimaryKey="false"
                  headerText="Semana 1"
                  width="30"
                  clipMode="EllipsisWithTooltip"
                  :required="true"
                ></e-column>

                <e-column
                  field="s2"
                  :isPrimaryKey="false"
                  headerText="Semana 2"
                  width="30"
                  clipMode="EllipsisWithTooltip"
                  :required="true"
                ></e-column>
                <e-column
                  field="s3"
                  :isPrimaryKey="false"
                  headerText="Semana 3"
                  width="30"
                  clipMode="EllipsisWithTooltip"
                  :required="true"
                ></e-column>
                <e-column
                  field="s4"
                  :isPrimaryKey="false"
                  headerText="Semana 4"
                  width="30"
                  clipMode="EllipsisWithTooltip"
                  :required="true"
                ></e-column>

                <e-column
                  field="average"
                  :isPrimaryKey="true"
                  headerText="Promedio"
                  width="20"
                  clipMode="EllipsisWithTooltip"
                  :required="true"
                ></e-column>
              </e-columns>
            </ejs-grid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import gql from "graphql-tag";
import { TooltipPlugin, Tooltip } from "@syncfusion/ej2-vue-popups";

import {
  GridPlugin,
  Edit,
  //Group,
  Page,
  Selection,
  Toolbar,
} from "@syncfusion/ej2-vue-grids";

Vue.use(GridPlugin);
Vue.use(TooltipPlugin);

// const $ = require("jquery");
// window.$ = $;

export default {
  data() {
    return {
      show_grid: false,
      //sale por post, y lleva el atributo utility

      //atributos del grid
      departments: [],
      loadingGrid: false,
      blockedcomponent: "",
      grid: [],
      rowIndex: "",
      tooltip: "",

      editSettings: {
        showDeleteConfirmDialog: false,
        allowEditing: true,
        allowAdding: false,
        allowDeleting: false,
      },

      toolbar: ["Update", "Cancel"],

      editparams: {
        params: { popupHeight: "300px" },
      },
      pageSettings: { pageCount: 5, pageSize: 10 },
      filterSettings: { type: "Menu", columns: [] },
      filter: { type: "CheckBox" },
      selectionSettings: { type: "Multiple", mode: "Row" },
      query: "",
      commands: [],
      token: "",
    };
  },

  mounted() {
    this.token = this.$store.state.token;
    if (this.grid_p === undefined) {
      this.initDepartments();
    }

    if (this.grid_p !== undefined && this.grid_p.length !== 0) {
      this.grid = [];

      this.grid = this.grid_p;

      if (this.grid.length === 5) {
        let total = {
          id: 6,
          department: "Total",
          s1: 0,
          s2: 0,
          s3: 0,
          s4: 0,
          average: 0,
        };

        this.grid.push(total);
        //ACTUALIZAR PROMEDIOS
        this.utility();
      }

      this.show_grid = true;

      //ESTO NO SE PUEDE HACER
      //this.grid_p = [];
    }
    //this.$emit("loading", false);
  },

  created() {},

  methods: {
    initDepartments: async function () {
      await this.$apollo
        .query({
          query: gql`
            query {
              departments {
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
          let dep = data.data.departments;
          //console.log(dep);

          for (let i in dep) {
            let d = dep[i];
            this.departments.push(d.name);
          }
        })
        .catch((error) => {
          //console.error(error);
        });
    },

    notify: function (type, title, description) {
      //TYPES
      //success, info, warning, error
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    toolbarClick: function (args) {
      switch (args.item.text) {
        case "Update":
          let rows = this.$refs.gridObjs.ej2Instances.dataSource;
          //console.log(rows);
          this.grid = rows;

          this.utility();

          break;
      }
    },

    rowSelected: function (args) {
      let rows = this.$refs.gridObjs.ej2Instances.getSelectedRows()[0];

      let rowObj = this.$refs.gridObjs.ej2Instances.getRowObjectFromUID(
        rows.getAttribute("data-uid")
      );
    },

    onGridLoad: function () {},

    onActionBegin: function (args) {},

    onload: function () {},

    //---------------------------------------------------------------------------------------------------------------//

    utility: async function () {
      //console.log(this.grid);

      if (this.grid.length !== 0) {
        await this.$apollo
          .query({
            query: gql`
              query($grid: [GridInput]) {
                sundaysUtility(input: { grid: $grid }) {
                  id
                  department
                  s1
                  s2
                  s3
                  s4
                  average
                }
              }
            `,
            context: {
              headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
            },
            variables: {
              grid: this.grid,
            },

            //fetchPolicy: "no-cache",
          })
          .then((data) => {
            this.grid = [];
            //console.log(data.data);
            let grid = data.data.sundaysUtility;
            // console.log(grid);
            for (let i in grid) {
              let elem = grid[i];
              let obj = {
                id: elem.id,
                department: elem.department,
                s1: elem.s1,
                s2: elem.s2,
                s3: elem.s3,
                s4: elem.s4,
                average: elem.average,
              };
              this.grid.push(obj);
              //console.log(elem);
            }
            return this.grid;
          })
          .catch((error) => {
            //console.error(error);
          });
      } else {
        this.notify("warning", "Grid", "Grid esta vacio");
      }
    },

    //--------------------------------------------------------------------------------------------------//

    editToolClicked: function (args) {
      if (args.item.id === "editTool") {
        //console.log(args);
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
    grid: [Edit, Page, Selection, Toolbar],
  },

  computed: {},

  watch: {
    grid: function (val) {
      this.$emit("grid", val);
      //this.$emit("loading", false);
    },

    grid_p: function (val) {
      if (val !== undefined) {
        // this.notify("warning", "Grid p watch", this.grid_p.length);
      }
    },

    departments: function (val) {
      if (val.length === 5) {
        this.grid = [
          {
            id: 1,
            department: val[0],
            s1: 0,
            s2: 0,
            s3: 0,
            s4: 0,
            average: 0,
          },
          {
            id: 2,
            department: val[1],
            s1: 0,
            s2: 0,
            s3: 0,
            s4: 0,
            average: 0,
          },
          {
            id: 3,
            department: val[2],
            s1: 0,
            s2: 0,
            s3: 0,
            s4: 0,
            average: 0,
          },
          {
            id: 4,
            department: val[3],
            s1: 0,
            s2: 0,
            s3: 0,
            s4: 0,
            average: 0,
          },
          {
            id: 5,
            department: val[4],
            s1: 0,
            s2: 0,
            s3: 0,
            s4: 0,
            average: 0,
          },
          {
            id: 6,
            department: "Total",
            s1: 0,
            s2: 0,
            s3: 0,
            s4: 0,
            average: 0,
          },
        ];

        this.show_grid = true;
      }
    },
  },
  props: {
    grid_p: Array,
  },
};
</script>
