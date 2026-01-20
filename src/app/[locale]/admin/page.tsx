'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Package, FolderTree, Image, Eye, TrendingUp, Plus } from 'lucide-react';

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalBanners: number;
  recentProducts: Array<{
    id: string;
    code: string;
    nameZh: string;
    nameEn: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const getName = (item: { nameZh: string; nameEn: string }) =>
    locale === 'zh' ? item.nameZh : item.nameEn;

  const statCards = [
    {
      title: t('totalProducts'),
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500',
      href: '/admin/products',
    },
    {
      title: t('totalCategories'),
      value: stats?.totalCategories || 0,
      icon: FolderTree,
      color: 'bg-green-500',
      href: '/admin/categories',
    },
    {
      title: t('banners'),
      value: stats?.totalBanners || 0,
      icon: Image,
      color: 'bg-purple-500',
      href: '/admin/banners',
    },
    {
      title: t('totalViews'),
      value: '1,234',
      icon: Eye,
      color: 'bg-orange-500',
      href: '#',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard')}</h1>
        <p className="text-gray-500 mt-1">{t('welcome')}</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link
              key={index}
              href={`/${locale}${card.href}`}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 快捷操作和最近产品 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 快捷操作 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href={`/${locale}/admin/products/new`}
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-blue-100 p-2 rounded-lg">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium">{t('addProduct')}</span>
            </Link>
            <Link
              href={`/${locale}/admin/categories/new`}
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-green-100 p-2 rounded-lg">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-medium">添加分类</span>
            </Link>
            <Link
              href={`/${locale}/admin/banners/new`}
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-purple-100 p-2 rounded-lg">
                <Plus className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium">添加轮播图</span>
            </Link>
            <Link
              href={`/${locale}/products`}
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-orange-100 p-2 rounded-lg">
                <Eye className="w-5 h-5 text-orange-600" />
              </div>
              <span className="font-medium">查看前台</span>
            </Link>
          </div>
        </div>

        {/* 最近添加的产品 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{t('recentProducts')}</h2>
            <Link
              href={`/${locale}/admin/products`}
              className="text-sm text-primary hover:underline"
            >
              查看全部
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.recentProducts?.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/admin/products/${product.code}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{getName(product)}</p>
                  <p className="text-sm text-gray-500">{product.code}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </Link>
            ))}
            {(!stats?.recentProducts || stats.recentProducts.length === 0) && (
              <p className="text-gray-500 text-center py-4">暂无产品</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
