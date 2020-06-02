window.onload=function(){
    this.document.location = "awareness.html"
    


    const image = document.querySelector('#main-image');

    image.addEventListener('mouseenter',function(){
        image.setAttribute('src',"images/trick.jpg");
    })

    image.addEventListener('mouseleave',function(){
        image.setAttribute('src',"images/trouble.png");
    })

    image.addEventListener('click',function(){
        window.location = "awareness.html";
    })


}
