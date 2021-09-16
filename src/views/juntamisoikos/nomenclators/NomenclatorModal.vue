<template>
  <div>
    <a-button type="primary" @click="showModal">{{ title_p }}</a-button>
    <a-modal title="Basic Modal" v-model="show_modal" @ok="handleOk">
      <!--<a-input v-model="name" placeholder="Escriba el nombre"/>-->
    </a-modal>
  </div>
</template>
<script>
import Vue from "vue";
import { Input } from "ant-design-vue";
import { Button } from "ant-design-vue";
import { Modal } from "ant-design-vue";

Vue.use(Button);
Vue.use(Modal);
Vue.use(Input);

export default {
  data() {
    return {
      show_modal: false,
      name: "",
    };
  },

  mounted() {
    if (this.name_p !== "") {
      this.name = name;
    }
  },
  created() {},
  methods: {
    showModal() {
      this.show_modal = true;
    },
    handleOk(e) {
      //console.log(e);
      this.show_modal = false;
    },
  },

  watch: {
    show_modal: function (val) {
      this.$emit("show_modal", val);
    },

    name: function (val) {
      this.$emit("name", val);
    },
  },

  props: {
    title_p: "",
    name_p: "",
  },
};
</script>
