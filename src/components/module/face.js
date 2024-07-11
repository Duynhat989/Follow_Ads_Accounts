export const get_token_eaab = async () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let response = await fetch("https://facebook.com/adsmanager/", requestOptions);
    if (response.status === 200) {
        var data = await response.text();
        var urlMatch = data.match(/window\.location\.replace\("([^"]+)"\)/);
        var url = urlMatch ? urlMatch[1] : null;
        url = url.replace(/\\\//g, '/');
        var fb_token = await split_token_eaab(url);
        return fb_token;
    } else {
        return null;
    }
}
export const get_info_profile = async (access_token) => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let response = await fetch(`https://graph.facebook.com/v14.0/me/?access_token=${access_token}`, requestOptions);
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
async function split_token_eaab(url) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let response = await fetch(`${url}`, requestOptions);
    if (response.status === 200) {
        var data = await response.text();
        var act_id = "EAA" + data.match("EAA(.*?)\"")[1];
        return act_id.split('&')[0];
    } else {
        return null;
    }
}