import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { startShift, endShift } from '../controllers/shiftController';
import { createTimesheet, getTimesheets } from '../controllers/timesheetController';
import { getReport } from '../controllers/reportController';
import { authenticateToken } from '../jsonVerify'; 

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);

// Protected routes with token verification
// router.post('/shift/start', (req, res) => {   commented out since we are creating start shift when logging in
//   if (authenticateToken(req, res)) {
//     startShift(req, res);
//   } else {
//     return res.send('Unauthorized token');
//   }
// });

router.post('/shift/end', (req, res) => {
  if (authenticateToken(req, res)) {
    endShift(req, res);
  } else {
    return res.send('Unauthorized token');
  }
});

router.post('/timesheet/create', (req, res) => {
  if (authenticateToken(req, res)) {
    createTimesheet(req, res);
  } else {
    return res.send('Unauthorized token');
  }
});

router.get('/timesheets', (req, res) => {
  if (authenticateToken(req, res)) {
    getTimesheets(req, res);
  } else {
    return res.status(401).send('Unauthorized token');
  }
});

router.get('/report/:employeeId', (req, res) => {
  if (authenticateToken(req, res)) {
    getReport(req, res);
  } else {
    return res.send('Unauthorized token');
  }
});

export default router;

