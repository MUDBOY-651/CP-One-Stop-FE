import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Chatbox from '../components/Chatbox.vue'
import PostView from "../views/PostView.vue"
import MyPostView from "../views/MyPostView.vue"
import PublishPost from "../components/PublishPost.vue"
import EditPost from "../components/EditPost.vue"
import store from '../store'
import ReviewPost from "../components/ReviewPost.vue"

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', component: Register },
  { path: '/user/:userId', component: UserProfileView },
  { path: '/chat', component: Chatbox },
  { path: '/mypost', component: MyPostView },
  { path: '/post/:postId', component: PostView },
  { path: '/publish/post', component: PublishPost },
  { path: '/edit/post/:postId', component: EditPost },
  { path: '/review/post', component: ReviewPost},
  // 可以添加更多的路由规则
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !store.state.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
