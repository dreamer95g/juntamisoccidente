<template>
  <div class="mt-4">
    <div class="p-6 bg-white rounded-md">
      <h2 class="text-lg text-gray-700 font-semibold capitalize">Curriculum</h2>
      <form>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          <!--NOMBRE Y APELLIDOS-->
          <div>
            <label class="text-gray-700">Nombre y Apellidos:</label>
            <div>
              <a-input v-model="name" placeholder="Nombre y Apellidos" />
            </div>
          </div>
          <!--CI-->
          <div>
            <label class="text-gray-700">CI:</label>
            <div>
              <a-input-number
                v-model="dni"
                :min="0"
                :max="99999999999"
                :default="95031818027"
                style="width: 300px"
                placeholder="CI"
              />
            </div>
          </div>
          <!--FOTO-->
          <div>
            <Upload @photo="photo = $event" :image="photo"></Upload>
          </div>
          <!--SEXO-->
          <div>
            <label class="text-gray-700">Sexo:</label>
            <div>
              <a-radio-group @change="onChange" v-model="radioSex">
                <a-radio :value="1">Hombre</a-radio>
                <a-radio :value="0">Mujer</a-radio>
              </a-radio-group>
            </div>
          </div>

          <!--NIVEL ESCOLAR-->
          <div>
            <label class="text-gray-700">Nivel Escolar:</label>
            <div>
              <AutoComplete
                @levels="level = $event"
                query="levels"
                :default="level_p"
                placeholder="Nivel escolar"
              ></AutoComplete>
            </div>
          </div>
          <!--IDIOMA-->
          <div>
            <label class="text-gray-700">Idioma:</label>
            <div>
              <AutoComplete
                @languages="language = $event"
                query="languages"
                :default="language_p"
                placeholder="Nivel escolar"
              ></AutoComplete>
            </div>
          </div>
          <div>
            <label class="text-gray-700">Profesion:</label>
            <div>
              <a-input placeholder="Profesion" v-model="profession" />
            </div>
          </div>
          <div>
            <label class="text-gray-700">Nacionalidad:</label>
            <div>
              <a-input placeholder="Nacionalidad" v-model="nationality" />
            </div>
          </div>
          <div>
            <label class="text-gray-700">Lugar de Graduacion:</label>
            <div>
              <a-input placeholder="Lugar de Graduacion" v-model="graduation_place" />
            </div>
          </div>
          <div>
            <label class="text-gray-700">Direccion particular:</label>
            <div>
              <a-input placeholder="Direccion particular" v-model="adress" />
            </div>
          </div>
          <div>
            <label class="text-gray-700">Formacion Academica:</label>
            <div>
              <a-textarea
                placeholder="Formacion Academica"
                autoSize
                v-model.lazy="academic_formation"
              />
            </div>
          </div>
          <div>
            <label class="text-gray-700">Experiencia de Trabajo:</label>
            <div>
              <a-textarea
                placeholder="Experiencia de trabajo"
                autoSize
                v-model.lazy="work_experience"
              />
            </div>
          </div>
          <div>
            <label class="text-gray-700">Vision y Metas:</label>
            <div>
              <a-textarea
                placeholder="Vision y Metas"
                autoSize
                v-model.lazy="vision_goals"
              />
            </div>
          </div>
          <div>
            <label class="text-gray-700">Conversion y llamamiento:</label>
            <div>
              <a-textarea
                placeholder="Conversion y llamamiento"
                autoSize
                v-model.lazy="conv_experience"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import Vue from "vue";
import AutoComplete from "../util/AutoComplete";
import Upload from "../media/Upload";
//  import { Upload } from "ant-design-vue";
import { Button } from "ant-design-vue";
import { Icon } from "ant-design-vue";
import { InputNumber } from "ant-design-vue";
import { Modal } from "ant-design-vue";
import { Radio } from "ant-design-vue";
import { Input } from "ant-design-vue";
// import {} from "ant-design-vue";

Vue.use(Modal);
Vue.use(Radio);
// sVue.use(Upload);
Vue.use(Icon);
Vue.use(Button);
Vue.use(InputNumber);
Vue.use(Input);

