const request = require('postman-request');

const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0b8cf8893c55ca6db91c1310542d89c1&query=' + lat + ',' + lon;
    request({ url:url, json:true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service', null);
            return;
        }
    
        if ('error' in body) {
            callback(body.error.info);
            return;
        }

        const {weather_descriptions, temperature, precip, humidity} = body.current;
        callback(null, `${weather_descriptions[0]}, it is currently ${temperature} 
            degrees out and ${humidity}% of humidity. There is a ${precip}% chance of rain`);
    })
}

module.exports = forecast;