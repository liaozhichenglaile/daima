import Vue from 'vue'
import App from './App'
import HomePage from './pages/home/index'
Vue.component('HomePage', HomePage)
import StarPage from './pages/star/index'
Vue.component('StarPage', StarPage)
import JoinPage from './pages/join/index'
Vue.component('JoinPage', JoinPage)
import ReservePage from './pages/reserve/index'
Vue.component('ReservePage', ReservePage)
import MinePage from './pages/mine/index'
Vue.component('MinePage', MinePage)
import CustomNav from '@/components/CustomNav'
Vue.component('CustomNav', CustomNav)
Vue.config.productionTip = false
import util from '@/utils/util.js'
Vue.prototype.$util = util
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
