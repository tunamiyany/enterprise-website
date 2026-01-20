import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 检查编号是否已存在
    const existing = await prisma.product.findUnique({
      where: { code: data.code },
    });

    if (existing) {
      return NextResponse.json(
        { message: '产品编号已存在' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        code: data.code,
        nameZh: data.nameZh,
        nameEn: data.nameEn,
        descZh: data.descZh || '',
        descEn: data.descEn || '',
        category: data.category,
        image: data.image || null,
        specs: data.specs || null,
        features: data.features || null,
        applications: data.applications || null,
        certifications: data.certifications || null,
        isNew: data.isNew || false,
        isFeatured: data.isFeatured || false,
        order: data.order || 0,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      { message: '创建产品失败' },
      { status: 500 }
    );
  }
}
