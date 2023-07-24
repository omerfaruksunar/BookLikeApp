import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import "@/assets/style.css"
import AppHeader from "@/components/Shared/AppHeader"
import {appAxios} from './utils/appAxios';
import store from './store';
import AppBookmarkList from "@/components/Shared/appBookmarkList/BookmarkListItem";
import IndexPage from "@/components/Shared/appBookmarkList/IndexPage"

import io from "socket.io-client";
const socket = io("http://localhost:2018");

const app =createApp(App);
app.component("AppHeader",AppHeader);
app.component("AppBookmarkList", AppBookmarkList);
app.component("IndexPage",IndexPage)

app.use(router);
app.use(store)
app.config.globalProperties.$appAxios = appAxios;
app.config.globalProperties.$log = console.log;
app.config.globalProperties.$socket = socket;
app.mount('#app');


