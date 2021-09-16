<template>
  <div class="flex">
    <div
      :class="isOpenSideBar ? 'block' : 'hidden'"
      @click="closeSideBar()"
      class="fixed z-20 inset-0"
    ></div>

    <div
      :class="isOpenSideBar ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed z-30 inset-y-0 left-0 w-64 transition duration-700 transform bg-gray-900 overflow-y-auto"
      @mouseleave="closeSideBar()"
      @click="closeSideBar()"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <span class="text-white text-2xl mx-2 font-semibold">Juntamisoccidente</span>
        </div>
      </div>

      <nav class="mt-12 my-20">
        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Home' ? activeClass : inactiveClass]"
          to="/home"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>

          <span class="mx-4">Home</span>
        </router-link>

        <router-link
          v-if="role === 'admin' || role === 'secretary'"
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'CurriculumList' ? activeClass : inactiveClass]"
          to="/curricula"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span class="mx-4">Curriculum</span>
        </router-link>

        <router-link
          v-if="role === 'admin' || role === 'secretary'"
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'PayrollList' ? activeClass : inactiveClass]"
          to="/payrolls"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>

          <span class="mx-4">Planillas</span>
        </router-link>

        <router-link
          v-if="role === 'admin' || role === 'secretary'"
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'NomenclatorsList' ? activeClass : inactiveClass]"
          to="/nomenclators"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <span class="mx-4">Nomencladores</span>
        </router-link>

        <router-link
          v-if="
            role === 'admin' ||
            role === 'secretary' ||
            role === 'coordinator' ||
            role === 'partner'
          "
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'ThreeMontsContainer' ? activeClass : inactiveClass]"
          to="/threemonths"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>

          <span class="mx-4">Informe Trimestral</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
      activeClass: "bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100",
      inactiveClass:
        "border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100",
    };
  },

  mounted() {},
  methods: {
    openSideBar() {
      this.$store.commit("set", ["isOpenSideBar", true]);
    },

    closeSideBar() {
      this.$store.commit("set", ["isOpenSideBar", false]);
    },
  },

  computed: {
    role() {
      return this.$store.state.authUser.roles[0].name;
    },
    isOpenSideBar() {
      return this.$store.state.isOpenSideBar;
    },
  },
};
</script>
