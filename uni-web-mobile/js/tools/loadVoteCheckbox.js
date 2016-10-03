/**
 * Created by yilong on 2016/2/20.
 */
function loadVotePage() {
    var action = "loadVotePage";
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
                var selectedLimit = data.selectedLimit;
                var anonymous = data.anonymous;
                var detail = data.detail;
                var optionNames = data.optionNames;
                var status = data.status;
                var errorId = data.errorId;
                var cause = data.cause;
                handleError(errorId, cause);
                $("#title").text(title);
                $("#groupName").text(groupName);
                $("#detail").text(detail);
                $("#initiatorName").text(initiatorName);
                $("#selectedLimit").text("最多可选" + selectedLimit + "个");
                $("#voteSubmit").text("确定提交").removeAttr("disabled");
                if (anonymous == false) {
                    $("#anonymous").text("非匿名");
                } else {

                    $("#anonymous").text("匿名");

                }

                if (status == "Unaware") {

                    var str = "确定提交";
                    tips(str);
                    $("#voteSubmit").text(str).removeAttr("disabled");

                }

                for (var i = 0; i < optionNames.length; i++) {
                    var str = "<div class='ui-form-item ui-form-item-checkbox'>"
                        + " <label class='ui-checkbox' > "
                        + "<input id='" + i + "' class='data' type='checkbox'>"
                        + " </label>" + " <p>" + optionNames[i] + "</p>" + " </div>";
                    $("#list").append(str);

                }

                $("#list .data").click(function () {
                    var infos = [];
                    $("#list .data").each(function () {
                        if ($(this).is(":checked")) {
                            infos.push($(this).attr("id"));
                        }
                    });
                    var infosLength = infos.length;
                    if (infosLength >= selectedLimit) {

                        $("#list .data").attr({"disabled": "disabled"});
                        $("#list .data:checked").removeAttr("disabled");

                    } else if (infosLength < selectedLimit) {

                        $("#list .data").removeAttr("disabled");
                    }
                    console.log(infos.length);


                });
                if (status == "Voted") {

                    var str = "已投票";
                    tips(str);
                    $(".data").attr({"disabled": "disabled"});
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
loadVotePage();
$("#voteSubmit").click(function () {
    var action = "voteSubmit";
    var infos = [];
    $("#list .data").each(function () {
        if ($(this).is(":checked")) {
            infos.push($(this).attr("id"));
        }

    });

    var info = JSON.stringify(infos);
    var info2 = "{" + "\"data\":" + info + "}";
    console.log(info2);
    //判断发送数组是否为空？还未讨论，待定
    if (infos.length == 0) {
        var str = "您至少要选择一项";
        tips(str);
        return false;
    }
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
                optionIds: info2,

            },
            success: function (data) {
                console.log(data);
                var errorId = data.errorId;
                var cause = data.cause;
                var res = data.res;
                handleError(errorId, cause);
                if (errorId == 312) {
                    var str = "已投票";
                    $("#voteSubmit").text(str).attr({"disabled": "disabled"});


                }
                if (res == "success") {
                    tips("提交投票成功！");
                    var str = "已投票";
                    $(".data").attr({"disabled": "disabled"});
                    $("#voteSubmit").text(str).attr({"disabled": "disabled"});
                }

            },
            error: function (xhr, type) {
                var error = "数据不能加载！";
                tips(error);
            }
        }
    );
});

