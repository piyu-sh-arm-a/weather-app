const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
//console.log(publicDirectoryPath)
const viewsPath = path.join(__dirname, '../templates/views')
//console.log(viewsPath)
const partialspath=path.join(__dirname,'../templates/partials')
//console.log(partialspath)
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'piyush sharma',
        author:'piyush'
       
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'piyush',
        author:'piyush'
        
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        author:'piyush'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send("please enter the address")
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error:error})
            }
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
        })
    })
    /*res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia',
        address:req.query.address
    })*/

})
app.get('/help/*',(req,res)=>{
    res.render('404',{
    title:'404',
    name:'piyush',
    errormessage:'404 help page not found',
    author:'piyush'
})
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'piyush',
        errormessage:'404 page not found',
        author:'piyush'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})