const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=f3d3b7e1b53e8b90c88dd1eba2c92be2&query=' +latitude  +',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.location.timezone_id + ' It is currently ' + body.current.temperature + ' degress out. feels like '+ body.current.feelslike +', weather description:' + body.current.weather_descriptions[0]+' ,visiblity:'+body.current.visibility+'km.'+'wind speed: '+body.current.wind_speed+' wind degree: '+body.current.wind_dir)
        }
    })
}

module.exports = forecast