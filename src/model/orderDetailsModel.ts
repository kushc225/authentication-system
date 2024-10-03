import { model, Schema } from 'mongoose';

interface IOrderDetails extends Document {
    user_id: Schema.Types.ObjectId;
    total: number;
    payment_id: Schema.Types.ObjectId;
    created_at: Date;
    modified_at?: Date;
  }
  
  const orderDetailsSchema = new Schema<IOrderDetails>({
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: [true, 'User is required.'] 
    },
    total: { 
      type: Number, 
      required: [true, 'Order total is required.'], 
      min: [0, 'Total cannot be less than 0.'] 
    },
    payment_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'PaymentDetails', 
      required: [true, 'Payment ID is required.'] 
    },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date }
  });
  
  export const OrderDetails = model<IOrderDetails>('OrderDetails', orderDetailsSchema);
  