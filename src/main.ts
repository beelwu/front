import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import 'virtual:windi.css'
import router from "./routes";
import "normalize.css";
import 'vant/lib/index.css';
import 'vant/es/toast/style';
import 'element-plus/dist/index.css'
import {Icon} from "vant";
import pinia from './store/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Echarts from "vue-echarts";
import * as echarts from "echarts";
const app = createApp(App);

app.component('e-charts', Echarts)
app.config.globalProperties.$echarts = echarts;

pinia.use(piniaPluginPersistedstate);
app.use(router).use(pinia).use(Icon).mount('#app')
