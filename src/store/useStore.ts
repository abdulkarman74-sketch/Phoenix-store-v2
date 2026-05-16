import { create } from 'zustand';
import { dbGet, dbSet, normalizeArray } from '../lib/firebase';
import { DEFAULT_PRODUCTS } from '../lib/constants';

interface StoreState {
  info: any;
  kontak: any;
  products: any[];
  heroSlides: any[];
  adMedia: any;
  reviews: any;
  globalReviews: any[];
  drawerMenu: any[];
  tampilan: any;
  loadingAd: any;
  aiCs: any;
  isBuffering: boolean;
  loadInitialData: () => Promise<void>;
  setTheme: (theme: any) => void;
  playKonfetti: () => void;
  shouldPlayKonfetti: boolean;
}

export const useStore = create<StoreState>((set) => ({
  info: {},
  kontak: {},
  products: DEFAULT_PRODUCTS,
  heroSlides: [],
  adMedia: null,
  reviews: {},
  globalReviews: [],
  drawerMenu: [],
  tampilan: {},
  loadingAd: null,
  aiCs: {},
  isBuffering: true,
  shouldPlayKonfetti: false,
  
  loadInitialData: async () => {
    try {
      const [
        info, kontak, productsRaw, heroSlides, adMedia, 
        reviews, globalReviews, drawerMenu, tampilan, loadingAd, aiCs
      ] = await Promise.all([
        dbGet('store-info'),
        dbGet('store-kontak'),
        dbGet('store-produk'),
        dbGet('store-hero-slides'),
        dbGet('store-ad-media'),
        dbGet('store-product-reviews'),
        dbGet('store-ulasan'),
        dbGet('store-drawer'),
        dbGet('store-tampilan'),
        dbGet('store-loading-ad'),
        dbGet('store-ai-cs')
      ]);

      const products = productsRaw && productsRaw.length > 0 ? normalizeArray(productsRaw) : DEFAULT_PRODUCTS;

      set({
        info: info || {},
        kontak: kontak || {},
        products,
        heroSlides: normalizeArray(heroSlides),
        adMedia: adMedia || null,
        reviews: reviews || {},
        globalReviews: normalizeArray(globalReviews),
        drawerMenu: normalizeArray(drawerMenu),
        tampilan: tampilan || {},
        loadingAd: loadingAd || null,
        aiCs: aiCs || { active: true, name: 'Una' },
        isBuffering: false
      });
      
    } catch (e) {
      console.error(e);
      set({ isBuffering: false });
    }
  },
  
  setTheme: (tampilan) => set({ tampilan }),
  playKonfetti: () => {
    set({ shouldPlayKonfetti: true });
    setTimeout(() => set({ shouldPlayKonfetti: false }), 3000);
  }
}));
