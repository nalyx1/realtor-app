import { PropertyType } from '@prisma/client';

export class ListHomesDto {
  id: string;

  address: string;

  city: string;

  listed_date: Date;

  property_type: PropertyType;

  created_at: Date;

  updated_at: Date;

  realtor_id: string;
}
