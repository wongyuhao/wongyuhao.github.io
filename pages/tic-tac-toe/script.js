const GameboardFactory = (()=>{
  let board = [];
  let players=[]
  let chars=["x","o"];
  let turn;
  let win = false;
  let winPlayer = null;
  let moves =[];

  const endOverlay = document.querySelector("#end");
  const p1 = document.querySelector("#p1");
  const p2 = document.querySelector("#p2");
  
  const init = (player1,player2) => {
    p1.classList.remove("hidden")
    p2.classList.add("hidden")
    endOverlay.classList.add("hidden");
    players.push(player1);
    players.push(player2);
    turn =0;
    for (var i =0 ; i < 3; i++){
      board.push(["_","_","_"])
    }

    
  }
  const boardFull =(arr)=>{
    for (let i =0; i<arr.length;i++){
      for (let j = 0; j<arr[0].length;j++){
        if (arr[i][j]==="_"){
          return false;
        }
      }
    }
    return true
  }

  const place = (row,col) =>{
    if(board[row][col] === "_"){
      board[row][col] = chars[turn%2];
      moves.push([row,col]);
      console.log(`${currentPlayer().name} placed ${chars[turn%2]} at [${row}][${col}]`)
      console.log(`Turn: ${turn}`)
      p1.classList.toggle("hidden")
      p2.classList.toggle("hidden")
      

      if(!checkBoard(board)&&boardFull(board)){
        end();
      }
      turn++;
      
      return true
    }else{
      console.log("Space occupied!")
      return false
    }
  }

  const currentPlayer = () =>{
    return players[turn%2];
  }

  const winningRow = (board) =>{

    for(let i = 0; i <board.length; i++){
      if(evaluate(board[i])){
        win = true;
        winPlayer= currentPlayer();
        return true;
      }
    }

    return false;

   
  }

  const winningCol = (board)=>{
 
    for (let col = 0; col <board[0].length; col++){
      check =[]
      for (let row = 0; row <board.length; row++){
        check.push(board[row][col])
      }
      if(evaluate(check)){
        winPlayer= currentPlayer();
        win = true;
        return true;
      }
    }
    return false;
  }

  const winningDiag = (board) => {
    arr1 =[]
    arr2=[]

    for (let i =0; i<board.length; i++){
      arr1.push(board[i][i])
      arr2.push(board[i][2-i])
    }

    if(evaluate(arr1)||evaluate(arr2)){
      win = true;
      winPlayer = currentPlayer();
      return true;
    }

    return false;


  }

  const checkBoard = (board) => {
    console.log("checking...")
    
    if (winningRow(board)||winningCol(board)||winningDiag(board)){
      console.log(`${win} = ${winPlayer.name}`)
      end();
      return true;
    }else{
      console.log("nothing")
      return false;
    }
  }

  const evaluate = (arr)=>{
  
    if (arr.length!== 3){
      return false;
    }
    for(let i = 0; i < arr.length - 1; i++) {
        if(arr[i] !== arr[i+1]||arr[i]==="_"){
            return false;
        }
    }
    
    
    return true;
    
  }

  const undo =()=>{
    console.log("undo...")
    if (moves.length!==0){
      let coords = moves.pop();
      board[coords[0]][coords[1]] ="_";
      console.log(`reset cell [${coords[0]}][${coords[1]}]`)
      turn++;
      p1.classList.toggle("hidden")
      p2.classList.toggle("hidden")
    }
    
  }

  const end = () => {
    console.log("end of game")
    
    
    endOverlay.classList.remove("hidden")
    const winner = document.querySelector("#winner")
    

 
    if(win){


      winner.style.color = (winPlayer===players[0] ? "rgb(255, 0, 155)" : "rgb(0, 255, 255)");
      winner.style["font-weight"]= "bold"
      winner.innerHTML =`${winPlayer.name} wins!`

    }else{
      winner.style.color = "white";
      winner.innerHTML =`It's a Tie!`
    }
    const cells = Array.from(document.querySelectorAll(".cell"))
    cells.forEach(cell=> {
      cell.style.pointerEvents = "none";
      
    })
  }
  

 



 return {
  init,
  place,
  board,
  players,
  undo

 }
}
)

const playerFactory =((name)=>{
  return {
    name
    
  }
}
)



const displayController = (()=>{
  
  
  
  let game =null;  

  const board = document.getElementById("board")
  
  

  
  
  const truncate = (str, n)=>{
    return (str.length > n) ? str.substr(0, n-1) : str;
  };
  
  const init =()=>{  
   
   startMenu.classList.add("hidden")
   let name1 = truncate(document.forms["nameForm"]["name1"].value, 20);
   let name2 = truncate(document.forms["nameForm"]["name2"].value, 20);

    board.innerHTML="";
    game = GameboardFactory();
    
    if (name1 ===""){
      name1 = "Player 1"
    }
    if (name2 ===""){
      name2 = "Player 2"
    }
    game.init(playerFactory(name1),playerFactory(name2))

    const p1t = document.querySelector("#p1");
    p1t.textContent= `${game.players[0].name} [X]`
    p1t.style.color = "rgb(255, 0, 155)"

    const p2t = document.querySelector("#p2");
    p2t.textContent= `${game.players[1].name} [O]`
    p2t.style.color = "rgb(0, 255, 255)"

    
    
    for (row in game.board){
      for(col in game.board[0]){
        const cellDiv=document.createElement("div")
        const img = document.createElement("img")

        img.src=findAsset(game.board[row][col]);        
        img.style.width="100%";
        img.style.display = "block";
       
        
        img.setAttribute("class","image");
        img.setAttribute("id", `${row}-${col}-img`)
        

        cellDiv.style["background-color"]= "rgba(0,0,0,0.3)";
        
        
        cellDiv.setAttribute("class","cell");
        cellDiv.setAttribute("id", `${row}-${col}-div`)

        cellDiv.appendChild(img)
        board.appendChild(cellDiv);
      }
    }

    addListeners();
    render();

  }

  const render = () => {
    console.log("rendering...")
   
      
    
   

    const images = Array.from(document.querySelectorAll(".image"))
    images.forEach(image=> {
      const coords = image["id"].split("-");

     image.src = findAsset(game.board[coords[0]][coords[1]]);
           
    })
  }

  const findAsset = (cell) => {
    switch(cell){
      case "x": 
       return "assets/x.png";
        
      case "o":
        return "assets/o.png";
      default:
        return "assets/blank.png";
    }
  }

  const addListeners = () =>{
    const undo = document.querySelector("#undo");
    undo.addEventListener("mouseup", function(){
      game.undo()
      render();
    })

    const cells = Array.from(document.querySelectorAll(".cell"))
    cells.forEach(cell=> {
      cell.style.cursor = "pointer";
      cell.addEventListener("click",function(){
        const coords = cell["id"].split("-")
        game.place(coords[0],coords[1]);
        render();
      })
    })
    
  }

  

  return {
    init,
    game
 
  }

})();






  displayController.init

  const start = document.querySelector("#start")
 
  start.addEventListener("click", function(){

    displayController.init();
  })
  const reset = document.querySelector("#reset");
  reset.addEventListener("click",displayController.init)
  
  
  

  

