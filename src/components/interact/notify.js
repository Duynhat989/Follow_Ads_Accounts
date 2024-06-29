
export const notify = async (type,text,time = 3) => {
    window.postMessage(JSON.stringify({
        type: 'notify',
        data: {
            text: text,
            type: type, //success error wait
            time: time,
        }
    }))
}
export const showPopup = async (idProfile) => {
    window.postMessage(JSON.stringify({
        type: 'profile',
        data: {
            type: 'create', //success error wait
            id: idProfile,
        }
    }))
}
export const newScript = async () => {
    window.postMessage(JSON.stringify({
        type: 'script',
        data: {
            type: 'create', //success error wait
        }
    }))
}