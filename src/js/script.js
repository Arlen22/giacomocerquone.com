(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-66906230-1', 'auto');
ga('send', 'pageview');

(function() {
  var burgerMenu  = document.getElementById('burger'),
      header      = document.getElementById('header'),
      main        = document.getElementById('main'),
      burgerIcon  = document.getElementById('burger-icon');

  burgerMenu.addEventListener('click', function() {
    if(burgerIcon.classList.contains('fa-bars')) {
      header.style.right = '0';
      main.style.transform = 'translateX(-16em)';
      burgerIcon.classList.add('fa-times');
      burgerIcon.classList.remove('fa-bars');
    } else {
      header.style.right = '-16em';
      main.style.transform = 'translateX(0em)';
      burgerIcon.classList.remove('fa-times');
      burgerIcon.classList.add('fa-bars');
    }

  });
})();
