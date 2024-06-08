import { Router } from 'express';
import *  as Control from '../controllers/userController';

const router = Router();
//Organization Management
router.post('/organization', Control.createOrg);
router.get('/organization',Control.getOrgs);
router.put('/organization/:id', Control.updateOrg);
router.delete('/organization/:id', Control.deleteOrg);

// Client or Customer Management
router.post('/client', Control.createCust); // client = customer
router.get('/client', Control.getCusts);   // i have used customer name instead of client in codes
router.put('/client/:id', Control.updateCusts);
router.delete('/client/:id', Control.deleteCusts);

//Sow ops
router.post('/sow', Control.createSow);
router.get('/sow', Control.getSows);

//Sow_PaymentPlan Ops
router.post('/sowPaymentPlan', Control.createSOWPP);
router.get('/sowPaymentPlan', Control.getSOWPP);

//Spw_PaymentPlan_Items Ops
router.post('/sowPaymentPlanItems', Control.createSOWPPI);
router.get('/sowPaymentPlanItems', Control.getSOWPPI);

//Invoice ops
router.get('/generateinvoices', Control.genInvoices);
router.post('/invoice', Control.createInv);
router.get('/invoice', Control.getInvs);

//Payment ops
router.post('/payment', Control.createPay);
router.get('/payment', Control.getPays);

export default router;


