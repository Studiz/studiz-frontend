<template>
  <layout-create :quizTitle="quizData.title" @edit-quiz-title="editquizTitle">
    <v-sheet
      rounded="lg"
      elevation="1"
      color="background_card"
      class="overflow-hidden pa-2 pa-md-5"
    >
      <span>
        {{ quizData.title }}
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo minima
        maiores quia pariatur natus libero cum doloribus, earum labore totam
        voluptatem animi repellat sapiente reiciendis a id ducimus dolore ut!
      </span>
    </v-sheet>
  </layout-create>
</template>

<script>
import layoutCreate from '~/components/layouts/layoutCreate.vue'
export default {
  components: { layoutCreate },
  layout: 'layoutFree',
  data() {
    return {
      drawer: true,
      quizData: {
        id: 'xxxxxx',
        teacherId: 'xxxxxx',
        title: 'xxxxxxtitle',
        image: 'xxxxxx',
        tags: ['xxxxxx', 'xxxxxx'],
        description: 'xxxxxx',
        questions: [
          {
            question: 'xxxxxx',
            image: 'xxxxxx',
            time: 10,
            type: 'single',
            answer: {
              options: [
                {
                  option: 'xxxxxx',
                  isCorrect: true,
                },
                {
                  option: 'xxxxxx',
                  isCorrect: false,
                },
                {
                  option: 'xxxxxx',
                  isCorrect: false,
                },
                {
                  option: 'xxxxxx',
                  isCorrect: false,
                },
              ],
            },
          },
        ],
      },
    }
  },
  methods: {
    editquizTitle(name) {
      console.log(name)
      this.quizData.title = name
    },
  },
  created() {
    if (process.client) {
      this.$nuxt.$on('changeTitle', (text) => {
        console.log(text)
      })
    }
  },
}
</script>

<style></style>
