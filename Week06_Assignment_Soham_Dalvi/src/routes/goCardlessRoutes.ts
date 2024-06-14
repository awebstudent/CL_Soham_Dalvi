import { Router, Request, Response } from 'express'
import {addAccount, getAccount, updateAccount, removeAccount, addContract, getContract, createMandateFlowForAllContracts, createPayment} from '../controllers/goCardlessController';

const gocardlessRoute = Router();


gocardlessRoute.post('/', async (req: Request, res: Response)=>{
    const accountAdded = await addAccount(req, res);
    res.send(accountAdded)
})
gocardlessRoute.get('/', async (req: Request, res: Response)=>{
    const accountAdded = await getAccount(req, res);
    res.send(accountAdded)
})
gocardlessRoute.put('/', async (req: Request, res: Response)=>{
    const accountAdded = await updateAccount(req, res);
    res.send(accountAdded)
})
gocardlessRoute.delete('/', async (req: Request, res: Response)=>{
    const accountAdded = await removeAccount(req, res);
    res.send(accountAdded)
})

gocardlessRoute.post('/contract', async (req: Request, res: Response)=>{
    const accountAdded = await addContract(req, res);
    res.send(accountAdded)
})
gocardlessRoute.get('/contract', async (req: Request, res: Response)=>{
    const accountAdded = await getContract(req, res);
    res.send(accountAdded)
})
gocardlessRoute.get('/mandate', async (req: Request, res: Response)=>{
    const accountAdded = await createMandateFlowForAllContracts(req, res);
    res.send(accountAdded)
})

gocardlessRoute.post('/payment', async(req: Request, res: Response)=>{
    const paymentstatus = await createPayment(req, res);
    res.send(paymentstatus);
})
export default gocardlessRoute;