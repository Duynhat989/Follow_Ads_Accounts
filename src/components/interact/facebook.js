//---hàm xử lý dữ liệu

console.log("Facebook Script Added OneWise")
let data_uploads = undefined
let access_token = ''
let marketplace_id = ''

let info = ""



const post = async (baseUrl, body, fb_api_req_friendly_name) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Origin", "https://www.facebook.com");
        myHeaders.append("Referer", "https://www.facebook.com/");
        myHeaders.append("Sec-Ch-Ua-Mobile", "?0");
        myHeaders.append("Sec-Ch-Ua-Platform", "\"Windows\"");
        myHeaders.append("Sec-Fetch-Mode", "cors");
        myHeaders.append("X-Fb-Friendly-Name", fb_api_req_friendly_name);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };
        var responsive = await fetch(baseUrl, requestOptions)
        var res = await responsive.json()
        return res
    } catch (error) {
        return null
    }
}
// get asdsedts post
export async function get_token_eaab() {
    try {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        var response = await fetch(
            "https://www.facebook.com/dialog/oauth?scope=user_about_me,pages_read_engagement,user_actions.books,user_actions.fitness,user_actions.music,user_actions.news,user_actions.video,user_activities,user_birthday,user_education_history,user_events,user_friends,user_games_activity,user_groups,user_hometown,user_interests,user_likes,user_location,user_managed_groups,user_photos,user_posts,user_relationship_details,user_relationships,user_religion_politics,user_status,user_tagged_places,user_videos,user_website,user_work_history,email,manage_notifications,manage_pages,publish_actions,publish_pages,read_friendlists,read_insights,read_page_mailboxes,read_stream,rsvp_event,read_mailbox&response_type=token&client_id=124024574287414&redirect_uri=fb124024574287414://authorize/&sso_key=com&display=&fbclid=IwAR1KPwp2DVh2Cu7KdeANz-dRC_wYNjjHk5nR5F-BzGGj7-gTnKimAmeg08k",
            requestOptions
        );
        if (response.status === 200) {
            var data = await response.text();
            var jazoest = get_value_with_name(
                data,
                /name=\\"jazoest\\"\s+value=\\"(.*?)\\"/
            );
            var fb_dtsg = get_value_with_name(
                data,
                /name=\\"fb_dtsg\\"\s+value=\\"(.*?)\\"/
            );
            var scope = get_value_with_name(
                data,
                /name=\\"scope\\"\s+value=\\"(.*?)\\"/
            );
            var encrypted_post_body = get_value_with_name(
                data,
                /name=\\"encrypted_post_body\\"\s+value=\\"(.*?)\\"/
            );
            var fb_token = await split_token_eaab(
                scope,
                fb_dtsg,
                encrypted_post_body
            );
            return fb_token;
        } else {
            return "false";
        }
    } catch (error) {
        return "error";
    }
}
const get_value_with_name = (string, scopeRegex) => {
    const scopeMatch = string.match(scopeRegex);
    return scopeMatch?.[1];
};
async function split_token_eaab(scope, fb_dtsg, encrypted_post_body) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Sec-Fetch-Site", "same-origin");
        myHeaders.append("Upgrade-Insecure-Requests", "1");
        var formdata = new FormData();
        formdata.append("fb_dtsg", fb_dtsg);
        formdata.append("from_post", "1");
        formdata.append("__CONFIRM__", "1");
        formdata.append("scope", scope);
        formdata.append("display", "page");
        formdata.append("sso_device", "ios");
        formdata.append("encrypted_post_body", encrypted_post_body);
        formdata.append("return_format[]", "access_token");
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };
        let response = await fetch(
            "https://www.facebook.com/v1.0/dialog/oauth/skip/submit/",
            requestOptions
        );
        if (response.status === 200) {
            var data = await response.text();
            var act_id = "EAA" + data.match("EAA(.*?)&")[1];
            return act_id;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
export const grapMaketplace = async () => {
    try {
        var fb_api_req_friendly_name = "CometMarketplaceComposerCreateComponentQuery"
        var doc_id = "6529525220503122"
        const urlencoded = new URLSearchParams();
        urlencoded.append("av", require(["CurrentUserInitialData"]).USER_ID);
        urlencoded.append("__user", require(["CurrentUserInitialData"]).USER_ID);
        urlencoded.append("__a", "1");
        urlencoded.append("__aaid", "0");
        urlencoded.append("__hs", require(["SiteData"]).haste_session);
        urlencoded.append("__hsi", require(["SiteData"]).hsi);
        urlencoded.append("fb_dtsg", require(["DTSGInitData"]).token);
        urlencoded.append("jazoest", require(["SprinkleConfig"]).jazoest);
        urlencoded.append("__spin_r", require(["SiteData"]).__spin_r);
        urlencoded.append("__spin_b", require(["SiteData"]).__spin_b);
        urlencoded.append("__spin_t", require(["SiteData"]).__spin_t);
        urlencoded.append("fb_api_caller_class", "RelayModern");
        urlencoded.append("fb_api_req_friendly_name", fb_api_req_friendly_name);
        urlencoded.append("variables", "{}");
        urlencoded.append("server_timestamps", "true");
        urlencoded.append("doc_id", doc_id);
        var res = await post("https://www.facebook.com/api/graphql/", urlencoded, fb_api_req_friendly_name)
        return res
    } catch (error) {
        console.log('marketplace_id')
        return null
    }

}
export const getMarketplace = async () => {
    var maketComposer = await grapMaketplace()
    if (maketComposer) {
        try { marketplace_id = maketComposer.data.viewer.marketplace_settings.current_marketplace.id } catch (error) { }
    }
    console.log(marketplace_id)
}
export const attributeChildren = async (categoryID) => {
    var fb_api_req_friendly_name = "useMarketplaceComposerAttributesQuery"
    var doc_id = "8781155251926028"
    const urlencoded = new URLSearchParams();
    urlencoded.append("av", require(["CurrentUserInitialData"]).USER_ID);
    urlencoded.append("__user", require(["CurrentUserInitialData"]).USER_ID);
    urlencoded.append("__a", "1");
    urlencoded.append("__aaid", "0");
    urlencoded.append("__hs", require(["SiteData"]).haste_session);
    urlencoded.append("__hsi", require(["SiteData"]).hsi);
    urlencoded.append("fb_dtsg", require(["DTSGInitData"]).token);
    urlencoded.append("jazoest", require(["SprinkleConfig"]).jazoest);
    urlencoded.append("__spin_r", require(["SiteData"]).__spin_r);
    urlencoded.append("__spin_b", require(["SiteData"]).__spin_b);
    urlencoded.append("__spin_t", require(["SiteData"]).__spin_t);
    urlencoded.append("fb_api_caller_class", "RelayModern");
    urlencoded.append("fb_api_req_friendly_name", fb_api_req_friendly_name);
    urlencoded.append("variables", `{\"categoryID\":\"${categoryID}\"}`);
    urlencoded.append("server_timestamps", "true");
    urlencoded.append("doc_id", doc_id);
    var res = await post("https://www.facebook.com/api/graphql/", urlencoded, fb_api_req_friendly_name)
    return res
}
export const findCity = async (citySelect) => {
    var fb_api_req_friendly_name = "MarketplaceSearchAddressDataSourceQuery"
    var doc_id = "7321914954515895"
    const urlencoded = new URLSearchParams();
    urlencoded.append("av", require(["CurrentUserInitialData"]).USER_ID);
    urlencoded.append("__user", require(["CurrentUserInitialData"]).USER_ID);
    urlencoded.append("__a", "1");
    urlencoded.append("__aaid", "0");
    urlencoded.append("__hs", require(["SiteData"]).haste_session);
    urlencoded.append("__hsi", require(["SiteData"]).hsi);
    urlencoded.append("fb_dtsg", require(["DTSGInitData"]).token);
    urlencoded.append("jazoest", require(["SprinkleConfig"]).jazoest);
    urlencoded.append("__spin_r", require(["SiteData"]).__spin_r);
    urlencoded.append("__spin_b", require(["SiteData"]).__spin_b);
    urlencoded.append("__spin_t", require(["SiteData"]).__spin_t);
    urlencoded.append("fb_api_caller_class", "RelayModern");
    urlencoded.append("fb_api_req_friendly_name", fb_api_req_friendly_name);
    urlencoded.append("variables", JSON.stringify(
        {
            "params": {
                "caller": "MARKETPLACE",
                "country_filter": null,
                "integration_strategy": "STRING_MATCH",
                "page_category": [
                    "CITY",
                    "SUBCITY",
                    "NEIGHBORHOOD",
                    "POSTAL_CODE"
                ],
                "query": citySelect,
                "search_type": "PLACE_TYPEAHEAD"
            }
        }
    ));
    urlencoded.append("server_timestamps", "true");
    urlencoded.append("doc_id", doc_id);
    var res = await post("https://www.facebook.com/api/graphql/", urlencoded, fb_api_req_friendly_name)
    return res
}
export const selectCity = async (latitude, longitude) => {
    var fb_api_req_friendly_name = "MarketplaceSetSellLocationMutation"
    var doc_id = "5240917195985795"
    const urlencoded = new URLSearchParams();
    urlencoded.append("av", require(["CurrentUserInitialData"]).USER_ID);
    urlencoded.append("__user", require(["CurrentUserInitialData"]).USER_ID);
    urlencoded.append("__a", "1");
    urlencoded.append("__aaid", "0");
    urlencoded.append("__hs", require(["SiteData"]).haste_session);
    urlencoded.append("__hsi", require(["SiteData"]).hsi);
    urlencoded.append("fb_dtsg", require(["DTSGInitData"]).token);
    urlencoded.append("jazoest", require(["SprinkleConfig"]).jazoest);
    urlencoded.append("__spin_r", require(["SiteData"]).__spin_r);
    urlencoded.append("__spin_b", require(["SiteData"]).__spin_b);
    urlencoded.append("__spin_t", require(["SiteData"]).__spin_t);
    urlencoded.append("fb_api_caller_class", "RelayModern");
    urlencoded.append("fb_api_req_friendly_name", fb_api_req_friendly_name);
    urlencoded.append("variables", JSON.stringify(
        {
            "input": {
                "latitude": latitude,
                "longitude": longitude,
                "actor_id": require(["CurrentUserInitialData"]).USER_ID,
                "client_mutation_id": "3"
            }
        }
    ));
    urlencoded.append("server_timestamps", "true");
    urlencoded.append("doc_id", doc_id);
    var res = await post("https://www.facebook.com/api/graphql/", urlencoded, fb_api_req_friendly_name)
    return res
}
export const uploadPhotos = async (urlImage, access_token) => {
    try {
        var user_id = require(["CurrentUserInitialData"]).USER_ID
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("message", "ima");
        formdata.append("access_token", access_token);
        formdata.append("url", urlImage);
        formdata.append("published", "false");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        try {
            var res = await fetch(`https://graph.facebook.com/${user_id}/photos`, requestOptions)
            return await res.json()
        } catch (error) {
            return null
        }
    } catch (error) {
        return null
    }

}
export const prepareBodyItem = (actor_id, category_id, title, description, price, availability, tags, images, latitude, longitude, HIDDEN_FROM_FRIENDS) => {
    // HIDDEN_FROM_FRIENDS hoặc 
    var variables = {
        "input": {
            "client_mutation_id": "2",
            "actor_id": actor_id,
            "audience": {
                "marketplace": {
                    "marketplace_id": marketplace_id
                }
            },
            "data": {
                "common": {
                    "attribute_data_json": JSON.stringify(availability),
                    "category_id": category_id,
                    "commerce_shipping_carrier": null,
                    "commerce_shipping_carriers": [],
                    "comparable_price": "null",
                    "cost_per_additional_item": null,
                    "delivery_types": ["IN_PERSON"],
                    "description": {
                        "text": description
                    },
                    "draft_type": null,
                    "hidden_from_friends_visibility": HIDDEN_FROM_FRIENDS,
                    "is_personalization_required": null,
                    "is_preview": false,
                    "item_price": {
                        "currency": "USD",
                        "price": price
                    },
                    "latitude": latitude,
                    "listing_email_id": null,
                    "longitude": longitude,
                    "min_acceptable_checkout_offer_price": "null",
                    "personalization_info": null,
                    "product_hashtag_names": tags,
                    "quantity": -1,
                    "shipping_calculation_logic_version": null,
                    "shipping_cost_option": "BUYER_PAID_SHIPPING",
                    "shipping_cost_range_lower_cost": null,
                    "shipping_cost_range_upper_cost": null,
                    "shipping_label_price": "0",
                    "shipping_label_rate_code": null,
                    "shipping_label_rate_type": null,
                    "shipping_offered": false,
                    "shipping_options_data": [],
                    "shipping_package_weight": null,
                    "shipping_price": "null",
                    "shipping_service_type": null,
                    "sku": "gh43tvcb345tdbv",
                    "source_type": "composer_listing_type_selector",
                    "suggested_hashtag_names": [],
                    "surface": "composer",
                    "title": title,
                    "variants": [],
                    "video_ids": [],
                    "xpost_target_ids": [],
                    "photo_ids": images
                }
            }
        }
    }
    return variables
}
const prepareBodyCar = (actor_id, category_id, title, description, price, photo_ids, availability, locations) => {
    var variables = {
        "input": {
            "client_mutation_id": "1",
            "actor_id": actor_id,
            "audience": {
                "marketplace": {
                    "marketplace_id": marketplace_id
                }
            },
            "data": {
                "common": {
                    "category_id": category_id,
                    "description": {
                        "text": description
                    },
                    "draft_type": null,
                    "item_price": {
                        "price": price
                    },
                    "latitude": locations.latitude,
                    "listing_email_id": null,
                    "longitude": locations.longitude,
                    "serialized_verticals_data": availability,
                    "source_type": "composer_listing_type_selector",
                    "title": title,
                    "video_ids": [],
                    "xpost_target_ids": [],
                    "photo_ids": photo_ids
                }
            }
        }
    }
    return variables
}
const prepareBodyHouse = (actor_id, category_id, title, description, price, photo_ids, availability, locations) => {
    var variables = {
        "input": {
            "client_mutation_id": "2",
            "actor_id": actor_id,
            "audience": {
                "marketplace": {
                    "marketplace_id": marketplace_id
                }
            },
            "data": {
                "common": {
                    "category_id": category_id,
                    "description": {
                        "text": description
                    },
                    "draft_type": null,
                    "item_price": {
                        "price": price
                    },
                    "latitude": latitude,
                    "listing_email_id": null,
                    "longitude": longitude,
                    "serialized_verticals_data": availability,
                    "source_type": "composer_listing_type_selector",
                    "title": title,
                    "video_ids": [],
                    "xpost_target_ids": [],
                    "photo_ids": photo_ids
                }
            }
        }
    }
    return variables
}

export const loadFirst = async (newUpload = false) => {
    if (newUpload) {
        access_token = await get_token_eaab()
        const now = new Date();
        const timestamp = now.getTime();
        localStorage.setItem('data_uploads', JSON.stringify({
            access_token,
            timestamp
        }))
    } else {
        data_uploads = JSON.parse(localStorage.getItem('data_uploads')) || undefined
        if (data_uploads == undefined) {
            access_token = await get_token_eaab()
            const now = new Date();
            const timestamp = now.getTime();
            localStorage.setItem('data_uploads', JSON.stringify({
                access_token,
                timestamp
            }))
        } else {
            try {
                const now = new Date();
                const timestamp = now.getTime();
                const oldTimestamp = data_uploads.timestamp
                const timeDifference = newTimestamp - oldTimestamp;
                const minutesDifference = Math.floor(timeDifference / (1000 * 60));
                if (minutesDifference > 5) {
                    access_token = await get_token_eaab()
                    const now = new Date();
                    const timestamp = now.getTime();
                    localStorage.setItem('data_uploads', JSON.stringify({
                        access_token,
                        timestamp
                    }))
                }

            } catch (error) {
                access_token = await get_token_eaab()
                const now = new Date();
                const timestamp = now.getTime();
                localStorage.setItem('data_uploads', JSON.stringify({
                    access_token,
                    timestamp
                }))
            }
        }
    }

}
loadFirst()
getMarketplace()
export const uploadImgs = async (links) => {
    var link = links.split(',')
    var randay = []
    try {
        for (let index = 0; index < link.length; index++) {
            const element_link = link[index];
            var res = await uploadPhotos(element_link, access_token)
            if (res != null) {
                randay.push(res.id)
            }
        }
    } catch (error) {

    }
    return randay
}
export const uploadPostNow = async (pos) => {
    var fb_api_req_friendly_name = "useCometMarketplaceListingCreateMutation"
    var doc_id = "5033081016747999"
    var variables = prepareBodyItem(
        require(["CurrentUserInitialData"]).USER_ID,
        pos.category_id,
        pos.name,
        pos.discription,
        pos.price,
        pos.availability,
        pos.tags,
        pos.imgs,
        pos.latitude,
        pos.longitude,
        'HIDDEN_FROM_FRIENDS'
    )
    try {
        const urlencoded = new URLSearchParams();
        urlencoded.append("av", require(["CurrentUserInitialData"]).USER_ID);
        urlencoded.append("__user", require(["CurrentUserInitialData"]).USER_ID);
        urlencoded.append("__a", "1");
        urlencoded.append("__aaid", "0");
        urlencoded.append("__hs", require(["SiteData"]).haste_session);
        urlencoded.append("__hsi", require(["SiteData"]).hsi);
        urlencoded.append("fb_dtsg", require(["DTSGInitData"]).token);
        urlencoded.append("jazoest", require(["SprinkleConfig"]).jazoest);
        urlencoded.append("__spin_r", require(["SiteData"]).__spin_r);
        urlencoded.append("__spin_b", require(["SiteData"]).__spin_b);
        urlencoded.append("__spin_t", require(["SiteData"]).__spin_t);
        urlencoded.append("fb_api_caller_class", "RelayModern");
        urlencoded.append("fb_api_req_friendly_name", fb_api_req_friendly_name);
        urlencoded.append("variables", JSON.stringify(variables));
        urlencoded.append("server_timestamps", "true");
        urlencoded.append("doc_id", doc_id);
        var res = await post("https://www.facebook.com/api/graphql/", urlencoded, fb_api_req_friendly_name)
        return res
    } catch (error) {
        console.log(error)
    }
}
export const uploadPost = async (post) => {
    // Kiểm tra hình ảnh
    if (post.imgs != null) {
        var res = await uploadPostNow(post)
        if (res) {
            sendMessageToBack({
                active: 'upload_reply',
                success: true,
                data: res,
                msg: 'Upload post success'
            })
        } else {
            sendMessageToBack({
                active: 'upload_reply',
                success: false,
                msg: 'Upload false'
            })
        }
    } else {
        sendMessageToBack({
            success: false,
            msg: 'Min 1 images'
        })
    }
}
//danh sách chức năng


export const exportUpload = async (post) => {
    var arys = await uploadImgs(post[1])

    var newPost = {
        name: post[0],
        imgs: arys,
        discription: post[2],
        sku: post[3],
        tags: post[4].split(','),
        price: post[5],
        category_id: post[6],
        availability: JSON.parse(post[7]),
        latitude: post[8],
        longitude: post[9],
    }
    sendMessageToBack({
        active: 'upload_reply',
        msg: 'Proccessing',
        data: post
    })
    await uploadPost(newPost)
}
export const exportSelectChrilden = async (user_id) => {
    var res = await attributeChildren(user_id)
    sendMessageToBack({
        active: 'select_children_reply',
        data: res
    })
}
export const exportFindcity = async (dataFind) => {
    console.log(data)
    var dataFind = data.dataFind
    console.log(dataFind)
    var res = await findCity(dataFind)
    sendMessageToBack({
        active: 'findcity_reply',
        data: res
    })
}
export const exportSelectCity = async (data) => {
    var latitude = data.latitude
    var longitude = data.longitude
    var res = await selectCity(latitude, longitude)
    sendMessageToBack({
        active: 'selectcity_reply',
        data: res
    })
}