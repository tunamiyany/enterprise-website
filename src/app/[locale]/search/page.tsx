'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight } from 'lucide-react';

interface Product {
  id: string;
  code: string;
  nameZh: string;
  nameEn: string;
  descZh: string;
  descEn: string;
  category: string;
  image: string | null;
  isNew: boolean;
  isFeatured: boolean;
}

export default function SearchPage() {
  const t = useTranslations('search');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [query]);

  async function performSearch(q: string) {
    if (!q.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/${locale}/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery);
    }
  }

  const getName = (item: { nameZh: string; nameEn: string }) =>
    locale === 'zh' ? item.nameZh : item.nameEn;

  const getDesc = (item: { descZh: string; descEn: string }) =>
    locale === 'zh' ? item.descZh : item.descEn;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="bg-primary text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
          <div className="flex items-center text-sm text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">首页</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>{t('title')}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* 搜索框 */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('placeholder')}
              className="w-full pl-14 pr-32 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary"
            >
              搜索
            </button>
          </div>
        </form>

        {/* 搜索结果 */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : query ? (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {t('resultsFor')} "<span className="font-semibold text-gray-900">{query}</span>"
                <span className="ml-2">({products.length} 个结果)</span>
              </p>
            </div>

            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">{t('noResults')}</p>
                <p className="text-gray-400 mt-2">请尝试其他关键词</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/${locale}/products/${product.code}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    <div className="relative aspect-square bg-gray-100">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={getName(product)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-4xl">📦</span>
                        </div>
                      )}
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1">{product.code}</p>
                      <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {getName(product)}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {getDesc(product)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">输入关键词搜索产品</p>
            <p className="text-gray-400 mt-2">支持产品名称、编号搜索</p>
          </div>
        )}
      </div>
    </div>
  );
}
