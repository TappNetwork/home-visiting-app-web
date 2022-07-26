import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SignInPage from '@/views/Signin.vue';
import FormsPage from '@/views/Forms.vue';
import HomeVisitorDirectoryPage from '@/views/HomeVisitorDirectory.vue';
import ProfilePage from '@/views/Profile.vue';
import ReferralsPage from '@/views/Referrals.vue';
import ResourceCenterPage from '@/views/ResourceCenter.vue';
import DashboardPage from '@/views/Dashboard.vue';
import HomeVisitorProfilePage from '@/views/HomeVisitorProfile.vue';
import { store } from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: DashboardPage,
    meta: {
      public: false,
      onlyWhenLoggedOut: false,
    }
  },
  {
    path: '/forms',
    component: FormsPage,
    meta: {
      public: false,
      onlyWhenLoggedOut: false,
    }
  },
  {
    path: '/home-visitor-directory',
    component: HomeVisitorDirectoryPage,
    meta: {
      public: false,
      onlyWhenLoggedOut: false,
    }
  },
  {
    path: '/home-visitor-directory/:id',
    component: HomeVisitorProfilePage,
    meta: {
      public: false,
      onlyWhenLoggedOut: false,
    }
  },
  {
    path: '/profile',
    component: ProfilePage,
    meta: {
      public: false,
      onlyWhenLoggedOut: false,
    }
  },
  {
    path: '/resource-center',
    component: ResourceCenterPage,
    meta: {
      public: false,
      onlyWhenLoggedOut: false,
    }
  },
  {
    path: '/referrals',
    component: ReferralsPage,
    meta: {
      public: false,
      onlyWhenLoggedOut: false,
    }
  },
  {
    path: '/forms',
    component: FormsPage,
    meta: {
      public: false,
      onlyWhenLoggedOut: false,
    }
  },
  {
    path: '/sign-in',
    component: SignInPage,
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
        return next('/sign-in');
      }

      console.log('logged Out');
      return next();
    })
})

export default router
