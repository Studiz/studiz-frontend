import classroom from "static/menu_icon/classroom.vue";
import more from "static/menu_icon/more.vue";
import notification from "static/menu_icon/notification.vue";
import quiz from "static/menu_icon/quiz.vue";
import Studiz_logo from 'static/logo/Studiz_logo.vue'
import member from 'static/menu_icon/member.vue'
import setting from 'static/menu_icon/setting.vue'
import full_screen from 'static/icons/fullScreen.vue'
import normal_screen from 'static/icons/normalScreen.vue'


export default {
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#0c8ce9",
        primary_shade: "#d7eeff",
        secondary: "#ff6b35",
        secondary_shade: "#ffe3d9",
        bg_disable: "#C4CDD4",
        background: "#FFFFFF",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      },
      dark: {
        primary: "#22A1EE",
        primary_shade: "#6b7e8c",
        secondary: "#FF6B35",
        secondary_shade: "#ffe3d9",
        bg_disable: "#464646",
        background: "#272727",
        last_background: "#121212",
        accent: "#424242",
        info: "#26a69a",
        warning: "#ffc107",
        error: "#FF3F3F",
        success: "#00e676"
      }
    }
  },
  icons: {
    iconfont: "mdi",
    values: {
      classroom: {
        component: classroom
      },
      more: {
        component: more
      },
      notification: {
        component: notification
      },
      quiz: {
        component: quiz
      },
      Studiz_logo: {
        component: Studiz_logo
      },
      member: {
        component: member
      },
      setting: {
        component: setting
      },
      full_screen: {
        component: full_screen
      },
      normal_screen: {
        component: normal_screen
      },
    }
  }
}
