export const soSanhMoney = async (money,currency) => {
    try {
        switch(currency){
            case "VND":{
                return money > 100000
            };break;
            case "USD":{
                return money > 5
            };break;
            default:{
                return true
            }
        }
    } catch (error) {
        return null;
    }
}