import { model, Schema } from 'mongoose';

interface IProductInventory extends Document {
    quantity: number;
    created_at: Date;
    modified_at?: Date;
    deleted_at?: Date;
  }
  
  const productInventorySchema = new Schema<IProductInventory>({
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [0, 'Quantity cannot be negative.']
    },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date },
    deleted_at: { type: Date }
  });
  
  export const ProductInventory = model<IProductInventory>('ProductInventory', productInventorySchema);
  