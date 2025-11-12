'use client';

import { useState } from 'react';
import { useMenu } from './contexts/MenuContext';
import MenuSection from './components/MenuSection';
import { useRouter } from 'next/navigation';
import { useAuth } from './contexts/AuthContext';
import { useLanguage } from './contexts/LanguageContext';
import { Category } from './types';
import { useCategory } from './contexts/CategoryContext';

const getCategoryColors = () => {
  // Default colors
  return {
    bg: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
    bgSimple: 'bg-indigo-200 dark:bg-indigo-800',
    border: 'border-indigo-200 dark:border-indigo-800',
    text: 'text-indigo-600 dark:text-indigo-400',
  };
};

interface CategoryCardProps {
  category: Category;
  itemCount: number;
  onClick: () => void;
}

function CategoryCard({ category, itemCount, onClick }: CategoryCardProps) {
  const colors = getCategoryColors();
  const { language } = useLanguage();

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl ${colors.bg} border-2 ${colors.border} p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bgSimple} rounded-full -mr-16 -mt-16 opacity-20`}></div>
      <div className="relative z-10">
        <h2 className={`text-3xl font-extrabold ${colors.text} mb-2`}>
          {language === 'ar' ? category.nameInArabic : category.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {itemCount} {language === 'ar' ? (itemCount === 1 ? 'عنصر' : 'عناصر') : (itemCount === 1 ? 'item' : 'items')} {language === 'ar' ? 'متاح' : 'available'}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:translate-x-2 transition-transform">
          <span>{language === 'ar' ? 'عرض القائمة' : 'View Menu'}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export default function Home() {
  const { getItemsByCategory } = useMenu();
  const { categories } = useCategory();
  const { isAuthenticated } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16">
          <div>
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {language === 'ar' ? 'قائمة المطعم' : 'Restaurant Menu'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {language === 'ar' ? 'اكتشف أطباقنا اللذيذة' : 'Discover our delicious dishes'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg transition-all duration-200 font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
              title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {language === 'ar' ? 'English' : 'العربية'}
            </button>

          {isAuthenticated ? (
            <button
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
              onClick={() => router.push('/admin')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
            </button>
          ) : (
            <button
              className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
              onClick={() => router.push('/login')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {language === 'ar' ? 'تسجيل دخول المدير' : 'Admin Login'}
            </button>
          )}
          </div>

          
        </div>

        {selectedCategory ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'عرض:' : 'Showing:'} <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedCategory ? (selectedCategory.nameInArabic || selectedCategory.name) : ''}</span>
                </span>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 font-semibold text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {language === 'ar' ? 'العودة إلى الفئات' : 'Back to Categories'}
              </button>
            </div>
            <MenuSection 
              category={selectedCategory} 
              items={getItemsByCategory(selectedCategory)}
            />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category : Category) => (
              <CategoryCard 
                key={category.id}
                category={category} 
                itemCount={getItemsByCategory(category).length}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
