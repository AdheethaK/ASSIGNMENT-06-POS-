$('#triggerInner1').click(function(){
    if($(this).is(':checked')){
        $("#trigger1+input+input+input+input+input+input+div+div").css({"background-color": "yellow"});
    }else{
        $("#trigger1  + input + input + input + input + input + input+ div + div").css({"background-color": "white"});

    }
});