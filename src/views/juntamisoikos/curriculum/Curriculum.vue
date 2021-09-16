<template>
  <div class="mt-0 bg-white rounded-md shadow-lg">
    <br />
    <h1 v-if="!loading" class="mx-6 top-auto flex-auto text-lg font-semibold">
      {{ title }} {{ name }}
    </h1>
    <div v-if="action === 'insert' && !loading">
      <Atributes
        @dni="dni = $event"
        @name="name = $event"
        @sex="sex = $event"
        @profession="profession = $event"
        @nationality="nationality = $event"
        @graduation_place="graduation_place = $event"
        @adress="adress = $event"
        @academic_formation="academic_formation = $event"
        @work_experience="work_experience = $event"
        @vision_goals="vision_goals = $event"
        @conv_experience="conv_experience = $event"
        @level_id="level_id = $event"
        @language_id="language_id = $event"
        @photo="photo = $event"
      ></Atributes>
    </div>

    <div v-if="action === 'update' && !loading">
      <Atributes
        :dni_p="dni"
        :name_p="name"
        :sex_p="sex"
        :profession_p="profession"
        :nationality_p="nationality"
        :graduation_place_p="graduation_place"
        :adress_p="adress"
        :academic_formation_p="academic_formation"
        :work_experience_p="work_experience"
        :vision_goals_p="vision_goals"
        :conv_experience_p="conv_experience"
        :level_p="level"
        :language_p="language"
        :photo_p="photo"
        @dni="dni = $event"
        @name="name = $event"
        @sex="sex = $event"
        @profession="profession = $event"
        @nationality="nationality = $event"
        @graduation_place="graduation_place = $event"
        @adress="adress = $event"
        @academic_formation="academic_formation = $event"
        @work_experience="work_experience = $event"
        @vision_goals="vision_goals = $event"
        @conv_experience="conv_experience = $event"
        @level_id="level_id = $event"
        @language_id="language_id = $event"
        @photo="photo = $event"
      ></Atributes>
    </div>

    <div v-if="!loading" class="bg-white">
      <form class="flex-auto p-6">
        <div v-if="action === 'insert'">
          <button
            @click="controller()"
            class="py-2 px-4 text-center bg-blue-600 rounded-md w-1/6 text-white text-sm hover:bg-blue-500"
            type="button"
          >
            {{ method }}
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
          </div>
        </div>
      </form>
    </div>

    <div v-if="loading">
      <Loading></Loading>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import gql from "graphql-tag";
import Vue from "vue";
import Atributes from "./CurriculumAtributes";
import Loading from "../../Loading";
import store from "../../../store/index";

