import express from 'express';
import router from './routes/routes';
import  gocardlessRoute  from './routes/goCardlessRoutes';
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()); 
app.use(express.json());

app.use('/gocardless',gocardlessRoute);
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Basic FLOW : app.ts --> controllers --> services

/*
Please note that while registering we specify our role. 
This role serves as a base for generating jwt token during login.
And when specific role-based access is required, i decode the role from the token to decide the route priviledge :)
(see jsonVerify.ts for logic)
SAMPLE INPUT :
  
{
  "username": "soham",
  "password": "sinhgad123",
  "email": "soham@nashik.com"
}


 */
