/**
 * Created by yilong on 2016/2/20.
 */
function modifyInfo() {
    var action = "loadMemberInfoPage";
    $.ajax(
        {
            type: 'post',
            url: url,
            dataType: "json",
            data: {
                action: action,
                timestamp: timestamp,
                sign: sign,
                memberId: member,

            },
            success: function (data) {
                console.log(data);

                var firstName = data.firstName;
                var lastName = data.lastName;
                var tel = data.tel;
                var res = data.res;
                var errorId = data.errorId;
                var cause = data.cause;
                handleError(errorId, cause);
                $("#firstName").val(firstName);
                $("#lastName").val(lastName);
                $("#tel").val(tel);
                if (res == "success") {
                    var str = "保存成功";
                    tips(str);
                    /*   location.href = "recruit.html?&" + "action=" + action + "&member=" + member + "&auth=" + auth + "&ticket=" + ticket + "&timestamp=" + timestamp + "&sign=" + sign;*/

                }

            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );


}
modifyInfo();
$("#enter").click(function () {
    var action = "submitMemberInfo";
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var tel = $("#tel").val();
    //验证手机号码格式正则
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
    //验证只允许输入英文与中文正则
    var myreg1 = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    var message = "";

    if (lastName == "" && firstName == "") {
        message = "姓和名不能同时为空！";
        tips(message);
        return false;

    }

    if (!lastName == "") {

        if (!myreg1.test(lastName)) {
            message = "请输入不要输入非法字符！";
            tips(message);
            $("#lastName").val("");
            return false;
        }
    }

    if (!firstName == "") {

        if (!myreg1.test(firstName)) {
            message = "请输入不要输入非法字符！";
            tips(message);
            $("#firstName").val("");
            return false;
        }

    }

    if (tel == '') {
        message = "手机号码不能为空！";
        tips(message);
        return false;
    } else if (tel.length != 11) {
        message = "请输入有效的手机号码！";
        tips(message);
        $("#tel").val("");
        return false;
    } else if (!myreg.test(tel)) {
        message = "请输入有效的手机号码！";
        tips(message);
        $("#tel").val("");
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
                memberId: member,
                firstName: firstName,
                lastName: lastName,
                tel: tel,

            },
            success: function (data) {
                console.log(data);
                var res = data.res;
                var errorId = data.errorId;
                var cause = data.cause;
                if (res == "success") {
                    var str = "提交成功";
                    tips(str);

                }  handleError(errorId, cause);
            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );


});
