export const getCurrentDateTimeInTimezone =async () => {
    let offset = 7
    const now = new Date();
    
    // Lấy thời gian UTC
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    
    // Tính thời gian theo múi giờ +7
    const localTime = new Date(utc + (3600000 * offset));
    
    // Định dạng thời gian
    const year = localTime.getFullYear();
    const month = String(localTime.getMonth() + 1).padStart(2, '0');
    const day = String(localTime.getDate()).padStart(2, '0');
    const hour = String(localTime.getHours()).padStart(2, '0');
    const minute = String(localTime.getMinutes()).padStart(2, '0');
    const second = String(localTime.getSeconds()).padStart(2, '0');
    
    return `${hour}:${minute}:${second} ${day}-${month}-${year}`;
};
export const getCurrentDateTimeInTimezoneDay =async () => {
    let offset = 7
    const now = new Date();
    
    // Lấy thời gian UTC
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    
    // Tính thời gian theo múi giờ +7
    const localTime = new Date(utc + (3600000 * offset));
    
    // Định dạng thời gian
    const year = localTime.getFullYear();
    const month = String(localTime.getMonth() + 1).padStart(2, '0');
    const day = String(localTime.getDate()).padStart(2, '0');    
    return `${year}-${month}-${day}`;
};
