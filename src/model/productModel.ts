import { Document, Schema, model } from 'mongoose';

interface IProduct extends Document {
  name: string;
  desc?: string;
  SKU: string;
  category_id: Schema.Types.ObjectId;
  inventory_id: Schema.Types.ObjectId;
  price: number;
  discount_id?: Schema.Types.ObjectId;
  created_at: Date;
  modified_at?: Date;
  deleted_at?: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters.']
  },
  desc: { type: String },
  SKU: { 
    type: String, 
    required: [true, 'SKU is required.'], 
    unique: true 
  },
  category_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'ProductCategory', 
    required: [true, 'Category is required.'] 
  },
  inventory_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'ProductInventory', 
    required: [true, 'Inventory is required.'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required.'],
    min: [0, 'Price cannot be less than 0.']
  },
  discount_id: { type: Schema.Types.ObjectId, ref: 'Discount' },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date },
  deleted_at: { type: Date }
});

export const ProductModel = model<IProduct>('Product', productSchema);
