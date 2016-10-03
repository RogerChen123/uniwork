 $('.ui-list li,.ui-tiled li').tap(function() {
        if ($(this).data('href')) {
            location.href = $(this).data('href');
        }
    });
 $('#enter').tap(function() {
     if ($(this).data('href')) {
         location.href = $(this).data('href');
     }
 });
    $('.ui-header .ui-btn').tap(function() {
        location.href = 'index.html';
    });