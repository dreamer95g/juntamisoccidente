<template>
  <div class="mt-0 bg-white rounded-md shadow-lg">
    <br />
    <h1 class="mx-6 top-auto flex-auto text-lg font-semibold">
      {{ title }}
    </h1>
    <div class="mx-6">
      <nav class="flex flex-col sm:flex-row">
        <!-- --------------------------------------------------------------------------------- -->
        <button
          v-if="!show_church"
          @click="showChurch()"
          class="text-gray-600 py-4 px-6 block border-b-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none hover:font-medium"
        >
          Iglesia</button
        ><button
          v-else
          class="py-4 px-6 block border-b-2 border-blue-500 text-blue-500 focus:outline-none font-medium"
        >
          Iglesia
        </button>
        <!-- -------------------------------------------------------------------------------- -->
        <button
          v-if="!show_curriculum"
          @click="showCurriculum()"
          class="text-gray-600 py-4 px-6 block border-b-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none hover:font-medium"
        >
          Curriculum
        </button>
        <button
          v-else
          class="py-4 px-6 block border-b-2 border-blue-500 text-blue-500 focus:outline-none font-medium"
        >
          Curriculum
        </button>

        <!-- -------------------------------------------------------------------------------- -->

        <button
          v-if="!show_sponsor"
          @click="showSponsor()"
          class="text-gray-600 py-4 px-6 block border-b-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none hover:font-medium"
        >
          Patrocinador
        </button>
        <button
          v-else
          class="py-4 px-6 block border-b-2 border-blue-500 text-blue-500 focus:outline-none font-medium"
        >
          Patrocinador
        </button>

        <!-- -------------------------------------------------------------------------------- -->
        <button
          v-if="!show_district"
          @click="showDistrict()"
          class="text-gray-600 py-4 px-6 block border-b-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none hover:font-medium"
        >
          Distrito
        </button>
        <button
          v-else
          class="py-4 px-6 block border-b-2 border-blue-500 text-blue-500 focus:outline-none font-medium"
        >
          Distrito
        </button>
      </nav>
    </div>
    <div v-if="show_church">
      <ThreeMonthsChurch></ThreeMonthsChurch>
    </div>
    <div v-else-if="show_curriculum">
      <ThreeMonthsCurriculum></ThreeMonthsCurriculum>
    </div>
    <div v-else-if="show_district">
      <ThreeMonthsDistrict></ThreeMonthsDistrict>
    </div>
    <div v-else-if="show_sponsor">
      <ThreeMonthsSponsor></ThreeMonthsSponsor>
    </div>

    <br />
  </div>
</template>

<script>
import Vue from "vue";
import ThreeMonthsChurch from "./ThreeMonthsChurch";
import ThreeMonthsCurriculum from "./ThreeMonthsCurriculum";
import ThreeMonthsDistrict from "./ThreeMonthsDistrict";
import ThreeMonthsSponsor from "./ThreeMonthsSponsor";

export default {
  data() {
    return {
      title: "Informe Trimestral",
      show_church: true,
      show_curriculum: false,
      show_sponsor: false,
      show_district: false,
    };
  },
  components: {
    ThreeMonthsChurch: ThreeMonthsChurch,
    ThreeMonthsCurriculum: ThreeMonthsCurriculum,
    ThreeMonthsDistrict: ThreeMonthsDistrict,
    ThreeMonthsSponsor: ThreeMonthsSponsor,
  },
  methods: {
    showChurch() {
      this.show_church = true;
      this.show_curriculum = false;
      this.show_sponsor = false;
      this.show_district = false;
    },
    showCurriculum() {
      this.show_church = false;
      this.show_curriculum = true;
      this.show_sponsor = false;
      this.show_district = false;
    },
    showDistrict() {
      this.show_church = false;
      this.show_curriculum = false;
      this.show_sponsor = false;
      this.show_district = true;
    },
    showSponsor() {
      this.show_church = false;
      this.show_curriculum = false;
      this.show_sponsor = true;
      this.show_district = false;
    },
  },

  computed: {
    role() {
      return this.$store.state.authUser.roles[0].name;
    },
  },
};
</script>
