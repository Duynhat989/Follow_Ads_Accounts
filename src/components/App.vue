<style scoped>
.content {
    padding: 15px;
}
</style>
<template>
    <div class="web-site" v-if="isLoading">
        <HeaderView @update:changeDesign="changeView"/>
        <div class="content">
            <MainView v-if="isShowDesign == 0"/>
            <CampaignsView v-if="isShowDesign == 1"/>
            <FollowView v-if="isShowDesign == 2"/>
            <SetupView v-if="isShowDesign == 3"/>
        </div>
    </div>
    <LoadingView v-else/>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import HeaderView from './views/Header.vue'
import MainView from './views/Main.vue'
import CampaignsView from './views/Campaign.vue'
import FollowView from './views/FollowAds.vue'
import SetupView from './views/Setup.vue'
import LoadingView from './layouts/Loading.vue';


import { startRunApp } from './controller/ads_accounts';
const isLoading = ref(false)


const isShowDesign = ref(0)
const changeView = (design_id) => {
    console.log(design_id)
    isShowDesign.value = design_id
}


const setupOpen = async () => {
    const isStatus = await startRunApp()
    if (!isStatus) {
        alert('Không thể lấy được token')
    }else{
        isLoading.value = true
    }
}


onMounted(() => {
    setupOpen()
})
</script>


<!-- Create by Kojy -->


<!-- Create by Kojy -->