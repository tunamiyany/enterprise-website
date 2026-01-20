import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const mockSlides = [
  {
    id: '1',
    titleZh: '热缩管生产制造专家',
    titleEn: 'Heat Shrink Tubing Manufacturing Expert',
    subtitleZh: '专业生产各类热缩管、绝缘材料，为全球客户提供优质产品和服务',
    subtitleEn: 'Professional manufacturer providing quality products and services to global customers',
    image: '/images/banner1.jpg',
  },
  {
    id: '2',
    titleZh: '创新技术 · 品质保证',
    titleEn: 'Innovation & Quality Assurance',
    subtitleZh: '先进的生产设备和专业的技术团队',
    subtitleEn: 'Advanced equipment and professional technical team',
    image: '/images/banner2.jpg',
  },
];

const mockApplications = [
  { id: '1', nameZh: '电线电缆', nameEn: 'Wire and Cable', slug: 'wire-cable', image: '' },
  { id: '2', nameZh: '汽车行业', nameEn: 'Automotive Industry', slug: 'automotive', image: '' },
  { id: '3', nameZh: '电子终端', nameEn: 'Electronic Terminals', slug: 'electronic', image: '' },
  { id: '4', nameZh: '石油化工', nameEn: 'Petrochemical', slug: 'petrochemical', image: '' },
  { id: '5', nameZh: '电子电气', nameEn: 'Electronic & Electrical', slug: 'electrical', image: '' },
  { id: '6', nameZh: '医疗行业', nameEn: 'Medical Industry', slug: 'medical', image: '' },
];

const mockProducts = [
  { id: '1', code: 'DNC-001', nameZh: '双层冷缩硅橡胶套管', nameEn: 'Dual Layer Cold Shrink Silicone Rubber Sleeve', image: '', isNew: true },
  { id: '2', code: 'BSRRB-001', nameZh: 'PET防鼠编织套管', nameEn: 'PET Rodent Resistant Braided Sleeving', image: '', isNew: true },
  { id: '3', code: 'VITON-001', nameZh: '氟橡胶热缩管', nameEn: 'Fluoroelastomer Heat Shrinkable Tubing', image: '', isNew: true },
  { id: '4', code: 'GA-001', nameZh: '耐磨PE热缩管', nameEn: 'Abrasion Resistant PE Heat Shrink Tubing', image: '', isNew: false },
];

export default function HomePage() {
  const t = useTranslations('home');
  const tProducts = useTranslations('products');
  const locale = useLocale();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-[70px]">
        <HeroCarousel slides={mockSlides} locale={locale} />

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="heading-2">{t('about.title')}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.content')}
                </p>
                <Link href={`/${locale}/about`} className="btn-primary inline-flex items-center space-x-2">
                  <span>{t('about.viewMore')}</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
              <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  公司图片
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-2 text-center mb-12">{t('applications.title')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {mockApplications.map((app) => (
                <Link
                  key={app.id}
                  href={`/${locale}/applications/${app.slug}`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">▸</span>
                  </div>
                  <h3 className="font-semibold text-sm">
                    {locale === 'zh' ? app.nameZh : app.nameEn}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="heading-2 text-center mb-12">{t('newProducts.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.code}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-48 bg-gray-100">
                    {product.isNew && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        NEW
                      </span>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      产品图片
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                      {locale === 'zh' ? product.nameZh : product.nameEn}
                    </h3>
                    <p className="text-xs text-gray-500">{product.code}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href={`/${locale}/products`} className="btn-secondary">
                {tProducts('all')}
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-primary-dark text-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('branches.title')}</h2>
                <p className="text-lg mb-6 text-gray-200">
                  {t('branches.content')}
                </p>
                <Link href={`/${locale}/contact`} className="btn-primary bg-white text-primary hover:bg-gray-100">
                  {t('branches.contactUs')}
                </Link>
              </div>
              <div className="relative h-[300px] bg-white/10 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  分支机构地图
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
