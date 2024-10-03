import { Document, model, Schema } from 'mongoose';

export interface IUserAddress extends Document {
    user_id: Schema.Types.ObjectId;
    address_line1: string;
    address_line2?: string;
    city: string;
    postal_code: string;
    country: string;
    created_at: Date;
    modified_at?: Date;
  }
  
  const userAddressSchema = new Schema<IUserAddress>({
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: [true, 'User ID is required.'] 
    },
    address_line1: { 
      type: String, 
      required: [true, 'Address Line 1 is required.'] 
    },
    address_line2: { type: String },
    city: { 
      type: String, 
      required: [true, 'City is required.']
    },
    postal_code: { 
      type: String, 
      required: [true, 'Postal code is required.'] 
    },
    country: { 
      type: String, 
      required: [true, 'Country is required.'] 
    },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date }
  });
  
  export const UserAddress = model<IUserAddress>('UserAddress', userAddressSchema);
  