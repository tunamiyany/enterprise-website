'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

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
  order: number;
}

interface Category {
  id: string;
  nameZh: string;
  nameEn: string;
  slug: string;
}

export default function EditProductPage({ params }: { params: { code: string } }) {
  const t = useTranslations('admin');
  const locale = useLocale();
  const router = useRouter();
  const isNew = params.code === 'new';

  const [product, setProduct] = useState<Product>({
    id: '',
    code: '',
    nameZh: '',
    nameEn: '',
    descZh: '',
    descEn: '',
    category: '',
    image: '',
    specs: '',
    features: '',
    applications: '',
    certifications: '',
    isNew: false,
    isFeatured: false,
    order: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesRes = await fetch('/api/categories');
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }

        if (!isNew) {
          const productRes = await fetch(`/api/products/${params.code}`);
          if (productRes.ok) {
            const data = await productRes.json();
            setProduct(data.product);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [isNew, params.code]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const url = isNew ? '/api/admin/products' : `/api/admin/products/${product.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: t('saveSuccess') });
        if (isNew) {
          const data = await res.json();
          router.push(`/${locale}/admin/products/${data.code}`);
        }
      } else {
        const error = await res.json();
        setMessage({ type: 'error', text: error.message || '保存失败' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '保存失败，请重试' });
    } finally {
      setSaving(false);
    }
  }

  const getName = (item: { nameZh: string; nameEn: string }) =>
    locale === 'zh' ? item.nameZh : item.nameEn;

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
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/${locale}/admin/products`}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isNew ? t('addProduct') : t('editProduct')}
        </h1>
      </div>

      {/* 消息提示 */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 表单 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                产品编号 *
              </label>
              <input
                type="text"
                value={product.code}
                onChange={(e) => setProduct({ ...product, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                产品分类 *
              </label>
              <select
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              >
                <option value="">选择分类</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {getName(cat)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                中文名称 *
              </label>
              <input
                type="text"
                value={product.nameZh}
                onChange={(e) => setProduct({ ...product, nameZh: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                英文名称 *
              </label>
              <input
                type="text"
                value={product.nameEn}
                onChange={(e) => setProduct({ ...product, nameEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                中文描述
              </label>
              <textarea
                value={product.descZh}
                onChange={(e) => setProduct({ ...product, descZh: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                英文描述
              </label>
              <textarea
                value={product.descEn}
                onChange={(e) => setProduct({ ...product, descEn: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                图片URL
              </label>
              <input
                type="text"
                value={product.image || ''}
                onChange={(e) => setProduct({ ...product, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="/images/products/xxx.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                排序
              </label>
              <input
                type="number"
                value={product.order}
                onChange={(e) => setProduct({ ...product, order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">详细信息</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                产品规格（每行一条）
              </label>
              <textarea
                value={product.specs || ''}
                onChange={(e) => setProduct({ ...product, specs: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="收缩比: 2:1&#10;工作温度: -55°C ~ 125°C"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                产品特性（每行一条）
              </label>
              <textarea
                value={product.features || ''}
                onChange={(e) => setProduct({ ...product, features: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="优异的电气绝缘性能&#10;良好的机械保护"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                应用场景（每行一条）
              </label>
              <textarea
                value={product.applications || ''}
                onChange={(e) => setProduct({ ...product, applications: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="电线电缆绝缘&#10;焊点保护"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                认证证书（逗号分隔）
              </label>
              <input
                type="text"
                value={product.certifications || ''}
                onChange={(e) => setProduct({ ...product, certifications: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="UL, CSA, RoHS, REACH"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">状态设置</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={product.isNew}
                onChange={(e) => setProduct({ ...product, isNew: e.target.checked })}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">标记为新品</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={product.isFeatured}
                onChange={(e) => setProduct({ ...product, isFeatured: e.target.checked })}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">标记为推荐</span>
            </label>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end gap-4">
          <Link
            href={`/${locale}/admin/products`}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            取消
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
