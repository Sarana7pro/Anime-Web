import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VideoDetailView from '../views/VideoDetailView.vue'
import CombinedAuth from '@/views/CombinedAuth.vue'
import MessagesView from '@/views/MessagesView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import WatchHistoryView from '@/views/WatchHistoryView.vue'
import SearchResultsView from "@/views/SearchResultsView.vue";
import MoreAnimeViews from '@/views/MoreAnimeViews.vue'
import JapaneseAnimeMore from '@/components/CategoryFilters/JapaneseAnimeMore.vue'
import DomesticAnimeMore from '@/components/CategoryFilters/DomesticAnimeMore.vue'
import MovieTheatricalOVAMore from '@/components/CategoryFilters/MovieTheatricalOVAMore.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/anime/detail/:id',
    name: 'videoDetail',
    component: VideoDetailView,
    props: true
  },
  {
    path: '/loginregister',
    name: 'loginregister',
    component: CombinedAuth
  },
  {
    path: '/messages',
    name: 'messages',
    component: MessagesView
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView
  },
  {
    path: '/watch-history',
    name: 'watchHistory',
    component: WatchHistoryView
  },
  {
    path: '/search',
    name:'searchResults',
    component: SearchResultsView 
  },
  {
    path: '/More',
    name: 'More',
    component: MoreAnimeViews,
    children: [
      {
        path: 'Japan',  
        name: 'MoreJapan',
        component: JapaneseAnimeMore
      },
      {
        path: 'China',  
        name: 'MoreChina',
        component: DomesticAnimeMore
      },
      {
        path: 'HD',
        name: 'MoreMovie',
        component: MovieTheatricalOVAMore
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 处理 NavigationDuplicated 错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err
    }
  })
}

export default router
