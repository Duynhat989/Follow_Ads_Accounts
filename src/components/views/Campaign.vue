<style scoped>
.ads_tbody td {
    text-align: center;
}
</style>
<template>
    <h5>I. Danh sách tài khoản quảng cáo</h5>
    <table class="table table-bordered table-sm" style="font-size: 0.8em;">
        <thead>
            <tr>
                <th>Stt</th>
                <th>#</th>
                <th>ID</th>
                <th>Owner</th>
                <th>Tên</th>
                <th>Số dư</th>
                <th>Ngưỡng</th>
                <th>Giới hạn</th>
                <th>Chi tiêu</th>
                <th>QTV</th>
                <th>Tiền tệ</th>
                <th>Loại TK</th>
                <th>Quyền</th>
                <th>ID BM</th>
                <th>Next_bill</th>
                <th>Múi giờ</th>
                <th>Ngày tạo</th>
            </tr>
        </thead>
        <tbody class="ads_tbody">
            <tr v-for="(item, index) of listAds">
                <td>{{ index }}</td>
                <td>
                    <i v-if="item.account_status == 1" class='bx bxs-circle' style='color:#09da4c'></i>
                    <i v-else class='bx bxs-circle' style='color:#ff0101'></i>
                </td>
                <td>{{ item.account_id }}</td>
                <td>{{ item.owner }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.balance }}</td>
                <td>{{ item.threshold_amount }}</td>
                <td>{{ item.adtrust_dsl }}</td>
                <td>{{ item.spend }}</td>
                <td>{{ item.userpermissions }}</td>
                <td>{{ item.currency }}</td>
                <td>{{ item.owner_business.length > 0 ? 'Doanh nghiệp' : 'Cá nhân' }}</td>
                <td>ADMIN</td>
                <td>{{ item.owner_business }}</td>
                <td>_</td>
                <td>{{ item.next_bill_date }}</td>
                <td>{{ item.created_time }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import Campaigns from '../class/campaigns';
let camps = null
const info_profile = ref()
const access_token = ref()

const listAds = ref([])

const onSetup = async () => {
    info_profile.value = await JSON.parse(localStorage.getItem("info_profile")) || {}
    access_token.value = localStorage.getItem("access_token") || ''

    camps = new Campaigns(info_profile.value.id, access_token.value)
    // -=---------------------------
    let adaccounts = await JSON.parse(localStorage.getItem("adaccounts")) || []
    for (let index = 0; index < adaccounts.length; index++) {
        const element = adaccounts[index];
        let lst = await camps.getList(element.account_id)
        let list_campaigns = lst.data
        if(list_campaigns.length > 0){
            for (let indexInsights = 0; indexInsights < list_campaigns.length; indexInsights++) {
                const elementInsights = list_campaigns[indexInsights];
                let lstInsights = await camps.insights(elementInsights.id)
                let listInsights = lstInsights.data
                console.log(listInsights)
            }
        }
        console.log(list_campaigns)
    }
}
const formartMoney = async (money, currency = "USD") => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: currency != 'VND' ? 2 : 0,
        maximumFractionDigits: currency != 'VND' ? 2 : 0,
    });
    return await formatter.format(typeof money == 'number' ? money : parseInt(money))
}
onMounted(() => {
    onSetup()
})
</script>