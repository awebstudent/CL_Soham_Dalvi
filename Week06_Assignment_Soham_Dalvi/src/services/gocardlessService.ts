import { Account } from '../models/userPaymentModel';
import { Address } from '../models/addressModel';
import { BankDetails } from '../models/bankDetailModel';
import { Contract } from '../models/contractModel';
import credentials from '../common/credentials';
import  Order  from '../models/orderModel';
import { Payment } from '../models/paymentModel';
import { INTEGER } from 'sequelize';
import { stringify } from 'querystring';


const constants = require('gocardless-nodejs/constants');
const gocardless = require('gocardless-nodejs');
const client = gocardless(credentials.gocardless.API_KEY, constants.Environments.Sandbox)


async function createAccount(account: any): Promise<any> {
    try {
        const { address, bankDetails, ...accountDetails } = account;
        const addressRecord = await Address.create(address);
        const bankDetailsRecord = await BankDetails.create(bankDetails);

        const newAccount = await Account.create({
            ...accountDetails,
            addressUId: addressRecord.id,
            bankDetailsUId: bankDetailsRecord.id,
        });

        if (newAccount) {
            return newAccount;
        }
    } catch (err: any) {
        throw err
    }

}

async function getAccountById(id: string) {
    const account = await Account.findByPk(id, {
        include: [Address, BankDetails],
    });
    return account;
};


async function getAccounts(): Promise<any[]> {
    const users = await Account.findAll();
    return users;
}

export const getAddressById = async (id: string) => {
    return await Address.findByPk(id
    );
};

export const GetBankAccountById = async (id: string) => {
    return await BankDetails.findByPk(id
    );
};

// Update
async function ModifyAccount(accountData: any): Promise<any> {
    const { address, bankDetails, ...accountDetails } = accountData;

    const account = await Account.findByPk(accountData.id);
    if (!account) throw new Error('Account not found');

    if (address) {
        const addressRecord = await Address.findByPk(account.addressUId);
        if (addressRecord) {
            await addressRecord.update(address);
        }
    }
    if (bankDetails) {
        const bankDetailsRecord = await BankDetails.findByPk(account.bankDetailsUId);
        if (bankDetailsRecord) {
            await bankDetailsRecord.update(bankDetails);
        }
    }
    await account.update(accountDetails);

    return account;

}

// Delete
async function deleteAccount(id: string): Promise<any> {
    try {
        const accountEntity = await Account.findByPk(id);
        if (!accountEntity) {
            return "Account not found !"
        }
        await accountEntity.destroy();
        return "User deleted successfully";
    } catch (err: any) {
        return `Error updating user due to ${err.message}`;
    }

}


async function createContract(contract: any): Promise<any> {
    try {
        delete contract.id;
        delete contract.userId;

        const addressRecord = await Contract.create(contract);

        if (addressRecord) {
            return addressRecord;
        }

    } catch (err: any) {
        throw err
    }

}

async function getContracts(): Promise<any[]> {
    const users = await Contract.findAll();
    return users;
}


async function CreateMandate(): Promise<any> {
    try {

        var contracts = await getContracts();
        for (const contract of contracts) {
            await CreateMandateForContract(contract);
        }
        return true;
    }
    catch (err: any) {
        throw err;
    }
}

async function CreateMandateForContract(contract: any) {
    try {
       
        const accounts = await getAccounts();
        const account = accounts.find(c => contract.accountUId === c.id);

        if (!account) {
            throw new Error(`Account with UId ${contract.accountUId} not found`);
        }

        // Fetch address and bank account details
        const address = await getAddressById(account.addressUId);
        const bankAccount = await GetBankAccountById(account.bankDetailsUId);

        if (!address) {
            throw new Error(`Address with UId ${account.addressUId} not found`);
        }

        if (!bankAccount) {
            throw new Error(`Bank account with UId ${account.bankDetailsUId} not found`);
        }

        // Create a customer in GoCardless
        const gclCustomer = await client.customers.create({
            email: account.email,
            given_name: account.name,
            family_name: "Test",
            address_line1: address.line1,
            address_line2: address.line2,
            city: address.city,
            postal_code: "PO16 7GZ", //valid uk postal code 
            country_code: "GB",
            metadata: {
                contract_id: contract.id
            }
        });
        // Use credentials from GetBankAccountById to create customer bank account
        const customerBankAccount = await client.customerBankAccounts.create({
            account_number: bankAccount.accountNumber,
            branch_code: bankAccount.sortCode,
            account_holder_name: account.name,
            country_code: "GB",
            links: {
                customer: gclCustomer.id
            }
        });

        // Create a mandate
        const mandate = await client.mandates.create({
            scheme: "bacs",
            metadata: {
                contract_id: contract.id
            },
            links: {
                customer_bank_account: customerBankAccount.id,
                creditor: "CR123"
            }
        });
        console.log(mandate)
        return mandate;
    } catch (err: any) {
        console.error('Error creating mandate:', err);
        throw err;
    }
}
async function payment(data: any) {
    try {
     
            const order: any = await Order.findByPk(data.orderId);
            if (order) {
                const payment = await client.payments.create({
                    amount: Math.ceil(order.amount), // rounding off :)
                    currency: "GBP",
                    charge_date: data.charge_date,
                    
                    metadata: {
                        contract_id: "d02ab218-4dd5-44e3-b2e5-7d6891cd6415"
                    },
                    links: {
                        mandate: data.mandateId
                    }
                });
                if (payment) {
                    const userAllOrder = await Payment.update(
                        { status: 'Initiating' },
                        {
                            where: {
                                userId: data.userId,
                                bookId: data.orderId
                            }
                        })
                        console.log(userAllOrder)
                    return payment
                } else {
                    return "Error for initiating payment for book"
                }
            }
        
    } catch (error) {
        return `Error in intiating payment ${error}`
    }
}


export { createAccount, getAccounts, ModifyAccount, deleteAccount, createContract, getContracts, CreateMandateForContract, CreateMandate, payment };












