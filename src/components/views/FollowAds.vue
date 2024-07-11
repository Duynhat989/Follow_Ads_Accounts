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

        .textarea {
            width: 100%;
            padding: 10px;
            min-height: 60vh;
        }

        .textarea:focus {
            outline: none;
        }

        .form-textarea {
            padding: 10px;
        }

        .lod {
            padding: 5px 10px;
        }

        /*  */
        .loader {
            width: 100%;
            height: 4.8px;
            display: inline-block;
            position: relative;
            background: rgba(109, 109, 109, 0.15);
            overflow: hidden;
        }

        .loader::after {
            content: '';
            width: 96px;
            height: 4.8px;
            background: #33ff00;
            position: absolute;
            top: 0;
            left: 0;
            box-sizing: border-box;
            animation: hitZak 1s linear infinite alternate;
        }

        @keyframes hitZak {
            0% {
                left: 0;
                transform: translateX(-1%);
            }

            100% {
                left: 100%;
                transform: translateX(-99%);
            }
        }

        .ads_tbody {
            max-height: 700px;
            overflow-y: scroll;
        }

        .loading-icon {
            text-align: center;
            position: fixed;
            top: 60px;
            left: 0;
            width: 100%;
            background-color: white;
            min-height: 100vh;
            padding-top: 20px;
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
                                    <th>Tên</th>
                                    <th>Thông báo trạng thái</th>
                                </tr>
                            </thead>
                            <tbody class="ads_tbody">
                                <tr v-for="(item, index) of listAds" :key="index">
                                    <td>
                                        <i v-if="item.new_account_status == 1" class='bx bxs-circle'
                                            style='color:#09da4c'></i>
                                        <i v-else-if="item.new_account_status == 0" class='bx bxs-circle'
                                            style='color:#ff0101'></i>
                                        <i v-else-if="item.new_account_status == 2" class='bx bxs-circle'
                                            style='color:#ff0101'></i>
                                        <i v-else-if="item.new_account_status == 3" class='bx bxs-circle'
                                            style='color:rgb(255 202 0)'></i>
                                        <i v-else></i>
                                    </td>
                                    <td>{{ item.account_id }}</td>
                                    <td>{{ item.name }}</td>
                                    <th>
                                        <span v-if="item.new_account_status == 1">Tài khoản hoạt động trở lại</span>
                                        <span v-else>Tài khoản bị tắt</span>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-xl-4">
                        <div class="form-dev flex">
                            <div class="button">
                                <button class="btn btn-outline-success" @click="checkAdsAccount">Bắt đầu theo
                                    dõi</button>
                            </div>
                            <div class="button">
                                <button class="btn btn-outline-danger" @click="stopThread">Dừng theo dõi</button>
                            </div>
                        </div>
                        <div class="lod" v-if="isRuning">
                            <span class="loader"></span>
                        </div>
                        <div class="form-textarea">
                            <textarea readonly class="textarea" rows="10" placeholder="Log..."
                                v-model="textareaText"></textarea>
                        </div>
                    </div>
                </div>
                <div class="loading-icon" v-if="isLoading">
                    <label for="">{{ TEXT_NOTE }}</label>
                    <div class="icon">
                        <i class='bx bx-loader bx-spin'></i>
                    </div>
                </div>
            </div>
        </template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import AdsAccouunt from '../class/adsaccount';
import CampaignClass from '../class/campaignClass';
import Campaigns from '../class/campaigns';
import { get_info_profile, get_token_eaab } from '../module/face';
import { soSanhMoney } from '../module/sytem'
import { getCurrentDateTimeInTimezone, getCurrentDateTimeInTimezoneDay } from '../class/assets';


let clsAdsAccount = null
let camps = null
let campaigncl_1 = null
const info_profile = ref()
const access_token = ref()

const listAds = ref([])
const isLoading = ref(false)

const oldListAdsAll = ref([])

const textareaText = ref('')
const isRuning = ref(false)


const LOADING_CAMP = ref(false)


const TEXT_NOTE = ref('Đang tải dữ liệu')
// -----------------------------------------


let letMap = null

const onSetup = async () => {
    LOADING_CAMP.value = true
    listAds.value = []
    isLoading.value = true
    letMap = new Map();
    //-------------------------------
    info_profile.value = await JSON.parse(localStorage.getItem("info_profile")) || {}
    access_token.value = localStorage.getItem("access_token") || ''
    clsAdsAccount = new AdsAccouunt(info_profile.value.id, access_token.value)
    camps = new Campaigns(info_profile.value.id, access_token.value)
    campaigncl_1 = new CampaignClass(access_token.value)
    // -=---------------------------
    let lst = await clsAdsAccount.getList()
    oldListAdsAll.value = lst.data
    TEXT_NOTE.value = "Đang cập nhật dữ liệu ban đầu"
    // setcampaign
    let lstCamps = await campaigncl_1.getListCampaigns()
    let dataLstCamps = lstCamps.data
    for (let index = 0; index < dataLstCamps.length; index++) {
        const element = dataLstCamps[index];
        if (element.account_status == 1) {
            let campsLst = element.campaigns ? element.campaigns.data : []
            TEXT_NOTE.value = `Đang cập nhật: ${element.account_id}`
            letMap.set(element.account_id, campsLst)
        }
    }
    console.log(letMap)
    TEXT_NOTE.value = "Hoàn tất"
    isLoading.value = false
}
let lstTimeout = []
let idSetIntervel = null
const timeSleep = async (time) => {
    lstTimeout = []
    for (let index = 0; index < time; index++) {
        var timeOut = setTimeout(() => {
            textareaText.value = `Thời gian chờ: ${time - index}\r\n${textareaText.value}`
        }, 1000 * index)
        lstTimeout.push(timeOut)
    }
}
function getChangedObjects(data1, data2) {
    const changes = [];

    const data1Map = new Map();
    data1.forEach(item => {
        data1Map.set(item.account_id, item);
    });
    data2.forEach(item => {
        const correspondingItem = data1Map.get(item.account_id);
        if (!correspondingItem) {
            // Object mới được thêm vào
            changes.push({
                account_id: item.account_id,
                name: item.name,
                old_account_status: null,
                new_account_status: item.account_status,
                id: item.id
            });
        } else if (correspondingItem.account_status !== item.account_status) {
            // account_status thay đổi
            changes.push({
                account_id: item.account_id,
                name: item.name,
                old_account_status: correspondingItem.account_status,
                new_account_status: item.account_status,
                id: item.id
            });
        }
    });

    return changes;
}
// -----------------------------------------
function getChangedObjectsCampaigns(data1, data2) {
    const changes = [];
    const data1Map = new Map();
    data1.forEach(item => {
        data1Map.set(item.id, item);
    });
    data2.forEach(item => {
        const correspondingItem = data1Map.get(item.id);
        if (!correspondingItem) {
            // Object mới được thêm vào
            changes.push({
                id: item.id,
                old_status: null,
                new_status: item.delivery_info.status
            });
        } else if (correspondingItem.delivery_info.status !== item.delivery_info.status) {
            // account_status thay đổia
            changes.push({
                id: item.id,
                old_status: correspondingItem.delivery_info.status,
                new_status: item.delivery_info.status
            });
        }
    });

    return changes;
}
function splitStringByLength(inputString, maxLength) {
    const chunks = [];
    let currentChunk = '';

    inputString.split('\n').forEach(line => {
        if ((currentChunk + line + '\n').length > maxLength) {
            chunks.push(currentChunk);
            currentChunk = '';
        }
        currentChunk += line + '\n';
    });

    if (currentChunk) {
        chunks.push(currentChunk);
    }

    return chunks;
}

// Cắt chuỗi thành các mảng con với giới hạn 4000 ký tự

const sendDataMessage = async (tokenTelegram, idRoom, message) => {
    try {
        await awaitSleep(1)
        const chunks = splitStringByLength(message, 4000);
        for (let index = 0; index < chunks.length; index++) {
            const element = chunks[index];
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                "chat_id": `-${idRoom}`,
                "text": element.trim()
            });
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
            let result = await fetch(`https://api.telegram.org/bot${tokenTelegram}/sendMessage`, requestOptions)
            await awaitSleep(2)
        }
    } catch (error) {
        console.log(message)
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
const stopThread = async () => {
    for (let index = 0; index < lstTimeout.length; index++) {
        clearTimeout(lstTimeout[index])
    }
    isRuning.value = false
    clearInterval(idSetIntervel)
    alert('Đã dừng')
}

const awaitSleep = async (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, timeout * 1000)
    })
}
function getSpend(account) {
    if (account.insights && account.insights.data && account.insights.data[0]) {
        return parseFloat(account.insights.data[0].spend);
    }
    return 0;
}

