'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Grid, List, ChevronRight } from 'lucide-react';

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

interface Category {
  id: string;
  nameZh: string;
  nameEn: string;
  slug: string;
  descZh: string | null;
  descEn: string | null;
}

export default function ProductsPage() {
  const t = useTranslations('products');
  const locale = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ]);
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 过滤产品
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      product.nameZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getName = (item: { nameZh: string; nameEn: string }) => 
    locale === 'zh' ? item.nameZh : item.nameEn;

  const getDesc = (item: { descZh: string | null; descEn: string | null }) => 
    locale === 'zh' ? item.descZh : item.descEn;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <div className="flex items-center text-sm text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">{t('home')}</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>{t('title')}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 侧边栏 - 分类筛选 */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">{t('categories')}</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {t('allProducts')}
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {getName(category)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* 主内容区 */}
          <main className="flex-1">
            {/* 搜索和视图切换 */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                {/* 搜索框 */}
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* 视图切换和结果数量 */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {filteredProducts.length} {t('productsFound')}
                  </span>
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 产品列表 */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500">{t('noProducts')}</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
                      {product.isFeatured && (
                        <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                          HOT
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1">{product.code}</p>
                      <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                        {getName(product)}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/${locale}/products/${product.code}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex group"
                  >
                    <div className="relative w-40 h-40 flex-shrink-0 bg-gray-100">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={getName(product)}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-4xl">📦</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{product.code}</p>
                          <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {getName(product)}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          {product.isNew && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                          )}
                          {product.isFeatured && (
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded">HOT</span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {getDesc(product)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
