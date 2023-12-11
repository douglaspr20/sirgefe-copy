import { Business, BusinessConnections, User } from '@sirge-io/sirge-types';
import { BusinessProfile } from './business';
import { BusinessPrisma, UserPrisma } from '../API';

/**
 * Todo: Type platformMode
 */
export interface UserDetailsPrisma {
  platformMode: any;
  userProfileData: UserPrisma | null;
  accountStatusData: boolean;
  businessListData: BusinessPrisma[];
  businessCountData: number | null;
  businessActiveCountData: number | null;
  selectedBusinessData: number | null;
  businessProfileData: BusinessProfile;
  businessConnections: BusinessConnections;
}

export interface UserDetails {
  platformMode: any;
  userProfileData: User | null;
  accountStatusData: boolean;
  businessListData: Business[];
  businessCountData: number | null;
  businessActiveCountData: number | null;
  selectedBusinessData: number | null;
  businessProfileData: BusinessProfile;
  businessConnections: BusinessConnections;
}
