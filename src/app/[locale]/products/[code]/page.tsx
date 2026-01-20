'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Download, Mail, Phone, CheckCircle } from 'lucide-react';

interface Product {
  id: string;
  code: string;
  nameZh: string;
  nameEn: string;
  descZh: string;
  descEn: string;
  category: string;
  image: string | null;
  specs: string | null;
  features: string | null;
  applications: string | null;
  certifications: string | null;
  isNew: boolean;
  isFeatured: boolean;
}

export default function ProductDetailPage({ params }: { params: { code: string } }) {
  const t = useTranslations('productDetail');
  const locale = useLocale();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('specs');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/products/${params.code}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
          setRelatedProducts(data.relatedProducts || []);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.code]);

  const getName = (item: { nameZh: string; nameEn: string }) => 
    locale === 'zh' ? item.nameZh : item.nameEn;

  const getDesc = (item: { descZh: string; descEn: string }) => 
    locale === 'zh' ? item.descZh : item.descEn;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">{t('notFound')}</h1>
        <Link href={`/${locale}/products`} className="text-primary hover:underline">
          {t('backToProducts')}
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'specs', label: t('specifications') },
    { id: 'features', label: t('features') },
    { id: 'applications', label: t('applications') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href={`/${locale}`} className="hover:text-primary">{t('home')}</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href={`/${locale}/products`} className="hover:text-primary">{t('products')}</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">{getName(product)}</span>
          </div>
        </div>
      </div>

      {/* 产品主要信息 */}
      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* 产品图片 */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={getName(product)}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-8xl">📦</span>
                  </div>
                )}
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isNew && (
                  <span className="bg-red-500 text-white text-sm px-3 py-1 rounded">NEW</span>
                )}
                {product.isFeatured && (
                  <span className="bg-primary text-white text-sm px-3 py-1 rounded">HOT</span>
                )}
              </div>
            </div>

            {/* 产品信息 */}
            <div>
              <p className="text-sm text-gray-500 mb-2">{t('productCode')}: {product.code}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {getName(product)}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {getDesc(product)}
              </p>

              {/* 认证标识 */}
              {product.certifications && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">{t('certifications')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.split(',').map((cert, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {cert.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  {t('inquiry')}
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  {t('downloadSpec')}
                </button>
                <a
                  href="tel:+86-755-12345678"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {t('callUs')}
                </a>
              </div>
            </div>
          </div>

          {/* 详细信息标签页 */}
          <div className="border-t">
            <div className="flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'specs' && product.specs && (
                <div className="prose max-w-none">
                  <table className="w-full">
                    <tbody>
                      {product.specs.split('\n').map((line, index) => {
                        const [key, value] = line.split(':');
                        if (!key || !value) return null;
                        return (
                          <tr key={index} className="border-b">
                            <td className="py-3 pr-4 font-medium text-gray-900 w-1/3">{key.trim()}</td>
                            <td className="py-3 text-gray-600">{value.trim()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'features' && product.features && (
                <ul className="space-y-3">
                  {product.features.split('\n').map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'applications' && product.applications && (
                <ul className="space-y-3">
                  {product.applications.split('\n').map((app, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{app}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* 相关产品 */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('relatedProducts')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/products/${item.code}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative aspect-square bg-gray-100">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={getName(item)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-4xl">📦</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{item.code}</p>
                    <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                      {getName(item)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
