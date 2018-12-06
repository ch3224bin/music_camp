$('#date').change(function() {
    var url = '/list?seq=' +  $(this).val();
    $.get(url)
    .done(function(data) {
        $('#list').html(data);
        attachCopyEvent();
    });
}).trigger('change');

var attachCopyEvent = function() {
    $('.copy').click(function() {
        var $temp = $('<input>');
        $('body').append($temp);
        console.log("ssss" + $(this).prev('.title').text());
        $temp.val($(this).prev('.title').text().trim()).select();
        document.execCommand('copy');
        $temp.remove();
        $.notify("복사 되었습니다.", {delay: 500, allow_dismiss: false, placement: {from: "bottom", align: "center"}});
    });
};