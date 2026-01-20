'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Image,
  Globe,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, href: '/admin' },
  { id: 'products', icon: Package, href: '/admin/products' },
  { id: 'categories', icon: FolderTree, href: '/admin/categories' },
  { id: 'banners', icon: Image, href: '/admin/banners' },
  { id: 'applications', icon: Globe, href: '/admin/applications' },
  { id: 'partners', icon: Users, href: '/admin/partners' },
  { id: 'settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('admin');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 登录页不需要布局
  const isLoginPage = pathname.includes('/admin/login');

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoginPage) {
      router.push(`/${locale}/admin/login`);
    }
  }, [status, isLoginPage, locale, router]);

  // 登录页直接渲染内容
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 加载中或未认证时显示加载状态
  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(`/${locale}/admin/login`);
  };

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    if (href === '/admin') {
      return pathname === fullPath;
    }
    return pathname.startsWith(fullPath);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 移动端菜单按钮 */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="font-semibold text-gray-900">{t('title')}</span>
        <button onClick={handleLogout} className="text-sm text-primary hover:underline">
          {t('logout')}
        </button>
      </div>

      {/* 移动端侧边栏遮罩 */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo区域 */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {sidebarOpen && (
            <Link href={`/${locale}/admin`} className="font-bold text-xl text-primary">
              Admin
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* 导航菜单 */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={`/${locale}${item.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{t(item.id)}</span>}
              </Link>
            );
          })}
        </nav>

        {/* 底部操作 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          {session?.user && sidebarOpen && (
            <div className="px-3 py-2 mb-2 text-sm text-gray-500">
              {session.user.email}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>{t('logout')}</span>}
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        } pt-16 lg:pt-0`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
