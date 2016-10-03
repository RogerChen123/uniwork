/*$.urlParam = function(name){
 var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
 return results[1] || 0;
 }
 */

$.urlParam1 = function (name, url) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    return results[1] || 0;
}

$.urlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return decodeURIComponent(r[2]);
    return null;
}



