<style scoped>
.ads_tbody td {
    text-align: center;
}
</style>
<template>
    <div class="container">
        <h5>I. Cài đặt phần mềm</h5>
        <!-- Cài đặt phần mềm -->
        <div class="setup">
            <div >
                <div class="form-group">
                    <label for="Text">IdRoom Telegram:</label>
                    <input type="text" class="form-control" placeholder="Room id" v-model="idRoom">
                </div>
                <div class="form-group">
                    <label for="Text">Token Telegram:</label>
                    <input type="text" class="form-control" placeholder="Token telegram" v-model="TokenTelegram">
                </div>
                <div class="form-group">
                    <label for="Text">  Thời gian chờ:</label>
                    <input type="number" class="form-control" v-model="TimeOut">
                </div>
                <div class="form-group" style="margin-top: 10px;">
                    <a class="btn btn-primary" @click="onSetup">Lưu cài đặt</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const idRoom = ref('')
const TokenTelegram = ref('')
const TimeOut = ref(60)

const onSetup = async () => {
    let data = {
        room_id:idRoom.value,
        token_telegram:TokenTelegram.value,
        timeout:TimeOut.value
    }
    localStorage.setItem('setup',JSON.stringify(data))
}
onMounted(async () => {
    let sets = await JSON.parse(localStorage.getItem('setup')) || null
    if(sets){
        idRoom.value = sets.room_id
        TokenTelegram.value = sets.token_telegram
        TimeOut.value = sets.timeout
    }
})
</script>