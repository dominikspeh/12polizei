$( document ).ready(function() {


$(".fp-controlArrow").click(function () {

    $('.stellen .count, .tile .count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 1500,
            easing: 'swing',
            step: function (now) {
                $(this).html(now.toFixed(1)+"<sup>%</sup>");
            }
        });
    });
})



});