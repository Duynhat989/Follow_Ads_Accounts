<style scoped>
.ads_tbody td {
    text-align: center;
    padding: 8px 0;
}

.active {
    margin-bottom: 10px;
    text-align: end;
}

.loading-icon {
    text-align: center;
}

.filter {
    width: 100%;
}

.filter_content {
    width: 700px;
    margin: auto;
}

.filter_content input {
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.315);
    font-size: 13px;
}

.filter_content input:focus {
    outline: 1px dotted green;
}

.class-input {
    width: 200px;
    font-size: 13px;
}

.flex {
    display: flex;
}

.filt {
    text-align: center;
}

.loadv {
    text-align: center;
}

.btn {
    min-width: 150px;
}
.btn-outline-warning{
    min-width: 30px;
    width: 30px !important;
}
</style>
<template>
    <div class="filter">
        <div class="filter_content">
            <label style="display: block;">Tìm kiếm tài khoản</label>
            <input type="text" placeholder="Tên tài khoản hoặc ID tài khoản" v-model="searchInput">
        </div>
    </div>
    <h5>I. Tài khoản quảng cáo</h5>
    <div class="filt">
        <div class="active flex">
            <div class="list-input flex">
                <div class="class-input">
                    <input v-model="start_date" type="date" class="form-control btn-sm" id="start_date"
                        name="start_date">
                </div>
                &emsp;
                <div class="class-input">
                    <input v-model="end_date" type="date" class="form-control btn-sm" id="end_date" name="end_date">
                </div>
            </div>
            <div class="btn-group">&emsp;
                <button type="button" class="btn btn-outline-primary btn-sm" @click="onSetup()"><i
                        class='bx bx-refresh'></i> Tải
                    lại</button>
                <!-- <button type="button" class="btn btn-outline-warning btn-sm"><i class='bx bx-download'></i> Tải xuống</button> -->
            </div>
            <div class="btn-group flex" style="align-items: center;">&emsp;
                <label for="">Tổng ID: <span>{{ listAdsAll.length }}</span></label>
                <!-- <button type="button" class="btn btn-outline-warning btn-sm"><i class='bx bx-download'></i> Tải xuống</button> -->
            </div>
        </div>
    </div>
    <table class="table table-bordered table-sm" style="font-size: 0.8em;" v-if="listAds.length > 0">
        <thead>
            <tr>
                <th>Stt</th>
                <th>#</th>
                <th>ID</th>
                <th>Tên</th>
                <th>Quốc gia</th>
                <th>Tiền tệ</th>
                <th>Số tiền đã chi tiêu</th>
                <th>Số đăng ký</th>
                <th>Chi phí mỗi đăng ký</th>
                <th>Chức năng</th>
            </tr>
        </thead>
        <tbody class="ads_tbody">
            <tr v-for="(item, index) of listAds" :key="index">
                <td>{{ index }}</td>
                <td>
                    <i v-if="item.account_status == 1" class='bx bxs-circle' style='color:#09da4c'></i>
                    <i v-else-if="item.account_status == 0" class='bx bxs-circle' style='color:#ff0101'></i>
                    <i v-else-if="item.account_status == 2" class='bx bxs-circle' style='color:#ff0101'></i>
                    <i v-else-if="item.account_status == 3" class='bx bxs-circle' style='color:rgb(255 202 0)'></i>
                    <i v-else></i>
                </td>
                <td>{{ item.account_id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.country }}</td>
                <td>{{ item.currency }}</td>
                <td>{{ item.spend }}</td>
                <td>{{ item.subscribe_total }}</td>
                <td>{{ item.spend_subscribe }}</td>
                <td>
                    <a target="_blank"
                        :href="`https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${item.account_id ? item.account_id : item.account_id_country}`"
                        class="btn btn-sm btn-outline-primary"><i class='bx bx-link-alt'></i></a>&ensp;
                    <a target="_blank"
                        :href="`https://business.facebook.com/billing_hub/payment_activity?asset_id=${item.account_id ? item.account_id : item.account_id_country}`"
                        class="btn btn-sm btn-outline-warning"><i class='bx bxs-data'></i></a>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="loadv" v-else>
        <h5>Chưa có dữ liệu</h5>
    </div>
    <div class="list-group--da flex">
        <button v-for="number in pageTotal" :key="number" @click="setPage(number - 1)" type="button" class="btn btn-outline-warning btn-sm" style="margin-right: 5px;">{{ number }}</button>
    </div>
    <div class="loading-icon" v-if="isLoading">
        <label for="">Đang tải dữ liệu</label>
        <div class="icon">
            <i class='bx bx-loader bx-spin'></i>
        </div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import AdsAccouunt from '../class/adsaccount';
import { getCurrentDateTimeInTimezone,getCurrentDateTimeInTimezoneDay } from '../class/assets';



