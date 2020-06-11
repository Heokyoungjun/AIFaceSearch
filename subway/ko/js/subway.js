// 맵 정보저장
var map;
// 마커를 담을 배열입니다
var markers = [];
// 수유실 담을 배열입니다
var nursingRoom_list = newMap();
// 장소 검색 객체를 생성합니다
var ps;  
// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow;
// 커피숖

var contentNode = document.createElement('div');
var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1});


// 화면 로딩시 첫 화면 설정
function init(){
    // 지도를 표시할 div 
    var container = document.getElementById('map');
    var options = {
        // 지도의 중심좌표
        center: new kakao.maps.LatLng(37.570306, 126.976856),
        // 지도의 확대 레벨
        level: 3
    };

    // 지도를 생성
    map = new kakao.maps.Map(container, options);

    // 장소 검색 객체를 생성합니다
    ps = new kakao.maps.services.Places();  

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    infowindow = new kakao.maps.InfoWindow({zIndex:1});

    // 사이드 메뉴 설정
    sideMenu_init();
    
    // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
    contentNode.className = 'placeinfo_wrap';
    // 커스텀 오버레이 컨텐츠를 설정합니다
    placeOverlay.setContent(contentNode);  
    // // 지도를 클릭한 위치에 표출할 마커입니다
    // var marker = new kakao.maps.Marker({ 
    //     // 지도 중심좌표에 마커를 생성합니다 
    //     position: map.getCenter() 
    // }); 
    
    // // 지도에 마커를 표시합니다
    // marker.setMap(map);
    
    // // 지도에 클릭 이벤트를 등록합니다
    // // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    // kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        

    //     // 클릭한 위도, 경도 정보를 가져옵니다 
    //     var latlng = mouseEvent.latLng; 

    //     // 마커 위치를 클릭한 위치로 옮깁니다
    //     marker.setPosition(latlng);

    //     var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    //     message += '경도는 ' + latlng.getLng() + ' 입니다';

    //     var resultDiv = document.getElementById('clickLatlng'); 
    //     resultDiv.innerHTML = message;

    // });
}

function setMapPosition (y, x) {
        // 지도를 표시할 div 
    var container = document.getElementById('map');
    var options = {
        // 지도의 중심좌표
        center: new kakao.maps.LatLng(y, x),
        // 지도의 확대 레벨
        level: 3
    };

    // 지도를 생성
    map = new kakao.maps.Map(container, options);
}

// 클릭한 리스트 장소로 이동
function listClick (marker,position, idx){

    var container = document.getElementById('map');
    var options = {
        center: position,
        level: 3
    };
    map = new kakao.maps.Map(container, options);

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    
    // $(".box-container").hide(500);
    $("#box-container"+idx).slideToggle(500);
    // $("#box-container2"+idx).slideToggle(500);
}

// 클릭한 리스트 장소로 이동
function sublistClick2 (marker,position, idx, place){
alert("2");

}

// 수유실 정보
function nursingRoom (place, index){
            
    var content = '<div class="placeinfo">' +
        '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';

    content += '    <span>수유실이 있습니다.</span>';
    content += nursingRoom_list.get(index);

    content += '</div>';
    content += '<div class="after"></div>';

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);

}

// // 수유실 정보
// function nursingRoom (place){

//     // URL
//     var url = 'https://openapi.kric.go.kr/openapi/convenientInfo/stationDairyRoom'; 
//     var listValue = subway_list.get(place.place_name);
//     // Service Key
//     var queryParams = '?' + 'serviceKey' + '='+'$2a$10$RE2I6N1sMcLjaPn3ozSzHOJ3UL0HyA71yj9f5R7btP1ji7pbbpJ9i'; 
//     queryParams += '&' + 'format=json';
//     queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(listValue[0]);
//     queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(listValue[1]);
//     queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(listValue[2]);
    
//     // json 데이터 갖고오기
//     $.ajax({
//         type:"GET",
//         url:url + queryParams,
//         success: function(data) {
            
//             var content = '<div class="placeinfo">' +
//                 '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';
            
//                 // 수유실 정보 찾기
//             if ("03" === data['header']['resultCode']) {
//                 content += '    <span>수유실이 없습니다.</span>';
//             } else {
//                 content += '    <span>수유실이 있습니다.</span>';
//                 content += '  <span>(위치 : ' + data['body'][0]['grndDvNm'] + ', ' + data['body'][0]['dtlLoc']  + '근처)</span>';
//             }

//             content += '</div>';
//             content += '<div class="after"></div>';
            
//             contentNode.innerHTML = content;
//             placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
//             placeOverlay.setMap(map);
//         }
//     });
// }


