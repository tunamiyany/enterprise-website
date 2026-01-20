import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

/**
 * 获取当前登录用户的会话信息
 * @returns 用户会话或null
 */
export async function getSession() {
  return await getServerSession();
}

/**
 * 检查用户是否已登录，未登录则重定向到登录页
 * @param locale 当前语言
 */
export async function requireAuth(locale: string = 'zh') {
  const session = await getSession();
  if (!session) {
    redirect(`/${locale}/admin/login`);
  }
  return session;
}

/**
 * 检查用户是否为管理员
 * @param session 用户会话
 */
export function isAdmin(session: any): boolean {
  return session?.user?.role === 'admin';
}
