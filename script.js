document.addEventListener("DOMContentLoaded",()=>{
    let city_input =document.getElementById("city-input")
    let city_button =document.getElementById("city-button")
    let weather_info =document.getElementById("weather-info")
    let city_name =document.getElementById("city-name")
    let temperature =document.getElementById("temperature")
    let description =document.getElementById("description")
    let error_message =document.getElementById("error-message")
    let humidity = document.getElementById("humidity")
    let feels_like= document.getElementById("feelsLike")
    
    const API = "d49224ea5d4b99c615570d7e44c6683f";

      city_button.addEventListener("click",async function(){
        let city = city_input.value.trim();
        if(city=="") return ;

        try {
            let information = await fetchWeatherData(city)
            displayweatherData(information)
        } catch (error) {
            showError();
        }
      })


     async function fetchWeatherData(data){
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${API}`
        const response= await fetch(url)


        if(!response.ok){
            throw new Error("City not found")
        }
        const weatherData= await response.json()
            return weatherData;
      }


      function displayweatherData(info){
            
         const {name,main,weather} = info;

             const tempC = (main.temp - 273.15).toFixed(1);
             const feelsLikeC = (main.feels_like - 273.15).toFixed(1);

         city_name.textContent=name;
         temperature.textContent = `${tempC} °C`;
         feels_like.textContent = `${feelsLikeC} °C`;
         humidity.textContent = `${main.humidity}%`;
         description.textContent = `${weather[0].description}`;



         weather_info.classList.remove("hidden")
         error_message.classList.add("hidden")
      }


      function showError(){
        weather_info.classList.add("hidden");
        error_message.classList.remove("hidden")
      }

})