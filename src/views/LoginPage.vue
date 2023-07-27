<template>
    <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Giriş Yap</h3>
      <input v-model="userData.userName" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
      <input v-model="userData.password" type="password" placeholder="Şifre" class="input mb-3" />
      <button @click="onSubmit" class="default-button">Giriş yap</button>
      <span class="text-center mt-3 text-sm">
        Üye değilim,
        <router-link :to="{ name : 'RegisterPage' }" class="text-red-900 hover:text-black">
          Üye olmak istiyorum!
        </router-link>
      </span>
    </div>
</template>

<script setup>
import CryptoJS from "crypto-js"
import { useStore } from "vuex";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
const appAxios = inject("appAxios");
const store = useStore();
const router = useRouter();
const userData = ref ({
  userName:null,
  password: null,
});

const onSubmit = () => {
      const password = CryptoJS.HmacSHA1(userData.value.password,store.getters._saltKey).toString();
      appAxios
      .get(`/users?userName=${userData.value.userName}&password=${password}`)
      .then (login_response => {
        if(login_response ?. data ?. length > 0 ){
          store.commit("setUser",login_response ?.data[0]);
          router.push({ name : "HomePage"});
        }else {
          alert('Boyle bir kullanici bulunamadi.');
        }
        
      }).catch(e => console.log(e));
    }

</script>