export default {
  data() {
    return {
      curriculum_id: "",
      show_curriculum: true,
      action: "",
      //method: "",
      loading: false,
      // atributos propios
      title: "",
      dni: "",
      name: "",
      photo: "",
      sex: "",
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

      //image
      photo_id: "",

      validate: false,
      token: "",
    };
  },

  mounted() {
    this.token = store.state.token;
    //this.$apollo.queries.users.refresh();

    //this.notify("success", "Mounted", "");
    if (this.action_p === "update" && this.curriculum_id_p !== undefined) {
      this.loading = true;
      this.title = "Actualizar Curriculum: ";
      this.action = this.action_p;
      this.curriculum_id = this.curriculum_id_p;
      this.getCurriculum(this.curriculum_id);
      //this.$apollo.queries.users.refresh();
    } else if (this.curriculum_id_p === undefined) {
      this.action = "insert";
      this.title = "Agregar Curriculum: ";
    }
  },

  created() {
    // this.notify("success", "Created", "");
  },

  methods: {
    cancel() {
      this.$emit("show_curriculum", false);
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

    controller() {
      if (this.action === "insert") {
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
        this.checkValidate();
        if (this.validate === false) {
          this.notify(
            "warning",
            "Campos Vacios",
            " Por favor debe llenar todos los campos "
          );
        } else {
          this.loading = true;
          //actualizar
          this.updateFlow();
        }
      }
    },

    //--------------------------------VALIDATE FLOW------------------------------------------//
    checkValidate() {
      if (
        this.dni === "0" ||
        this.dni === "" ||
        this.name === "" ||
        this.photo === "" ||
        this.sex === "" ||
        this.profession === "" ||
        this.nationality === "" ||
        this.graduation_place === "" ||
        this.adress === "" ||
        this.academic_formation === "" ||
        this.work_experience === "" ||
        this.vision_goals === "" ||
        this.conv_experience === "" ||
        this.level_id === "" ||
        this.language_id === ""
      ) {
        this.validate = false;
      } else {
        this.validate = true;
      }
    },

    async getCurriculum(id) {
      await this.$apollo
        .query({
          query: gql`
            query($id: ID) {
              curriculum(id: $id) {
                dni
                name
                sex
                profession
                nationality
                graduation_place
                adress
                academic_formation
                work_experience
                vision_goals
                conv_experience
                level {
                  id
                  name
                }
                language {
                  id
                  name
                }
                images {
                  id
                  name
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
          fetchPolicy: "no-cache",
        })
        .then((data) => {
          let curriculum = data.data.curriculum;
          this.dni = curriculum.dni;
          this.name = curriculum.name;
          this.photo = curriculum.images[0].name;
          this.photo_id = curriculum.images[0].id;
          this.sex = curriculum.sex;
          this.profession = curriculum.profession;
          this.nationality = curriculum.nationality;
          this.graduation_place = curriculum.graduation_place;
          this.adress = curriculum.adress;
          this.academic_formation = curriculum.academic_formation;
          this.work_experience = curriculum.work_experience;
          this.vision_goals = curriculum.vision_goals;
          this.conv_experience = curriculum.conv_experience;
          this.level = curriculum.level.name;
          this.language = curriculum.language.name;
          // this.notify("success", "Curriculum", "Curriculum LOADED");
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          //console.error(error);
        });
    },

    insertFlow() {
      this.storePhoto();
      //this.CreateCurriculum();
    },

    createCurriculum() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $dni: String!
              $name: String!
              $sex: Boolean!
              $profession: String!
              $nationality: String!
              $graduation_place: String!
              $adress: String!
              $academic_formation: String!
              $work_experience: String!
              $vision_goals: String!
              $conv_experience: String!
              $level: ID!
              $language: ID!
              $image: ID!
            ) {
              createCurriculum(
                input: {
                  dni: $dni
                  name: $name
                  sex: $sex
                  profession: $profession
                  nationality: $nationality
                  graduation_place: $graduation_place
                  adress: $adress
                  academic_formation: $academic_formation
                  work_experience: $work_experience
                  vision_goals: $vision_goals
                  conv_experience: $conv_experience
                  level: { connect: $level }
                  language: { connect: $language }
                  images: { connect: [$image] }
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
            dni: this.dni,
            name: this.name,
            sex: this.sex,
            profession: this.profession,
            nationality: this.nationality,
            graduation_place: this.graduation_place,
            adress: this.adress,
            academic_formation: this.academic_formation,
            work_experience: this.work_experience,
            vision_goals: this.vision_goals,
            conv_experience: this.conv_experience,
            level: this.level_id,
            language: this.language_id,
            image: this.photo_id,
          },
        })
        .then((data) => {
          this.loading = false;
          //console.log(data);
          this.notify("success", "Curriculum", "Curriculum creado satisfactoriamente");
          this.$router.push("/curricula");
        })
        .catch((error) => {
          // console.error(error);
        });
    },

    updateFlow() {
      if (typeof this.photo === "string") {
        this.disconnectImage(this.curriculum_id, this.photo_id);
      } else {
        //ELIMINAR PHOTO ANTIGUA
        this.disconnectImage(this.curriculum_id, this.photo_id);

        //this.detach_photo(this.curriculum_id, this.photo_id);
        //ALMACENAR NUEVA PHOTO
      }
    },

    disconnectImage(curriculum_id, image_id) {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($id: ID!, $image: ID) {
              updateCurriculum(input: { id: $id, images: { disconnect: [$image] } }) {
                id
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
          // Parameters
          variables: {
            id: curriculum_id,
            image: image_id,
          },
        })
        .then((data) => {
          //this.loading = false;
          //console.log(data);
          //this.notify("success", "Imagen", "Image disconected");
          if (typeof this.photo !== "string") {
            //ELIMINAR FOTO
            this.deletePhoto(this.photo_id);
            //this.$router.push("/curricula");
          } else {
            this.updateCurriculum();
          }
        })
        .catch((error) => {
          // console.error(error);
        });
    },

    updateCurriculum() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $id: ID!
              $dni: String
              $name: String
              $sex: Boolean
              $profession: String
              $nationality: String
              $graduation_place: String
              $adress: String
              $academic_formation: String
              $work_experience: String
              $vision_goals: String
              $conv_experience: String
              $level: ID
              $language: ID
              $image: ID
            ) {
              updateCurriculum(
                input: {
                  id: $id
                  dni: $dni
                  name: $name
                  sex: $sex
                  profession: $profession
                  nationality: $nationality
                  graduation_place: $graduation_place
                  adress: $adress
                  academic_formation: $academic_formation
                  work_experience: $work_experience
                  vision_goals: $vision_goals
                  conv_experience: $conv_experience
                  level: { connect: $level }
                  language: { connect: $language }
                  images: { connect: [$image] }
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
            id: this.curriculum_id,
            dni: this.dni,
            name: this.name,
            sex: this.sex,
            profession: this.profession,
            nationality: this.nationality,
            graduation_place: this.graduation_place,
            adress: this.adress,
            academic_formation: this.academic_formation,
            work_experience: this.work_experience,
            vision_goals: this.vision_goals,
            conv_experience: this.conv_experience,
            level: this.level_id,
            language: this.language_id,
            image: this.photo_id,
          },
        })
        .then((data) => {
          //this.loading = false;
          //console.log(data);
          this.notify("success", "Curriculum", "Curriculum actualizado ");
          this.show_curriculum = false;
          this.loading = false;
          //location.reload(true);
        })
        .catch((error) => {
          //console.error(error);
        });
    },

    storePhoto() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($file: Upload!) {
              uploadImage(file: $file) {
                id
                name
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
            hasUpload: true,
          },

          variables: {
            file: this.photo,
          },
        })
        .then((data) => {
          let name = data.data.uploadImage.name;
          let id = data.data.uploadImage.id;
          this.photo_id = id;
          if (this.action === "update") {
            this.updateCurriculum();
          }
          //this.notify("success", "Imagen", "Imagen: " + name + " subida");
          //console.log(data);
          //alert("Imagen: " + name + " subida");
        })
        .catch((error) => {
          //console.error(error);
        });
    },

    deletePhoto(id) {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($id: Int!) {
              deleteImage(id: $id) {
                id
                name
              }
            }
          `,
          context: {
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
          // Parameters
          variables: {
            id: id,
          },
        })
        .then((data) => {
          // console.log("delete photo" + data);
          //this.photo = "";
          //this.photo_id = "";
          //this.notify("success", "Imagen", "Imagen: eliminada");

          //subir la imagen
          this.storePhoto();
          //console.log(data.data.uploadImage.name);
          //alert("Imagen: " + name + " subida");
        })
        .catch((error) => {
          //console.error(error);
        });
    },
  },

  //OBSERVADORES DE LOS ATRIBUTOS
  watch: {
    curriculum_id_p: function (val) {
      this.notify("success", "Curiculum ID p", val);
    },

    show_curriculum: function (val) {
      this.$emit("show_curriculum", val);
    },

    action: function (val) {},

    curriculum_id: function (val) {},

    sex: function (val) {},

    photo: function (val) {},

    photo_id: function (val) {
      if (this.action === "insert") {
        this.createCurriculum();
      }
    },
  },

  computed: {
    method: function () {
      if (this.action === "insert") {
        return "Crear";
      } else {
        return "Actualizar";
      }
    },
  },

  components: {
    Loading: Loading,
    Atributes: Atributes,
  },

  props: {
    curriculum_id_p: "",
    action_p: "",
  },
};
</script>
