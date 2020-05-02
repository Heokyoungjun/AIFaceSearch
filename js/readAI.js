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
async function init() {
    if (document.getElementById("gender").checked) {
        URL = urlMale;
    } else {
        URL = urlFemale;
    }
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
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
    var resultTitle, resultExplain, resultCeleb;
    resultTitle = "알수없음";
    resultExplain = "";
    resultCeleb = "";
    switch (prediction[0].className) {
        case "dog":
            rsMsg = "강아지상"
            break;
        case "cat":
            rsMsg = "고양이상"
            break;
        default:
            // code block
    }
    var title = "<div class='" + prediction[0].className + "-animal-title'>" + resultTitle + "</div>";
    var explain = "<div class='animal-explain pt-2'>" + resultExplain + "</div>";
    var celeb = "<div class='" + prediction[0].className + "-animal-celeb pt-2 pb-2'>" + resultCeleb + "</div>";
    $('.result-message').html(title + explain + celeb);
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
                labelTitle = "<img src='img/animal/bulldog.png' alt='' style='width:10%;height:10%;padding-right:10px'>"
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
            default:
                labelTitle = "알수없음"
        }
        // var label = "<div class='animal-label d-flex align-items-center'>" + labelTitle + "</div>";
        var label = labelTitle;
        var bar = "<div class='bar-container position-relative container'><div class='" + prediction[i].className + "-box'></div><div class='d-flex justify-content-center align-items-center " + prediction[i].className + "-bar' style='width: " + barWidth + "'><span class='d-block percent-text'>" + Math.round(prediction[i].probability.toFixed(2) * 100) + "%</span></div></div>";
        labelContainer.childNodes[i].innerHTML = label + bar;
    }
}
