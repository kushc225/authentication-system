import { model, Schema } from 'mongoose';

interface IOrderItems extends Document {
    order_id: Schema.Types.ObjectId;
    product_id: Schema.Types.ObjectId;
    quantity: number;
    created_at: Date;
    modified_at?: Date;
  }
  
  const orderItemsSchema = new Schema<IOrderItems>({
    order_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'OrderDetails', 
      required: [true, 'Order ID is required.'] 
    },
    product_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product', 
      required: [true, 'Product ID is required.'] 
    },
    quantity: { 
      type: Number, 
      required: [true, 'Quantity is required.'], 
      min: [1, 'Quantity must be at least 1.']
    },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date }
  });
  
  export const OrderItems = model<IOrderItems>('OrderItems', orderItemsSchema);
  