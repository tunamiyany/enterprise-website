import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const [totalProducts, totalCategories, totalBanners, recentProducts] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.banner.count(),
      prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          code: true,
          nameZh: true,
          nameEn: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      totalProducts,
      totalCategories,
      totalBanners,
      recentProducts,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
