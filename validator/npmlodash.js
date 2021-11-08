/*
4. Using the package ‘lodash’ solve below probolems
-Create an array of strings containing the names all the months of a year and split the array into 4 
equally sized sub-arrays using the chunk. */
const _= require('lodash')
let month  = ["jan","fab","march","april","may","jun","jul","aug","sep","oct","nov","dec"]
const a = _.chunk(month,3)
console.log(a)


/*-functionUsing the tail function, return the last n-1 elements of an array containing the first 10 odd 
numbersCreate 5 arrays of numbers containing a few duplicate values. */

const b = _.tail([1,2,3,4,5,6,7,8,9,10])
console.log(b)
//-Using the function union create a merged array with only unique valuesUse .
 const c = _.union([1],[1,2],[1,2,3],[1,2,3,4],[1,2,3,4,5])
 console.log(c)

/*-the function fromPairs to create a object contating key value pairs.
 For example [“horror”,”The Shining"],[“drama”,”Titanic"],[“thriller”,”Shutter Island"],[“fantasy”,”Pans Labyrinth"]
 */

 const d= _.fromPairs(['horror',"the shining"],['drama',"titanic"],['thriller',"shutter island"],['fantasy',"dilisios"])
 console.log(d)



