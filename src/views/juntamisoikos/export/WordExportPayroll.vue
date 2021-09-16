<template>
  <div class="container">
    <div id="seccion_word">
      <div class="control-section">
        <div class="sample-container">
          <div class="default-section">
            <div ref="de_titlebar" id="documenteditor_titlebar" class="e-de-ctn-title">
              <div
                v-on:keydown="titleBarKeydownEvent"
                v-on:click="titleBarClickEvent"
                class="single-line"
                id="documenteditor_title_contentEditor"
                title="Document Name. Click or tap to rename this document."
                contenteditable="false"
              >
                <label
                  v-on:blur="titleBarBlurEvent"
                  id="documenteditor_title_name"
                  :style="titileStyle"
                  >{{ documentName }}</label
                >
              </div>
              <ejs-dropdownbutton
                ref="de-export"
                :style="iconStyle"
                :items="exportItems"
                :iconCss="exportIconCss"
                cssClass="e-caret-hide"
                content="Exportar"
                v-bind:select="onExport"
                :open="openExportDropDown"
                title="Download this document."
              ></ejs-dropdownbutton>
            </div>

            <ejs-documenteditorcontainer
              id="container"
              ref="doceditcontainer"
              :enableToolbar="false"
              style="height: 600px"
            ></ejs-documenteditorcontainer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import { ButtonPlugin } from "@syncfusion/ej2-vue-buttons";
