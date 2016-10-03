
if (anonymous == "false") {
    $("#anonymous").text("非匿名");
} else {

    $("#anonymous").text("匿名");

}
 optionNames = eval("(" + optionNames + ")");
//console.log(actualNames);

for (var i = 0; i < optionNames.length; i++) {
    var str = "<div class='ui-form-item ui-form-item-radio'>"
        + " <label class='ui-radio' for='radio'> "
        + "<input id='"+i+"' class='data' type='radio' name='radio' disabled>"
        + " </label>" + " <p>" + optionNames[i] + "</p >" + " </div>";
    $("#list").append(str);

}