import { NextRequest, NextResponse } from 'next/server';
import { getProductByCode, getProducts } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const product = await getProductByCode(params.code);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // 获取同分类的相关产品
    const relatedProducts = await getProducts({
      category: product.category,
      limit: 4,
    });

    // 过滤掉当前产品
    const filteredRelated = relatedProducts.filter(p => p.code !== product.code);

    return NextResponse.json({
      product,
      relatedProducts: filteredRelated.slice(0, 4),
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
