import classList from "./classList";
class AdsAccouunt {
    constructor(user_id, access_token) {
        this.user_id = user_id
        this.access_token = access_token
        this.list = []
    }
    async getList() {
        try {
            var lst  = new classList(this.access_token)
            return await lst.getListCampaigns()
        } catch (error) {
            return null;
        }
    }
    async getList_Local(start_date,end_date) {
        try {
            var lst  = new classList(this.access_token)
            return await lst.getListLocal(start_date,end_date)
        } catch (error) {
            return null;
        }
    }
    async getListCampaigns() {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            let response = await fetch(`https://graph.facebook.com/v15.0/me/adaccounts?fields=account_id,name,account_status,campaigns{delivery_info}&summary=true&limit=10000&access_token=${this.access_token}`, requestOptions);
            if (response.status === 200) {
                var data = await response.json();
                return data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
    async getInsights(act_id,start_date,end_date) {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            let urlDone = `https://graph.facebook.com/v16.0/act_${act_id}/insights?breakdowns=country&cost_per_conversion=subscribe_total&time_range={"since":"${start_date}","until":"${end_date}"}&fields=account_id,campaign_id,impressions,ctr,cpc,cpm,spend,account_currency,clicks,conversions,reach,converted_product_quantity,date_start,date_stop&date_preset=maximum&breakdown=publisher_platform&access_token=${this.access_token}`
            let response = await fetch(urlDone, requestOptions);
            if (response.status === 200) {
                var data = await response.json();
                return data;
            } else {
                return {
                    data:[]
                };
            }
        } catch (error) {
            return {
                data:[]
            };
        }
    }
}
export default AdsAccouunt