import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const existing = await prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'Slug已存在' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        nameZh: data.nameZh,
        nameEn: data.nameEn,
        slug: data.slug,
        descZh: data.descZh || null,
        descEn: data.descEn || null,
        image: data.image || null,
        order: data.order || 0,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Failed to create category:', error);
    return NextResponse.json(
      { message: '创建分类失败' },
      { status: 500 }
    );
  }
}
