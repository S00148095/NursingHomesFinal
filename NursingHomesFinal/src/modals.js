//this'll handle modals
$( document ).ready(function() {    

    $(".info-edit.changeName").click(function(){
        $('.ui.modal.change-user-name')
            .modal()
        ;
        alert('n');
    });

    
    
});//end doc.ready


function modalName(){
    $('.ui.modal.change-user-name')
            .modal({
                inverted: true
            })
            .modal('show')
        ;
}

function modalEmail(){
    $('.ui.modal.change-email')
            .modal({
                inverted: true
            })
            .modal('show')
        ;
}

function modalPassword(){
    $('.ui.modal.change-password')
            .modal({
                inverted: true
            })
            .modal('show')
        ;
}

function modalRespondToReview(id){
    $('.ui.modal.respond-to-review.'+id)
            .modal({
                inverted: true
            })
            .modal('show')
        ;
}