export default {
  data() {
    return {
      dni: "0",
      name: "",
      photo: "",
      sex: "",
      radioSex: "",
      profession: "",
      nationality: "",
      graduation_place: "",
      adress: "",
      academic_formation: "",
      work_experience: "",
      vision_goals: "",
      conv_experience: "",
      level: "",
      language: "",
      level_id: "",
      language_id: "",
      token: "",
    };
  },

  mounted() {
    this.token = this.$store.state.token;
    //ACTUALIZAR VALORES DEL DATA CON LOS PROPERTIES
    if (this.sex_p !== "") {
      this.sex = this.sex_p;
    }
    //PARA TOMAR LOS VALORES EN ACTUALIZAR
    if (this.dni_p !== "") {
      this.dni = this.dni_p;
    }

    if (this.name_p !== "") {
      this.name = this.name_p;
    }
    if (this.photo_p !== "") {
      this.photo = this.photo_p;
    }

    if (this.sex_p !== "") {
      this.sex = this.sex_p;
    }
    if (this.profession_p !== "") {
      this.profession = this.profession_p;
    }
    if (this.nationality_p !== "") {
      this.nationality = this.nationality_p;
    }
    if (this.graduation_place_p !== "") {
      this.graduation_place = this.graduation_place_p;
    }

    if (this.graduation_place_p !== "") {
      this.graduation_place = this.graduation_place_p;
    }

    if (this.adress_p !== "") {
      this.adress = this.adress_p;
    }

    if (this.academic_formation_p !== "") {
      this.academic_formation = this.academic_formation_p;
    }
    if (this.work_experience_p !== "") {
      this.work_experience = this.work_experience_p;
    }
    if (this.vision_goals_p !== "") {
      this.vision_goals = this.vision_goals_p;
    }
    if (this.conv_experience_p !== "") {
      this.conv_experience = this.conv_experience_p;
    }

    if (this.level_p !== "") {
      this.level = this.level_p;
    }

    if (this.language_p !== "") {
      this.language = this.language_p;
    }
  },

  created() {},

  methods: {
    onChange(e) {
      //console.log("radio checked", e.target.value);
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

    async getLevelId() {
      let name = this.level;

      if (name !== "") {
        await this.$apollo
          .query({
            query: gql`
              query($name: Mixed!) {
                levelWhere(where: { column: NAME, operator: LIKE, value: $name }) {
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
            // console.log(data.data.levelWhere);
            let level = data.data.levelWhere;
            if (level == null) {
              this.notify(
                "warning",
                "Atencion",
                " No hay ningun nivel escolar con ese nombre "
              );
              this.level = "";
              this.level_id = "";
            } else {
              this.level_id = level.id;
            }
          })
          .catch((error) => {
            //console.log("es este");
            //console.error(error);
          });
      }
    },

    async getLanguageId() {
      let name = this.language;

      if (name !== "") {
        await this.$apollo
          .query({
            query: gql`
              query($name: Mixed!) {
                languageWhere(where: { column: NAME, operator: LIKE, value: $name }) {
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
            // console.log(data.data.levelWhere);
            let language = data.data.languageWhere;
            if (language == null) {
              this.notify("warning", "Atencion", " No hay ningun idioma con ese nombre ");
              this.language = "";
              this.language_id = "";
            } else {
              this.language_id = language.id;
            }
          })
          .catch((error) => {
            //console.error(error);
          });
      }
    },
  },

  components: {
    AutoComplete: AutoComplete,
    Upload: Upload,
  },

  computed: {},

  watch: {
    level: function (val) {
      if (val !== undefined) {
        this.getLevelId();
      }
    },

    level_id: function (val) {
      if (val !== "") {
        this.$emit("level_id", val);
      }
    },

    language: function (val) {
      if (val !== undefined) {
        this.getLanguageId();
      }
    },

    language_id: function (val) {
      if (val !== "") {
        this.$emit("language_id", val);
      }
    },

    name: function (val) {
      if (val !== "") {
        this.$emit("name", this.name);
      }
    },

    dni: function (val) {
      if (val !== "") {
        this.$emit("dni", this.dni);
      }
    },

    sex: function (val) {
      //alert(val);
      this.$emit("sex", val);
      if (val) {
        this.radioSex = 1;
      } else {
        this.radioSex = 0;
      }
    },

    radioSex: function (val) {
      //alert(val);
      if (val === 1) {
        this.sex = true;
      } else {
        this.sex = false;
      }
    },

    profession: function (val) {
      if (val !== "") {
        this.$emit("profession", this.profession);
      }
    },

    nationality: function (val) {
      if (val !== "") {
        this.$emit("nationality", this.nationality);
      }
    },

    graduation_place: function (val) {
      if (val !== "") {
        this.$emit("graduation_place", this.graduation_place);
      }
    },

    adress: function (val) {
      if (val !== "") {
        this.$emit("adress", this.adress);
      }
    },

    academic_formation: function (val) {
      if (val !== "") {
        this.$emit("academic_formation", this.academic_formation);
      }
    },

    work_experience: function (val) {
      if (val !== "") {
        this.$emit("work_experience", this.work_experience);
      }
    },

    vision_goals: function (val) {
      if (val !== "") {
        this.$emit("vision_goals", this.vision_goals);
      }
    },

    conv_experience: function (val) {
      if (val !== "") {
        this.$emit("conv_experience", this.conv_experience);
      }
    },

    photo: function (val) {
      if (val !== "") {
        //console.log(val);
        this.$emit("photo", this.photo);
      }
    },
  },

  props: {
    dni_p: "",
    name_p: "",
    photo_p: "",
    sex_p: false,
    profession_p: "",
    nationality_p: "",
    graduation_place_p: "",
    adress_p: "",
    academic_formation_p: "",
    work_experience_p: "",
    vision_goals_p: "",
    conv_experience_p: "",
    level_p: "",
    language_p: "",
  },
};
</script>
