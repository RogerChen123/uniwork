 $('.ui-searchbar').tap(function() {
        $('.ui-searchbar-wrap').addClass('focus');
        $('.ui-searchbar-input input').focus();
    });
    $('.ui-searchbar-cancel').tap(function() {
        $('.ui-searchbar-wrap').removeClass('focus');
    });