// 현재 위치 이동
function currentLocation (){

    navigator.geolocation.getCurrentPosition(function(pos) {
        var latitude = pos.coords.latitude;
        var longitude = pos.coords.longitude;
        
        var container = document.getElementById('map');
        // 위치 설정
        var options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 2
        };
        
        // 지도생성
        map = new kakao.maps.Map(container, options);
    });
}

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    // var keyword = document.getElementById('keyword').value;
    var keyword = document.getElementById("searchKey").value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB); 

}

function slideUp() {
    $('dt').removeClass('on').next().slideUp();
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        // displayPagination(pagination);

        // search_category_init();
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList');
    var menuEl = document.getElementById('menu_wrap');
    var fragment = document.createDocumentFragment();
    var bounds = new kakao.maps.LatLngBounds();
    var listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    // // 맵 위치 리셋
    // setMapPosition(0,0);
    
    var cnt = 0;
    var position_y = 0;
    var position_x = 0;
    for ( var i=0; i<places.length; i++ ) {

        if (places[i].category_group_name.includes("지하철역")) {
            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
            var marker = addMarker(placePosition, cnt, places[i]);
            // 검색역 결과 항목 Element를 생성합니다
            // var itemEl = getListItem(cnt, places[i]);
            // 검색 수유실 결과 항목 Element를 생성합니다
            // var subitemEl1 = getListItem2(cnt, places[i]); 

            // 첫번째 검색 위치 이동
            if (cnt === 0) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(new kakao.maps.LatLng(places[i].y - 0.005, places[i].x));
            }

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            (function(marker, title, position, idx, places) {
                // kakao.maps.event.addListener(marker, 'mouseover', function() {
                //     displayInfowindow(marker, title);
                // });

                // kakao.maps.event.addListener(marker, 'mouseout', function() {
                //     infowindow.close();
                // });
                // itemEl.onmouseover =  function () {
                //     displayInfowindow(marker, title);
                // };
                // itemEl.onmouseout =  function () {
                //     infowindow.close();
                // };
                // itemEl.onclick =  function () {
                //     listClick(marker, position, idx);
                // };
                // subitemEl1.onclick = function () {
                //     nursingRoom(places, idx);
                // };
                // subitemEl2.onclick = function () {
                //     sublistClick2(marker, position, idx, places);
                // };
            })(marker, places[i].place_name, placePosition, cnt, places[i]);

            // fragment.appendChild(itemEl);
            // fragment.appendChild(subitemEl1);
            // fragment.appendChild(subitemEl2);
            cnt += 1;
        }
    }

    if (cnt === 0) {
        alert('검색 결과가 존재하지 않습니다. ');
        document.getElementById("map").className = "map-before";
        init();
    } else {
        document.getElementById("map").className = "map-after";
        // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
        map.setLevel(3);
    }
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li');
    var itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
    itemStr += '  <span class="tel">' + places.phone  + '</span>' +
            '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';
    return el;
}

// 수유실 위치 설정
function getListItem2(index, places) {

    var el = document.createElement('div');
    var itemStr = "";
    // URL
    var url = 'https://openapi.kric.go.kr/openapi/convenientInfo/stationDairyRoom'; 
    var listValue = subway_list.get(places.place_name);
    // Service Key
    var queryParams = '?' + 'serviceKey' + '='+'$2a$10$RE2I6N1sMcLjaPn3ozSzHOJ3UL0HyA71yj9f5R7btP1ji7pbbpJ9i'; 
    queryParams += '&' + 'format=json';
    queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(listValue[0]);
    queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(listValue[1]);
    queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(listValue[2]);
    
    // json 데이터 갖고오기
    $.ajax({
        type:"GET",
        url:url + queryParams,
        success: function(data) {
            
            // 수유실 정보 찾기
            if ("03" === data['header']['resultCode']) {
                // 처리없음

            } else {
                // 수유실 마크 설정
                itemStr += '<div class="listBox lb1" id="listBox1_' + index + '"></div>' +
                '<div class="blackDiv"></div>'; 
                el.innerHTML = itemStr;
                el.className = 'box-container';
                el.id = 'box-container' + index;
                
                
                // 수유실 위치 임시저상
                var content = "";
                (data['body'][0]['grndDvNm'] == null) ? pl_tmp ='' : content += '<span>(위치 : ' + data['body'][0]['grndDvNm'];
                (data['body'][0]['dtlLoc'] == null) ? pl_tmp ='' : content += ', ' + data['body'][0]['dtlLoc']  + '근처';
                content += ')</span>';
                
                nursingRoom_list.put(index, content);
            }

        }
    });
    
    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, place) {
    // 마커 이미지 url, 스프라이트 이미지를 씁니다
    var subwayLineUrl = place.place_name.split(' ');
    var imageSrc = subwayLine_list.get(subwayLineUrl[1]);
    var imageSize = new kakao.maps.Size(100, 100);  // 마커 이미지의 크기
    var imgOptions =  {
            // spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteSize : new kakao.maps.Size(60, 60), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(65, 50), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(0, 0) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        };
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
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