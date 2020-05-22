window.onload=function(){

    if (screen.width <= 699) {
        document.location = "mobile.html";
    }

    const image = document.querySelector('#main-image');

    image.addEventListener('mouseenter',function(){
        image.setAttribute('src',"images/trick.jpg");
    })

    image.addEventListener('mouseleave',function(){
        image.setAttribute('src',"images/trouble.png");
    })



}