import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/index/Index";
import Moive from "@/components/movie/Moive";
import Music from "@/components/music/Music";
import News from "@/components/news/News";
import Film from "@/components/movie/Film";

Vue.use(Router);
//创建路由对象
const router = new Router({
    routes: [
        {
            path:'/',
            component: Index
        },
        {
            path:'/movie',
            component: Moive
        },
        {
            path:'/index',
            component: Index
        },
        {
            path: '/music',
            component: Music
        },
        {
            path: '/news',
            component: News
        },
        {
            path:'/movie/film',
            component: Film
        },
    ]
});
export default router;

