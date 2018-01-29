
$( document ).ready(function() {

    var menuDisplayed = false;
    $( ".cross" ).hide();
    $( ".menu" ).hide();
    $( ".hamburger" ).click(function() {
        $( ".menu" ).slideToggle( "slow", function() {
            $( ".hamburger" ).hide();
            $( ".cross" ).show();
            menuDisplayed = true;
        });
    });
    
    $( ".cross" ).click(function() {
        $( ".menu" ).slideToggle( "slow", function() {
            $( ".cross" ).hide();
            $( ".hamburger" ).show();
            menuDisplayed = false;
        });
    });

    

    $( document ).click(function(){
        //console.log('clicked, and menuD = ' + menuDisplayed);
        if (menuDisplayed){
            $( ".cross" ).hide();
            $( ".menu" ).hide();
            $( ".hamburger" ).show();
            menuDisplayed = false;
        }
    });
    
});//end doc.ready