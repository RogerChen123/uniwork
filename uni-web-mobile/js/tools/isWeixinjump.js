/**
 * Created by yilong on 2016/2/20.
 */
/*提示信息*/
//手机端判断各个平台浏览器及操作系统平台
function checkPlatform() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        location.href = "https://itunes.apple.com/cn/app/uni-help/id1080987410";//这是iOS平台下浏览器
    }
    if (/android/i.test(navigator.userAgent)) {
        if (!/MicroMessenger/i.test(navigator.userAgent)) {
            location.href = "http://simpulife.oss-cn-beijing.aliyuncs.com/uni2.1.2-release.apk";//这是Android平台下浏览器
        }
    }
//        if(/Linux/i.test(navigator.userAgent)){
//            document.write("This is Linux'browser.");//这是Linux平台下浏览器
//        }
//        if(/Linux/i.test(navigator.platform)) {
//            document.write("This is Linux operating system.");//这是Linux操作系统平台
//        }
}
$(document).ready(function () {
    // alert(navigator.platform);

    $("#ios").click(function () {
        if (isWeiXin()) {

            console.log("点击了ios按钮");
            showMask();
        }


    });
    $("#android").click(function () {

        if (isWeiXin()) {

            console.log("点击了android按钮");
            showMask();
        }
    });
    $("#mask").click(function () {
        if (isWeiXin()) {

            console.log("隐藏");
            hideMask();
        }

    });
    checkPlatform();
});
//显示遮罩层
function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();

}
//隐藏遮罩层
function hideMask() {

    $("#mask").hide();
}

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
