import express from 'express';
import cors from 'cors';
import routes from './routes/routes';

import './postgresDB/pgConfig';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;


//FLOW : app.ts --> routes.ts --> jsonVerify.ts(based on route taken) -->Controller -->service