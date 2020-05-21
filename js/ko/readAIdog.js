let URL = "https://teachablemachine.withgoogle.com/models/iHsKmtuYD/";
let model, labelContainer, maxPredictions;
var nameKo = newMap();
var nameEn = newMap();
var details = newMap();
var life = newMap();
var origin = newMap();

var dataset = [
    { name: '', percent: 0 },
    { name: '', percent: 0 },
    { name: '', percent: 0 },
    { name: '', percent: 0 },
    { name: '', percent: 0 }
];

// AI링크 읽기
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.image-upload-wrap').hide();
            $('.widget').hide();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
        init().then(() => {
            predict();
            $('.widget').show();
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
}

// AI 결과 분석 및 화면 셋팅
async function predict() {

    var image1 = document.getElementById("face-image");
    const prediction = await model.predict(image1, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var aniKey = "";
    var rsNameKo = "";
    var rsNameEn = "";
    var rsDetail = "";
    var rsLife = "";
    var rsOrgin = "";

    var historyKind = prediction[0].className;
    
    rsNameKo = nameKo.get(historyKind);
    rsNameEn = nameEn.get(historyKind);
    rsDetail = details.get(historyKind);
    rsLife = life.get(historyKind);
    rsOrgin = origin.get(historyKind);
    
    var title = "<div class='animal-title' style='color:white'>" + rsNameKo + "(" + rsNameEn + ")" + "</div>";
    var explain = "<div class='dt-1 pt-2'>" + rsDetail + "</div>";
    var life_detail = "<div class='ln-1'></div><div class='dt-1'> 평균 수명 : " + rsLife + "</div>";
    var origin_detail = "<div class='ln-1'></div><div class='dt-1'> 출생지 : " + rsOrgin + "</div>";
    
    $('.result-message').html(title + explain + life_detail + origin_detail);
    
    // for (let i = 0; i < 5; i++) {
    //     dataset[i].name = rstTitlelMap.get(prediction[i].className);
    //     var tm = prediction[i].probability * 100;
    //     dataset[i].percent = tm.toFixed(2);
    // }
    
    // 로딩화면 없애기
    loading()
}

// 초기화면 로딩시 호출
function onload() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    req.open("GET", "../../xml/ko/DogKind.xml", true);
    req.send();
}

// xml파일 읽기 및 맵에 저장
function myFunction(xml) {
    var i, j;
    var ranNum = Math.floor(Math.random()*(4));
    var parser = new DOMParser();
    var xmlDoc = xml.responseText;
    var xmlText = parser.parseFromString(xmlDoc,"text/xml");
    var dogKind = xmlText.getElementsByTagName('dogKind');
    var aniKey = "";
    var rsNameKo = "";
    var rsNameEn = "";
    var rsDetail = "";
    var rsLife = "";
    var rsOrgin = "";

    
    for (i = 0; i < dogKind[0].childElementCount ;i++) {
        aniKey = dogKind[0].children[i].nodeName;
        rsNameKo = dogKind[0].children[i].children[0].firstChild.nodeValue;
        rsNameEn = dogKind[0].children[i].children[1].firstChild.nodeValue;
        rsDetail = dogKind[0].children[i].children[2].firstChild.nodeValue;
        rsLife = dogKind[0].children[i].children[3].firstChild.nodeValue;
        rsOrgin = dogKind[0].children[i].children[4].firstChild.nodeValue;
        
        nameKo.put(aniKey, rsNameKo); 
        nameEn.put(aniKey, rsNameEn); 
        details.put(aniKey, rsDetail);
        life.put(aniKey, rsLife);
        origin.put(aniKey, rsOrgin);
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

function linksite() {
    window.open(nextsite);
}