//code an app that uses jquery to call your API and display chirps
//creating functions for each method
//FUNCTION TO DISPLAY CHIRPS TO SCREEN
const displayChirps = (data) => {//pass in the data that we got in the request
    $('ul').empty(); //emptys out the list when a new chirp is displayed
    delete data.nextid; //data is an object with properties nextid is one of them
    //for in loop grabs the id out of data so we can loop through
    for (let id in data) { 
        //create a new list item
        let li = $(`<li class = "list-group item" id= ${[id]}> user: ${data[id].user} said: ${data[id].message}</li>`)
        $('ul').append(li); 
        // console.log(data[id].user)
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
        console.log(newChirp)
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
    console.log(newChirp)
    postChirp(newChirp)// post request to server 
});



    //use button click event to call the API
    //add x next to each chirp that will delete the chirp 
    //when clicked
    //when a chirp is clicked- a popup modal lets you edit the chirp
    //use express static middleware
    //jquery functions for calling API's: $.ajax, $.get $.post

    //on click-- editing posts and deleting posts-- add X button
    //button onclick ="deleteChirps($(id)"

    // const deleteChirp =async(id)=>{
    //     console.log(id);
    // }

      // const editChirp =async(id)=>{
    //     console.log(id);
    // }


    //modals exists in the DOM as is -- copy and past from bs
    //paste in index.html
    //turns itself on and off-toggle
    //data target
    //data toggle="modal"
    //add another button called Edit in app.js when button clicked modal is popped up
    //

    //save chancegs button and the button will have to call request
    // $('#save-edit').click(())
    //.unbind