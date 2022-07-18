import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SignIn from '@/views/Signin.vue'
import { store } from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Inbox',
    meta: {
      public: false,
      onlyWhenLoggedOut: false
    }
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue'),
    meta: {
      public: false, 
      onlyWhenLoggedOut: false
    }
  },
  {
    path: '/signin',
    component: SignIn,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  )

  store.dispatch('auth/getCurrentUser')
    .then(() => {
      console.log('Logged In');
      if (onlyWhenLoggedOut) {
        return next("/");
      }

      return next();
    })
    .catch(() => {
      if (!isPublic) {
        console.log('logged Out')
        return next('/signin');
      }

      console.log('logged Out');
      return next();
    })
})

export default router
