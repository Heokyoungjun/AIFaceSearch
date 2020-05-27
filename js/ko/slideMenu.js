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
    menu += '<li><a class="slide-link" href="http://kko.to/gDdHx-MDM" target="_blank">지하철 노선도</a></li>';
    menu += '<li><a class="slide-link" href="https://map.kakao.com/link/map/37.402056,127.108212" target="_blank">다음지도</a></li>';
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
                if ($body.className === 'menu-active') {
                    $body.className = '';
                } else if ($body.className === '') {
                    $body.className = 'menu-active';
                } else if ($body.className === 'loaded') {
                    $body.className = 'menu-active loaded';
                } else if ($body.className === 'menu-active loaded') {
                    $body.className = 'loaded';
                }
                
                // $body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
            });
        }

    }).call(this);
    
    // Copyright (c) 2020 by Jason Howmans (https://codepen.io/jasonhowmans/pen/dykhL)
    // Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use,
    //         copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission
    //         notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR
    //         A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
    //         THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
}
