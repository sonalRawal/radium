const axios = require("axios");
/*GOTO  http://api.openweathermap.org => “subscribe” current weather data ==> get
 api key for Free version ==> create new account and Verify your 
 emailId( Must verify to avoid issues) => go to My APi keys under your account
  name(top right corner) or https://home.openweathermap.org/api_keys => save the
  key/appid somewhere. Now proceed further

>>problem No. 1	
get weather of London from 
http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId> 
 (NOTE: must use HTTP infront of the url else axios will attempt to hit localhost
 and give error  ..also use HTTP only and not HTTPS)
*/
const getWeather = async function (req, res) {
    try {
        let city = req.query.q
        let appId = req.query.appid

        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`
        };
        let response = await axios(options)

        console.log(response.data)
        res.status(200).send({ msg: "Success", data: response.data })

        // problem No.2 then change the above to get the temperature only( of London)
        // let tempreture= response.data.maim.temp

        // console.log(tempreture)
        // res.status(200).send({ msg: "Success", data: tempreture})
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}



/* problem No 3
Sort the cities
 ["Bengaluru","Mumbai", "Delhi", "Kolkata","Chennai", "London", "Moscow"]
in order of their increasing temperature


result should look something like this
[

{city:"London", temp: 280},

{city:"Moscow", temp: 290},

{city:"Bangalore", temp: 301.2},
.......
]
*/
const getCityWeather = async function (req, res) {
    try {
        let cityTemp = []
        let city = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let appId = req.query.appid
        for (let i = 0; i < city.length; i++) {

            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=${appId}`
            };

            let weather = await axios(options)

            let temp = weather.data.main.temp

            cityTemp.push({ city: city[i], temp: temp })
        }
        console.log(cityTemp)
        cityTemp.sort(function(a, b) { return a.temp - b.temp } )
        console.log(cityTemp)
        res.status(200).send({ data: cityTemp })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}




module.exports.getWeather = getWeather;
module.exports.getCityWeather = getCityWeather