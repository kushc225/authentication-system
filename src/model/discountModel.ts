import { Document, model, Schema } from 'mongoose';

interface IDiscount extends Document {
    name: string;
    desc?: string;
    discount_percent: number;
    active: boolean;
    created_at: Date;
    modified_at?: Date;
    deleted_at?: Date;
  }
  
  const discountSchema = new Schema<IDiscount>({
    name: {
      type: String,
      required: [true, 'Discount name is required.']
    },
    desc: { type: String },
    discount_percent: {
      type: Number,
      required: [true, 'Discount percent is required.'],
      min: [0, 'Discount percent cannot be less than 0.'],
      max: [100, 'Discount percent cannot exceed 100%.']
    },
    active: {
      type: Boolean,
      default: true
    },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date },
    deleted_at: { type: Date }
  });
  
  export const Discount = model<IDiscount>('Discount', discountSchema);
  