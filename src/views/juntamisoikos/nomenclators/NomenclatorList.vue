<template>
  <div class="mt-0 bg-white">
    <br />
    <h1 class="mx-6 top-auto flex-auto text-lg font-semibold">
      {{ title }}
    </h1>
    <div class="p-6 bg-white rounded-md shadow-lg">
      <a-auto-complete
        v-model="selected"
        :dataSource="namesToFillAutoCompletePlug"
        style="width: 300px"
        :placeholder="waterMark"
        :filterOption="filterOption"
      />

      <br />
      <br />

      <div>
        <div v-if="selected === 'Iglesias' && selected !== null">
          <GenericGrid query="churches" title="Iglesias"></GenericGrid>
        </div>
        <div v-else-if="selected === 'Departamentos' && selected !== null">
          <GenericGrid query="departments" title="Departamentos"></GenericGrid>
        </div>
        <div v-else-if="selected === 'Misiones' && selected !== null">
          <GenericGrid query="missions" title="Misiones"></GenericGrid>
        </div>
        <div v-else-if="selected === 'Patrocinadores' && selected !== null">
          <GenericGrid query="sponsors" title="Patrocinadores"></GenericGrid>
        </div>
        <div v-else-if="selected === 'Distritos' && selected !== null">
          <GenericGrid query="districts" title="Distritos"></GenericGrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import GenericGrid from "./GenericGrid";
import { AutoComplete } from "ant-design-vue";

Vue.use(AutoComplete);

// import axios from "../../config/axios/axios";
// const $ = require("jquery");
// window.$ = $;

export default {
  data() {
    return {
      //atributos propios
      title: "Gestion de nomencladores",
      selected: "",
      namesToFillAutoCompletePlug: [
        "Iglesias",
        "Departamentos",
        "Misiones",
        "Patrocinadores",
        "Distritos",
      ],
      waterMark: "Nombre del nomenclador",
    };
  },

  mounted() {},

  created() {
    //this.listDepartments();
  },

  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
  },

  watch: {
    // selectedChurch: function(val) {
    //   console.log(val);
    // }
  },

  computed: {
    // auth: function () {
    //     const token = localStorage.getItem('_token');
    //    //alert(token);
    //     if (token !== "") {
    //         return true;
    //     } else {
    //         this.$router.push("/login");
    //         return false;
    //     }
    //
    // }
  },

  components: {
    GenericGrid: GenericGrid,
  },
};
</script>

<style></style>
