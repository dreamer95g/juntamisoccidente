<template>
  <div class="mt-4">
    <h1 class="mx-6 top-auto flex-auto text-lg font-semibold">
      {{ title }}
    </h1>
    <br />
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
          @click="deleteFlow()"
          class="py-2 px-4 text-center bg-red-600 rounded-md w-1/4 text-white text-sm hover:bg-red-500"
          type="button"
        >
          Eliminar
        </button>
        <button
          @click="createFlow()"
          class="w-1/4 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-300"
          type="button"
        >
          Agregar +
        </button>
      </div>
      <div></div>
      <div></div>
    </div>
    <br />
    <br />
    <div v-if="loadingGrid !== true" :class="blockedcomponent">
      <div class="row top-row">
        <br />
      </div>

      <div class="row" table table-hover>
        <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12" style="margin-top: -17px">
          <ejs-grid
            ref="gridObj"
            class="r-space"
            :load="onGridLoad"
            :toolbarClick="toolbarClick"
            :actionBegin="onActionBegin"
            :actionComplete="onload"
            :toolbar="toolbar"
            :dataSource="gridData"
            :allowExcelExport="false"
            :allowPdfExport="false"
            :query="query"
            :allowSorting="true"
            :allowSelection="true"
            :selectionSettings="selectionSettings"
            :allowFiltering="true"
            :allowPaging="true"
            :allowGrouping="true"
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
                :isPrimaryKey="true"
              ></e-column>
              <e-column
                field="name"
                :isPrimaryKey="false"
                headerText="Nombre"
                :filter="filter"
                width="100"
                clipMode="EllipsisWithTooltip"
                :required="true"
              ></e-column>
              <!--<e-column field='puntos' editType='numericedit' headerText='Puntos' :filter='filter' width=70 :required='true'></e-column>-->
            </e-columns>
          </ejs-grid>
        </div>
      </div>
    </div>

    <div v-if="show_modal">
      <a-modal :title="modal_title" v-model="show_modal" @ok="handleOk">
        <a-input v-model="name" @keyup.enter="handleOk" placeholder="Escriba el nombre" />
      </a-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import gql from "graphql-tag";

import { Input } from "ant-design-vue";
import { Button } from "ant-design-vue";
import { Modal } from "ant-design-vue";

Vue.use(Button);
Vue.use(Modal);
Vue.use(Input);

import { TooltipPlugin, Tooltip } from "@syncfusion/ej2-vue-popups";

import {
  GridPlugin,
  Edit,
  //ExcelExport,
  Filter,
  //Group,
  Page,
  Selection,
  Toolbar,
} from "@syncfusion/ej2-vue-grids";

Vue.use(GridPlugin);
Vue.use(TooltipPlugin);

// const $ = require("jquery");
// window.$ = $;

