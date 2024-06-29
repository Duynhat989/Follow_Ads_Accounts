<style scoped>
.flex{
    display: flex;
}
.menu{
    background-color: rgb(255, 255, 255);
    height: 45px;
    width: 800px;
    margin: auto;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 30px;
    box-shadow: 2px 2px 5px 2px rgba(128, 128, 128, 0.616);
    margin-top: 10px;
}
.menu-item{
    width: 200px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 1s;
    list-style-type: none;
}
.menu-item:hover{
    background-color: gray;
    cursor: pointer;
}
.menu-item:hover a{
    color: white;
}
a{
    list-style: none;
    text-decoration: none;
    color: gray;
}
.first{
    border-radius: 30px 0px 0px 30px ;
}
.last{
    border-radius: 0px 30px 30px 0px ;
}
.hover{
    background-color: gray;
    cursor: pointer;
}
.hover a{
    color: white;
}
</style>
<template>
    <header>
        <ul class="menu flex">
            <li :class="changeDesign == 0 ? `menu-item first hover`:`menu-item first`">
                <a @click="change(0)">Tài khoản Ads</a>
            </li>
            <li :class="changeDesign == 1 ? `menu-item hover`:`menu-item`">
                <a @click="change(1)">Xem chiến dịch</a>
            </li>
            <li :class="changeDesign == 2 ? `menu-item hover`:`menu-item`">
                <a @click="change(2)">Theo dõi Ads</a>
            </li>
            <li :class="changeDesign == 3 ? `menu-item last hover`:`menu-item last`">
                <a @click="change(3)">Cài đặt</a>
            </li>
        </ul>
    </header>
</template>
<script setup>
import { ref,defineEmits } from 'vue';

const changeDesign = ref(0)
const emits = defineEmits()

const change = (design_id) => {
    changeDesign.value = design_id
    emits('update:changeDesign',changeDesign.value);
}
</script>