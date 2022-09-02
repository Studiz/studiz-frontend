<template>
  <div class="w-full h-full" :key="currentQuesiton">
    <label
      class="label-class group h-full py-3"
      form="file"
      v-if="previewImageList.length == 0"
    >
      <v-icon
        class="p-0.5 rounded-full border-2 border-current group-hover:text-white transition-all"
      >
        mdi-plus
      </v-icon>
      <span class="mt-2 text-base select-none">Select a image file</span>
      <input
        type="file"
        class="hidden"
        id="file"
        accept="image/x-png,image/gif,image/jpeg"
        @change="previewMultiImage"
        multiple
      />
    </label>
    <div v-else class="w-fit h-full mx-auto">
      <div
        v-for="(item, index) in previewImageList"
        :key="index"
        class="relative w-fit h-full"
      >
        <img :src="item" class="object-contain object-center h-full w-auto" />

        <v-btn
          @click="deleteImage(index)"
          color="secondary"
          class="!absolute text-center cursor-pointer bottom-2 right-2"
        >
          remove
        </v-btn>
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
      var count = input.files.length
      var index = 0
      // if (imgName.length > 30) {
      //   alert('The file name cannot exceed 30 characters.!!!')
      // } else if (input.files) {
      while (count--) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.previewImageList.push(e.target.result)
        }
        this.imageInfo.push(input.files[index])
        reader.readAsDataURL(input.files[index])
        index++
      }
      // }
      this.$emit('save-input-image', this.imageInfo[0].name)
    },
    deleteImage(index) {
      this.imageInfo.splice(index, 1)
      this.previewImageList.splice(index, 1)
      this.$emit('delete-image', '')
    },
    mappingImage() {
      this.imageInfo =
        this.dataQuestion.image == '' || this.dataQuestion.image == null ? [] : [this.dataQuestion.image]
      this.previewImageList =
        this.dataQuestion.image == '' || this.dataQuestion.image == null ? [] : [this.dataQuestion.image]
    },
  },
  created() {
    this.mappingImage()
  },
  // () {
  //   console.log('Destroy')
  //   this.imageInfo = []
  //   this.previewImageList = []
  // },
}
</script>

<style scoped>
.label-class {
  @apply mx-auto flex flex-col items-center justify-center rounded-lg drop-shadow-md tracking-wide uppercase cursor-pointer transition hover:text-white bg-light_primary_shade dark:bg-dark_primary_shade hover:bg-light_primary dark:hover:bg-dark_primary;
}
</style>
