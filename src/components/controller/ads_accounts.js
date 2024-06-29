import { get_token_eaab, get_info_profile } from '../module/face'
export const startRunApp = async () => {

    try {
        let acept_token = localStorage.getItem('access_token') || ''
        if (acept_token) {
            let info_profile_1 = await get_info_profile(acept_token)
            if (info_profile_1.id) {
                localStorage.setItem('info_profile', JSON.stringify(info_profile_1))
                return true
            } else {
                let access_token = await get_token_eaab()
                if (access_token) {
                    localStorage.setItem('access_token', access_token)
                    let info_profile = await get_info_profile(access_token)
                    localStorage.setItem('info_profile', JSON.stringify(info_profile))
                    return true
                } else {
                    return false
                }
            }
        } else {
            let access_token = await get_token_eaab()
            if (access_token) {
                localStorage.setItem('access_token', access_token)
                let info_profile = await get_info_profile(access_token)
                localStorage.setItem('info_profile', JSON.stringify(info_profile))
                return true
            } else {
                return false
            }
        }
    } catch (error) {
        return false
    }
}
