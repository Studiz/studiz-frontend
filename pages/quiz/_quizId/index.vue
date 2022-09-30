<template>
  <layout-quiz>
    <div
      v-if="false"
      class="md:h-[calc(100vh-calc(24px+60px))] flex flex-col gap-y-3 h-full"
    >
      <div
        class="background_card overflow-hidden pa-2 pa-md-3 drop-shadow-md text-lg md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed flex-none rounded-lg"
      >
        {{ text }}
      </div>

      <base-question-normal />
    </div>
    <div
      v-else
      class="h-[calc(100vh-calc(24px+60px))] flex items-center justify-center"
    >
      <div
        class="inline-flex text-4xl font-bold items-end loading dark:loading"
      >
        Waiting Host
      </div>
    </div>
  </layout-quiz>
</template>

<script>
import BaseQuestionNormal from '~/components/quiz/BaseQuestionNormal.vue'
import layoutQuiz from '~/layouts/layoutQuiz.vue'
export default {
  components: { layoutQuiz, BaseQuestionNormal },
  layout: 'layoutFree',
  data() {
    return {
      text: 'So I started to walk into the water. I wont lie to you boys, I was terrified. But I pressed on, and as I made my way past',
      quizTemplate: {
        createAt: {
          seconds: 1662913564,
          nanoseconds: 334000000,
        },
        teacherId: '56iqyWsODtR57lsaxyHo',
        title: 'Math 101: Counting, Shapes & Arithmic',
        tags: ['Mmathematics'],
        questions: [
          {
            time: 1000,
            image:
              'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1662913566784_L2FwcGhvc3RpbmdfcHJvZC9ibG9icy9BRW5CMlVwQnlmSUJxY05lOVlIM3R0eWFlMW5IaXJxS18xZzg4QllqTUw4TzNvcEstVEVlOUhVc2dOdmZ6REd3X0NVV2d5dE1Va0Jpd0w2LUw5RF9rQ2Q0ZHdHUE55TlJnUS5HWnVBa1pPSHVoX0FodTVy_900_900.png?alt=media&token=2c877977-766a-4152-84ff-d936c22b7d60',
            answer: {
              options: [
                {
                  index: 0,
                  option: '555555',
                },
                {
                  index: 1,
                  option: '11111111111',
                },
                {
                  option: '3333333333333',
                  index: 2,
                },
                {
                  index: 3,
                  option: '22222222222',
                },
                {
                  index: 4,
                  option: '44444444',
                },
              ],
            },
            question:
              'Look at the shaded model.  Which number sentence is true?',
            type: 'sort',
            fileImage: {},
          },
          {
            fileImage: {},
            type: 'multiple',
            question: 'sdfasdfasdfasdfasdf',
            time: 1000,
            answer: {
              options: [
                {
                  option: '1111111111111111112',
                  isCorrect: false,
                },
                {
                  isCorrect: true,
                  option: '22222222222222222222222',
                },
                {
                  option: '444444444444444444',
                  isCorrect: false,
                },
                {
                  isCorrect: true,
                  option: '23333333333333333333',
                },
              ],
            },
            image: '',
          },
          {
            question: '3e45',
            time: 1000,
            answer: true,
            type: 'true/false',
            image: '',
          },
          {
            fileImage: {},
            time: 3000,
            type: 'poll',
            answer: {
              options: [
                {
                  selected: 0,
                  option: '234234',
                },
                {
                  option: '234234234234',
                  selected: 0,
                },
                {
                  selected: 0,
                  option: 'fsafsaf',
                },
                {
                  selected: 0,
                  option: 'fsfas',
                },
              ],
            },
            image:
              'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1662913565192_8c0506f6-300d-4394-ac87-a77d67d577cf_200_200.jpg?alt=media&token=5edab56e-0a7f-4019-9413-5614c4114297',
            question:
              'Time for some fractions!\nIf Albus ate 3/6 th of a pizza and Gellert ate 2/6 th of the pizza then\nwho ate more than half?',
          },
          {
            answer: {
              options: [
                {
                  option: '1111111111',
                  index: 0,
                },
                {
                  option: '222222222222222222',
                  index: 1,
                },
                {
                  index: 2,
                  option: '44444444444',
                  isCorrect: false,
                },
                {
                  index: 3,
                  option: '3333333333',
                },
                {
                  isCorrect: false,
                  option: '5555555555555555',
                  index: 4,
                },
              ],
            },
            type: 'sort',
            image:
              'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1662913567800_L2FwcGhvc3RpbmdfcHJvZC9ibG9icy9BRW5CMlVxdThRamNNNzlzd0t2ZEZsVmFtREtscW9yakxFYUp0VWEwOEtlU2VUUjBDZjY3NFpxSFJQS3p0V1gwR2VXU01ib01UX2ctbXNBTERPeHFQZ0FMX1F5Ung0M3dPdy5sZ1RMZDJBVVN6TTZKLWhJ_900_900.gif?alt=media&token=f1450e30-7a64-42e6-a5a3-a8581540d676',
            question: 'SDFASDFASDFASDFASDF',
            time: 1000,
          },
        ],
        description:
          'Numbers, Patterns and relations, Shape and space, and Statistics and probability; teaching and learning outcomes are arranged around seven mathematical\n',
        lastUpdated: '09/30/2022',
        image:
          'https://firebasestorage.googleapis.com/v0/b/studiz-ce53f.appspot.com/o/1662913562308_PK123_Counting%20Shapes_EG.png?alt=media&token=2aae9f82-0819-4916-a0eb-7f066e60238f',
      },
    }
  },
}
</script>

<style scoped>
.scrollbar {
  @apply overflow-auto;
}
.scrollbar::-webkit-scrollbar {
  width: 5px;
}
.scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 8px 8px;
}
.scrollbar::-webkit-scrollbar-thumb {
  background: var(--v-primary-base);
  border-radius: 50px;
}
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--v-primary-base);
  border-radius: 50px;
}

.loading:after {
  content: ' .';
  animation: dotsLight 1s steps(5, end) infinite;
}

.dark .dark\:loading:after {
  content: ' .';
  animation: dotsDark 1s steps(5, end) infinite;
}

@keyframes dotsLight {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: black;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
  }
}

@keyframes dotsDark {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: white;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
  }
}
</style>
