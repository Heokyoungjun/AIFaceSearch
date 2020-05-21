function loading() {
 
  // Fakes the loading setting a timeout
    setTimeout(function() {
        $('body').addClass(' loaded');
    }, 3500);
 
}