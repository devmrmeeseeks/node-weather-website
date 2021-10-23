
const request = require('postman-request');

const geoCode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicmd1em1hbnJvc2FsZXMiLCJhIjoiY2t1dXZ5YjlrNjM2OTJxbWFiMWx0aXZyMiJ9.8IGToA_6Is4AcotcUE4a7A&limit=1';


    request({ url: geoUrl, json:true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services');
            return;
        }

        if ('message' in body) {
            callback(body.message, null);
            return;
        }
 
        if (body.features.length === 0) {
            callback('Unable to find location. Try another search');
            return;
        }

        const coordinates = body.features[0].center;
        callback(null, {
            lon: coordinates[0],
            lat: coordinates[1],
            location: body.features[0].place_name
        });
    })
}

module.exports = geoCode;