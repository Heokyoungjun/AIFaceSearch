$(document).ready(function(){
         $("#menu").load("MenuCommon.html")
        /* id 지정을 통해서도 가능합니다. 
         $("#header").load("header.html #navbar")
         */       
      });

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.image-upload-wrap').hide();
            $('#loading').show();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
        init().then(() => {
            predict();
            $('#loading').hide();
        });
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function() {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function() {
    $('.image-upload-wrap').removeClass('image-dropping');
});


let URL;
const urlMale = "https://teachablemachine.withgoogle.com/models/UHjCBukkm/";
const urlFemale = "https://teachablemachine.withgoogle.com/models/ju5-q_uzx/";
let model, webcam, labelContainer, maxPredictions;
var dogMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "男女問わず「かわいい！」「癒される！」と言われる優しい雰囲気を持った顔立ち大人気NO1！！！","笑うと子犬のような顔になる笑顔が可愛いK-POPアイドルに似ている。まさかアナタは？？？");
var catMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "b","c","d","e");
var bearMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "b","c","d","e");
var dinosaurMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "b","c","d","e");
var wolfMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "b","c","d","e");
var horseMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "b","c","d","e");
var snakeMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "b","c","d","e");
var foxMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "b","c","d","e");
var monkeyMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "b","c","d","e");
var mouseMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "b","c","d","e");
var rabbitMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "b","c","d","e");

