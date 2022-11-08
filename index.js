//index page html
let container_num = 0;
let box_num = 0;
let background_letter = "글자로패턴을만들어보았습니다.";
let container_i = 0;
let item_j = 0;
let animation_speed = 0;
let go_back = 1;
let mobile = 0;

$(function onload() {
    alert('들어왔습니다!');
    let width = $('.change-box').css('width');
    $('.show').css('width', width);
    
    let uAgent = navigator.userAgent.toLowerCase();
    // 아래는 모바일 장치들의 모바일 페이지 접속을위한 스크립트
    let mobilePhones = new Array('iphone', 'ipod', 'ipad', 'android', 'blackberry', 'windows ce', 'nokia', 'webos', 'opera mini', 'sonyericsson', 'opera mobi', 'iemobile');
    for (let i = 0; i < mobilePhones.length; i++) {
        if (uAgent.indexOf(mobilePhones[i]) != -1) {
            console.log(1);
            $('#home-text').empty();
            $('#home-text').text('PRESS HERE TO START');
            mobile = 1;
        }
    };
})

$('#home-graphic').on('touchstart', function (e) {
    alert('됐습니다!');
    if (mobile == 1){
        window.location.href = './main';
    }
});

function show_box() {
    $('#pattern-body').empty();

    container_num = count_container();
    for (let i = 0; i < container_num; i++){
         $('#pattern-body').append(`<div class="pattern-container" id="container${i}"></div>`);
    }

    box_num = count_box();
    let len = background_letter.length;
    for (i = 0; i < container_num; i++){
        for (let j = 0; j < box_num; j++){
            if (j < 10){
                $(`#container${i}`).append(`<div class="pattern" id="pattern_${i}_00${j}">${background_letter[j%len]}</div>`);
            } else if (10 <= j && j <= 99){
                $(`#container${i}`).append(`<div class="pattern" id="pattern_${i}_0${j}">${background_letter[j%len]}</div>`);
            }
            else {
                $(`#container${i}`).append(`<div class="pattern" id="pattern_${i}_${j}">${background_letter[j%len]}</div>`);
            }
        }
    }
}

function count_container() {
    let container_height = Number($('#pattern-body').css('height').slice(0, -2));
    let height_num = parseInt(container_height / 38);
    return height_num;
}
function count_box() {
    let container_width= Number($('#pattern-body').css('width').slice(0, -2));
    let width_num = parseInt(container_width / 38);
    return width_num;
}

window.onresize = function() {
    show_box();
}

$('#input-sentence').keyup(function input_sync(key) {
    if (key.keyCode == 13){
        if ($('#input-sentence').val() != " "){
            return get_input();
        }
    }
})

function show() {
    let radio_result = '제자리O';
    if (go_back == 1){
        radio_result = '제자리O';
    } else {
        radio_result = '제자리X';
    }
    let temp_html = `현재 패턴: <br>${background_letter}<br>
                애니메이션 speed: ${animation_speed}<br>
                제자리O/X: ${radio_result}`;
    $('.show').empty();
    $('.show').append(temp_html);
    let width = $('.change-box').css('width');
    $('.show').css('width', width);
    return;
}

function get_choice() {
    let result = $("input[name='get_back']:checked").val();
    go_back = result;
    rebuild_box();
    show();
    return;
}

$(document).keyup(function input_sync(key) {
    if (key.keyCode == 13){
        if ($('#input-sentence').val() != " "){
            get_input();
        }
        if ($('#input-animation').val() != ""){
            get_animation_speed();
        }
        go_back = result;
        show();
    }
})

function get_input() {
    background_letter = $('#input-sentence').val();
    show();
    return rebuild_box();
}

function rebuild_box() {
    $('#pattern-body').empty();

    for (let i = 0; i < container_num; i++) {
        $('#pattern-body').append(`<div class="pattern-container" id="container${i}"></div>`);
    }

    let len = background_letter.length;
    for (i = 0; i < container_num; i++) {
        for (let j = 0; j < box_num; j++) {
            if (j < 10) {
                $(`#container${i}`).append(`<div class="pattern" id="pattern_${i}_00${j}">${background_letter[j % len]}</div>`);
            } else if (10 <= j && j <= 99) {
                $(`#container${i}`).append(`<div class="pattern" id="pattern_${i}_0${j}">${background_letter[j % len]}</div>`);
            } else {
                $(`#container${i}`).append(`<div class="pattern" id="pattern_${i}_${j}">${background_letter[j % len]}</div>`);
            }
        }
    }
}


let before_this = "";
$(function check_animate(){
    $(document).on('mouseover touchenter', '.pattern', function (e) {
        if (before_this == ""){
            let id_name = $(this).attr('id');
            if (isNaN(id_name[9])) {
                container_i = Number(id_name[8]);
            } else {
                container_i = Number(id_name.slice(8, 10));
            }
            item_j = Number(id_name.slice(-3, id_name.length));
            animate_item();
            before_this = $(this).attr('id');
            return;
        } else if (before_this != $(this).attr('id')){
            if (go_back == 1){
                animate_back_item();
            }
            let id_name = $(this).attr('id');
            if (isNaN(id_name[9])) {
                container_i = Number(id_name[8]);
            } else {
                container_i = Number(id_name.slice(8, 10));
            }
            item_j = Number(id_name.slice(-3, id_name.length));
            animate_item();
            before_this = $(this).attr('id');
            return;
        } else {
            return;
        }
    });
})

$('#input-animation').keyup(function input_sync(key) {
    if (key.keyCode == 13){
        if ($('#input-animation').val() != ""){
            return get_animation_speed();
        }
    }
})
function get_animation_speed() {
    if ($('#input-animation') != ' '){
        animation_speed = Number($('#input-animation').val());
        show();
    }
    return;
}

function animate_item() {
    // animation_speed = 0;
    if (item_j < 10){
        $(`#pattern_${container_i - 1}_00${item_j}`).animate({
            marginBottom: "+=80"
        }, animation_speed);
        $(`#pattern_${container_i}_00${item_j}`).animate({
            marginBottom: "+=80",
            marginLeft: "+=80",
        }, animation_speed);
        $(`#pattern_${container_i + 1}_00${item_j}`).animate({
            marginTop: "+=80"
        }, animation_speed);
    } else {
        $(`#pattern_${container_i}_0${item_j}`).animate({
            marginBottom: "+=80",
            marginLeft: "+=80"
        }, animation_speed);
        $(`#pattern_${container_i - 1}_0${item_j}`).animate({
            marginBottom: "+=80"
        }, animation_speed);
        $(`#pattern_${container_i + 1}_0${item_j}`).animate({
            marginTop: "+=80"
        }, animation_speed);
    }
}

function animate_back_item() {
    $('.pattern').each(function() {
        $(this).css('margin-top', '0');
        $(this).css('margin-left', '0');
        $(this).css('margin-right', '0');
        $(this).css('margin-bottom', '0');
    })
}



// $(document).on('click', '#home-graphic', function (e) {
//     window.location.href = './main';
// });
//
// window.addEventListener ("keydown",  function (e)  {
//     window.location.href = './main';
// });
