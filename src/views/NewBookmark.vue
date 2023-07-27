<template>
    <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
      <input  ref="title" v-model="userData.value.title" type="text" placeholder="Başlık" class="input mb-3" />
      <input v-model="userData.value.url" type="text" placeholder="URL" class="input mb-3" />
      <select v-model="userData.value.categoryId" class="input mb-3">
        <option disabled value="" selected>Kategori</option>
        <option v-for="category in categoryList" :key="category.id" :value="category.value.id"> {{category.value.name}} </option>
      </select>
      <textarea v-model="userData.value.description" placeholder="Açıklama" class="input mb-3" cols="30" rows="10"></textarea>
      <div class="flex items-center justify-end gap-x-1">
        <button @click="$router.push({ name : 'HomePage'})" class="secondary-button">İptal</button>
        <button @click="onSave" class="default-button">Kaydet</button>
      </div>
    </div>
</template>

<script setup>

import { ref, inject, computed, onMounted } from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const appAxios = inject("appAxios");
const socket = inject("socket");
const store = useStore();
const router = useRouter();
const categoryList = ref([]);
const userData = ref({
  title : null,
  url : null,
  categoryId : null,
  description : null, 
})
onMounted(() => {
  appAxios.get("/Categories").then(category_response =>{
    categoryList.value = category_response ?. data || [];
})
});

const onSave = () => {
      const saveData = {
        ...userData.value,
        userId : _getCurrentUser?.value.id,
        created_at : new Date()
      };
      appAxios.post("/bookmarks" , saveData).then(save_bookmark_response =>{
        Object.keys(userData.value)?.forEach(field =>(userData.value[field]=null));
        const socketData = {
          ...save_bookmark_response.data ,
          user : _getCurrentUser.value,
          category : categoryList.value?.find(c => c.id === saveData.categoryId)
        };
        socket.emit("NEW_BOOKMARK_EVENT", socketData );
        router.push({ name : "HomePage"});
      });
    }

    const _getCurrentUser = computed(() => store.getters._getCurrentUser)

</script>