async function init() {
    if (document.getElementById("gender").checked) {
        URL = urlMale;
    } else {
        URL = urlFemale;
    }
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    // maxPredictions = model.getTotalClasses();
    maxPredictions = 5;
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        var em = document.createElement("div")
        em.classList.add("d-flex");
        labelContainer.appendChild(em);
    }
}
async function predict() {
    var image1 = document.getElementById("face-image")
    const prediction = await model.predict(image1, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var rsMsg;
    var resultTitle, resultExplain;
    var ranNum = Math.floor(Math.random()*(3)) + 1;
    if (document.getElementById("gender").checked) {
        switch (prediction[0].className) {
            case "dog":
                resultTitle = "愛らしい犬顔";
                resultExplain = dogMsg[ranNum];
                break;
                
            case "cat":
                resultTitle = "ツンデレネコ顔";
                resultExplain = "무뚝뚝한 당신의 첫인상은 차가워 보이지만 묘한 매력을 풍겨 언제나 인기가 넘친다. 자존심이 세계 1등과 맞먹지만 관심 받는 것을 좋아하고 연인에게는 은근히 애교쟁이다. 시크한 츤데레로 연인에게 끊임없이 설렘을 안겨주는 당신은 고양이와 닮았다!";
                break;
                
            case "bear":
                resultTitle = "暖かいクマ顔";
                resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!";
                break;
                
            case "dinosaur":
                resultTitle = "따뜻한 나쁜남자 キョウリュウ顔";
                resultExplain = "무심한 성격에 첫인상은 나쁜 남자 같지만, 알고 보면 따뜻함이 묻어나는 당신! 시크한 매력에 선뜻 다가가지 못하지만 한번 다가가면 헤어나올 수 없는 터프한 매력을 가진 카리스마 있는 남자다.";
                break;
                
            case "wolf":
                resultTitle = "";
                resultExplain = "";
                break;
                
            case "horse":
                resultTitle = "";
                resultExplain = "";
                break;
                
            case "snake":
                resultTitle = "";
                resultExplain = "";
                break;
                
            case "fox":
                resultTitle = "";
                resultExplain = "";
                break;
            
            case "monkey":
                resultTitle = "";
                resultExplain = "";
                break;
            
            case "mouse":
                resultTitle = "";
                resultExplain = "";
                break;
                
            case "rabbit":
                resultTitle = "천진난만한 매력의 ウサギ顔";
                resultExplain = "천진난만하고 귀여운 당신은 주변 사람들에게 기쁨을 주는 행복바이러스다! 호기심이 많아 활발하며 귀엽고 순수한 외모로 연인의 보호본능을 자극한다. 존재 자체가 상큼한 당신은 특별한 애교 없이도 연인에게 너무나도 사랑스럽다!";
                break;
                
            default:
                resultTitle = "該当なし";
                resultExplain = ""

        }
    } else {

        switch (prediction[0].className) {
            case "dog":
                resultTitle = "可愛いコイヌ顔";
                resultExplain = "愛らしくて魅力的な顔、다정다감하고 귀여운 당신은 모든 사람들에게 즐거움을 주는 호감형이다! 친절하고 활발한 성격으로 어디에서도 인기폭발이며 애교와 웃음이 많아 연인에게 특히나 사랑스럽다. 당신은 애인바라기로 애인의 관심이 부족하면 시무룩해지고 외로움을 타는 모습이 마치 강아지와 똑 닮았다!";
                break;
                
            case "cat":
                resultTitle = "ツンデレネコ顔";
                resultExplain = "무뚝뚝한 당신의 첫인상은 차가워 보이지만 묘한 매력을 풍겨 언제나 인기가 넘친다. 자존심이 세계 1등과 맞먹지만 관심 받는 것을 좋아하고 연인에게는 은근히 애교쟁이다. 시크한 츤데레로 연인에게 끊임없이 설렘을 안겨주는 당신은 고양이와 닮았다!";
                break;
                
            case "bear":
                resultTitle = "暖かいクマ顔";
                resultExplain = "첫 인상은 무서워 보이지만 알고 보면 귀여운 매력의 당신! 꼼꼼하고 섬세한 성격으로 연인을 헌신적으로 챙겨주는 당신은 연인에게 듬직한 존재! 포근한 매력에 듬직함까지 갖춘 최고의 남자다!";
                break;
                
            case "dinosaur":
                resultTitle = "따뜻한 나쁜남자 キョウリュウ顔";
                resultExplain = "무심한 성격에 첫인상은 나쁜 남자 같지만, 알고 보면 따뜻함이 묻어나는 당신! 시크한 매력에 선뜻 다가가지 못하지만 한번 다가가면 헤어나올 수 없는 터프한 매력을 가진 카리스마 있는 남자다.";
                break;
                
            case "wolf":
                resultTitle = "";
                resultExplain = "";
                break;
                
            case "horse":
                resultTitle = "";
                resultExplain = "";
                break;
                
            case "snake":
                resultTitle = "";
                resultExplain = "";
                break;
                
            case "fox":
                resultTitle = "";
                resultExplain = "";
                break;
            
            case "monkey":
                resultTitle = "";
                resultExplain = "";
                break;
            
            case "mouse":
                resultTitle = "";
                resultExplain = "";
                break;
                
            case "rabbit":
                resultTitle = "천진난만한 매력의 ウサギ顔";
                resultExplain = "천진난만하고 귀여운 당신은 주변 사람들에게 기쁨을 주는 행복바이러스다! 호기심이 많아 활발하며 귀엽고 순수한 외모로 연인의 보호본능을 자극한다. 존재 자체가 상큼한 당신은 특별한 애교 없이도 연인에게 너무나도 사랑스럽다!";
                break;
                
            default:
                resultTitle = "該当なし";
                resultExplain = "";

        }
    }
    
    
    var title = "<div class='" + prediction[0].className + "-animal-title animal-title'>" + resultTitle + "</div>";
    var explain = "<div class='animal-explain pt-2'>" + resultExplain + "</div>";

    $('.result-message').html(title + explain);
    var barWidth;
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability.toFixed(2) > 0.1) {
            barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
        } else if (prediction[i].probability.toFixed(2) >= 0.01) {
            barWidth = "4%"
        } else {
            barWidth = "2%"
        }
        var labelTitle;
        switch (prediction[i].className) {
            case "dog":
                labelTitle = "<img src='img/animal/dog.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;
            case "cat":
                labelTitle = "<img src='img/animal/cat.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;
            case "bear":
                labelTitle = "<img src='img/animal/bear.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;
            case "dinosaur":
                labelTitle = "<img src='img/animal/dinosaur.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;
            case "wolf":
                labelTitle = "<img src='img/animal/wolf.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;
           case "horse":
                labelTitle = "<img src='img/animal/horse.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;
            case "snake":
                labelTitle = "<img src='img/animal/snake.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;
            case "fox":
                labelTitle = "<img src='img/animal/fox.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;            
            case "monkey":
                labelTitle = "<img src='img/animal/monkey.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;
            case "mouse":
                labelTitle = "<img src='img/animal/mouse.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;
            case "rabbit":
                labelTitle = "<img src='img/animal/rabbit.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
                break;
            default:
                labelTitle = "알수없음"
        }
        var label = labelTitle;
        var bar = "<div class='bar-container position-relative container'><div class='" + prediction[i].className + "-box'></div><div class='d-flex justify-content-center align-items-center " + prediction[i].className + "-bar' style='width: " + barWidth + "'><span class='d-block percent-text'>" + Math.round(prediction[i].probability.toFixed(2) * 100) + "%</span></div></div>";
        labelContainer.childNodes[i].innerHTML = label + bar;
    }
}
