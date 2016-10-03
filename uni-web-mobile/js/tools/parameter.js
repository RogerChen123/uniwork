/**
 * Created by yilong on 2016/2/20.
 *
 *全局变量文件
 */

var debug = false;
if (debug) {
/*
    var url2 = "http://123.56.178.246/uni2.0/qrpage.html?reply=2333&timestamp=1458702367267&sign=eac634f47167dd41d8614c5a9357fa7de9640742&member=12&auth=384&ticket=gQG78DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3owU05fYm5seDZfX2RPenFVMnI2AAIEwvbiVgMEgDoJAA==";
*/
    var url2="&member=12&auth=384&ticket=gQG78DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3owU05fYm5seDZfX2RPenFVMnI2AAIEwvbiVgMEgDoJAA==&reply=2346&timestamp=1458722323109&sign=5034bf6d1454bc8a4c538088ee73345b288182d0";
    var timestamp = $.urlParam1('timestamp', url2);
    var ticket = $.urlParam1('ticket', url2);
    var auth = $.urlParam1('auth', url2);
    var sign = $.urlParam1('sign', url2);
    var member = $.urlParam1('member', url2);
    var replyId = $.urlParam1('reply', url2);
  /*  var linkId = $.urlParam1('link', url2);*/
    var uid = 7;
    var lastId = -1;
    var num = 30;
    var sessionToken = "6c15c731043327385f3e3643caa3358720d9f019";
    var url = "http://123.56.178.246/uni2.0/cgi-bin/app-response";
    /*var url = "http://tangshuangshawn.vicp.net/cgi-bin/app-response";*/
} else {
    var timestamp = $.urlParam('timestamp');
    var ticket = $.urlParam('ticket');
    var auth = $.urlParam('auth');
    var sign = $.urlParam('sign');
    var member = $.urlParam('member');
    var replyId = $.urlParam('reply');
    var linkId = $.urlParam('link');
    var uid = $.urlParam('uid');
    var sessionToken = $.urlParam('sessionToken');
    var lastId = -1;
    var num = 30;
    var url = "http://123.56.178.246/uni2.0/cgi-bin/app-response";

}





