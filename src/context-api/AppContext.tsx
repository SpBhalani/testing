"use client"
import { CategoryType } from '@/interface/apiInterface';
import { createContext, useContext, useState, ReactNode } from 'react';
type AppContextType = {
  language: "English" | "Hindi";
  setLanguage: React.Dispatch<React.SetStateAction<"English" | "Hindi">> ;
  hindiCategories: CategoryType[],
  setHindiCategories: React.Dispatch<React.SetStateAction<CategoryType[]>> ,
  englishCategories: CategoryType[],
  setEnglishCategories: React.Dispatch<React.SetStateAction<CategoryType[]>> 
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
}

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [language, setLanguage] = useState<"English" | "Hindi">("English");
  const [hindiCategories, setHindiCategories] = useState<CategoryType[]>([]);
  const [englishCategories, setEnglishCategories] = useState<CategoryType[]>([]);

  const value = {
    language,
    setLanguage,
    hindiCategories, setHindiCategories,
    englishCategories, setEnglishCategories
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
