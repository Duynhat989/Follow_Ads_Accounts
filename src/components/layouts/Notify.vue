<style scoped>
.notify {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99999;
}

.notify_content {
    width: 400px;
    margin: 15% auto;
    background: white;
    border: 1px solid #80808010;
    padding: 12px;
    border-radius: 10px;
    box-shadow: 5px 3px 14px 3px rgb(128 128 128 / 15%)
}

.title h6 {
    font-size: 16px;
    margin-bottom: 0;
}

.content {
    font-size: 13px;
}

.process {
    width: 100%;
}

.btn {
    border: 1px solid rgba(128, 128, 128, 0.158);
}

.close {
    text-align: end;
}


.active {
    margin-top: 10px;
    font-size: 13px;
}

.btn-detail {
    margin-right: 5px;
}

.process {
    background-color: rgb(34, 104, 104);
    width: 100%;
    height: 3px;
    margin: 5px 0px;
}

.success {
    background: rgb(221 255 221);
}

.error {
    background: rgb(255, 220, 220);
}

.wait {
    background: rgb(255 255 235);
}
</style>

<template>
    <div class="notify" v-if="isShow">
        <div
            :class="type == 'success' ? 'notify_content success' : type == 'wait' ? 'notify_content wait' : 'notify_content error'">
            <div class="notify-text">
                <div class="title">
                    <h6>OneWise</h6>
                </div>
                <hr style="margin: 5px 0;">
                <div class="content">
                    {{ textNotify.text }}
                </div>
                <div class="process" :style="'width: ' + load + '%;'"></div>
                <div class="active">
                    <button class="btn btn-detail btn-sm" @click="isShow = false"><i class='bx bx-check'></i></button>
                    <button class="btn btn-detail btn-sm" @click="isShow = false"><i class='bx bx-x'></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const textNotify = ref({});
const type = ref('success');
const isShow = ref(false);
const load = ref(100);
let timeout = ref([])
window.addEventListener('message', function (event) {
    const message = event.data;
    var newData = JSON.parse(message)
    timeout.value.forEach(item => {
        clearTimeout(item)
    })
    if (newData.type == "notify") {
        //----------------------
        textNotify.value = newData.data
        type.value = textNotify.value.type
        let time = 3
        if (textNotify.value.time != undefined) {
            time = textNotify.value.time
        }
        //----------------------
        isShow.value = true
        let perc = (time * 1000) / 100

        for (let index = 0; index < 100; index++) {
            timeout.value.push(
                setTimeout(() => {
                    load.value = 100 - index
                    if (index == 99) {
                        isShow.value = false
                    }
                }, perc * index)
            )
        }
    }
});
</script>