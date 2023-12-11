import { create } from 'zustand';
import {
  createBusinessConectionSlice,
  createBusinessProfileSlice,
  createBackdropLoaderSlice,
  BusinessConnectionsSlice,
  createPerformanceSlice,
  createQuickSetupSlice,
  createAsyncDataFetchSlice,
  createLayoutslice,
  createDialogSlice,
  createTrialSlice,
  createPromoCodeSlice,
  BusinessProfileSlice,
  BackdropLoaderSlice,
  PerformanceSlice,
  QuickSetupSlice,
  AsyncDataFetchSlice,
  LayoutSlice,
  DialogSlice,
  TrialSlice,
  PromoCodeSlice,
  UserSlice,
  createUserSlice,
  DynamicSegmentStore,
  createDynamicSegmentStore,
} from './slices';

export const useBoundStore = create<
  BusinessConnectionsSlice &
    BusinessProfileSlice &
    BackdropLoaderSlice &
    PerformanceSlice &
    QuickSetupSlice &
    AsyncDataFetchSlice &
    DialogSlice &
    TrialSlice &
    PromoCodeSlice &
    UserSlice &
    DynamicSegmentStore &
    LayoutSlice
>()((...a) => ({
  ...createBusinessProfileSlice(...a),
  ...createBusinessConectionSlice(...a),
  ...createBackdropLoaderSlice(...a),
  ...createPerformanceSlice(...a),
  ...createQuickSetupSlice(...a),
  ...createAsyncDataFetchSlice(...a),
  ...createLayoutslice(...a),
  ...createDialogSlice(...a),
  ...createTrialSlice(...a),
  ...createPromoCodeSlice(...a),
  ...createUserSlice(...a),
  ...createDynamicSegmentStore(...a),
}));
