export enum SegmentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CREATED = 'created',
}
export enum SegmentTypes {
  STATIC = 'static',
  DYNAMIC = 'dynamic',
}

export interface IAudienceItem {
  name: string;
  checked: boolean;
  error?: string | undefined;
}

export enum SUGGESTED_SEGMENT_TYPES {
  REPEAT_SHOPPERS = 'repeat_shopers',
  BIG_BUYERS = 'big_buyers',
  BEST_SOURCE = 'best_source',
  DORMANT = 'dormant',
}

export type IAudienceRes = {
  user_list_id: string;
  audience_id: string;
  error?: {
    message: string;
  };
};
export type IAudienceType = {
  facebook?: Partial<IAudienceRes>;
  tiktok?: Partial<IAudienceRes>;
  google?: Partial<IAudienceRes>;
};
