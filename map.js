"use strict"
let map, lat, lon;
async function search(lat, lon){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=metric&appid=${key}`)
    const data = await response.json()
    console.log(data)
    getWeather(data)
}
function initMap() {
    map = new Microsoft.Maps.Map(document.getElementById('map'), {
        center: new Microsoft.Maps.Location(25, 90),
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: 3
    });
    lat = map.getCenter().latitude;
    lon = map.getCenter().longitude;
    let pin = new Microsoft.Maps.Pushpin(map.getCenter(),{
        icon: "./icon/location.svg"
    })
    map.entities.push(pin);
    Microsoft.Maps.Events.addHandler(map, "click", (e) =>{
        clearInterval(time)
        lat = e.location.latitude;
        lon = e.location.longitude;
        pin.setLocation(e.location);
        console.log("search")
        search(lat, lon)
        time = setInterval(search, 3000, lat, lon)
        
    })
}
