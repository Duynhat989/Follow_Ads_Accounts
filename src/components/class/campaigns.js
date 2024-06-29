class Campaigns {
    constructor(user_id, access_token) {
        this.user_id = user_id
        this.access_token = access_token
        this.list = []
    }
    async getList(act_id) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let response = await fetch(`https://graph.facebook.com/v15.0/act_${act_id}/campaigns?fields=id,status,name,daily_budget,account_id,lifetime_budget,budget_remaining,created_time&date_preset=maximum&access_token=${this.access_token}`, requestOptions);
        if (response.status === 200) {
            var data = await response.json();
            return data;
        } else {
            return null;
        }
    }
    async insights(campaign_id) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let response = await fetch(`https://graph.facebook.com/v16.0/${campaign_id}/insights?fields=account_id,campaign_id,impressions,ctr,cpc,cpm,spend,account_currency,clicks,conversions,reach,converted_product_quantity,date_start,date_stop&date_preset=maximum&breakdown=publisher_platform&access_token=${this.access_token}`, requestOptions);
        if (response.status === 200) {
            var data = await response.json();
            return data;
        } else {
            return null;
        }
    }
}
export default Campaigns