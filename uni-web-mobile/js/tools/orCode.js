function or_code() {
    var action = "loadQRPage";
    $.ajax(
        {
            type: 'post',
            url: url,
            dataType: "json",
            cache:false,
            data: {
                action: action,
                auth: auth,
                ticket: ticket,
                timestamp: timestamp,
                sign: sign,
            },
            success: function (data) {
                console.log(data);
                var groupName = data.groupName;
                var qrImgURL = data.qrImgURL;
                var errorId = data.errorId;
                var cause = data.cause;
                var expireDate = data.expireDate;


                handleError(errorId, cause);
                if (errorId == 302) {
                    $("#qr").text(cause);
                    return false;
                }
                var content = " <p id='qr' class='tc f12 mb10 plr10' style='clear: both;'>该二维码<span id='day'></span>内有效<br><span id='expireDate'></span>失效</p>";
                $("#valid").append(content);
                $("#title").text(groupName);
                $("#expireDate").text(expireDate);
                $("#or_code").attr("src", qrImgURL);

                var valid = new Date(expireDate.replace(/-/g, "/"));
                var currentDate = new Date();

                var days = (valid.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
                console.log(days);

                days = Math.ceil(days);

                if (days < 0) {
                    var str = "招募贴已经过期";
                    $("#qr").text(str);
                    return false;
                }
                switch (days) {
                    case 0:
                        var str = "本日";
                        $("#day").text(str);
                        break;
                    case 1:
                        var str = "一天";
                        $("#day").text(str);
                        break;
                    case 2:
                        var str = "两天";
                        $("#day").text(str);
                        break;
                    case 3:
                        var str = "三天";
                        $("#day").text(str);
                        break;
                    case 4:
                        var str = "四天";
                        $("#day").text(str);
                        break;
                    case 5:
                        var str = "五天";
                        $("#day").text(str);
                        break;
                    case 6:
                        var str = "六天";
                        $("#day").text(str);
                        break;
                    case 7:
                        var str = "七天";
                        $("#day").text(str);
                        break;

                }

                console.log(days);
                console.log(currentDate);
                console.log(valid);
            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );
}
or_code();


