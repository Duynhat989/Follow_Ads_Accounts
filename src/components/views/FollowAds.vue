<style scoped>
.ads_tbody td {
    text-align: center;
}

.button {
    width: calc(100% / 2);
    padding: 10px;
}

.btn {
    width: 100%;
}

.flex {
    display: flex;
}
.textarea{
    width: 100%;
    padding: 10px;
}
.textarea:focus{
    outline: none;
}
.form-textarea{
    padding: 10px;
}
</style>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-8">
                <h5>I. Thông báo trạng thái</h5>
                <table class="table table-bordered table-sm" style="font-size: 0.8em;">
                    <thead>
                        <tr>
                            <th>.</th>
                            <th>#</th>
                            <th>ID</th>
                            <th>Owner</th>
                            <th>Tên</th>
                            <th>Quyền</th>
                            <th>ID BM</th>
                            <th>Ngày tạo</th>
                            <th>Thông báo trạng thái</th>
                        </tr>
                    </thead>
                    <tbody class="ads_tbody">
                        <tr v-for="(item, index) of listAds">
                            <td><input type="checkbox" v-model="checkbox"></td>
                            <td>
                                <i v-if="item.account_status == 1" class='bx bxs-circle' style='color:#09da4c'></i>
                                <i v-else class='bx bxs-circle' style='color:#ff0101'></i>
                            </td>
                            <td>{{ item.account_id }}</td>
                            <td>{{ item.owner }}</td>
                            <td>{{ item.name }}</td>
                            <td>ADMIN</td>
                            <td>{{ item.owner_business }}</td>
                            <td>{{ item.created_time }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-xl-4">
                <div class="form-dev flex">
                    <div class="button">
                        <button class="btn btn-outline-success">Bắt đầu theo dõi</button>
                    </div>
                    <div class="button">
                        <button class="btn btn-outline-danger">Dừng theo dõi</button>
                    </div>
                </div>
                <div class="form-textarea">
                    <textarea readonly class="textarea" rows="10" placeholder="Log..."></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import AdsAccouunt from '../class/adsaccount';
let clsAdsAccount = null
const info_profile = ref()
const access_token = ref()

const listAds = ref([])

const onSetup = async () => {
    info_profile.value = await JSON.parse(localStorage.getItem("info_profile")) || {}
    access_token.value = localStorage.getItem("access_token") || ''
    console.log("LOG", info_profile.value)
    clsAdsAccount = new AdsAccouunt(info_profile.value.id, access_token.value)
    // -=---------------------------
    let lst = await clsAdsAccount.getList()
    let list_ads = lst.data
    console.log(list_ads)
    for (let index = 0; index < list_ads.length; index++) {
        const element = list_ads[index];
        listAds.value.push({
            checkbox: true,
            account_status: element.account_status,
            account_id: element.account_id,
            owner: element.owner,
            name: element.name,
            currency: element.currency,
            balance: await formartMoney(element.balance, element.currency),
            threshold_amount: element.adspaymentcycle ? await formartMoney(element.adspaymentcycle.data[0].threshold_amount, element.currency) : 0,
            adtrust_dsl: await formartMoney(element.adtrust_dsl, element.currency),
            spend: element.insights ? await formartMoney(element.insights.data[0].spend, element.currency) : 0,
            userpermissions: element.userpermissions.data.length,
            next_bill_date: element.next_bill_date.split('T')[0],
            created_time: element.created_time.split('T')[0],
            owner_business: element.owner_business ? element.owner_business.id : ''
        })
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