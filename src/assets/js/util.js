// eslint-disable-next-line no-unused-vars
export function changeDateFrom(date){
    const myDate = new Date(date)
    const year = myDate.getFullYear();
    const month = myDate.getMonth()+1;
    const day = myDate.getDate();
    const h = myDate.getHours()
    const m = myDate.getMinutes()
    const s = myDate.getSeconds()
    return year+"年"+month+"月"+day+"日"+' '+h+"时"+m+"分"+s+"秒"
}
export function changeDateYMD(date) {
    const myDate = new Date(date)
    const year = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();
    return year + "年" + month + "月" + day + "日"
}

export function changeFRTime(mss) {
    const hours = parseInt(mss / (1000 * 60 * 60) + '')
    const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60) + '')
    const seconds = parseInt((mss % (1000 * 60)) / 1000 + '')
    const ms = parseInt((mss % 1000 + ''))
    return hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 " + ms + '毫秒';
}
