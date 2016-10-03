/**
 * Created by yilong on 2016/2/20.
 */
var itemNames;
function loadCensusPage() {
    var action = "loadCensusPage";
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
                handleError(errorId, cause);

                var title = data.title;
                var groupName = data.groupName;
                var initiatorName = data.initiatorName;
                var createDate = data.createDate;
                createDate = createDate.substring(0, 10);
                var detail = data.detail;
                var examples = data.examples;
                itemNames = data.itemNames;
                var status = data.status;
                $("#title").text(title);
                $("#groupName").text(groupName);
                $("#createDate").text(createDate);
                $("#detail").text(detail);
                $("#initiatorName").text(initiatorName);
                $("#submit").text("确定提交").removeAttr("disabled");

                for (var i = 0; i < itemNames.length; i++) {
                    var str = "<li class='ui-col mb10'>"
                        + "  <div class='ui-col mb10'>" + itemNames[i] + "：</div> "
                        + "<div class='ui-col ui-col-100'>"
                        + " <input id='" + i + "' class='input-text data' type='text' placeholder='" + examples[i] + "'>" + "</div> </li>";
                    $("#list").append(str);


                }

                if (status == "Censused") {

                    var str = "已提交统计信息";
                    tips(str);
                    $(".data").attr({"disabled": "disabled"});
                    $("#submit").text(str).attr({"disabled": "disabled"});
                }
                if (status == "Unaware") {

                    var str = "确定提交";
                    tips(str);
                    $("#submit").text(str).removeAttr("disabled");
                }

            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );

}
loadCensusPage();
$("#submit").click(function () {
    for (var i = 0; i < itemNames.length; i++) {
        var dataVal = $("#" + i).val();
        if (dataVal == "") {
            var message = "内容不能为空！";
            tips(message);
            return false;
        }
    }


    var action = "censusSubmit";
    var infos = [];
    $("#list .data").each(function () {
        infos.push($(this).val());
    });
    var info = JSON.stringify(infos);
    var info2 = "{" + "\"data\":" + info + "}";
    console.log(info2);

    $.ajax(
        {
            type: 'post',
            url: url,
            dataType: "json",
            data: {
                action: action,
                timestamp: timestamp,
                sign: sign,
                infos: info2,
                replyId: replyId,

            },
            success: function (data) {
                console.log(data);
                var errorId = data.errorId;
                var cause = data.cause;
                var res = data.res;
                handleError(errorId, cause);
                if (errorId == 313) {
                    $("#submit").text(cause).attr({"disabled": "disabled"});
                }

                if (res == "success") {
                    tips("提交统计成功！");
                    var str = "已提交统计信息";
                    $(".data").attr({"disabled": "disabled"});
                    $("#submit").text(str).attr({"disabled": "disabled"});
                }


            },
            error: function (xhr, type) {
                var error = "数据不能加载！";
                tips(error);
            }
        }
    );
});