export default Vue.extend({
  data: () => {
    return {
      //MODAL
      modal_title: "",
      show_modal: false,
      name: "",
      //atributos propios
      // title: "",
      // subtitle: "",
      // url: "",

      // atributos de la tabla
      selected: "",
      loadingGrid: false,
      blockedcomponent: "",
      gridData: "",
      rowIndex: "",
      tooltip: "",

      editSettings: {},

      toolbar: ["Search"],

      editparams: {
        params: { popupHeight: "300px" },
      },
      pageSettings: { pageCount: 1000, pageSize: 10 },
      filterSettings: { type: "Menu", columns: [] },
      filter: { type: "CheckBox" },
      selectionSettings: { checkboxMode: "ResetOnRowClick", type: "Single" },

      namesFromServer: [],
      // query: "",
      commands: [],
      token: "",
    };
  },

  mounted() {
    this.token = this.$store.state.token;
    //console.log(this.token);
    if (this.query !== "") {
      this.list(this.query);
    }


  },

  created() {},

  methods: {
    //MODAL
    showModal() {
      this.show_modal = true;
    },
    handleOk(e) {
      //console.log(e);
      this.show_modal = false;
      if (this.modal_title === "Crear") {
        if (this.name !== "") {
          this.add(this.name);
          this.name = "";
          this.selected = "";
        } else {
          this.notify("warnig", "Atencion", "tiene que llenar el nombre");
        }
      } else {
        if (this.name !== "") {
          this.update(this.selected, this.name);
          this.name = "";
          this.selected = "";
        } else {
          this.notify("warnig", "Atencion", "tiene que llenar el nombre");
        }
      }
    },

    updateFlow() {
      if (this.selected !== "") {
        this.modal_title = "Actualizar";
        this.show_modal = true;
      } else {
        this.notify("warning", "Atencion", "Tiene que seleccionar un elemento");
      }
    },

    deleteFlow() {
      this.notifyConfirm();
    },

    createFlow() {
      this.modal_title = "Crear";
      this.name = "";
      this.show_modal = true;
    },

    notifyConfirm() {
      if (this.selected !== "") {
        const key = `open${Date.now()}`;
        this.$notification.open({
          message: "Confirmacion",
          description: " Desea realmente eliminar ? ",
          btn: (h) => {
            return h(
              "a-button",
              {
                props: {
                  type: "danger",
                  size: "default",
                },
                on: {
                  click: () => this.delete(this.selected),
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

    toolbarClick: function (args) {
      //console.log(args.item.text);
    },

    getNameFromList(list, id) {
      let name = -1;
      for (let i in list) {
        let elem = list[i];

        if (elem.id === id) {
          name = elem.name;
          return name;
        }
      }
      return name;
    },

    rowSelected: function (args) {
      let rows = this.$refs.gridObj.ej2Instances.getSelectedRows()[0];

      let rowObj = this.$refs.gridObj.ej2Instances.getRowObjectFromUID(
        rows.getAttribute("data-uid")
      );

      this.selected = rowObj.data.id;
      this.name = rowObj.data.name;
    },

    list: async function (query) {
      this.gridData = [];

      switch (query) {
        case "churches": {
          await this.$apollo
            .query({
              query: gql`
                query {
                  churches(first: 1000) {
                    data {
                      id
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
              fetchPolicy: "no-cache",
            })
            .then((data) => {
              this.gridData = data.data.churches.data;
              this.$emit("gridData");
            })
            .catch((error) => {
              //console.error(error);
            });
          break;
        }

        case "departments": {
          await this.$apollo
            .query({
              query: gql`
                query {
                  departments {
                    id
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
              this.gridData = data.data.departments;
              this.$emit("gridData");
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
                      id
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
              fetchPolicy: "no-cache",
            })
            .then((data) => {
              this.gridData = data.data.missions.data;
              this.$emit("gridData");
            })
            .catch((error) => {
              //console.error(error);
            });
          break;
        }

        case "sponsors": {
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
                headers: {
                  Authorization: this.token !== "" ? "Bearer " + this.token : "",
                },
              },
              fetchPolicy: "no-cache",
            })
            .then((data) => {
              this.gridData = data.data.sponsors;
              this.$emit("gridData");
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
                    id
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
              this.gridData = data.data.districts;
              this.$emit("gridData");
            })
            .catch((error) => {
              //console.error(error);
            });
          break;
        }
      }
    },

    onGridLoad: function () {},

    onActionBegin: function (args) {},

    onload: function () {},

    //---------------------------------------------------------------------------------------------------------------//

    update: function (id, name) {
      if (id !== "" && name !== "") {
        let query = this.query;

        switch (query) {
          case "churches": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($id: ID!, $name: String!) {
                    updateChurch(id: $id, name: $name) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  id: id,
                  name: name,
                },
              })
              .then((data) => {
                this.list(this.query);
                //console.log(data.data.updateChurch);
                this.notify("success", "Informacion", "Iglesia actualizada");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "departments": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($id: ID!, $name: String!) {
                    updateDepartment(id: $id, name: $name) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  id: id,
                  name: name,
                },
              })
              .then((data) => {
                this.list(this.query);
                //console.log(data.data.updateDepartment);
                this.notify("success", "Informacion", "Departamento actualizado");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "missions": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($id: ID!, $name: String!) {
                    updateMission(id: $id, name: $name) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  id: id,
                  name: name,
                },
              })
              .then((data) => {
                this.list(this.query);
                //console.log(data.data.updateMission);
                this.notify("success", "Informacion", "Mision actualizada");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "sponsors": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($id: ID!, $name: String!) {
                    updateSponsor(id: $id, name: $name) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  id: id,
                  name: name,
                },
              })
              .then((data) => {
                this.list(this.query);
                //console.log(data.data.updateSponsor);
                this.notify("success", "Informacion", "Patrocinador actualizado");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "districts": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($id: ID!, $name: String!) {
                    updateDistrict(id: $id, name: $name) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  id: id,
                  name: name,
                },
              })
              .then((data) => {
                this.list(this.query);
                //console.log(data.data.updateDistrict);
                this.notify("success", "Informacion", "Distrito actualizado");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }
        }
      }
    },

    notify: function (type, title, description) {
      //TYPES
      //success, info, warning, error
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    delete: function (id) {
      //alert(id);
      this.$notification.destroy();

      if (id !== "") {
        let query = this.query;

        switch (query) {
          case "churches": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($id: ID!) {
                    deleteChurch(id: $id) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  id: id,
                },
              })
              .then((data) => {
                this.list(this.query);
                this.selected = "";
                //console.log(data.data.deleteChurch);
                this.notify("success", "Informacion", "Iglesia eliminada");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "departments": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($id: ID!) {
                    deleteDepartment(id: $id) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  id: id,
                },
              })
              .then((data) => {
                this.list(this.query);
                this.selected = "";
                //console.log(data.data.deleteDepartment);
                this.notify("success", "Informacion", "Departamento eliminado");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "missions": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($id: ID!) {
                    deleteMission(id: $id) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  id: id,
                },
              })
              .then((data) => {
                this.list(this.query);
                this.selected = "";
                //console.log(data.data.deleteMission);
                this.notify("success", "Informacion", "Mision eliminada");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "sponsors": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($id: ID!) {
                    deleteSponsor(id: $id) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  id: id,
                },
              })
              .then((data) => {
                this.list(this.query);
                this.selected = "";
                //console.log(data.data.deleteSponsor);
                this.notify("success", "Informacion", "Patrocinador eliminado");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "districts": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($id: ID!) {
                    deleteDistrict(id: $id) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  id: id,
                },
              })
              .then((data) => {
                this.list(this.query);
                this.selected = "";
                //console.log(data.data.deleteDistrict);
                this.notify("success", "Informacion", "Distrito eliminado");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }
        }
      }
    },

    add: function (name) {
      if (name !== "") {
        let query = this.query;

        switch (query) {
          case "churches": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($name: String!) {
                    createChurch(name: $name) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  name: name,
                },
              })
              .then((data) => {
                this.list(this.query);
                //console.log(data.data.createChurch);
                this.notify("success", "Informacion", "Iglesia creada");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "departments": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($name: String!) {
                    createDepartment(name: $name) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  name: name,
                },
              })
              .then((data) => {
                this.list(this.query);
                //console.log(data.data.createDepartment);
                this.notify("success", "Informacion", "Departamento creado");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "missions": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($name: String!) {
                    createMission(name: $name) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  name: name,
                },
              })
              .then((data) => {
                this.list(this.query);
                //console.log(data.data.createMission);
                this.notify("success", "Informacion", "Mision creada");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "sponsors": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($name: String!) {
                    createSponsor(name: $name) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  name: name,
                },
              })
              .then((data) => {
                this.list(this.query);
                //.log(data.data.createSponsor);
                this.notify("success", "Informacion", "Patrocinador creado");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }

          case "districts": {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation($name: String!) {
                    createDistrict(name: $name) {
                      id
                      name
                    }
                  }
                `,
                context: {
                  headers: {
                    Authorization: this.token !== "" ? "Bearer " + this.token : "",
                  },
                },

                variables: {
                  name: name,
                },
              })
              .then((data) => {
                this.list(this.query);
                //console.log(data.data.createDistrict);
                this.notify("success", "Informacion", "Distrito creado");
              })
              .catch((error) => {
                //console.error(error);
              });
            break;
          }
        }
      } else {
        this.notify("warning", "Atencion", "EL nombre no puede estar vacio");
      }
    },

    //--------------------------------------------------------------------------------------------------//

    editToolClicked: function (args) {
      if (args.item.id === "editTool") {
        // console.log(args);
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
    // grid: [Edit, Group, ExcelExport, Filter, Page, Selection, Toolbar]
    grid: [Edit, Filter, Page, Selection, Toolbar],
  },

  watch: {
    query: function (val) {
      this.list(val);
    },
  },

  components: {},
  computed: {},

  props: {
    query: "",
    title: "",
  },
});
</script>

<style scoped></style>
