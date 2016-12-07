$( document ).ready(function() {

    $(".month").text(moment().format('MMMM'))
    $(".day").text(moment().format('dddd'))
    $(".time").text(moment().format('LTS'))


});