window.onload=function(){
let gridSize=32;

const slider = document.querySelector("#hardness-slider");
let brushHardness = Number(slider.value/100);

slider.oninput=function(){
    
    brushHardness=(this.value)/100;
    updateScreen();
}
updateScreen();

const container= document.querySelector("#container");
container.style["display"]="grid";
generate(32);



function generate(gridSize){

const boxSize =(80/gridSize);

container.style.gridTemplateRows=`repeat(${gridSize},${boxSize}vmin)`
container.style.gridTemplateColumns=`repeat(${gridSize},${boxSize}vmin)`

for(i =0; i <gridSize**2;i++){

    const div = document.createElement('div');
    div.style["width"]=boxSize;
    div.style["height"]=boxSize;
    div.style["border"]="1px rgba(0,0,0,.075) solid";
    div.style["font-size"]="8px";
    div.setAttribute("class","box")
    div.style["background-color"]="rgba(0,0,0,0)"
    


    container.appendChild(div);

    
    
}


const boxes = Array.from(document.querySelectorAll('.box'));


boxes.forEach(box => box.addEventListener("mouseover",function(){
    
    
    addOpacity(box,brushHardness);
})
)
}

function addOpacity(box,val){


    // if(val===1){
    //     box.style["background-color"]="black";
    //     return;
    // }
    let parts = (box.style["background-color"]).split(",");
    console.log(parts);
   parts[3]=Number((parts[3].split(")"))[0])+val;

   if(parts[3]>=1){
       parts = ["rgba(0",0,0,0,")"];
   }else{parts[3]+=")";}
   


   let newVal = ""

  for(i=0; i <parts.length;i++){
      newVal+= parts[i];
      if(i!=parts.length-1){
          newVal+=",";
      }
  }

   console.log(newVal);

   box.style["background-color"]=newVal;
   
}

function updateScreen(){
    const brushHardnessInfo = document.querySelector("#brush-hardness");
    const gridSizeInfo = document.querySelector("#grid-size");

    brushHardnessInfo.textContent=`Brush Hardness:${(brushHardness)>0.9?1:brushHardness}`;
    gridSizeInfo.textContent=`Grid Size: ${gridSize} x${gridSize}` ;
}

function reset(){
    
    gridSize = prompt("Enter size of new grid:");
    if(gridSize==""){
        gridSize=32;
    }
    document.getElementById("container").innerHTML="";
    updateScreen();
    generate(gridSize);

}

const resetbtn = document.querySelector("#reset-button");

resetbtn.addEventListener("click",function(){
    console.log("reset clicked")
    reset();
});





}