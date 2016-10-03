/**
 * Created by yilong on 2016/2/20.
 */
function loadAppointmentPage() {
    var action = "loadAppointmentPage";
    $.ajax(
        {
            type: 'post',
            url: url,
            dataType: "json",
            data: {
                action: action,
                timestamp: timestamp,
                sign: sign,
                linkId: linkId,

            },
            success: function (data) {
                console.log(data);
                var word = data.word;
                var groupName = data.groupName;
                var initiatorName = data.initiatorName;
                var createDate = data.createDate;
                var memberName = data.memberName;
                var errorId = data.errorId;
                var cause = data.cause;
                handleError(errorId, cause);
                $("#groupName").text(groupName);
                $("#initiatorName").text(initiatorName);
                $("#createDate").text(createDate);
                $("#memberName").text(memberName);
                $("#word").text(word);


            },
            error: function (xhr, type) {
                var error = "数据不能加载！"
                tips(error);
            }
        }
    );

}
loadAppointmentPage();
