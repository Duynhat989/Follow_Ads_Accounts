<style scoped>
.loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgb(255, 255, 255);
}
.loading-content{
    width: 100%;
    height: 100%;
}
.icon{
    width: 28px;
    height: 100px;
    margin: auto;
    line-height: calc(100vh - 50px);
    font-size: 35px;
}
i{
    color: #41557b;
}
</style>
<template>
    <div class="loading">
        <div class="loading-content">
            <div class="icon">
                <i class='bx bx-cloud-download bx-burst' ></i>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
const isLogin = ref(false)

</script>


<!-- Create by Kojy -->