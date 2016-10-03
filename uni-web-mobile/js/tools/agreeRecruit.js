/**
 * Created by yilong on 2016/2/20.
 */
function recruit() {
    var action = "loadRecruitPage";
    $.ajax(
        {
            type: 'post',
            url: url,
            dataType: "json",
            data: {
                action: action,
                auth: auth,
                ticket: ticket,
                timestamp: timestamp,
                sign: sign,
                member: member

            },
            success: function (data) {
                console.log(data);
                var groupName = data.groupName;
                var initiatorName = data.initiatorName;
                var errorId = data.errorId;
                var cause = data.cause;
                var res = data.res;
                handleError(errorId, cause);
                if (res == "success") {
                    var str = "已加入";
                    tips(str);
                    $("#agreeRecruit").text(str).attr({"disabled": "disabled"});

                }

                $("#initiatorName").text(initiatorName);
                $("#username").text(initiatorName);
                $("#groupName").text(groupName);

            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );

}
recruit();
$("#agreeRecruit").click(function () {
    var action = "agreeRecruit";
    $.ajax(
        {
            type: 'post',
            url: url,
            dataType: "json",
            data: {
                action: action,
                auth: auth,
                ticket: ticket,
                timestamp: timestamp,
                sign: sign,
                member: member,

            },
            success: function (data) {
                console.log(data);
                var errorId = data.errorId;
                var cause = data.cause;
                var res = data.res;
                handleError(errorId, cause);
                if (errorId == 305) {
                    //未完善信息
                    location.href = 'fill_in_info.html?' + "&member=" + member + "&auth=" + auth + "&ticket=" + ticket + "&timestamp=" + timestamp + "&sign=" + sign;
                }

                if (res == "success") {
                    var str = "已加入";
                    tips(str);
                    $("#agreeRecruit").text(str).attr({"disabled": "disabled"});
                }


            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );

});