let clsAdsAccount = null
const info_profile = ref()
const access_token = ref()

const listAds = ref([])
const listAdsAll = ref([])

const page = ref(0)
const pageTotal = ref(0)
const isLoading = ref(false)

const start_date = ref()
const end_date = ref()


const searchInput = ref('')

const onLoadAds = async (list_ads) => {
    for (let index = 0; index < list_ads.length; index++) {
        const element = list_ads[index];
        // cần lấy thêm thông tin nha ------------------------
        let lstInsght = await clsAdsAccount.getInsights(element.account_id, start_date.value, start_date.value)
        let insData = lstInsght.data

        let dataAdd = []
        let totalSpend = 0
        let totalSub = 0
        for (let indexIns = 0; indexIns < insData.length; indexIns++) {
            const elementIns = insData[indexIns];
            let subscribe_total = 0
            function getSubscribeTotalValue(data) {
                if (data.conversions) {
                    const conversion = data.conversions.find(c => c.action_type === "subscribe_total");
                    return conversion ? conversion.value : 0;
                }
                return 0;
            }
            subscribe_total = getSubscribeTotalValue(elementIns)
            totalSpend += parseInt(elementIns.spend)
            totalSub += parseInt(subscribe_total)
            dataAdd.push({
                account_id_country: element.account_id,
                spend: await formartMoney(elementIns.spend, element.currency),
                country: elementIns.country,
                subscribe_total: subscribe_total,
                spend_subscribe: await formartMoney(subscribe_total == 0 ? 0 : parseInt(elementIns.spend) / subscribe_total, element.currency)
            })
        }
        listAds.value.push({
            account_status: element.account_status,
            account_id: element.account_id,
            owner: element.owner,
            name: element.name,
            currency: element.currency,
            owner_business: element.owner_business ? element.owner_business.id : '',
            country: 'Tất cả',
            spend: await formartMoney(totalSpend, element.currency),
            subscribe_total: totalSub,
            spend_subscribe: await formartMoney(totalSub == 0 ? 0 : totalSpend / totalSub, element.currency)
        },
            ...dataAdd)
        console.log(listAds.value)
    }
}
function getSpend(account) {
    if (account.insights && account.insights.data && account.insights.data[0]) {
        return parseFloat(account.insights.data[0].spend);
    }
    return 0;
}

const onSetup = async () => {
    listAds.value = []
    listAdsAll.value = []
    isLoading.value = true
    info_profile.value = await JSON.parse(localStorage.getItem("info_profile")) || {}
    access_token.value = localStorage.getItem("access_token") || ''
    clsAdsAccount = new AdsAccouunt(info_profile.value.id, access_token.value)
    // -=---------------------------
    let lst = await clsAdsAccount.getList_Local(start_date.value,end_date.value)
    listAdsAll.value = lst.data
    listAdsAll.value.sort((a, b) => getSpend(b) - getSpend(a));
    let list_ads = listAdsAll.value.slice(page.value * 50, (page.value * 50) + 50)
    await onLoadAds(list_ads)
    isLoading.value = false
    localStorage.setItem('adaccounts', JSON.stringify(listAdsAll.value))
}
const setDate = async () => {
    start_date.value =await getCurrentDateTimeInTimezoneDay()
    end_date.value =await getCurrentDateTimeInTimezoneDay()
}
const setPage = async (number) => {
    page.value = number
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
// ===========================
watch(start_date, (newValue, oldValue) => {
    // console.log(newValue)

})
watch(end_date, (newValue, oldValue) => {
    // console.log(newValue)
})
watch(listAdsAll, (newValue, oldValue) => {
    pageTotal.value = Math.floor((listAdsAll.value.length / 50))
    // console.log("pageTotal: ",pageTotal.value)
})
watch(page,async (newValue, oldValue) => {
    //thay đổi phần nội dung
    console.log(newValue)
    listAds.value = []
    isLoading.value = true
    let list_ads = listAdsAll.value.slice(newValue * 50, (newValue * 50) + 50)
    await onLoadAds(list_ads)
    isLoading.value = false
})
let timeFind = null
watch(searchInput, (newValue, oldValue) => {
    listAds.value = []
    isLoading.value = true
    clearTimeout(timeFind)
    timeFind = setTimeout(async () => {
        let ads = []
        for (let index = 0; index < listAdsAll.value.length; index++) {
            const element = listAdsAll.value[index];
            if (element.name.includes(searchInput.value)) {
                ads.push(element)
            }
        }
        let list_ads = ads.slice(page.value * 50, (page.value * 50) + 50)
        await onLoadAds(list_ads)
        isLoading.value = false
    }, 1500)
})

onMounted(() => {
    setDate()
})
onUnmounted(() => {

})
</script>