// Sử dụng hàm với múi giờ +7
function getSubscribeTotalValue(data) {
    if (data.conversions) {
        const conversion = data.conversions.find(c => c.action_type === "subscribe_total");
        return conversion ? conversion.value : 0;
    }
    return 0;
}
// Hàm phân loại
function classifyData(campChanges) {
    const result = {};
    for (let index = 0; index < campChanges.length; index++) {
        const item = campChanges[index];
        const parts = item.split(' >> ');
        const status = parts[1].trim();

        if (!result[status]) {
            result[status] = [];
        }

        result[status].push(item);
    }
    return result;
}
// Hàm để chuyển đổi đối tượng phân loại thành chuỗi văn bản
function classifiedDataToString(classifiedData) {
    let resultString = '';

    for (const status in classifiedData) {
        if (status == "recently_rejected") {
            resultString += status + '\n';
            classifiedData[status].forEach(item => {
                resultString += item + '\n';
            });
        }
    }

    return resultString;
}


async function scanCampaigns(setup) {
    // 
    await awaitSleep(5)
    let lstCamps = await campaigncl_1.getListCampaigns()
    let dataLstCamps = lstCamps.data
    // get All camp
    console.log("old_det: ------------------------------------------------------------------------------------------------------------------------------------------------")
    const campChangesResult = []
    for (let index = 0; index < dataLstCamps.length; index++) {
        const element = dataLstCamps[index];
        if (element.account_status == 1) {
            let campsLst = element.campaigns ? element.campaigns.data : []

            let old_det = letMap.get(element.account_id);
            if (old_det) {
                let ojbData = await getChangedObjectsCampaigns(old_det, campsLst)
                if (ojbData.length > 0) {
                    letMap.delete(element.account_id)
                    letMap.set(element.account_id, campsLst)
                }
                for (let indexCamp = 0; indexCamp < ojbData.length; indexCamp++) {
                    const elementCamp = ojbData[indexCamp];
                    if (elementCamp.new_status == 'recently_rejected' && !campChangesResult.includes(element.account_id)) {
                        campChangesResult.push(element.account_id)
                    }
                    // campChangesResult.push(`Id:${element.account_id}|${elementCamp.id}  ${elementCamp.old_status} >> ${elementCamp.new_status} `)
                }
            }

        }
    }
    if (campChangesResult.length > 0) {
        // const classifiedData = classifyData(campChangesResult);
        // const resultString = classifiedDataToString(classifiedData);
        await sendDataMessage(setup.token_telegram, setup.room_id, `Campaigns rejected:\r\n.\r\n${campChangesResult.join('\r\n\r\n')}`)
    }
    isLoading.value = false
}
const get_status = async (status) => {
    switch (status) {
        case 0: {
            return 'die'
        }
        case 1: {
            return 'live'
        }
        case 2: {
            return 'die'
        }
        case 3: {
            return 'paid'
        }
        case null: {
            return 'new'
        }
    }
}

