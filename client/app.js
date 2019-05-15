//code an app that uses jquery to call your API and display chirps
//creating functions for each method
//FUNCTION TO DISPLAY CHIRPS TO SCREEN
const displayChirps = (data) => {//pass in the data that we got in the request
    $('ul').empty(); //emptys out the list when a new chirp is displayed
    delete data.nextid; //data is an object with properties nextid is one of them
    //for in loop grabs the id out of data so we can loop through
    for (let id in data) {
        //create a new list item
        let li = $(`<li class = "list-group item d-block" id= ${id}> user: ${data[id].user} said: ${data[id].message}
         <button id="deletebtn" class="btn btn-danger" onclick= (deleteChirp(${id})) >X</button>
         <button id="editbtn" class="btn btn-primary" data-toggle="modal" data-target="#editmodal" onclick= (editModal(${id})) >Edit Chirp</button>
        </li>`)
        $('ul').append(li);
        // console.log(data[id].message); //objects work with key value pairs not index positions
    }
}

//event occurs in browser
//ajax creates an object request to the server (our api)
//server processes request and creates a response and sends data back to browser
//browser interprets data using js and updates the page content


//FUNCTION TO GET CHIRPS FROM SERVER
const getChirps = async () => {
    try {
        let data = await $.ajax({ //wait for the data
            type: "GET", //get request
            url: "/api/chirps" //the url with data we want to retrieve
        });
        displayChirps(data); //once we get the data, display them-- so the chirps we already have should be displayed
    } catch (err) {
        console.log(err)
    }
}
//FUNCTION TO POST CHIRPS
const postChirp = async (newChirp) => { //pass in the new chirp
    try { //want to make another request to server this time to post the data
        await $.ajax({
            type: 'POST',
            url: '/api/chirps',
            data: newChirp  //defining data as a newchirp parameter
        });
        $("#user").val(''); //clear out the input
        $('#message').val(''); //clear out the input
        getChirps();//get new list of chirps with additional chirps added
    } catch (err) {
        console.log(err)
    }
}

getChirps();

//button click to submit chirp
$('#submit-chirp').click(() => {
    event.preventDefault(); //keeps from refreshing form with click 
    //on click the newChirp will update to the value of whatever is typed in the inputs
    let newChirp = {
        user: $('#user').val(),
        message: $('#message').val()
    }
    postChirp(newChirp)// post request to server 
});


const deleteChirp = async (id) => {
    try {
        await $.ajax({
            type: 'DELETE',
            url: `/api/chirps/${id}`,
        })
        getChirps(); //make API request to get new list of chirps at this point in time and display them afterwards
        console.log(id)
    } catch (err) {
        console.log(err)
    }
}

const editChirp = async (id, chirp)=>{
    try{
        await $.ajax({
            type: 'PUT',
            url: `/api/chirps/${id}`,
            data: chirp 
        });
        getChirps(); //after chirp has been edited, it needs to get the new list of chirps and render to the screen
    }catch (err){
        console.log(err)
    }
}


//EDIT MODAL -- MAKE SURE IT IS PREFILLED WITH INFO WE NEED
const editModal = async (id) => {
    try {
let chirp = await $.ajax({ //this will get us our singular chirp
            type: 'GET',
            url: `/api/chirps/${id}`
        })
        $('#edittext').val(chirp.message);//fills in modals input with the value of the current chirp 
        $('.modal-title').attr('id',id)//select this h5 in the modal and assign an id attribute 
        $('.modal-title').text(`Edit Chirp #${id}`)//and assign text to it
        $('#edituser').val(chirp.user)
    } catch (err) {
        console.log(err)
    }
}

// when save changes button is clicked then get the id and the chirp and pass that in 
$("#savechanges").click(()=>{
    let id= $('.modal-title').attr('id')//returns the id of the modal title
    //need the user and the new chirp message
    let chirp= {
        user: $('#edituser').val(),
        message: $('#edittext').val()
    };
    editChirp(id, chirp);
})
    // replace the list content with text content typed in input




