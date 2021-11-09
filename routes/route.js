const express = require('express');

const router = express.Router();


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.get('/test-me2', function (req, res) {
    res.send('hy,i am sonal')
});
/*Create an endpoint GET /movies 
is valid request and it should return the movie*/
router.get('/movies', function (req, res) {
    let movieslist = ['king','tanaji','shershah','golmaal']
    res.send(movieslist)
});
/*1.Create an endpoint GET /movies/indexNumber (For example GET /movies/1
 is a valid request and it should return the movie
  in your array at index 1)
2.Handle a scenario where if the index is greater
 than the valid maximum value
 a message is returned that tells the user to use a valid index*/

router.get('/movies/:indexNumber', function (req, res) {
    //console.log = req.params.indexlet
    let movieslist = ["king","tanaji","shershah","golmaal"] 
    let  index  = req.params.indexNumber 
    let movieAtindex = movieslist[index]
    if(index<movieslist.length){
        res.send(movieAtindex)
    }else{
        res.send("invalid index")
    }
     //res.send(movieAtindex)
});

/*3. Write another api called GET /films. Instead of an array of strings define an array of movie 
objects this time. Each movie object should have values - id, name. An example of movies
 array is this Return the entire array in this api’s response
 */
 router.get('/films', function (req, res) {
     let people = [ {
        id: 1,
        name: "The Shining"
         },
        {
        id: 2,
        name: "Incendies"
        }, 
        {
        id: 3,
        name: "Rang de Basanti"
        },
        {
        id: 4,
        name:"Finding Demo"
        }] 
       
    res.send(people)
});
/*4. Write api GET /films/:filmId where filmId is the value received in request path params. 
 Use this value to return a movie object with this id. In case there is no such movie 
 present return a suitable message in the response body. 
 Example for a request GET /films/3 should return the movie object */

router.get('/films/:filmId', function (req, res) {
    let people = [ {
       id: 1,
       name: "The Shining"
        },
       {
       id: 2,
       name: "Incendies"
       }, 
       {
       id: 3,
       name: "Rang de Basanti"
       },
       {
       id: 4,
       name:"Finding Demo"
       }]
   let  myId =  req.params.filmId
   let  filmlist = people[myId]
   if(myId<people.length){
       res.send(filmlist)
   }else{
       res.send("invalid id")
   }
})

module.exports = router;