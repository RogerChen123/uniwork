optionNames = eval("(" + optionNames + ")");
examples = eval("(" + examples + ")");
for (var i = 0; i < optionNames.length; i++) {
    var str = "<li class='ui-col mb10'>"
        + "  <div class='ui-col mb10'>" + optionNames[i] + "：</div> "
        + "<div class='ui-col ui-col-100'>"
        + " <input id='" + i + "' class='input-text data' type='text' placeholder='" + examples[i] + "' disabled >" + "</div> </li>";
    $("#list").append(str);

}
console.log(examples);