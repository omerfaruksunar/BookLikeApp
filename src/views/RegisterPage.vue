<template>
    <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Kayıt Ol</h3>
      <input v-model="userData.fullName" type="text" placeholder="Tam Ad" class="input mb-3" />
      <input v-model="userData.userName" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
      <input v-model="userData.password" type="password" placeholder="Şifre" class="input mb-3" />
      <button class="default-button" @click="onSave">Kayıt ol</button>
      <span class="text-center mt-3 text-sm">
        Zaten Üyeyim,
        <router-link :to="{ name : 'LoginPage' }" class="text-red-900 hover:text-black">
          Giriş Yap!
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
  fullName: null,
  password: null,
});

const onSave = () => {
      const password = CryptoJS.HmacSHA1(userData.value.password,store.getters._saltKey).toString();

      appAxios.post("/users",{...userData.value, password}).then(() => {
        router.push({ name : "HomePage"});
      });
    }

</script>

