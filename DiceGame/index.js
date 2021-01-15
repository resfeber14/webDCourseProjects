var x=Math.floor((Math.random())*6)+1;
var img1="dice"+ x +".png";
var src1="images/"+img1;
document.querySelectorAll("img")[0].setAttribute("src",src1);
var y=Math.floor((Math.random())*6)+1;
var img2="dice"+y+".png";
var src2="images/"+img2;
document.querySelectorAll("img")[1].setAttribute("src",src2);
if(x>y){
    document.querySelector("h1").innerHTML="Player1 wins!";
}

else if(x<y){
    document.querySelector("h1").innerHTML="Player2 wins!";
}
else{
    document.querySelector("h1").innerHTML="Draw!";
}


