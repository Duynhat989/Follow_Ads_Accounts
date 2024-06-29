class AdsAccouunt {
    constructor(user_id, access_token) {
        this.user_id = user_id
        this.access_token = access_token
        this.list = []
    }
    async getList() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let response = await fetch(`https://graph.facebook.com/v15.0/me/adaccounts?fields=account_id,owner_business,name,disable_reason,account_status,currency,adspaymentcycle,account_currency_ratio_to_usd,adtrust_dsl,balance,all_payment_methods{pm_credit_card{display_string,exp_month,exp_year,is_verified}},created_time,next_bill_date,timezone_name,amount_spent,timezone_offset_hours_utc,insights.date_preset(maximum){spend},userpermissions{user,role},owner,is_prepay_account,spend_cap&summary=true&limit=100&access_token=${this.access_token}`, requestOptions);
        if (response.status === 200) {
            var data = await response.json();
            return data;
        } else {
            return null;
        }
    }
}
export default AdsAccouunt