import express from 'express';
import userRoutes from './routes/userRoutes';
import { Request,Response } from 'express';
import './models/associations';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api',(req: Request,res: Response)=>{ 
  res.json({message: "You are on /api"});
})

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//BASIC FLOW : app.ts --> userRoutes.ts --> userController.ts --> userService.ts