const checkAdsAccount = async () => {
    isRuning.value = true
    let setup = JSON.parse(await localStorage.getItem('setup')) || null
    if (!setup) {
        alert('Vui lòng thêm cài đặt telegram');
        return
    }
    timeSleep(setup.timeout)
    idSetIntervel = setInterval(async () => {
        let access_token = localStorage.getItem("access_token") || ''
        let user_profile = await get_info_profile(access_token)
        // -----------------------
        if (user_profile && user_profile.id) {
        } else {
            access_token = await get_token_eaab()
            clsAdsAccount = new AdsAccouunt('user_id', access_token)
            campaigncl_1 = new CampaignClass(access_token)
            camps = new Campaigns('user_id', access_token)
            if (access_token) {
                localStorage.setItem('access_token', access_token)
            }
        }
        // ---------------------------------
        let capnhatTime = await getCurrentDateTimeInTimezone()
        let dateTime = await getCurrentDateTimeInTimezoneDay()
        var lst = await clsAdsAccount.getList()
        let newData = lst.data
        localStorage.setItem('adaccounts', JSON.stringify(newData))
        sendDataMessage(setup.token_telegram, setup.room_id, `Giờ cập nhật: ( ${capnhatTime})`)
        // -----------------------------------
        if (JSON.stringify(newData) != JSON.stringify(oldListAdsAll.value)) {
            // Tìm sự khác biệt giữa cũ và mới
            let diffObject = await getChangedObjects(oldListAdsAll.value, newData)
            console.log('Dữ liệu khác', diffObject)
            listAds.value = diffObject
            if (diffObject.length == 0) {
                textareaText.value = `Không có cập nhật mới\r\n${textareaText.value}`
            }
            textareaText.value = textareaText.value.slice(0, 3000)
            let dataSendTelegram = ''
            for (let index = 0; index < diffObject.length; index++) {
                const element = diffObject[index];
                console.log("element: ", element)
                let oldValue = await get_status(element.old_account_status)
                let newValue = await get_status(element.new_account_status)
                dataSendTelegram += `\r\nID:${element.account_id} ${oldValue}  >>>  ${newValue}\r\n`
                if (dataSendTelegram.length > 4000) {
                    sendDataMessage(setup.token_telegram, setup.room_id, `Thông báo chuyển trạng thái của tài khoản:\r\n${dataSendTelegram}`)
                    dataSendTelegram = ''
                }
                // Biên soạn nội dung của tài khoản quảng cáo
                await awaitSleep(1)
            }
            console.log("dataSendTelegram", dataSendTelegram)
            if (dataSendTelegram.length > 0) {
                sendDataMessage(setup.token_telegram, setup.room_id, `Thông báo chuyển trạng thái của tài khoản:\r\n${dataSendTelegram}`)
            }
            oldListAdsAll.value = newData

        }
        timeSleep(setup.timeout)
        // Kiểm tra giá ads trên tài khoản ads

        await scanCampaigns(setup)

        var dataAdsAll = await clsAdsAccount.getList_Local(dateTime, dateTime)
        let sendDataList = []
        let sendDataListDiff = []
        if (dataAdsAll) {
            let AdsData = dataAdsAll.data
            // ------------------------------------------------
            for (let index = 0; index < AdsData.length; index++) {
                const element = AdsData[index];
                let spendMoney = getSpend(element)
                if (parseInt(spendMoney) > 10) {
                    let dataSendTelegram = ''
                    let isDiffCountry = false
                    let insghtData = await clsAdsAccount.getInsights(element.account_id, dateTime, dateTime)
                    let dataInsghts = insghtData.data
                    let LstCountry = ''
                    // ------------------------------------
                    // console.log("element", element)
                    for (let indexIns = 0; indexIns < dataInsghts.length; indexIns++) {
                        const elementIns = dataInsghts[indexIns];
                        let subs = getSubscribeTotalValue(elementIns)
                        let spen_ads = subs == 0 ? 0 : (parseInt(elementIns.spend) / subs)
                        let format_ads_pred = await formartMoney(spen_ads, elementIns.account_currency)
                        let country = elementIns.country
                        let sosanh = await soSanhMoney(spen_ads, element.currency)
                        if (sosanh) {
                            console.log("<o> 5$")
                            // kiểm tra live camps
                            if (element.account_status == 1) {
                                let accots = letMap.get(element.account_id)
                                let isLive = false
                                if (accots) {
                                    for (let indexOts = 0; indexOts < accots.length; indexOts++) {
                                        const elementOts = accots[indexOts];
                                        if (elementOts.delivery_info.status == 'action') {
                                            isLive = true
                                        }
                                    }
                                }
                                if (isLive) {
                                    dataSendTelegram = `\r\n${element.account_id} |${format_ads_pred}| ${element.account_status == 1 ? "live" : 'die'}`
                                }
                            }
                        }
                        if (country == "TH" || country == "Tất cả" || country == "unknown") {

                        } else {
                            LstCountry += country + ","
                            isDiffCountry = true
                        }
                        // console.log("elementIns", elementIns)
                    }
                    if (dataSendTelegram.length > 5) {
                        sendDataList.push(dataSendTelegram)
                    }
                    if (isDiffCountry) {
                        let dataSendTelegramDiff = `\r\n${element.account_id} >> ${element.account_status == 1 ? "live" : 'die'}`
                        sendDataListDiff.push(dataSendTelegramDiff)
                    }
                    await awaitSleep(1)
                }
            }
        }
        console.log('Send Done!')
        if (sendDataList.length > 0) {
            let dataSetFinish = sendDataList.join('\r\n');
            await sendDataMessage(setup.token_telegram, setup.room_id, `Giá ads >5$:\r\n${dataSetFinish}`)
            sendDataList = []
        }
        if (sendDataListDiff.length > 0) {
            let dataSetDiffFinish = sendDataListDiff.join('\r\n');
            await sendDataMessage(setup.token_telegram, setup.room_id, `Quốc gia lạ ( ngoài thái lan):\r\n${dataSetDiffFinish}`)
            sendDataListDiff = []
        }
        // scan campaigns
    }, 1000 * setup.timeout)
}
onMounted(() => {
    onSetup()
})
onUnmounted(() => {
    // clearInterval()
    LOADING_CAMP.value = false
})
</script>