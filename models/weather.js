const request = require('request-promise');

const API_KEY = 'b0f3e3cdb5e3577fbb18e1a813cc9606';

class Weather {
    static retrieveByCity (city, callback) {
        request({
            uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
            json: true
        }).then((res) => {
            callback(res);
        }).catch((err) => {
            console.log(err);
            callback({ error: 'Could not reach OpenWeatherMap API.' });
        });
    }
}

module.exports = Weather;