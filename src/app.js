const path = require("path")
const express = require ("express")
const app = express()
const hbs = require("hbs")
const geocode = require("./util/geocoding")
const forecast = require ("./util/forecast") 



//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views") //this is the path for views folder
const partialsPath = path.join(__dirname, "../templates/partials") //this is the path for partials folder

//setup handlebars 
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath) //this take a path to the directory where our partials lives  

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Mgbedoro Chinedu"
    })
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Mgbedoro Chinedu"
    })
})


app.get("/help", (req, res) => {
    res.render("help", {
        title:"Help page",
        name: "Mgbedoro  Chinedu"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide your search address"
        })
    }
geocode(req.query.address, (error, {latitude, logtitude, location} = {} ) => { //we set up an empty object default value  
        if(error){
 return res.send({ error }) 
} 
 forecast(latitude, logtitude, (error, forecastData) => { //using destructuring on forecast nested on geocode function
            if(error){
    return res.send({ error })//setting up destructuring, if there was an error, return error handler message on forecast.js
 }
            res.send({ //this code run if everything went well.
                forecast: forecastData,
                location,
                address: req.query.address
              
            })
        }) 
    })
})

app.get("/products", (req, res) => {
  
   if(!req.query.search){  
     return res.send({  
         Error: "Please must provide search term"
      }) 
   }
   console.log(req.query.search) 

   res.send({        
       products: []
   })
})


app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Mgbedoro Chinedu",
        errorMessage: "Article message not found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Mgbedoro Chinedu",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server have started")
})