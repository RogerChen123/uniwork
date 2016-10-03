/**
 * Created by yilong on 2016/2/20.
 */
function loadEnrollPage() {
    var action = "loadEnrollPage";
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
                var cause = data.cause;
                var res = data.res;
                handleError(errorId, cause);
                $("#title").text(title);
                $("#groupName").text(groupName);
                $("#initiatorName").text(initiatorName);
                $("#createDate").text(createDate);
                $("#enrollAccepted").removeAttr("disabled");
                $("#enrollDenied").removeAttr("disabled");
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
                if (status == "Accepted") {
                    var str = "同意参与";
                    tips(str);

                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                } else if (status == "Denied") {
                    var str = "拒绝参与";
                    tips(str);
                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }
                if (errorId == 308) {
                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }
                if (res == "success") {

                    var str = "已同意参加";
                    $("#voteSubmit").text(str).attr({"disabled": "disabled"});
                }

            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );

}
loadEnrollPage();

$("#enrollAccepted").click(function () {

    var action = "enrollAccepted";
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
                var status = data.status;
                handleError(errorId, cause);
                $("#enrollAccepted").removeAttr("disabled");
                $("#enrollDenied").removeAttr("disabled");
                if (status == "Accepted") {
                    var str = "同意参与";
                    tips(str);

                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }
                if (errorId == 308) {

                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }
                if (errorId == 310) {

                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }
                if (errorId == 311) {
                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }
                if (res == "success") {
                    tips("已提交参加！");
                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }
                if (status == "Unaware") {
                    $("#enrollAccepted").removeAttr("disabled");
                    $("#enrollDenied").removeAttr("disabled");
                }
                if (status == "Denied") {
                    var str = "拒绝参与";
                    tips(str);
                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }

            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );
});

$("#enrollDenied").click(function () {

    $("#deniedReason").removeClass("hide").addClass("show");

});
$("#submitReason").click(function () {
    var action = "enrollDenied";
    var deniedReason = $("#reasonContent").val();
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
                deniedReason: deniedReason


            },
            success: function (data) {
                console.log(data);
                var errorId = data.errorId;
                var cause = data.cause;
                var res = data.res;
                var width1 = $("#reasonContent").val().length;
                console.log(width1);
                handleError(errorId, cause);
                if (errorId == 1 || width1 > 100) {
                    var str = "拒绝理由请不要超过50字";
                    $("#deniedReason").removeClass("hide").addClass("show");

                    $("#reasonContent").val("");

                    tips(str);
                    return false;
                }
                if (errorId == 308) {
                    $("#deniedReason").removeClass("show").addClass("hide");
                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }
                if (errorId == 310) {
                    $("#deniedReason").removeClass("show").addClass("hide");
                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }
                if (errorId == 311) {
                    $("#deniedReason").removeClass("show").addClass("hide");
                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }

                if (res == "success") {
                    tips("提交拒绝理由成功！");
                    $("#deniedReason").removeClass("show").addClass("hide");
                    $("#enrollAccepted").attr({"disabled": "disabled"});
                    $("#enrollDenied").attr({"disabled": "disabled"});
                }


            },
            error: function (xhr, type) {
                var error = "数据不能加载！";
                tips(error);
            }
        }
    );
});