window.onload=function(){
    const image = document.querySelector('#main-image');

    image.addEventListener('mouseenter',function(){
        image.setAttribute('src',"images/trick.jpg");
    })

    image.addEventListener('mouseleave',function(){
        image.setAttribute('src',"images/trouble.png");
    })



}