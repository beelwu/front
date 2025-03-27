export const convertObjectToQuery = (obj: T) => {
    const params = Object.entries(obj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    return `?${params}`;
};
export const getImageUrl = (file: string) => {
    return new URL(`../assets/img/${file}`, import.meta.url).href;
}
/**
 * 数字千位符格式化
 * eg:
 * 17267737 -> 17,267,737
 */
export const priceFormat = (num: number | string, float?: number) => {
    if (float === undefined) float = 2
    if (float === 0) {
        return Math.floor(Number(num)).toLocaleString();
    } else if (float && Number(num)) {
        const numStr = _toFixed(num, float);
        const numPre = numStr.slice(0, numStr.indexOf('.'));
        const numRi = numStr.slice(numStr.indexOf('.') + 1);
        const intStr = numPre.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        const floatStr = numRi ? `.${numRi}` : '';
        return `${intStr}${floatStr}`;
    } else {
        return '0.00';
    }
}
export const _toFixed = (num: any, decimal: number) => {
    num = num.toString();
    let index = num.indexOf('.');
    if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
    } else {
        num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal)
}
// 日期时间格式化
export const dateFormat = (date: string | number | Date, format?: string) => {
    if (!date) return '';

    // 如果 date 是以秒为单位的时间戳，则转换为毫秒
    if (typeof date === 'number' && date.toString().length === 10) {
        date *= 1000; // 转换为毫秒
    }

    const _date = new Date(date);
    let _format = format || 'yyyy-MM-dd hh:mm:ss';
    const o: any = {
        "M+": _date.getMonth() + 1, // month
        "d+": _date.getDate(), // day
        "h+": _date.getHours(), // hour
        "m+": _date.getMinutes(), // minute
        "s+": _date.getSeconds(), // second
        "q+": Math.floor((_date.getMonth() + 3) / 3), // quarter
        "S": _date.getMilliseconds() // millisecond
    };

    if (/(y+)/.test(_format)) {
        _format = _format.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp("(" + k + ")").test(_format)) {
            _format = _format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

    return _format;
};
export const formatDate = (arr)=> {
    if (!Array.isArray(arr) || arr.length !== 3) {
        throw new Error('输入必须是一个包含年、月、日的数组');
    }

    const [year, month, day] = arr;

    // 将月份和日期转换为两位数
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');

    // 返回格式化后的日期字符串
    return `${year}-${formattedMonth}-${formattedDay}`;
}
// 设备判断
export const isMobile = () => {
    let regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
    let u = navigator.userAgent;
    if (null == u) {
        return true;
    }
    let result = regex_match.exec(u);
    return null != result;
}

export class createWebSocket {
}