import {
  DocumentEditorContainerPlugin,
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-vue-documenteditor";
import { DropDownButtonPlugin } from "@syncfusion/ej2-vue-splitbuttons";
//import * as data from "./data-default.json";

Vue.use(DocumentEditorContainerPlugin);
Vue.use(DropDownButtonPlugin);

export default {
  data() {
    return {
      //COSAS DEL WORD
      hostUrl: "",
      documentName: "Planilla de Informe Mensual",
      documentTitle: "Planilla de Informe Mensual",
      iconStyle:
        "float:right;background: transparent;box-shadow:none;border-color: transparent;border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;font-family:inherit;",
      titileStyle:
        "text-transform:capitalize;font-weight:400;font-family:inherit;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text",
      openIconCss: "e-de-icon-Open e-de-padding-right",
      printIconCss: "e-de-icon-Print e-de-padding-right",
      exportIconCss: "e-de-icon-Download e-de-padding-right",
      exportItems: [
        { text: "Microsoft Word (.docx)", id: "word" },
        { text: "Syncfusion Document Text (.sfdt)", id: "sfdt" },
      ],

      //ATRIBUTOS DE LA PLANILLLA
      title: "Planilla de Informe Mensual",
      curriculum: "",
      month: "",
      //CUERPO DE LA PLANILLA
      atributes: {
        district: "Occidente",
        year: "2021",
        month: "Febrero",
        curriculum: "Jose Manuel Rosabal",
        pastor: "",
        missionary: "",
        church: "Centro Habana",
        mission: "Cotorro",
        sponsors: "Dario, Brasil",
      },
      concepts: {
        current_membership: "56",
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
      sunday_grid: [
        { id: "", department: "", s1: "12", s2: "12", s3: "1", s4: "1", average: "1" },
        { id: "", department: "1", s1: "1", s2: "1", s3: "1", s4: "1", average: "1" },
        { id: "", department: "2", s1: "2", s2: "2", s3: "2", s4: "2", average: "2" },
        { id: "", department: "2", s1: "2", s2: "2", s3: "2", s4: "2", average: "2" },
        { id: "", department: "2", s1: "2", s2: "2", s3: "2", s4: "9", average: "2" },
        { id: "", department: "2", s1: "2", s2: "2", s3: "2", s4: "2", average: "2" },
      ],
    };
  },

  components: {},

  created() {},

  //observer
  watch: {},

  mounted() {
    // //ASIGNAR DE LOS PROPS
    this.atributes = {};
    this.concepts = {};
    this.sunday_grid = [];
    this.atributes = this.atributes_p;
    this.concepts = this.concepts_p;
    this.sunday_grid = this.sunday_grid_p;

    // console.log(this.atributes);
    // console.log(this.concepts);
    // console.log(this.sunday_grid);

    this.$nextTick(function () {
      const obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      let sfdt = {
        sections: [
          {
            sectionFormat: {
              pageWidth: 612,
              pageHeight: 792,
              leftMargin: 72,
              rightMargin: 72,
              topMargin: 72,
              bottomMargin: 72,
              differentFirstPage: false,
              differentOddAndEvenPages: false,
              headerDistance: 36,
              footerDistance: 36,
              bidi: false,
            },
            blocks: [
              {
                paragraphFormat: {
                  textAlignment: "Center",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "PLANILLA DE INFORME MENSUAL",
                  },
                ],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: {},
                inlines: [],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: {},
                inlines: [
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "DISTRITO MISIONERO:",
                  },
                  { characterFormat: { bidi: false }, text: "  " },
                  {
                    characterFormat: { underline: "Single", bidi: false },
                    text: this.atributes.district.toString(),
                  },
                  {
                    characterFormat: { bidi: false },
                    text: "                                   ",
                  },
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "Año:",
                  },

                  { characterFormat: { bidi: false }, text: "  " },
                  {
                    characterFormat: { underline: "Single", bidi: false },
                    text: this.atributes.year.toString(),
                  },
                  { characterFormat: { bidi: false }, text: "                 " },
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "Mes: ",
                  },
                  { characterFormat: { bidi: false }, text: " " },
                  {
                    characterFormat: { underline: "Single", bidi: false },
                    text: this.atributes.month.toString(),
                  },
                  { characterFormat: { bidi: false }, text: " " },
                ],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: {},
                inlines: [
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "Nombre(s) y Apellidos: ",
                  },
                  { characterFormat: { bidi: false }, text: "  " },
                  {
                    characterFormat: { underline: "Single", bidi: false },
                    text: this.atributes.curriculum.toString(),
                  },
                  {
                    characterFormat: { bidi: false },
                    text: "                       ",
                  },
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "Pastor: ",
                  },
                  { characterFormat: { bidi: false }, text: "  " },
                  {
                    characterFormat: {
                      bold: false,
                      underline: "Single",
                      bidi: false,
                      boldBidi: false,
                    },
                    text: this.atributes.pastor.toString(),
                  },

                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "         Misionero: ",
                  },
                  { characterFormat: { bidi: false }, text: "  " },
                  {
                    characterFormat: {
                      bold: false,
                      underline: "Single",
                      bidi: false,
                      boldBidi: false,
                    },
                    text: this.atributes.missionary.toString(),
                  },
                ],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "Iglesia en que ministra: ",
                  },
                  { characterFormat: { bidi: false }, text: "  " },
                  {
                    characterFormat: {
                      bold: false,
                      underline: "Single",
                      bidi: false,
                      boldBidi: false,
                    },
                    text: this.atributes.church.toString(),
                  },
                ],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "Misión en que ministra: ",
                  },
                  { characterFormat: { bidi: false }, text: "  " },
                  {
                    characterFormat: {
                      bold: false,
                      underline: "Single",
                      bidi: false,
                      boldBidi: false,
                    },
                    text: this.atributes.mission.toString(),
                  },
                ],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: {},
                inlines: [
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "Ministerio que lo patrocina: ",
                  },
                  {
                    characterFormat: { bold: false, bidi: false, boldBidi: false },
                    text: this.atributes.sponsors.toString(),
                  },
                ],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: {},
                inlines: [],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: {},
                inlines: [],
              },
              {
                rows: [
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Conceptos",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Total",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Membresía actual",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.current_membership.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Cantidad de congregados",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.congregants_count.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Cantidad de células",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.cells_count.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Cantidad de misiones",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.missions_count.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Candidatos al bautismo",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.baptism_candidates.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Bautizos en el mes",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.baptism.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Nuevos creyentes discipulados en el mes",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.new_believers_discipled.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Líderes entrenados en el mes",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.trained_leaders.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Células fundadas en el mes",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.founded_cells.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Misiones fundadas en el mes ",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.founded_missions.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Iglesias fundadas en el mes",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.founded_churches.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Visitas evangelísticas",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.evangelistic_visits.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Visitas de discipulado",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.discipleship_visits.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Visitas de edificación",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.building_visits.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Profesiones de fe durante el mes",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.faith_professions.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Hermanos reconciliados en el mes",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.reconciled_brothers.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Vidas ministradas en el mes",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.ministered_lives.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Cultos celebrados en el mes",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 292.12798000000026,
                          preferredWidthType: "Point",
                          cellWidth: 292.12798000000026,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: {},
                            inlines: [
                              {
                                characterFormat: { bidi: false },
                                text: this.concepts.cults_held.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 45.6,
                          preferredWidthType: "Point",
                          cellWidth: 45.6,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                ],
                grid: [292.12798000000026, 45.6],
                tableFormat: {
                  borders: {
                    top: { lineStyle: "Single", lineWidth: 0.5 },
                    left: { lineStyle: "Single", lineWidth: 0.5 },
                    right: { lineStyle: "Single", lineWidth: 0.5 },
                    bottom: { lineStyle: "Single", lineWidth: 0.5 },
                    diagonalDown: {},
                    diagonalUp: {},
                    horizontal: { lineStyle: "Single", lineWidth: 0.5 },
                    vertical: { lineStyle: "Single", lineWidth: 0.5 },
                  },
                  shading: {},
                  leftIndent: 53.418579999999594,
                  topMargin: 0,
                  rightMargin: 5.4,
                  leftMargin: 5.4,
                  bottomMargin: 0,
                  preferredWidthType: "Auto",
                  allowAutoFit: false,
                },
                columnCount: 2,
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: {},
                inlines: [],
              },
              {
                paragraphFormat: {
                  textAlignment: "Center",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: {},
                inlines: [],
              },
              {
                paragraphFormat: {
                  textAlignment: "Center",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text: "Escuela Bíblica Dominical",
                  },
                ],
              },
              {
                rows: [
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Asistencia",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 81.93828000000005,
                          preferredWidthType: "Point",
                          cellWidth: 81.93828000000005,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Semana 1",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 74,
                          preferredWidthType: "Point",
                          cellWidth: 74,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Semana 2",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 2,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Semana 3",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 3,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Semana 4",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 4,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Promedio",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 5,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Hombres",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 81.93828000000005,
                          preferredWidthType: "Point",
                          cellWidth: 81.93828000000005,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[0].s1.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 74,
                          preferredWidthType: "Point",
                          cellWidth: 74,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[0].s2.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 2,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[0].s3.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 3,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[0].s4.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 4,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[0].average.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 5,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Damas",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 81.93828000000005,
                          preferredWidthType: "Point",
                          cellWidth: 81.93828000000005,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[1].s1.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 74,
                          preferredWidthType: "Point",
                          cellWidth: 74,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[1].s2.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 2,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[1].s3.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 3,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[1].s4.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 4,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[1].average.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 5,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Jóvenes",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 81.93828000000005,
                          preferredWidthType: "Point",
                          cellWidth: 81.93828000000005,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[2].s1.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 74,
                          preferredWidthType: "Point",
                          cellWidth: 74,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[2].s2.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 2,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[2].s3.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 3,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[2].s4.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 4,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[2].average.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 5,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Juveniles",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 81.93828000000005,
                          preferredWidthType: "Point",
                          cellWidth: 81.93828000000005,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[3].s1.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 74,
                          preferredWidthType: "Point",
                          cellWidth: 74,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[3].s2.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 2,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[3].s3.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 3,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[3].s4.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 4,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[3].average.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 5,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Niños",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 81.93828000000005,
                          preferredWidthType: "Point",
                          cellWidth: 81.93828000000005,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[4].s1.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 74,
                          preferredWidthType: "Point",
                          cellWidth: 74,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[4].s2.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 2,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[4].s3.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 3,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[4].s4.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 4,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[4].average.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 5,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                  {
                    cells: [
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Left",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: true, boldBidi: true },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: true,
                                  bidi: false,
                                  boldBidi: true,
                                },
                                text: "Total",
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 81.93828000000005,
                          preferredWidthType: "Point",
                          cellWidth: 81.93828000000005,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 0,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[5].s1.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 74,
                          preferredWidthType: "Point",
                          cellWidth: 74,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 1,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[5].s2.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 2,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[5].s3.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 3,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[5].s4.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 4,
                      },
                      {
                        blocks: [
                          {
                            paragraphFormat: {
                              textAlignment: "Center",
                              styleName: "Normal",
                              listFormat: {},
                            },
                            characterFormat: { bold: false, boldBidi: false },
                            inlines: [
                              {
                                characterFormat: {
                                  bold: false,
                                  bidi: false,
                                  boldBidi: false,
                                },
                                text: this.sunday_grid[5].average.toString(),
                              },
                            ],
                          },
                        ],
                        cellFormat: {
                          borders: {
                            top: {},
                            left: {},
                            right: {},
                            bottom: {},
                            diagonalDown: {},
                            diagonalUp: {},
                            horizontal: {},
                            vertical: {},
                          },
                          shading: {},
                          preferredWidth: 78,
                          preferredWidthType: "Point",
                          cellWidth: 78,
                          columnSpan: 1,
                          rowSpan: 1,
                        },
                        columnIndex: 5,
                      },
                    ],
                    rowFormat: {
                      height: 0,
                      heightType: "Auto",
                      borders: {
                        top: {},
                        left: {},
                        right: {},
                        bottom: {},
                        diagonalDown: {},
                        diagonalUp: {},
                        horizontal: {},
                        vertical: {},
                      },
                      gridBefore: 0,
                      gridAfter: 0,
                    },
                  },
                ],
                grid: [81.93828000000005, 74, 78, 78, 78, 78],
                tableFormat: {
                  borders: {
                    top: { lineStyle: "Single", lineWidth: 0.5 },
                    left: { lineStyle: "Single", lineWidth: 0.5 },
                    right: { lineStyle: "Single", lineWidth: 0.5 },
                    bottom: { lineStyle: "Single", lineWidth: 0.5 },
                    diagonalDown: {},
                    diagonalUp: {},
                    horizontal: { lineStyle: "Single", lineWidth: 0.5 },
                    vertical: { lineStyle: "Single", lineWidth: 0.5 },
                  },
                  shading: {},
                  topMargin: 0,
                  rightMargin: 5.4,
                  leftMargin: 5.4,
                  bottomMargin: 0,
                  preferredWidthType: "Auto",
                  allowAutoFit: false,
                },
                columnCount: 6,
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, underline: "None", boldBidi: true },
                inlines: [
                  {
                    characterFormat: {
                      bold: true,
                      underline: "Single",
                      bidi: false,
                      boldBidi: true,
                    },
                    text: "___________________ ",
                  },
                  {
                    characterFormat: {
                      bold: true,
                      underline: "None",
                      bidi: false,
                      boldBidi: true,
                    },
                    text:
                      "                                                                                                                ",
                  },
                  {
                    characterFormat: {
                      bold: true,
                      underline: "None",
                      bidi: false,
                      boldBidi: true,
                    },
                    text: "_____",
                  },
                  {
                    characterFormat: {
                      bold: true,
                      underline: "None",
                      bidi: false,
                      boldBidi: true,
                    },
                    text: "__________",
                  },
                ],
              },
              {
                paragraphFormat: {
                  textAlignment: "Left",
                  styleName: "Normal",
                  listFormat: {},
                },
                characterFormat: { bold: true, boldBidi: true },
                inlines: [
                  {
                    characterFormat: { bold: true, bidi: false, boldBidi: true },
                    text:
                      "Firma del Misionero (a)                                                                                                                  Firma del Pastor",
                  },
                ],
              },
            ],
            headersFooters: {
              header: {
                blocks: [
                  {
                    paragraphFormat: { listFormat: {} },
                    characterFormat: {},
                    inlines: [],
                  },
                ],
              },
              footer: {
                blocks: [
                  {
                    paragraphFormat: { listFormat: {} },
                    characterFormat: {},
                    inlines: [],
                  },
                ],
              },
              evenHeader: {},
              evenFooter: {},
              firstPageHeader: {},
              firstPageFooter: {},
            },
          },
        ],
        characterFormat: {
          bold: false,
          italic: false,
          fontSize: 11,
          fontFamily: "Calibri",
          underline: "None",
          strikethrough: "None",
          baselineAlignment: "Normal",
          highlightColor: "NoColor",
          fontColor: "empty",
          boldBidi: false,
          italicBidi: false,
          fontSizeBidi: 11,
          fontFamilyBidi: "Calibri",
          allCaps: false,
        },
        paragraphFormat: {
          leftIndent: 0,
          rightIndent: 0,
          firstLineIndent: 0,
          textAlignment: "Left",
          beforeSpacing: 0,
          afterSpacing: 0,
          lineSpacing: 1,
          lineSpacingType: "Multiple",
          listFormat: {},
          bidi: false,
        },
        defaultTabWidth: 36,
        trackChanges: false,
        enforcement: false,
        hashValue: "",
        saltValue: "",
        formatting: false,
        protectionType: "NoProtection",
        dontUseHTMLParagraphAutoSpacing: false,
        formFieldShading: true,
        styles: [
          {
            name: "Normal",
            type: "Paragraph",
            paragraphFormat: { listFormat: {} },
            characterFormat: {},
            next: "Normal",
          },
          {
            name: "Heading 1",
            type: "Paragraph",
            paragraphFormat: {
              leftIndent: 0,
              rightIndent: 0,
              firstLineIndent: 0,
              textAlignment: "Left",
              beforeSpacing: 12,
              afterSpacing: 0,
              lineSpacing: 1.0791666507720947,
              lineSpacingType: "Multiple",
              outlineLevel: "Level1",
              listFormat: {},
            },
            characterFormat: {
              fontSize: 16,
              fontFamily: "Calibri Light",
              fontColor: "#2F5496",
              fontSizeBidi: 16,
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Normal",
            link: "Heading 1 Char",
            next: "Normal",
          },
          {
            name: "Heading 1 Char",
            type: "Character",
            characterFormat: {
              fontSize: 16,
              fontFamily: "Calibri Light",
              fontColor: "#2F5496",
              fontSizeBidi: 16,
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Default Paragraph Font",
          },
          { name: "Default Paragraph Font", type: "Character", characterFormat: {} },
          {
            name: "Heading 2",
            type: "Paragraph",
            paragraphFormat: {
              leftIndent: 0,
              rightIndent: 0,
              firstLineIndent: 0,
              textAlignment: "Left",
              beforeSpacing: 2,
              afterSpacing: 0,
              lineSpacing: 1.0791666507720947,
              lineSpacingType: "Multiple",
              outlineLevel: "Level2",
              listFormat: {},
            },
            characterFormat: {
              fontSize: 13,
              fontFamily: "Calibri Light",
              fontColor: "#2F5496",
              fontSizeBidi: 13,
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Normal",
            link: "Heading 2 Char",
            next: "Normal",
          },
          {
            name: "Heading 2 Char",
            type: "Character",
            characterFormat: {
              fontSize: 13,
              fontFamily: "Calibri Light",
              fontColor: "#2F5496",
              fontSizeBidi: 13,
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Default Paragraph Font",
          },
          {
            name: "Heading 3",
            type: "Paragraph",
            paragraphFormat: {
              leftIndent: 0,
              rightIndent: 0,
              firstLineIndent: 0,
              textAlignment: "Left",
              beforeSpacing: 2,
              afterSpacing: 0,
              lineSpacing: 1.0791666507720947,
              lineSpacingType: "Multiple",
              outlineLevel: "Level3",
              listFormat: {},
            },
            characterFormat: {
              fontSize: 12,
              fontFamily: "Calibri Light",
              fontColor: "#1F3763",
              fontSizeBidi: 12,
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Normal",
            link: "Heading 3 Char",
            next: "Normal",
          },
          {
            name: "Heading 3 Char",
            type: "Character",
            characterFormat: {
              fontSize: 12,
              fontFamily: "Calibri Light",
              fontColor: "#1F3763",
              fontSizeBidi: 12,
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Default Paragraph Font",
          },
          {
            name: "Heading 4",
            type: "Paragraph",
            paragraphFormat: {
              leftIndent: 0,
              rightIndent: 0,
              firstLineIndent: 0,
              textAlignment: "Left",
              beforeSpacing: 2,
              afterSpacing: 0,
              lineSpacing: 1.0791666507720947,
              lineSpacingType: "Multiple",
              outlineLevel: "Level4",
              listFormat: {},
            },
            characterFormat: {
              italic: true,
              fontFamily: "Calibri Light",
              fontColor: "#2F5496",
              italicBidi: true,
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Normal",
            link: "Heading 4 Char",
            next: "Normal",
          },
          {
            name: "Heading 4 Char",
            type: "Character",
            characterFormat: {
              italic: true,
              fontFamily: "Calibri Light",
              fontColor: "#2F5496",
              italicBidi: true,
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Default Paragraph Font",
          },
          {
            name: "Heading 5",
            type: "Paragraph",
            paragraphFormat: {
              leftIndent: 0,
              rightIndent: 0,
              firstLineIndent: 0,
              textAlignment: "Left",
              beforeSpacing: 2,
              afterSpacing: 0,
              lineSpacing: 1.0791666507720947,
              lineSpacingType: "Multiple",
              outlineLevel: "Level5",
              listFormat: {},
            },
            characterFormat: {
              fontFamily: "Calibri Light",
              fontColor: "#2F5496",
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Normal",
            link: "Heading 5 Char",
            next: "Normal",
          },
          {
            name: "Heading 5 Char",
            type: "Character",
            characterFormat: {
              fontFamily: "Calibri Light",
              fontColor: "#2F5496",
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Default Paragraph Font",
          },
          {
            name: "Heading 6",
            type: "Paragraph",
            paragraphFormat: {
              leftIndent: 0,
              rightIndent: 0,
              firstLineIndent: 0,
              textAlignment: "Left",
              beforeSpacing: 2,
              afterSpacing: 0,
              lineSpacing: 1.0791666507720947,
              lineSpacingType: "Multiple",
              outlineLevel: "Level6",
              listFormat: {},
            },
            characterFormat: {
              fontFamily: "Calibri Light",
              fontColor: "#1F3763",
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Normal",
            link: "Heading 6 Char",
            next: "Normal",
          },
          {
            name: "Heading 6 Char",
            type: "Character",
            characterFormat: {
              fontFamily: "Calibri Light",
              fontColor: "#1F3763",
              fontFamilyBidi: "Calibri Light",
            },
            basedOn: "Default Paragraph Font",
          },
        ],
        lists: [],
        abstractLists: [],
        comments: [],
        revisions: [],
        customXml: [],
      };
      obj.open(JSON.stringify(sfdt));
      obj.documentName = this.title + " " + this.curriculum + " " + this.month;
      this.$refs.doceditcontainer.ej2Instances.serviceUrl =
        this.hostUrl + "api/documenteditor/";
      this.$refs.doceditcontainer.ej2Instances.documentChange = () => {
        this.documentChangedEvent();
      };
      this.save("Docx");
      this.notify("success", "Planilla Exportada", "Planilla exportada de forma exitosa");
    });
    //}
  },

  provide: {
    DocumentEditorContainer: [Toolbar],
  },

  methods: {
    notify(type, title, description) {
      //TYPES
      //success, info, warning, error
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    //metodos del word processor
    onExport: function (args) {
      switch (args.item.id) {
        case "word":
          this.save("Docx");
          break;
        case "sfdt":
          this.save("Sfdt");
          break;
      }
    },

    openExportDropDown: function () {
      // tslint:disable-next-line:max-line-length
      document.getElementById("word").setAttribute("title", "Exportar a Word (.docx)");
      // tslint:disable-next-line:max-line-length
      document
        .getElementById("sfdt")
        .setAttribute(
          "title",
          "Download a copy of this document to your computer as an SFDT file."
        );
    },

    save: function (format) {
      // tslint:disable-next-line:max-line-length
      this.$refs.doceditcontainer.ej2Instances.documentEditor.save(
        this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName === ""
          ? this.title + " " + this.curriculum + "" + this.month
          : this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName,
        format
      );
    },

    openBtnClick: function () {
      this.$refs.uploadDocument.click();
    },

    printBtnClick: function () {
      this.$refs.doceditcontainer.ej2Instances.documentEditor.print();
    },

    titleBarKeydownEvent: function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("documenteditor_title_contentEditor").contentEditable =
          "false";
        if (
          document.getElementById("documenteditor_title_contentEditor").textContent === ""
        ) {
          document.getElementById("documenteditor_title_contentEditor").textContent =
            "Document1";
        }
      }
    },

    titleBarBlurEvent: function (args) {
      if (
        document.getElementById("documenteditor_title_contentEditor").textContent === ""
      ) {
        document.getElementById("documenteditor_title_contentEditor").textContent =
          "Document1";
      }
      document.getElementById("documenteditor_title_contentEditor").contentEditable =
        "false";
      this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName = document.getElementById(
        "documenteditor_title_name"
      ).textContent;
    },

    titleBarClickEvent: function () {
      this.updateDocumentEditorTitle();
    },

    updateDocumentEditorTitle: function () {
      document.getElementById("documenteditor_title_contentEditor").contentEditable =
        "true";
      document.getElementById("documenteditor_title_contentEditor").focus();
      window
        .getSelection()
        .selectAllChildren(document.getElementById("documenteditor_title_contentEditor"));
    },

    documentChangedEvent: function () {
      var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      this.documentTitle =
        obj.documentName === "" ? "Untitled Document" : obj.documentName;
      document.getElementById("documenteditor_title_name").textContent = obj.documentName;
      setTimeout(() => {
        obj.scrollToPage(1);
      }, 10);
    },
  },

  props: {
    atributes_p: Object,
    concepts_p: Object,
    sunday_grid_p: Array,
  },

  computed: {},
};
</script>

<style>
/* @import "./../../../static/fabric.css";
    @import "./../../../static/google_font.css"; */
#documenteditor_titlebar {
  height: 36px;
  line-height: 26px;
  width: 100%;
  font-size: 12px;
  padding-left: 15px;
  padding-right: 10px;
  font-family: inherit;
}

#documenteditor_title_contentEditor {
  height: 26px;
  max-width: 85%;
  width: auto;
  overflow: hidden;
  display: inline-block;
  padding-left: 4px;
  padding-right: 4px;
  margin: 5px;
}

[contenteditable="true"].single-line {
  white-space: nowrap;
  border-color: #e4e4e4 !important;
}

/** Document editor sample level font icons*/

@font-face {
  font-family: "Sample brower icons";
  src: url(data:application/x-font-ttf;charset=utf-8;base64,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bwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAHUAcwBpAG4AZwAgAFMAeQBuAGMAZgB1AHMAaQBvAG4AIABNAGUAdAByAG8AIABTAHQAdQBkAGkAbwB3AHcAdwAuAHMAeQBuAGMAZgB1AHMAaQBvAG4ALgBjAG8AbQAAAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEMBAgEDAQQBBQEGAQcBCAEJAQoBCwEMAQ0BDgEPARABEQESARMBFAEVARYBFwEYARkBGgEbARwBHQEeAR8BIAEhASIBIwEkASUBJgEnASgBKQEqASsBLAEtAS4BLwEwATEBMgEzATQBNQE2ATcBOAE5AToBOwE8AT0BPgE/AUABQQFCAUMBRAALU3Ryb2tlU3R5bGUIQm9va21hcmsHUGljdHVyZQRGaW5kDU91dHNpZGVCb3JkZXIHSnVzdGlmeQVDbG9zZQ5EZWNyZWFzZUluZGVudBVQaXhlbEFsaWduQ2VudGVyVGFibGUPQmFja2dyb3VuZENvbG9yC0FsaWduQm90dG9tCVBhZ2VTZXR1cA5IaWdobGlnaHRDb2xvcgtTdXBlcnNjcmlwdAVUYWJsZQRVbmRvC0luc2VydEJlbG93CVRvcEJvcmRlcgpQYWdlTnVtYmVyEEFsaWduQ2VudGVyVGFibGUOSW5jcmVhc2VJbmRlbnQEQm9sZAlBbGlnbkxlZnQGRm9vdGVyC0luc2VydFJpZ2h0CVVuZGVybGluZQpJbnNlcnRMZWZ0BExvY2sGSGVhZGVyDVN0cmlrZXRocm91Z2gIQ2xlYXJBbGwLUmlnaHRCb3JkZXIKQWxpZ25SaWdodARPcGVuClN0cm9rZVNpemUFUHJpbnQLRGVsZXRlVGFibGUJRm9udENvbG9yDUluc2lkZUJvcmRlcnMKRGVsZXRlUm93cwhEb3dubG9hZAtMaW5lU3BhY2luZxRJbnNpZGVWZXJ0aWNhbEJvcmRlcghBbGlnblRPcARSZWRvDEJvdHRvbUJvcmRlcgNOZXcFUGFzdGUHQnVsbGV0cwRDZWxsDURlbGV0ZUNvbHVtbnMKQWxsQm9yZGVycwlTdWJzY3JpcHQQU2hvd0hpZGVQcm9wZXJ0eQ5UYWJsZU9mQ29udGVudAZJdGFsaWMWSW5zaWRlSG9yaXpvbmRhbGJvcmRlcgtMZWZ0Qm9yZGVycwlOdW1iZXJpbmcETGluawtBbGlnbkNlbnRlcgtJbnNlcnRBYm92ZQZCcmVha3MITmV4dFBhZ2USU2VsZWN0ZnJvbUNvbXB1dGVyCVBhZ2VCcmVhawAAAAA=)
    format("truetype");
  font-weight: normal;
  font-style: normal;
}

[class^="e-de-icon-"],
[class*=" e-de-icon-"] {
  font-family: "Sample brower icons" !important;
}

.e-de-icon-Print:before {
  content: "\e723";
}

.e-de-icon-Download:before {
  content: "\e728";
}
</style>
