<template>
  <div class="col-lg-3">
    <div class="clearfix">
      <a-upload
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 1">
          <a-icon type="plus" />
          <div class="ant-upload-text">Foto</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt style="width: 50%" :src="previewImage" />
      </a-modal>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

import { Upload } from "ant-design-vue";
import { Modal } from "ant-design-vue";

Vue.use(Upload);
Vue.use(Modal);

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default Vue.extend({
  data: () => {
    return {
      photo: "",
      previewVisible: false,
      previewImage: "",
      fileList: [],
      baseUrl: "http://graphoikos.oikos/img/",
    };
  },

  created() {
    if (this.image !== "") {
      this.photo = this.image;
      //console.log("esta es la imagen " + val);
      this.setPhoto();
    }
  },

  methods: {
    statusDone() {
      let count = this.fileList.length;
      //alert(count);

      if (count !== 0) {
        let image = this.fileList[0];

        //console.log("este es status " + obj.status);

        image.status = "done";

        // let elem = {
        //   uid: obj.uid,
        //   name: obj.name,
        //   status: "done",
        //   url: this.baseUrl
        // };

        this.fileList = [];
        this.fileList.push(image);
      }
    },

    setPhoto() {
      if (this.photo !== undefined) {
        //alert(this.photo);
        let img = this.photo;
        let urlImg = this.baseUrl + img;
        // this.handlePreview(file);
        let elem = {
          uid: "-1",
          name: "Foto",
          status: "done",
          url: urlImg,
        };

        this.fileList.push(elem);
        this.photo = this.image;

        //console.log(this.photo);
      }
    },

    handleCancel() {
      this.previewVisible = false;
    },

    async handlePreview(file) {
      //console.log(file);
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },

    // este es el metodo que captura la imagen
    handleChange({ fileList }) {
      if (fileList.length !== 0) {
        this.photo = fileList[0].originFileObj;
        //console.log(this.photo);
      }

      this.fileList = fileList;
      //este es para ponerle el status en
      //done y que no me salga error
      this.statusDone();
    },
  },

  props: {
    image: "",
  },

  watch: {
    photo: function (val) {
      if (val !== null) {
        //alert(val);
        this.$emit("photo", this.photo);
      }
    },
    image: function (val) {
      if (val !== undefined) {
        this.photo = val;
        //console.log("esta es la imagen " + val);
        this.setPhoto();
      }
    },
  },
});
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
