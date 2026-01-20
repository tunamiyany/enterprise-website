'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('products'), href: `/${locale}/products` },
    { name: t('applications'), href: `/${locale}/applications` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('news'), href: `/${locale}/news` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-primary z-50 shadow-md">
      <div className="container-custom">
        <div className="flex items-center justify-between h-[70px]">
          <Link href={`/${locale}`} className="flex items-center">
            <span className="text-white text-xl font-bold">企业LOGO</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-white hover:text-gray-200 transition-colors">
              <Search size={20} />
            </button>
            <Link
              href={`/${locale}/cart`}
              className="text-white hover:text-gray-200 transition-colors relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link
              href={locale === 'zh' ? '/en' : '/zh'}
              className="text-white hover:text-gray-200 transition-colors font-medium"
            >
              {locale === 'zh' ? 'EN' : '中文'}
            </Link>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden bg-primary-dark transition-all duration-300 overflow-hidden',
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <nav className="container-custom py-4 space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-white hover:text-gray-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={locale === 'zh' ? '/en' : '/zh'}
            className="block text-white hover:text-gray-200 transition-colors py-2"
          >
            {locale === 'zh' ? 'English' : '中文'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
