const loader = document.getElementById("loader")
const c = document.querySelector(".container");
const icon = document.querySelector(".icon");
const select = document.getElementById("select");
const main = document.getElementById("main");
const des = document.getElementById("des");
let time;
const key = "d7be7852b7457e8485d35e5a15dd40ca";
const lang = "en"
//https://countriesnow.space/api/v0.1/countries
//https://restcountries.com/v3.1/all
//https://countriesnow.space/api/v0.1/countries/currency
// require('dotenv').config();
// console.log(process.env)

async function getAllCities(){
    const response = await fetch(`https://countriesnow.space/api/v0.1/countries`)
    const data = await response.json();
    // console.log(data.data)
    createOption(data.data)
}
getAllCities()
function createOption(countries){
    // countries.map(e=>console.log(e.country))
    // countries.map(e => e.cities.map(city=> console.log(city+" "+e.country)))
    // ${countries.map(e => e.cities.map(city=> `<option>${city},${e.country}</option>`)) }
    document.getElementById("s").innerHTML = `
    <select id="select" onchange="getCity(this.value)">
        <option disabled selected>Choose Country</option>
        ${countries.map(e => `<option>${e.country}</option>`) }
        
    </select>
    `
}

async function render(cityname, countrycode){
    try {
        // https://api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid={API key}
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname},${countrycode}&lang=${lang}&units=metric&appid=${key}`)
        const data = await response.json();
        console.log(data)
        
        getWeather(data)
        // console.log(time)
    } catch (error) {
        clearInterval(time)
        console.log("Not Found, Error From OpenWeather")
    }
}
function getCity(city){
    let countrycode = '';
    // let cityname = value;
    // let cityname = select.options[select.selectedIndex].value;
    clearInterval(time)
    if(city == "Choose Country") return;
    let cityname = city.replace(/ /g, "+")
    // cityname = cityname.replaceAll("(", "")
    // cityname = cityname.replaceAll(")", "")
    if((city.indexOf("(") && city.lastIndexOf(")")) != -1){
        // cityname = city.substr(city.indexOf("("),city.lastIndexOf(")")+1)
        cityname = cityname.substr(0,city.lastIndexOf("(")-1)
        console.log(cityname)
    }
    if(city.lastIndexOf(",") != -1){
    countrycode = city.substr(city.lastIndexOf(","),city.length-1)
    }
    // alert(cityname)
    render(cityname, countrycode)
    time = setInterval(render, 3000, cityname, countrycode)
    // console.log(time)
    
}
function getWeather(data){
    if(data.cod == '404') {
        console.log("Not found")
        document.getElementById("form").innerHTML = "Not Found"
        clearInterval(time)
        return;
    }
    document.getElementById("form").innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="icon">
        <h2>${data.name} / ${data.sys.country}</h2>
        <h2 id="main">${data.weather[0].main + ' ' + data.main.temp + "°C"}</h2>
        <h3 id="des">Description: ${data.weather[0].description}</h3>
    `
}
window.addEventListener('load',()=>{
    loader.style.display = "none";
    c.style.display = "flex";
    console.log("loaded")
})
