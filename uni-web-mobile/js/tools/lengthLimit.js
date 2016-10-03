// 获取字符串的字节长度
function len(s) {
    s = String(s);
    return s.length + (s.match(/[^\x00-\xff]/g) || "").length;// 加上匹配到的全角字符长度
}
function limit(obj, limit) {
    var val = obj.value;
    if (len(val) > limit) {
        val = val.substring(0, limit);
        while (len(val) > limit) {
            val = val.substring(0, val.length - 1);
        }
        obj.value = val;
    }
}
$("#reasonContent").keyup(function () {
    limit(this, 100);//100字节内,50个汉字
});
