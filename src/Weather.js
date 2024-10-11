import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '099e7d195cf72237a2464c212d20e148'; // Substitua pela sua chave da API

  const getWeather = async (e) => {
    e.preventDefault();
    setError('');
    
    if (city) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
        setWeatherData(response.data);
      } catch (err) {
        setError('Cidade não encontrada ou erro na solicitação');
        setWeatherData(null);
      }
    } else {
      setError('Por favor, insira uma cidade');
    }
  };

  return (
    <div className="weather-app">
      <h1>Previsão do Tempo</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Clima: {weatherData.weather[0].description}</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Velocidade do Vento: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;