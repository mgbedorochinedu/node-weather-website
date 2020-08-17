const request = require("request")

const forecast = (latitude, logtitude,  callback) => {
    const url =  "http://api.weatherstack.com/current?access_key=60537d03392fde3414336c0626ff83e5&query=" +encodeURIComponent(latitude) + ","+ encodeURIComponent(logtitude)


    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to weather service", undefined)
        } else if(body.error){
            callback("Unable to find location", undefined)
        } else{
            console.log()
          
            callback(undefined, 
                body.current.observation_time + ": " + "It is " + body.current.weather_descriptions + " and currently " + body.current.temperature + " degree out. There is a " + body.current.precip + "% chance of rain."
            )
        }
    })
}
module.exports = forecast