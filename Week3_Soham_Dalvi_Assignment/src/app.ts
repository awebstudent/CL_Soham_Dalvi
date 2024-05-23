import express, { Request, Response } from 'express';
import { saveWeather } from './weatherService';
import nodemailer from 'nodemailer';
import Weather from './weatherModel';
import {generateTable} from './genTable';
const app = express();
const port = 3000;

app.use(express.json());
//A.
app.post('/api/SaveWeatherMapping', async (req, res) => {
  try {
    const cities = req.body;
    console.log(cities);
    
    for (let i = 0; i < cities.length; i++) {
      const { city, country } = cities[i];
      await saveWeather(city, country);
    }

    res.send('Weather data saved ');
  } catch (error) {
    console.error('Error in /api/SaveWeatherMapping:', error);
    res.send('Failed to save');
  }
});

//B.
app.get('/api/weatherDashboard', async (req: Request, res: Response) => {
  try {
    const { city } = req.query; // after the ?=

    if (city) {
      
      const cityWeatherData = await Weather.findAll({ where: { city } });
      res.json(cityWeatherData);
    } else {

      const allWeatherData = await Weather.findAll();
      res.json(allWeatherData);
    }
  } catch (error) {
    res.json({ error: 'Error' });
  }
});


// C. Mailing API

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sohum3001@gmail.com',
    pass: '-----',
  },
});

app.get('/api/mail', async (req, res) => {
  try {
    const data = req.body; // Assuming data is received from the request body
    const table = generateTable(data);

    const mailOptions = {
      from: 'sohum3001@gmail.com',
      to: 'yifopi3406@neixos.com', //temporary emails for testing purposes
      subject: 'Weather Data',
      html: table,
    };

    await transporter.sendMail(mailOptions);

    res.send('Weather data sent successfully via email.');
  } catch (error) {
    console.log(error);
    res.send('Failed');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


