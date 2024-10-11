import { create } from 'zustand';
import { TAccessTokenProps } from '../Type/systemTypes';

export const useAccessTokenState = create<TAccessTokenProps>((set) => ({
    accessToken: null,
    setAccessToken: (token: string) => set({ accessToken: token }),
    removeAccessToken: () => set({ accessToken: null }),
}));
