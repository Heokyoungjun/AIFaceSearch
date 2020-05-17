let URL = "https://teachablemachine.withgoogle.com/models/KHgRBMDth/";
let model, labelContainer, maxPredictions;
var rstTitlelMap = newMap();
var details = newMap();
var link = newMap();


// AI링크 읽기
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

// AI 링크 읽기 시작
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    // maxPredictions = model.getTotalClasses();
    maxPredictions = 5;
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        var em = document.createElement("div")
        em.classList.add("d-flex");
        labelContainer.appendChild(em);
    }
}

// AI 결과 분석 및 화면 셋팅
async function predict() {

    var image1 = document.getElementById("face-image");
    const prediction = await model.predict(image1, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var rsMsg;
    var resultTitle, resultDetails, resultLink;

    var historyKind = prediction[0].className;
    
    resultTitle = rstTitlelMap.get(historyKind);
    resultDetails = details.get(historyKind);
    resultLink = link.get(historyKind);
    
    var title = "<div class='" + prediction[0].className + "-animal-title animal-title'><a href='" + resultLink + "' style='color:black'>" + resultTitle + "</a></div>";
    var explain = "<div class='animal-explain pt-2'>" + resultDetails + "</div>";

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
        var label = "<img src='../../img/animal/" + prediction[i].className + ".png' alt='' style='width:12%;height:12%;padding-right:10px'>";
        var bar = "<div class='bar-container position-relative container'><div class='" + prediction[i].className + "-box animal-box'></div><div class='d-flex justify-content-center align-items-center " + prediction[i].className + "-bar animal-bar' style='width: " + barWidth + "'><span class='d-block percent-text'>" + Math.round(prediction[i].probability.toFixed(2) * 100) + "%</span></div></div>";
        labelContainer.childNodes[i].innerHTML = label + bar;
    }
}

// 초기화면 로딩시 호출
function onload() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    req.open("GET", "../../xml/ko/history.xml", true);
    req.send();
}

// xml파일 읽기 및 맵에 저장
function myFunction(xml) {
    var i, j;
    var ranNum = Math.floor(Math.random()*(4));
    var parser = new DOMParser();
    var xmlDoc = xml.responseText;
    var xmlText = parser.parseFromString(xmlDoc,"text/xml");
    var history = xmlText.getElementsByTagName('history');
    var aniKey = "";
    var rsTitelVal = "";
    var detailsVal = "";
    var linkVal = "";
    
    for (i = 0; i < history[0].childElementCount ;i++) {
        aniKey = history[0].children[i].nodeName;
        rsTitelVal = history[0].children[i].children[0].firstChild.nodeValue;
        detailsVal = history[0].children[i].children[1].firstChild.nodeValue;
        linkVal = history[0].children[i].children[2].firstChild.nodeValue;
        
        rstTitlelMap.put(aniKey, rsTitelVal); 
        details.put(aniKey, detailsVal);
        link.put(aniKey, linkVal);
    }
}

// 맵 초기화
function newMap() {
  var map = {};
  map.value = {};
  map.getKey = function(id) {
    return "k_"+id;
  };
  map.put = function(id, value) {
    var key = map.getKey(id);
    map.value[key] = value;
  };
  map.contains = function(id) {
    var key = map.getKey(id);
    if(map.value[key]) {
      return true;
    } else {
      return false;
    }
  };
  map.get = function(id) {
    var key = map.getKey(id);
    if(map.value[key]) {
      return map.value[key];
    }
    return null;
  };
  map.remove = function(id) {
    var key = map.getKey(id);
    if(map.contains(id)){
      map.value[key] = undefined;
    }
  };
 
  return map;
}