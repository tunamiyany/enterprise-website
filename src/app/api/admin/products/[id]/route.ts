import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    const product = await prisma.product.update({
      where: { id: params.id },
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
    console.error('Failed to update product:', error);
    return NextResponse.json(
      { message: '更新产品失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json(
      { message: '删除产品失败' },
      { status: 500 }
    );
  }
}
