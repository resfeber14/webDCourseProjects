var n=document.querySelectorAll(".drum").length;
for(var i=0;i<n;i++){
    document.querySelectorAll("button")[i].addEventListener("click", function(){
        solve(this.innerHTML);
        animation(this.innerHTML);
    });      
}
document.addEventListener("keypress",function(event){
    solve(event.key);
    animation(event.key);
});
function solve(key){
    switch(key){
        case "w":
            var fir=new Audio("sounds/tom-1.mp3");
            fir.play();
        break;
        case "a":
            var sec=new Audio("sounds/tom-2.mp3");
            sec.play();
        break;
        case "s":
            var thi=new Audio("sounds/tom-3.mp3");
            thi.play();
        break;
        case "d":
            var fou=new Audio("sounds/tom-4.mp3");
            fou.play();
        break;
        case "j":
            var fif=new Audio("sounds/snare.mp3");
            fif.play();
        break;
        case "k":
            var six=new Audio("sounds/crash.mp3");
            six.play();
        break;
        case "l":
            var sev=new Audio("sounds/kick-bass.mp3");
            sev.play();
        break;
        default:

    }
}
function animation(k){
    var p=document.querySelector("."+k);
    p.classList.add("pressed");
    setTimeout(function(){
        p.classList.remove("pressed");
    },100);
    
    
}
