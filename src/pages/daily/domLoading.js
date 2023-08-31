import $ from 'jquery'
$(".box>div").mouseover(function(){
    $(this).stop().animate({
        "width":"500px"
    },200).siblings().stop().animate({
        "width":"140px"
    },200)
})

$(".box>div").mouseout(function(){
    $(".box>div").stop().animate({
        "width":"200px"
    },200)
})
