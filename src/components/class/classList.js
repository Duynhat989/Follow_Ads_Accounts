class classList {
    constructor(access_token) {
        this.access_token = access_token
        this.list = []
    }
    async getList(url) {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            let response = await fetch(url, requestOptions);
            if (response.status === 200) {
                var camps = await response.json();
                let dataLstCamps = camps.data
                for (let index = 0; index < dataLstCamps.length; index++) {
                    const element = dataLstCamps[index];
                    this.list.push(element)
                }
                return camps.paging.next ? camps.paging.next : '';
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
    async getList_Local() {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            let response = await fetch(`https://graph.facebook.com/v15.0/me/adaccounts?fields=account_id,name,account_status&summary=true&limit=300&access_token=${this.access_token}`, requestOptions);
            if (response.status === 200) {
                var camps = await response.json();
                let dataLstCamps = camps.data
                for (let index = 0; index < dataLstCamps.length; index++) {
                    const element = dataLstCamps[index];
                    this.list.push(element)
                }
                return camps.paging.next ? camps.paging.next : '';
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
    async getListCampaigns() {
        try {
            this.list = []
            let url = await this.getList_Local()
            while(url.length > 10){
                url = await this.getList(url)
            }
            return {
                data:this.list
            }
        } catch (error) {
            return null;
        }
    }
    async getList_Local_2(start_date,end_date) {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            let response = await fetch(`https://graph.facebook.com/v15.0/me/adaccounts?fields=account_id,name,account_status,currency,created_time,insights.time_range({"since":"${start_date}","until":"${end_date}"}){spend}&summary=true&limit=300&access_token=${this.access_token}`, requestOptions);
            if (response.status === 200) {
                var camps = await response.json();
                let dataLstCamps = camps.data
                for (let index = 0; index < dataLstCamps.length; index++) {
                    const element = dataLstCamps[index];
                    this.list.push(element)
                }
                return camps.paging.next ? camps.paging.next : '';
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
    async getListLocal(start_date,end_date) {
        try {
            this.list = []
            let url = await this.getList_Local_2(start_date,end_date)
            while(url.length > 10){
                url = await this.getList(url)
            }
            return {
                data:this.list
            }
        } catch (error) {
            return null;
        }
    }
}
export default classList