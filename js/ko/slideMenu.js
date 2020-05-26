function sideMenu_init(){
    var slideMenu = document.getElementById("slide-menu");
    var menu = "";
    
    // 메뉴 설정
    // 홈
    menu += '<li><a class="slide-link slide-sub-title" href="../../html/ko/index.html">HOME</a></li>';
    // 지도관련
    menu += '<div class="sep settings"></div>';
    menu += '<div class="slide-sub-title">지하철 관련</div>'
    menu += '<ul>';
    menu += '<li><a class="slide-link" href="../../subway/ko/Subway.html">역주변 편의시설 검색</a></li>';
    menu += '<li><a class="slide-link" href="http://kko.to/gDdHx-MDM">지하철 노선도</a></li>';
    menu += '<li><a class="slide-link" href="https://map.kakao.com/link/map/37.402056,127.108212">다음지도</a></li>';
    menu += '</ul>';
    // 사진 테스트
    menu += '<div class="sep settings"></div>';
    menu += '<div class="slide-sub-title">사진 테스트</div>'
    menu += '<ul>';
    menu += '<li><a class="slide-link" href="../../html/ko/AIdog.html">강아기 종류 찾기</a></li>';
    menu += '<li><a class="slide-link" href="../../html/ko/AIhistory.html">역사인물상 테스트</a></li>';
    menu += '<li><a class="slide-link" href="../../html/ko/AIanimal.html">동물상 테스트</a></li>';
    menu += '</ul>';
    // 게임
    menu += '<div class="sep settings"/>';
    menu += '<div class="slide-sub-title">게임</div>'
    menu += '<ul>';
    menu += '<li><a class="slide-link" href="../../html/ko/Cube.html">cube</a></li>';
    menu += '<li><a class="slide-link" href="../../html/ko/Rabbit.html">rabbit run</a></li>';
    menu += '<li><a class="slide-link" href="../../html/ko/MemoryGame.html">memory game</a></li>';
    menu += '<li><a class="slide-link" href="../../html/ko/Sudoku.html">sudoku</a></li>';
    menu += '<li><a class="slide-link" href="../../html/ko/Tetris.html">tetris</a></li>';
    menu += '</ul>';
    // 블로그
    menu += '<div class="sep settings"/>';
    menu += '<div class="slide-sub-title">블로그</div>'
    
    slideMenu.childNodes[1].innerHTML = menu;
    
    /*
      Slidemenu
    */
    (function() {
        var $body = document.body
        , $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];

        if ( typeof $menu_trigger !== 'undefined' ) {
            $menu_trigger.addEventListener('click', function() {
                $body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
            });
        }

    }).call(this);
}
