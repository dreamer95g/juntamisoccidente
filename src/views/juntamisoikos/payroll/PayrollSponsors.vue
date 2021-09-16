<template>
  <div>
    <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
  </div>
</template>
<script>
import Vue from "vue";
import { Checkbox } from "ant-design-vue";
import gql from "graphql-tag";

Vue.use(Checkbox);

const plainOptions = [];
const defaultCheckedList = [];

export default {
  data() {
    return {
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      plainOptions: [],
      ids: [],
      sponsorsFromServer: [],
      token: "",
    };
  },

  mounted() {
    this.token = this.$store.state.token;
    this.init();
  },

  created() {
    // if (this.tempList.length !== 0) {
    // } else {
    //   alert("Esta vacia");
    // }
  },
  methods: {
    getElems: async function () {
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
            headers: { Authorization: this.token !== "" ? "Bearer " + this.token : "" },
          },
          //fetchPolicy: "no-cache",
        })
        .then((data) => {
          //console.log(data.data);
          let sponsors = data.data.sponsors;
          for (let i in sponsors) {
            let id = sponsors[i].id;
            let name = sponsors[i].name;

            let elem = {
              id: id,
              name: name,
            };

            this.sponsorsFromServer.push(elem);

            this.plainOptions.push(name);
          }
        })
        .catch((error) => {
          //console.error(error);
        });
    },

    init: function () {
      this.getElems();
    },

    getIdFromList: function (list, name) {
      let id = -1;
      for (let i in list) {
        let elem = list[i];

        if (elem.name == name) {
          id = elem.id;
          return id;
        }
      }
      return id;
    },

    getNameFromList: function (list, id) {
      let name = "";
      //console.log("lista " + list);

      for (let i in list) {
        let elem = list[i];

        let identifier = elem.id;
        let nomenclator = elem.name;

        //alert("name " + nomenclator + " " + "id" + identifier);

        if (identifier === id) {
          name = nomenclator;
          //alert(name);
          return name;
        }
      }
      return name;
    },

    onChange(checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
  },

  watch: {
    checkedList_p: function (val) {},

    checkedList: function (val) {
      this.ids = [];
      if (val.length !== 0) {
        for (let i in val) {
          let elem = val[i];
          let id = this.getIdFromList(this.sponsorsFromServer, elem);
          //alert("identifier" + id);
          if (id !== -1) {
            this.ids.push(id);
          }
        }
      }
    },

    sponsorsFromServer: function (val) {
      if (val.length !== 0 && this.checkedList_p !== undefined) {
        this.checkedList = [];
        let checkid = this.checkedList_p;
        if (checkid.length !== 0) {
          for (let i in checkid) {
            let id = checkid[i];
            let name = this.getNameFromList(this.sponsorsFromServer, id);
            this.checkedList.push(name);

            //console.log("Checked");
            //console.log(this.checkedList);
          }
        }
      }
    },

    ids: function (val) {
      if (val.length !== 0) {
        this.$emit("sponsors", this.ids);
      }
    },
  },

  computed: {},

  props: {
    checkedList_p: Array,
    //plainOptions_p: Array
  },
};
</script>
