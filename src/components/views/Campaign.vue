<style scoped>
.ads_tbody td {
    text-align: center;
}

.flex {
    display: flex;
}

.adsaccount {
    border-top: 1px solid gray;
    margin-bottom: 3px;
}

.campaigns {
    margin-top: 3px;
    margin-bottom: 3px;
}

.insights {
    margin-top: 3px;
    margin-bottom: 3px;
}

.adsaccount-show {
    padding-left: 40px;
}

.col {
    border-right: 1px solid gray;
    padding: 5px;
    font-size: 0.8em;
}

.rowl {
    margin-bottom: 3px;
}

.insights {
    padding-left: 50px;
}

.adsaccount_info {
    background-color: #000000;
    color: white;
}

.campaigns_info {
    background-color: #035169;
    color: white;
}

.insights-info {
    background-color: #39cefb;
    color: white;
}

.more {
    cursor: pointer;
}

.active {
    margin-bottom: 10px;
    text-align: end;
}

.loading-icon {
    text-align: center;
}

.filt {
    text-align: center;
}

.btn {
    min-width: 150px;
}

.loading-icon {
    text-align: center;
}
</style>
<template>
    <div class="site">
        <div class="filt">
            <div class="active flex">
                <div class="btn-group">&emsp;
                    <button type="button" class="btn btn-outline-primary btn-sm" @click="onSetup()"><i
                            class='bx bx-refresh'></i> Tải
                        lại</button>
                    <!-- <button type="button" class="btn btn-outline-warning btn-sm"><i class='bx bx-download'></i> Tải xuống</button> -->
                </div>
            </div>
        </div>
        <div class="adsaccount" v-for="(item, index) of listAds" :key="index">
            <div class="adsaccount-data">
                <!-- <label>Tên tài khoản: {{ item.data.name }}</label> -->
                <div class="adsaccount_info flex">
                    <div class="col account_status">
                        <label style="display: block;">Tên tài khoản</label>
                        <label style="display: block;">{{ item.data.name }}</label>
                    </div>
                    <div class="col account_status">
                        <label style="display: block;">Trạng thái</label>
                        <label style="display: block;">{{ item.data.account_status }}</label>
                    </div>
                    <div class="col account_id">
                        <label style="display: block;">ID tài khoản</label>
                        <label style="display: block;">{{ item.data.account_id }}</label>
                    </div>
                    <div class="col owner">
                        <label style="display: block;">Sở hữu</label>
                        <label style="display: block;">{{ item.data.owner }}</label>
                    </div>
                    <div class="col owner_business">
                        <label style="display: block;">BM</label>
                        <label style="display: block;">{{ item.data.owner_business }}</label>
                    </div>
                    <div class="col currency">
                        <label style="display: block;">Currency</label>
                        <label style="display: block;">{{ item.data.currency }}</label>
                    </div>
                    <div class="col userpermissions">
                        <label style="display: block;">QTV</label>
                        <label style="display: block;">{{ item.data.userpermissions }}</label>
                    </div>
                    <div class="col campai">
                        <label style="display: block;" v-if="item.campaigns.length > 0"><i
                                style="font-size: 1.5em;cursor: pointer;" class='bx bxs-chevron-down'></i></label>
                        <label style="display: block;" v-else></label>
                    </div>
                </div>
            </div>
            <div class="adsaccount-show">
                <div class="campaigns" v-for="(temp, index1) of item.campaigns" :key="index1">
                    <div class="campaigns-data">
                        <!-- <label>Chiến dịch: {{ temp.data.name }}</label> -->
                        <div class="campaigns_info flex">
                            <div class="col name">
                                <label style="display: block;">Tên chiến dịch</label>
                                <label style="display: block;">{{ temp.data.name }}</label>
                            </div>
                            <div class="col status">
                                <label style="display: block;">Trạng thái</label>
                                <label style="display: block;">{{ temp.data.status }}</label>
                            </div>
                            <div class="col id">
                                <label style="display: block;">ID Quảng cáo</label>
                                <label style="display: block;">{{ temp.data.id }}</label>
                            </div>
                            <div class="col budget_remaining">
                                <label style="display: block;">Ngân sách còn lại</label>
                                <label style="display: block;">{{ temp.data.budget_remaining }}</label>
                            </div>
                            <div class="col daily_budget">
                                <label style="display: block;">Ngân sách hằng ngày</label>
                                <label style="display: block;">{{ temp.data.daily_budget }}</label>
                            </div>
                            <div class="col created_time">
                                <label style="display: block;">Ngày tạo</label>
                                <label style="display: block;">{{ temp.data.created_time.split('T')[0] }}</label>
                            </div>
                            <div class="col insigh">
                                <label style="display: block;" v-if="temp.insights.length > 0"><i
                                        style="font-size: 1.5em;cursor: pointer;"
                                        class='bx bxs-chevron-down'></i></label>
                                <label style="display: block;" v-else></label>
                            </div>
                        </div>
                    </div>
                    <div class="campaigns-show">
                        <div class="insights" v-for="(insight, index2) of temp.insights" :key="index2">
                            <div class="insights-data">
                                <!-- <label>Chi tiết</label> -->
                                <div class="insights-info flex">
                                    <div class="col account_currency">
                                        <label style="display: block;">Tiền</label>
                                        <label style="display: block;">{{ insight.account_currency }}</label>
                                    </div>
                                    <div class="col impressions">
                                        <label style="display: block;">ID Quảng cáo</label>
                                        <label style="display: block;">{{ insight.impressions }}</label>
                                    </div>
                                    <div class="col reach">
                                        <label style="display: block;">Tìm kiếm</label>
                                        <label style="display: block;">{{ insight.reach }}</label>
                                    </div>
                                    <div class="col clicks">
                                        <label style="display: block;">clicks</label>
                                        <label style="display: block;">{{ insight.clicks }}</label>
                                    </div>
                                    <div class="col impressions">
                                        <label style="display: block;">impressions</label>
                                        <label style="display: block;">{{ insight.impressions }}</label>
                                    </div>
                                    <div class="col date_start">
                                        <label style="display: block;">date_start</label>
                                        <label style="display: block;">{{ insight.date_start }}</label>
                                    </div>
                                    <div class="col date_stop">
                                        <label style="display: block;">date_stop</label>
                                        <label style="display: block;">{{ insight.date_stop }}</label>
                                    </div>
                                    <div class="col ctr">
                                        <label style="display: block;">ctr</label>
                                        <label style="display: block;">{{ insight.ctr }}</label>
                                    </div>
                                    <div class="col cpm">
                                        <label style="display: block;">cpm</label>
                                        <label style="display: block;">{{ insight.cpm }}</label>
                                    </div>
                                    <div class="col cpc">
                                        <label style="display: block;">cpc</label>
                                        <label style="display: block;">{{ insight.cpc }}</label>
                                    </div>
                                    <div class="col spend">
                                        <label style="display: block;">spend</label>
                                        <label style="display: block;">{{ insight.spend }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="list-group--da flex">
            <button v-for="number in pageTotal" :key="number" @click="setPage(number - 1)" type="button"
                class="btn btn-outline-warning btn-sm" style="margin-right: 5px;">{{ number }}</button>
        </div>
        <div class="loading-icon" v-if="isLoading">
            <label for="">{{ titleDownload }}</label>
            <div class="icon">
                <i class='bx bx-loader bx-spin'></i>
            </div>
        </div>
    </div>
    <!-- hiển thị campaign -->


</template>
<script setup>
import { onMounted, ref } from 'vue';
import Campaigns from '../class/campaigns';
let camps = null
const info_profile = ref()
const access_token = ref()

const listAds = ref([])
const isLoading = ref(false)

const page = ref(0)
const pageTotal = ref(0)

const setPage = async (number) => {
    page.value = number
    console.log(page.value)
}

const titleDownload = ref('Đang cập nhật dữ liệu mới')

const onSetup = async () => {
    isLoading.value = true
    info_profile.value = await JSON.parse(localStorage.getItem("info_profile")) || {}
    access_token.value = localStorage.getItem("access_token") || ''

    camps = new Campaigns(info_profile.value.id, access_token.value)
    // -=---------------------------
    let adaccounts = await JSON.parse(localStorage.getItem("adaccounts")) || []
    // ---------------------------------
    // let stopLost = adaccounts.length > 10 ? 10 : adaccounts.length
    for (let index = 0; index < adaccounts.length; index++) {
        // khởi tạo 1 chiến dịch 
        const element = adaccounts[index];
        console.log(adaccounts.length)
        console.log(element)
        if (element) {
            titleDownload.value = `Đang tải: "${element.name}" Mã ID: ${element.account_id}`
            let lst = await camps.getList(element.account_id)
            let list_campaigns = lst.data
            let campaigns = []
            if (list_campaigns.length > 0) {
                for (let indexInsights = 0; indexInsights < list_campaigns.length; indexInsights++) {
                    const elementInsights = list_campaigns[indexInsights];
                    // let lstInsights = await camps.insights(elementInsights.id)
                    let listInsights = []
                    campaigns.push({
                        data: elementInsights,
                        insights: listInsights
                    })
                }
            }
            listAds.value.push({
                data: element,
                campaigns: campaigns
            })
        }
    }
    isLoading.value = false
    console.log(listAds.value)
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
    // onSetup()
})
</script>