import { Request, Response } from "express";
import {createAccount, getAccounts, deleteAccount, ModifyAccount, createContract, getContracts,CreateMandateForContract, CreateMandate, payment} from '../services/gocardlessService2'  ;

export const addAccount = async (req: Request, res: Response) => {

    await createAccount(req.body); 
    res.send("Account created successfully");
}

export const getAccount = async (req: Request, res: Response) => {
    const users = await getAccounts();
    res.json(users);
}

export const removeAccount = async (req: Request, res: Response) => {
    const users = await deleteAccount(req.params.id);
    res.json(users);
}

export const updateAccount = async (req: Request, res: Response) => {
    const users = await ModifyAccount(req.body);
    res.json(users);
}

export const addContract = async (req: Request, res: Response) => {

    await createContract(req.body); 
    res.send("Account created successfully");
}

export const getContract = async (req: Request, res: Response) => {
    const users = await getContracts();
    res.json(users);
}

export const createMandateFlowForAllContracts = async (req: Request, res: Response) => {
    const users = await CreateMandate();
    if (users) {
        res.send("Mandates created for all contracts");
    }
}
export const createPayment = async (req: Request, res: Response) => {
    const paymentIntiation = await payment(req.body);
    return paymentIntiation;
}