//code an app that uses jquery to call your API and display chirps

$(document).ready = () => {
    //GET REQUEST
        $.ajax({
            type: 'GET',
            url: '/api/chirps',
            dataType:'json',
            success: (result)=>{
                console.log(result)
            } 
            })
    }
    $('.btn').click = () => {

    //use button click event to call the API
    //add x next to each chirp that will delete the chirp 
    //when clicked
    //when a chirp is clicked- a popup modal lets you edit the chirp
    //use express static middleware
    //jquery functions for calling API's: $.ajax, $.get $.post
}
