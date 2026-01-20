import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    const category = await prisma.category.update({
      where: { id: params.id },
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
    console.error('Failed to update category:', error);
    return NextResponse.json(
      { message: '更新分类失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete category:', error);
    return NextResponse.json(
      { message: '删除分类失败' },
      { status: 500 }
    );
  }
}
