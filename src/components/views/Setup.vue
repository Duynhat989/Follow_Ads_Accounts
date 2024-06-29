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
            <form action="/action_page.php">
                <div class="form-group">
                    <label for="Text">Id Telegram:</label>
                    <input type="text" class="form-control" placeholder="Enter Text" id="text">
                </div>
                <div class="form-group">
                    <label for="Text">Token Telegram:</label>
                    <input type="text" class="form-control" placeholder="Enter Text" id="text">
                </div>
                <div class="form-group">
                    <label for="Text">  Thời gian chờ:</label>
                    <input type="text" class="form-control" placeholder="Enter Text" id="text">
                </div>
                <div class="form-group" style="margin-top: 10px;">
                    <button type="submit" class="btn btn-primary">Lưu cài đặt</button>
                </div>
            </form>
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
    clsAdsAccount = new AdsAccouunt(info_profile.value.id, access_token.value)
    // -=---------------------------
    let lst = await clsAdsAccount.getList()
    let list_ads = lst.data
    for (let index = 0; index < list_ads.length; index++) {
        const element = list_ads[index];
        listAds.value.push({
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