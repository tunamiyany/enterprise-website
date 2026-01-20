'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const productCategories = [
    '热缩管',
    '医疗级热缩管',
    '电气连接热缩管',
    '胶带',
  ];

  const quickLinks = [
    { name: tNav('about'), href: `/${locale}/about` },
    { name: tNav('products'), href: `/${locale}/products` },
    { name: tNav('applications'), href: `/${locale}/applications` },
    { name: tNav('news'), href: `/${locale}/news` },
    { name: tNav('contact'), href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-dark text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{t('company')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">{t('phone')}</p>
                  <a href="tel:+886-4-8381860" className="hover:text-white transition-colors">
                    +886-4-8381860
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">{t('email')}</p>
                  <a href="mailto:sales@example.com" className="hover:text-white transition-colors">
                    sales@example.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">{t('address')}</p>
                  <p className="text-sm">中国 · 广东省</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">{tNav('products')}</h3>
            <ul className="space-y-2">
              {productCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/${locale}/products`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">关注我们</h3>
            <p className="text-sm mb-4">
              订阅我们的新闻通讯，获取最新产品信息和行业动态
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                微信
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container-custom py-6">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
