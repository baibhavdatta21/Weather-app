import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [change, setChange] = useState('');
  const [city, setCity] = useState('Barcelona');
  const [data, setData] = useState();
  const [bg, setBg] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const ref1 = useRef();
  const ref2 = useRef();

  useEffect(() => {
    if(city===''){
      setCity('Barcelona')
    }
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86c6e3ab02cb551e388a865166dba947`;
   
    fetch(api)
      .then((response) => response.json())
      .then((response) => {
        if (response.cod === '404') {
          setErrorMessage('City not found. Please enter a valid city name.');
          ref1.current.style.display='none';
          ref2.current.style.display='inline'
          return;
        }
        setErrorMessage('');

        setData(response);
      })
      .catch((error) => console.log(error));
  }, [city]);

  useEffect(() => {
    const api = `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=iYOElTBzoRhLJlaftJtc2QFYP59N_tfPbg1PVIM5R7c`;

    fetch(api)
      .then((response) => response.json())
      .then((response) => {
        if (response.results && response.results[0]) {
          setBg(response.results[0].urls.raw);
        }
      })
      .catch((error) => console.log('error'));
  }, [city]);

  return (
    <>
      {data && (
        <div className='content' ref={ref1} style={{ backgroundImage: `url(${bg})` }}>
          <div className='real_content'>
            <div>
              <input
                type='text'
                placeholder='Type your city here'
                onChange={(e) => setChange(e.target.value)}
              />
              <button onClick={() =>{change!='' && setCity(change)}}>Search</button>
            </div>
            <div className='city'>{data.name}</div>
            <div className='temp'>Temp: {(data.main.temp / 10).toFixed(2)}°C</div>
            <div>Humidity: {data.main.humidity}%</div>
            <div>Wind Speed {data.wind.speed}m/s</div>
            <div>Chances of rainfall: {data.clouds.all}%</div>
          </div>
        </div>
      )}
      {errorMessage && (
        <div ref={ref2} style={{ display: 'block', color: 'red' }}>
          {errorMessage}
        </div>
      )}
    </>
  );
}

export default App;
