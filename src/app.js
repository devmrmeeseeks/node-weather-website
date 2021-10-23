const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Robert Guzman'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Robert Guzman'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Contact email: rguzmanrosales@gmail.com',
        name: 'Robert Guzman'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'You must provide an address'
        });
    }
    
    geocode(req.query.address, (error, { lon, lat, location } = {}) => {
        if (error) {
            return res.send({
                errorMessage: error
            });
        }
        
        forecast(lon, lat, (error, forecast) => {
            if (error) {
                return res.send({
                    errorMessage: error
                });
            }
            
            res.send({
                forecast: forecast,
                location: location,
                address: req.query.address
            });
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errorMessage: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article not found',
        errorMessage: 'Help article not found',
        name: 'Robert Guzman'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        errorMessage: '404 page',
        name: 'Robert Guzman'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});