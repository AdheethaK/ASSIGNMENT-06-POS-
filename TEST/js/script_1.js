
window.onload = () =>{
    console.log("A")
    $('#preloader').css("display","none")
    $('#preloader-overlay').css("display","none")
}

document.addEventListener("DOMContentLoaded", () =>{
    console.log("B")
});

$(window).ready(() =>{
    console.log("C")
})