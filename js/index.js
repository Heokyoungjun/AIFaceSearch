function init() {
    var lang;
    if (navigator.appName==="Netscape") {
        lang = navigator.language;
    } else {
        lang = navigator.userLanguage;
    }
    
    var langFalg=lang.substr(0,2);

    if (langFalg==="en") {
        window.location.replace("html/en/index.html");
    } else if (langFalg==="ja") {
        window.location.replace("html/ja/index.html");
    } else if (langFalg==="ko") {
        window.location.replace("html/ko/index.html");
    }
}