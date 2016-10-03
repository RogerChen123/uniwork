/**
 * Created by yilong on 2016/2/20.
 */
function loadNotifyPage() {
    var action = "loadNotifyPage";
    $.ajax(
        {
            type: 'post',
            url: url,
            dataType: "json",
            data: {
                action: action,
                timestamp: timestamp,
                sign: sign,
                replyId: replyId,

            },
            success: function (data) {
                console.log(data);
                var title = data.title;
                var groupName = data.groupName;
                var initiatorName = data.initiatorName;
                var createDate = data.createDate;
                var detail = data.detail;
                var status = data.status;
                var errorId = data.errorId;
                var res = data.res;
                var cause = data.cause;
                $("#title").text(title);
                $("#groupName").text(groupName);
                $("#initiatorName").text(initiatorName);
                $("#createDate").text(createDate);

                //判断获取的字符串是否为url？
                var urlReg = new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/);
                str = detail.replace(urlReg, function (a) {
                    return "<span><a class='blue_a' href=" + a + ">" + a + "</a></span>";
                });
                //alert(str);
                var flag = !!detail.match(urlReg);
                //alert(flag);
                if (flag == true) {

                    $("#detail").html(str);

                } else {

                    $("#detail").text(detail);

                }
                handleError(errorId, cause);
                if (status == "Aware") {
                    var str = "已阅读此消息";
                    tips(str);
                    $("#notifyConfirm").text(str).attr({"disabled": "disabled"});

                }
                if (status == "Unaware") {
                    var str = "我已知晓";

                    $("#notifyConfirm").text(str).removeAttr("disabled");

                }
                if (res == "success") {
                    var str = "已阅读此消息";
                    tips("已阅读此消息！");
                    $("#notifyConfirm").text(str).attr({"disabled": "disabled"});
                }
                if (errorId == 308) {
                    $("#notifyConfirm").attr({"disabled": "disabled"});
                }

            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );

}
loadNotifyPage();
$("#notifyConfirm").click(function () {
    var action = "notifyConfirm";
    $.ajax(
        {
            type: 'post',
            url: url,
            dataType: "json",
            data: {
                action: action,
                timestamp: timestamp,
                sign: sign,
                replyId: replyId,

            },
            success: function (data) {
                console.log(data);
                var errorId = data.errorId;
                var cause = data.cause;
                var res = data.res;
                handleError(errorId, cause);
                if (errorId == 308) {
                    $("#notifyConfirm").attr({"disabled": "disabled"});
                }
                if (errorId == 309) {
                    var str = "已阅读此消息";
                    $("#notifyConfirm").text(str).attr({"disabled": "disabled"});
                }
                if (res == "success") {
                    var str = "已阅读此消息";
                    tips("已阅读此消息！");
                    $("#notifyConfirm").text(str).attr({"disabled": "disabled"});
                }


            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );
});