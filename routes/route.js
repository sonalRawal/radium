//get type API

const express = require('express');

const router = express.Router();



//assignment problem solving

let  filmArray = [{
                  "id"      :  "1",
                  "name"    : "The Shining",
                  "rating"  :  "8",
                 "director": "Stanley Kubrik",
                  "genre"   : "horror"
                 },
                 
                 {"id"      :  "2",
                 "name"    : "kabir shing",
                 "rating"  :  "9",
                "director": "vishnuvardhan",
                 "genre"   : "action"
                 },
 
                 {"id"      :  "3",
                 "name"    : "padmaavat",
                 "rating"  :  "9",
                "director": "sanjay leela bhansali",
                 "genre"   : "bollywood historical film"
                 },
 
                 {"id"      :  "4",
                 "name"    : "shershaah",
                 "rating"  :  "7",
                "director": "sandeep reddy",
                 "genre"   : "action"
                 }]
/*problem 1.Write a GET api to fetch specific movies (path -> /specific-movies) with the help
   of query params - rating and genre. You have to return only those movies in the response 
   that have the rating and genre received in query parameters in the request.
*/
     
 router.get('/specific-movies', function (req, res) {
      let film = filmArray.filter(x=> x.rating==req.query.rating && x.genre===req.query.genre)
      //console.log(film) 
      res.send(film.length==0?"cant find":film)
 });
/*Problem 2 :
Write a POST api to add a movie to the movies collection (path -> /specific-movies ). 
You have to make sure you provide all the details of the movie in the request at 
Postman (movie details must have an id, name, rating, director and genre) as well as that you 
return the updated array in the response
Problem 4
For this problem you don’t have to write a new api you have to update the logic in problem 2’s api. 
This time you must check the value of rating as well the value of director in the request. 
If the rating has value greater than 10, return a message in the response informing that the 
maximum value a rating can have is 10. If the director value is not present in the request you 
have to return a message in the response informing the director value must be present. 
In case both the problems exist for example the data looks like bel

*/

  router.post('/specific-movies2', function (req, res) {
    
    let rating = req.body.rating;
    let director = req.body.director;
    //console.log(director)
    if (!director) {
     res.send("Director information must be present in the request");
     } else if (rating > 10) {
        res.send(" A valid rating value is between 1 and 10");
    } else {
      let input =req.body                                          
       filmArray.push(input)                                          // id: req.body.id,
       res.send( {data: filmArray})                                  //name: req.body.name,                                                            //name: req.body.name,
    }                                                                // rating: req.body.rating,
    }                                                                // director: req.body.director,
    )                                                                // genre: req.body.genre,

 /*Problem 3 
Write a GET api (path -> /best-movie) that returns only one movie that has the highest rating in the
 collection. In case there are multiple movies with the highest rating value, return any one out of those.
 */

    router.get('/best-movie', function (req, res) {
      let   hRating = 0
       let  hRatingIndex = 0

       for(let i=0;i<filmArray.length;i++){

          if( filmArray[i].rating > hRating ){

                   hRating = filmArray[i].rating 
                   hRatingIndex = i   
          // console.log(hRating)
         }

    }
     res.send("The highest rated movie is: " + filmArray[hRatingIndex].name);
      
    
 });



 /*
1.Write an api which gives the missing number in an array of integers starting from
        1….e.g [1,2,3,5,6,7] : 4 is missing
logic : sum of numbers is n(n+1)/2.. so get sum of all numbers in array.now take sum of 
numbers till last digit in the array : lastDigit = array.pop 
*/

  router.get("/problemReq1", function (req, res){

    let array = [1,2,3,5,6,7]
     

    let total = 0;
    for(let i=0;i<array.length;i++){
        total +=array[i]
    }

    let lastDigit = array.pop()
    let consecutiveSum = lastDigit*(lastDigit+1) /2
    let missingNumber = consecutiveSum - total 
    
    res.send({data:missingNumber});
})
/*
2.-write an api which gives the missing number in an array of integers starting 
from anywhere….e.g [33, 34, 35, 37, 38] : 36 is missing
 logic : sum of n consecutive numbers is [n*(first + last)/2] and n = array.length+1

*/

 router.get ('/problemReq2' , function (req, res){
 let array = [33,34,35,37,38]
 let len = array.length

    let total = 0;
    for(let i=0;i<array.length;i++){
        total +=array[i]
    }
    let firstDigit = array[0]
	let lastDigit = array.pop()
	let consecutiveSum = (len+1)*(firstDigit+lastDigit)/2
	let missingNumber = consecutiveSum - total 
    
  res.send(  { data : missingNumber } );

});	




// weekend long API problem
    let playerCollection = [
        {
            "name" : "manish",
            "dob"  : "1/1/1995",
            "gender" : "male",
            "city" :  "jalandhar",
            "sports" : ["samming"],
           "bookings" : "3"
        },
        {
            "name" : "jitendhar",
            "dob"  : "2/4/1996",
            "gender" : "male",
            "city" : "hyderabad" ,
            "sports" :["cricket"],
           "bookings" :"4"
        },
        {
            "name" : "sonu",
            "dob"  : "7/9/2000",
            "gender" : "female",
            "city" :  "sirohi",
            "sports" :[ "badminton"],
           "bookings" :"4"
        },
        {
            "name" : "kiran",
            "dob"  : "26/9/1997",
            "gender" : "female",
            "city" :  "udaipur",
            "sports" :["volleyball"],
           "bookings" :"2"
        }
    ]

/*problem 1 : your player collection should be an array of player objects. write a POST /player api that
 saves a player's details and  dosn't allow saving the data of player with a name that alredy exist in the data 
*/ 
 router.post('/players', function (req, res) {
        let input = req.body
        let nameRepeted =false
      
       for(let i=0; i < playerCollection.length; i++){
    
         if(playerCollection[i].name == input.name){
             nameRepeted = true;
             break ;  
         }       
        } 
       if(nameRepeted){
           res.send("can not allow to add")
    
       }else{
           playerCollection.push(input) 
         res.send(playerCollection)
       }
             
    })
    let player = [{
        "name" : "manish",
        "dob"  : "1/1/1995",
        "gender" : "male",
        "city" :  "jalandhar",
        "sports" : ["samming"],
       "bookings" : "3"
    }]

    let booking=[{
        "bookingNumber": 1,
        "sportId": "",
        "centerId": "",
        "type": "private",
        "slot": 16286598000000,
        "bookedOn": "31/08/2021",
        "bookedFor": "01/09/2021"
        }];
// problem 2 solve 
    router.post('/players1/:playername/booking/:bookingid' , function(req,res){
        let newBooking =req.body;    //Accessing the value from post body

        let bookId =req.params.bookingid;   //Accessing the value from bookingid variable

        let playerName=req.params.playername; ////Accessing the value playername variable

        let len =player.length;            // calculating the length of player array

        let lenOfBookArr=booking.length;
        let b=0;
        let flag=true;
        for(let i=0;i<len;i++)        // Array traversal is performed
        {
            if(player[i].name==playerName){    //Cheking the player name is exists or not
                b=1;
            }
            if(lenOfBookArr>0){               // cheking the if booking is empty or noot
                if(booking[i].bookingNumber==bookId) //Cheking the booking id is exists or not
                {
                    flag=false;
                }
    
            }
        }
        if(b===0)
        {
            res.send("The player doesnot exits");// throw the Error message to the client 
        }
        else{
            if(flag===false)
            {
                res.send("This id is already exists");    // Throw the erroe message to the client if given id is already exists
            }
            else{
                booking.push(newBooking);
                res.send(booking);
            }
    
        }   


    });


module.exports = router;
