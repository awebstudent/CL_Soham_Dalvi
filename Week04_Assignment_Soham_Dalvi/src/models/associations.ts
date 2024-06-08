import  Organization  from './organizationModel';
import  Customer  from './customerModel';
import SOW  from './sowModel';
import SOWPaymentPlan  from './sowPaymentPlanModel';
import SOWPaymentPlanItem  from './sowPaymentPlanItem';
import  Invoice  from './invoiceModel';
import  Payment  from './paymentModel';

// Define associations

// Organization - Customer
Organization.hasMany(Customer, { foreignKey: 'organizationId' });
Customer.belongsTo(Organization, { foreignKey: 'organizationId' });

// Customer - SOW
Customer.hasMany(SOW, { foreignKey: 'customerId' });
SOW.belongsTo(Customer, { foreignKey: 'customerId' });

// SOW - SOWPaymentPlan
SOW.hasMany(SOWPaymentPlan, { foreignKey: 'sowId' });
SOWPaymentPlan.belongsTo(SOW, { foreignKey: 'sowId' });

// SOWPaymentPlan - SOWPaymentPlanItem
SOWPaymentPlan.hasMany(SOWPaymentPlanItem, { foreignKey: 'sowPaymentPlanId' });
SOWPaymentPlanItem.belongsTo(SOWPaymentPlan, { foreignKey: 'sowPaymentPlanId' });

// SOW - Invoice
SOW.hasMany(Invoice, { foreignKey: 'sowId' });
Invoice.belongsTo(SOW, { foreignKey: 'sowId' });

// Invoice - Payment
Invoice.hasMany(Payment, { foreignKey: 'invoiceId' });
Payment.belongsTo(Invoice, { foreignKey: 'invoiceId' });

export {
  Organization,
  Customer,
  SOW,
  SOWPaymentPlan,
  SOWPaymentPlanItem,
  Invoice,
  Payment
};
