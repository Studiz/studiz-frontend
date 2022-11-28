<template>
  <div
    class="w-full h-full min-h-[14rem] max-h-72 lg:max-h-80"
    :key="currentQuesiton"
  >
    <label
      class="label-class group h-full p-5 overflow-hidden"
      form="file"
      v-if="previewImageList.length == 0"
    >
      <v-icon
        class="p-0.5 rounded-full border-2 border-current group-hover:text-white transition-all"
        >mdi-plus</v-icon
      >
      <span class="mt-2 text-center select-none whitespace-nowrap"
        >Select a image file</span
      >
      <input
        type="file"
        class="hidden"
        id="file"
        accept="image/x-png, image/gif, image/jpeg"
        @change="previewMultiImage"
      />
    </label>
    <div v-else class="w-fit h-full mx-auto background_card rounded-lg">
      <div
        v-for="(item, index) in previewImageList"
        :key="index"
        class="relative w-fit h-full"
      >
        <img
          :src="item"
          class="object-contain object-center h-full w-auto shadow-md"
        />

        <v-btn
          @click="deleteImage(index)"
          color="secondary"
          small
          class="!absolute text-center cursor-pointer bottom-2 right-2"
          >remove</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentQuesiton: {
      type: Number,
      required: true,
    },
    dataQuestion: {
      type: Object,
    },
  },
  watch: {
    currentQuesiton() {
      this.mappingImage()
    },
    dataQuestion() {
      this.mappingImage()
    },
  },
  data() {
    return {
      previewImageList: [],
      imageInfo: [],
      imagesDelete: [],
    }
  },
  methods: {
    previewMultiImage(event) {
      // let imgName = event.target.files[0].name
      var input = event.target
      // var count = input.files.length
      // var index = 0
      // if (imgName.length > 30) {
      //   alert('The file name cannot exceed 30 characters.!!!')
      // } else if (input.files) {
      // while (count--) {
      var reader = new FileReader()
      reader.onload = (e) => {
        this.previewImageList.push(e.target.result)
      }
      this.imageInfo.push(input.files[0])
      reader.readAsDataURL(input.files[0])
      // index++
      // }
      // }

      let previewImage = URL.createObjectURL(this.imageInfo[0])
      URL.revokeObjectURL(this.imageInfo[0])

      this.$emit('save-input-image', {
        previewImage: previewImage,
        fileImage: this.imageInfo[0],
      })
    },
    deleteImage(index) {
      this.imageInfo.splice(index, 1)
      this.previewImageList.splice(index, 1)
      this.$emit('delete-image', '')
    },
    mappingImage() {
      this.imageInfo =
        this.dataQuestion.image == '' || this.dataQuestion.image == null
          ? []
          : [this.dataQuestion.image]
      this.previewImageList =
        this.dataQuestion.image == '' || this.dataQuestion.image == null
          ? []
          : [this.dataQuestion.image]
    },
  },
  created() {
    this.mappingImage()
  },
}
</script>

<style scoped>
.label-class {
  @apply mx-auto flex flex-col items-center justify-center rounded-lg drop-shadow-md tracking-wide uppercase cursor-pointer transition hover:text-white bg-light_primary_shade dark:bg-dark_primary_shade hover:bg-light_primary dark:hover:bg-dark_primary;
}
</style>
