//since the update and delete functions of organization and customer were added later on, I directly exported them

import { Request, Response } from 'express';
import * as userService from '../services/userService';
import SOWPaymentPlan from '../models/sowPaymentPlanModel';

// organization Controller
async function createOrg(req: Request, res: Response) : Promise<any> {
    try {
        const newOrg = await userService.createOrganization(req.body);
        res.send(newOrg);
    } catch (error) {
        throw error;
    }
}

export async function updateOrg(req: Request, res: Response) {
    try {
        const updatedOrganization = await userService.updateOrganization(req.params.id, req.body);
        if (updatedOrganization) {
            res.send({ message: 'Organization updated successfully' });
        } else {
            res.send({ message: 'Organization not found' });
        }
    } catch (error) {
       throw error;
    }
}

export async function deleteOrg(req: Request, res: Response) {
    try {
        const deleted = await userService.deleteOrganization(req.params.id);
        if (deleted) {
            res.send({ message: 'Organization deleted successfully' });
        } else {
            res.send({ message: 'Organization not found' });
        }
    } catch (error) {
        throw error;
    }
}


async function getOrgs(req: Request, res: Response) : Promise<any> {
    try {
        const orgs = await userService.getOrganizations();
        res.send(orgs);
    } catch (error : any) {
        throw error;
    }
}

// Controller  -- customer
async function createCust(req: Request, res: Response) : Promise<any> {
    try {
        const newCust = await userService.createCustomer(req.body);
        res.send({message : "Client created sucessfully"});
    } catch (error : any) {
        throw error;
    }
}


async function getCusts(req: Request, res: Response) : Promise<any> {
    try {
        const custs = await userService.getCustomers();
        console.log("getCusts successful");
        res.send(custs);
    } catch (error : any) {
        throw error;
    }
}


export async function updateCusts(req: Request, res: Response) {
    try {
        const updatedCustomer = await userService.updateCustomer(req.params.id, req.body);
        if (updatedCustomer) {
            res.send({ message: 'Customer updated successfully' });
        } else {
            res.send({ message: 'Customer not found' });
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteCusts(req: Request, res: Response) {
    try {
        const deleted = await userService.deleteCustomer(req.params.id);
        if (deleted) {
            res.send({ message: 'Customer deleted successfully' });
        } else {
            res.send({ message: 'Customer not found' });
        }
    } catch (error) {
       throw error;
    }
}

// Controller -- SOW
async function createSow(req: Request, res: Response) : Promise<any> {
    try {
        const newSow = await userService.createSOW(req.body);
        res.send("SOW created");
    } catch (error : any) {
        throw error;
    }
}


async function getSows(req: Request, res: Response) : Promise<any> {
    try {
        const sows = await userService.getSOWs();
        res.send(sows);
    } catch (error : any) {
        throw error;
    }
}



//SowPaymentPlan

export async function createSOWPP(req: Request, res: Response) {  //if insertion is single or array of objects (in assignment it was an array of objects)
    try {
      const data = req.body;
      if (Array.isArray(data)) {
        await userService.createSOWPaymentPlanBulk(data);
      } else {
        await userService.createSOWPaymentPlan(data);
      }
      res.send({ message: 'SOW payment plan created successfully' });
    } catch (error) {
      throw error;
    }
  }

  export async function getSOWPP(req: Request, res: Response) {
    try{
        const sowpp = await userService.getSOWPaymentPlans();
        res.send(sowpp);
    }catch(error){
        throw error;
    }
  }
//SowPaymentPlanItem

export async function createSOWPPI(req: Request, res: Response) {
    // try {
    //   const sowPaymentPlanItem = await userService.createSOWPaymentPlanItem(req.body);
    //   res.send("SOW PPI created");
    // }
    try {
        const data = req.body;
        if (Array.isArray(data)) {
          await userService.createSOWPaymentPlanItemsBulk(data);
        } else {
          await userService.createSOWPaymentPlanItem(data);
        }
        res.send('SOW PPI Created');
      }
     catch (error) {
      throw error;
    }
  }

  export async function getSOWPPI(req: Request, res: Response) {
    try{
        const sowppi = await userService.findSOWPaymentPlanItem();
        res.send(sowppi);
    }catch(error){
        throw error;
    }
  }


//Invoice controller
async function createInv(req: Request, res: Response) : Promise<any> {
    try {
        const newInv = await userService.createInvoice(req.body);
        res.send("new invoice created");
    } catch (error : any) {
        throw error;
    }
}


async function getInvs(req: Request, res: Response) : Promise<any> {
    try {
        const invs = await userService.getInvoices();
        res.send(invs);
    } catch (error : any) {
        throw error;
    }
}


async function createPay(req: Request, res: Response) : Promise<any> {
    try {
        const newPay = await userService.createPayment(req.body);
        res.send("newPay created ");
    } catch (error : any) {
        throw error;
    }
}


async function getPays(req: Request, res: Response) : Promise<any> {
    try {
        const pays = await userService.getPayments();
        res.send(pays);
    } catch (error : any) {
        throw error;
    }
}


export async function genInvoices(req: Request, res: Response) :Promise<any>{
  try {
    const result = await userService.generateInvoices();
    res.json({ message: result });
  } catch (error) {
    res.json({ message: error });
  }
};

export {
    createOrg,
    getOrgs,
    createCust,
    getCusts,
    createSow,
    getSows,
    createInv,
    getInvs,
    createPay,
    getPays
};
