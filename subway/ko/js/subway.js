// 맵 정보저장
var map;

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

    // 지도를 클릭한 위치에 표출할 마커입니다
    var marker = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        position: map.getCenter() 
    }); 
    
    // 지도에 마커를 표시합니다
    marker.setMap(map);
    
    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        

        // 클릭한 위도, 경도 정보를 가져옵니다 
        var latlng = mouseEvent.latLng; 

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);

        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';

        var resultDiv = document.getElementById('clickLatlng'); 
        resultDiv.innerHTML = message;

    });
}

// 현재 위치 이동
function currentLocation (){
    alert("현재위치");
    // navigator.geolocation.getCurrentPosition(function(pos) {
    //     var latitude = pos.coords.latitude;
    //     var longitude = pos.coords.longitude;
    //     var container = document.getElementById('map');
    //     var options = {
    //         center: new kakao.maps.LatLng(latitude, longitude),
    //         level: 3
    //     };
    //     alert("container, options" + latitude+ ","+ longitude)
    //     map = new kakao.maps.Map(container, options);
    // });
}

// 검색키워드로 위치찾기
function searchKeyword(){
    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(); 
    
    // 키워드 취득
    var searchKeyword = document.getElementById("searchKey").value;
    
    if (searchKeyword === "") {
        alert("키워드를 입력해주세요");
    } else {
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(searchKeyword, placesSearchCB); 
    }

}

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    } 
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}