import { pinia } from '../store/index' // 👈 这里引入统一的 pinia 实例
import { lotteryStore } from '../store/item'

const store = lotteryStore(pinia) // ✅ 显式传入全局实例

let url = "wss://web.czbcw.com/api/v1/websocket";  //请求的后端地址
//
// let url = "wss://web.czbcw.com/api/v1/websocket?gameld=1&wsId=lizKIcpwbtMTbUWn8RpT"
// let url = "wss://web.czbcw.com/api/v1/websocket"
let websocket = null;//全局WebSocket对象
let lockReconnect = false; // 网络断开重连
let wsCreateHandler = null; // 创建连接
export function createWebSocket(gameId,wsId){
    try{
        if ('WebSocket' in window) {
            websocket = new WebSocket(url + '?gameId=' + gameId + '&wsId=' + wsId);
        } else if ('MozWebSocket' in window) {
            websocket = new MozWebSocket(url);
        } else {
            websocket = new SockJS(url);
        }
    }catch {
        reconnect()
        return;
    }

    websocket.onopen = function(event) {
        // websocket.send("连接成功");
        console.log("服务已连接")
    };
    websocket.onmessage = function(event){
        const data = JSON.parse(event.data)
        store.setPrizeList(data)
        console.log( data,"接收到的数据")
    };
    websocket.onclose = function(event) {
        console.log("服务连接关闭")
    };
    websocket.onerror = function(event) {
        console.log(event,"连接出错")
    };
}
/**
 *  异常处理
 * 处理可以检测到的异常，并尝试重新连接
 */
function reconnect() {
    if (lockReconnect) {
        return;
    }
    lockReconnect = true;
    // 没链接上会一直连接，设置延迟，避免过多请求
    wsCreateHandler && clearTimeout(wsCreateHandler);
    wsCreateHandler = setTimeout(function() {
        console.log("-----websoket异常-------");
        createWebSocket();
        lockReconnect = false;
    }, 1000);
}
export function websocketClose() {
    console.log('执行了关闭')
    websocket.close();    //手动关闭websocket
}
