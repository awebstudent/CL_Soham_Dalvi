
import Organization from '../models/organizationModel';
import Customer from '../models/customerModel';
import SOW from '../models/sowModel';
import SOWPaymentPlan from '../models/sowPaymentPlanModel';
import Invoice from '../models/invoiceModel';
import Payment from '../models/paymentModel';
import SOWPaymentPlanItem from '../models/sowPaymentPlanItem';

// Organization
export async function createOrganization(data: any) {
  return await Organization.create(data);
}

export async function getOrganizations() {
  return await Organization.findAll();
}


export async function updateOrganization(id: string, organization: any) {
  return await Organization.update(organization, { where: { id } });
}

export async function deleteOrganization(id: string) {
  return await Organization.destroy({ where: { id } });
}

// Customer
export async function createCustomer(data: any) {
  return await Customer.create(data);
}

export async function getCustomers() {
  return await Customer.findAll();
}

export async function updateCustomer(id: string, customer: any) {
  return await Customer.update(customer, { where: { id } });
}

export async function deleteCustomer(id: string) {
  return await Customer.destroy({ where: { id } });
}

// SOW
export async function createSOW(data: any) {
  return await SOW.create(data);
}

export async function getSOWs() {
  return await SOW.findAll();
}

// SOWPaymentPlan
export async function createSOWPaymentPlan(data: any) {
  //const a = data.plannedInvoiceDate;
 // data.plannedInvoiceDate = a.toISOString().split('T')[0];
  return await SOWPaymentPlan.create(data);
}

export async function createSOWPaymentPlanBulk(data: any[]) {
  await SOWPaymentPlan.bulkCreate(data);
}

export async function getSOWPaymentPlans() {
  return await SOWPaymentPlan.findAll();
}

// SOW Payment plan ITEM
export async function createSOWPaymentPlanItem(data: any) {
  
  return await SOWPaymentPlanItem.create(data);
  
}
//------------

export const createSOWPaymentPlanItemsBulk = async (data: any[]) => {
  return await SOWPaymentPlanItem.bulkCreate(data);
};
//-----------

export async function findSOWPaymentPlanItem() {
  const sowPaymentPlanItem = await SOWPaymentPlanItem.findAll();
}


// Invoice
export async function createInvoice(data: any) {
  return await Invoice.create(data);
}

export async function getInvoices() {
  return await Invoice.findAll();
}

// Payment
export async function createPayment(data: any) {
  return await Payment.create(data);
}

export async function getPayments() {
  return await Payment.findAll();
}



//______AUTOMATIC INVOICE GENERATION __ BASED ON CURRENT DATE 

//note : since postgres is storing the timezone by default ,
//       hence for successful execution of the invoice generation, you can remove the where condition

export async function generateInvoices() {
  try {
    const now = new Date();
    
const today = now.toISOString().split('T')[0] + "T00:00:00.000Z" ; // tried adding the iso timezone format since it is getting stored in db like that only

    console.log(today);
    const sowPaymentPlans = await SOWPaymentPlan.findAll({
      where: {                      //toggle this condition for testing
        plannedInvoiceDate: today  
      }
    });

    console.log('\n',sowPaymentPlans);

    if (sowPaymentPlans.length === 0) {
      return 'No invoices to generate today.';
    }

    const invoices = [];
    for (const plan of sowPaymentPlans) {
      invoices.push({
        sowId: plan.sowId,
        totalInvoiceAmount: plan.totalActualAmount,
        status: 'Drafted',
        invoiceSentOn: today,
        customerId: plan.customerId,
        paymentReceivedOn: null,
        invoiceVersionNumber: 1
      });
    }

    await Invoice.bulkCreate(invoices);

    return 'Invoices generated successfully.';
  } catch (error) {
    throw error;
  }
}

