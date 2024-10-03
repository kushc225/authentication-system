import { Document, Schema, model } from 'mongoose';

interface IProductCategory extends Document {
  name: string;
  desc?: string;
  created_at: Date;
  modified_at?: Date;
  deleted_at?: Date;
}

const productCategorySchema = new Schema<IProductCategory>({
  name: { 
    type: String, 
    required: [true, 'Product category name is required.'],
    trim: true,
    maxlength: [100, 'Product category name cannot exceed 100 characters.']
  },
  desc: { type: String },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date },
  deleted_at: { type: Date }
});

export const ProductCategory = model<IProductCategory>('ProductCategory', productCategorySchema);
