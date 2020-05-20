function loading() {
  var counter = 0;
  var c = 0;
  var i = setInterval(function(){
      $(".loading .counter h1").html(c + "%");
    counter++;
    c++;

    if(counter == 101) {
        clearInterval(i);
    }
  }, 50);
}