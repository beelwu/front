class SocketTypeEnum {
    static HeartBeat = 0; //心跳
}
function findEnumNameByValue(value: number) {
    for (const key in SocketTypeEnum) {
        if ((SocketTypeEnum as any)[key] === value) {
            return key;
        }
    }
    return null;
}
export { SocketTypeEnum, findEnumNameByValue };
