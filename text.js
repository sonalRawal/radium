 // let allBooks= await BookModel.find()
        // let allBooks= await BookModel.find().count()
        // let allBooks= await BookModel.find( { sales: 0 } )
        // let allBooks= await BookModel.find( { sales: 0 } ).count()

        //and is when all the conditions have to be true
        // or is when even if any condition is true , it is included
        // let allBooks= await BookModel.find( { sales: 0 , isPublished : false} )
        // let allBooks= await BookModel.find(  {  $or: [ {sales: 0} , {isPublished : false} ]  } )  
        // let allBooks= await BookModel.find(  {  $or: [ {sales: 0} , {isPublished : false} ]  }  ).count()             
        //  allBooks= await SalesModel.find({phoneName: "OnePlus7", createdAt: {$gt:"21-03-1999"}  }  ).count()             


        // let allBooks= await BookModel.find( {  sales:   { $gt: 10}     }  )
        // let allBooks= await BookModel.find( {  sales:   { $lt: 10}     }  )

        
        // let allBooks= await BookModel.find( {  sales:   { $gte: 10   }    }  )
        // let allBooks= await BookModel.find( {  sales:   { $lte: 10   }    }  )

        // let allBooks= await BookModel.find( {  sales:   { $ne: 0   }    }  )
        // let allBooks= await BookModel.find( {  sales:   { $in: [ 0, 100, 4 , 1 ,2 ,3]   }     }  )
        // let allBooks= await BookModel.find( {  sales:   { $nin: [ 0, 100, 4 , 1 ,2 ,3]   }     }  )


        // let allBooks= await BookModel.find( ).sort(  { bookName: 1 } ) //ascending sort

        // let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: -1 } ) //descending sort :-1

        // let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: 1 } ).limit(2) //limit will give only next 2 elements

        // let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: 1 } ).limit(2).skip( 3 ) //SKIP is used for pagination
        // let allBooks= await BookModel.find( {  sales: { $gt: 0   }  } ).select( { bookName: 1, sales: 1, _id: 0 } )


        // let allBooks= await BookModel.findById(     mongoose.Types.ObjectId('61922aacac5fa8b15518d590') )




        // REGULAR EXPRESSIONS(regex) : 

        // let allBooks= await BookModel.find( {  bookName: /.*Node.*/i   } ) //has the word Node 
        // let allBooks= await BookModel.find( {  bookName: /Node$/i   } ) //ends with Node
        // let allBooks= await BookModel.find( {  bookName: /^Intro/i   } ) //starts with Node


        //let allBooks= await BookModel.find( { "prices.europeanPrice" : "4Pounds"} ) 
        // without await, this line will start to get executed..but the server will move to next line without 
        //COMPLETING the execution..this might cause code to break in the next few lines
        // hence we use await to ask the program to wait for the completion of this line..till this line completes,
        // execution wont move to next line

        // await is typically used at 2 places:
            //- intearacting with database
            //- calling another service (axios)..will be covered next week


        //NOTE: await can not be used inside array functions like forEach / map / filter etc..self discovery and do post 

    /*
        "bookName":"the diary of anne frank ",
        "ISBN"  : "23erft56",  
    "authorName":"anne frank",
    "year":1947,
    "category":"autobiography",
    "prices":{
    "indianPrice":"500",
    "europeanPrice":"100"
    },
    "tags":["#inspiration" ,
            "#best book"
    ],
    "totalPages":5000,
    "stockAvailable":true
    }

    const createBook = async function (req, res) {
        let  book= req.body
         //console.log(book)
        // book.completionDate = new Date(req.body.completionDate) 
         //console.log(book)
        let savedBook= await BookModel.create(book)
        res.send({msg: savedBook})
    }
    
    completionDate: {type: Date, default: Date.now }, //new Date()  //momentjs
    summary: mongoose.Schema.Types.Mixed,

    isDeleted : {type: Boolean, default: false}

    // summary : "this is a suspense novel"
    //  summary : ["ch1: Intro to backend", "ch2: intro to mongodb", "ch3: intro to nodejs:"]
    // summary : { 
    //              chapter1: "How to get started with tech",
    //              chapter2: "lets start with basics"
    //             }


// mongo session 3: session/schema-basic3
router.get('/getFirstBook',  BookController.getBook  );
router.post('/updateBooks',  BookController.updateBooks  );

router.post('/deleteBook',  BookController.deleteBook  );

//>>>book controller <<<<<<

const getBooksData = async function (req, res) {
  let allBooks = await BookModel.find();
  res.send({ msg: allBooks });
};

const getBook = async function (req, res) {
  let book = await BookModel.findOne (  {sales: 9 });
//   if (book.length != 0 ) {
    if (book ) { // any value present (except falsey) gets evaluated as true... null, 0  automatically defaults to false
      console.log("HI I FOUND A BOOK")
  }
  else console.log("NO BOOK FOUND")
  res.send( book );
};

const updateBooks = async function (req, res) {
//   let books = await BookModel.updateMany (  {isPublished: false } ,  {author : "PK"}   );  // first json is the query condition  || second condition is the required update or change
//   let books = await BookModel.findOneAndUpdate(  {isPublished: true } ,  {author : "Sabiha"}   );  // it updates only the first matching doc
//   let books = await BookModel.findOneAndUpdate(  {isPublished: true } ,  {author : "Sabiha 3"} , { new: true}  );  // third param : new: true - will give you the updated document
  
//  upsert: true - it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document
let books = await BookModel.findOneAndUpdate(  {bookName : "Hi Pritesh2" } ,  {bookName : "Hi My New Book" , ISBN : "basd87g8h7a88b"} , { upsert: true}  );  
  
//   { author : "PK" }
//   { $set: {author: "PK"}   }
  res.send( books );
};


const deleteBook = async function (req, res) {
    let books = await BookModel.findOneAndUpdate(  req.body ,  {isDeleted: true}  );  
    res.send( books );
};

module.exports.createBook = createBook;
module.exports.getBooksData = getBooksData;
module.exports.getBook = getBook;
module.exports.updateBooks = updateBooks;
module.exports.deleteBook = deleteBook;


    */