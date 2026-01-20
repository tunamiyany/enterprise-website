import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// 产品相关查询
export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  isNew?: boolean;
  limit?: number;
  search?: string;
}) {
  const where: any = {};
  
  if (options?.category) {
    where.category = options.category;
  }
  if (options?.featured) {
    where.isFeatured = true;
  }
  if (options?.isNew) {
    where.isNew = true;
  }
  if (options?.search) {
    where.OR = [
      { nameZh: { contains: options.search } },
      { nameEn: { contains: options.search } },
      { code: { contains: options.search } },
    ];
  }

  return prisma.product.findMany({
    where,
    orderBy: { order: 'asc' },
    take: options?.limit,
  });
}

export async function getProductByCode(code: string) {
  return prisma.product.findUnique({
    where: { code },
  });
}

// 分类相关查询
export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
  });
}

// 应用领域查询
export async function getApplications() {
  return prisma.application.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getApplicationBySlug(slug: string) {
  return prisma.application.findUnique({
    where: { slug },
  });
}

// 轮播图查询
export async function getBanners() {
  return prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });
}

// 合作伙伴查询
export async function getPartners() {
  return prisma.partner.findMany({
    orderBy: { order: 'asc' },
  });
}
