const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('开始创建示例数据...');

  // 创建产品分类
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        nameZh: '热缩管',
        nameEn: 'Heat Shrink Tubing',
        slug: 'heat-shrink-tubing',
        descZh: '各类热缩管产品，广泛应用于电子、电气、汽车等领域',
        descEn: 'Various heat shrink tubing products for electronics, electrical, automotive applications',
        image: '/images/categories/heat-shrink.jpg',
        order: 1,
      },
    }),
    prisma.category.create({
      data: {
        nameZh: '冷缩管',
        nameEn: 'Cold Shrink Tubing',
        slug: 'cold-shrink-tubing',
        descZh: '无需加热即可收缩的管材，安装便捷',
        descEn: 'Tubing that shrinks without heat, easy installation',
        image: '/images/categories/cold-shrink.jpg',
        order: 2,
      },
    }),
    prisma.category.create({
      data: {
        nameZh: '热缩套管',
        nameEn: 'Heat Shrink Sleeves',
        slug: 'heat-shrink-sleeves',
        descZh: '用于电缆接头和管道防腐的热缩套管',
        descEn: 'Heat shrink sleeves for cable joints and pipe corrosion protection',
        image: '/images/categories/sleeves.jpg',
        order: 3,
      },
    }),
    prisma.category.create({
      data: {
        nameZh: '标识产品',
        nameEn: 'Identification Products',
        slug: 'identification-products',
        descZh: '热缩标识管、标签等标识类产品',
        descEn: 'Heat shrink markers, labels and identification products',
        image: '/images/categories/identification.jpg',
        order: 4,
      },
    }),
    prisma.category.create({
      data: {
        nameZh: '模塑件',
        nameEn: 'Molded Parts',
        slug: 'molded-parts',
        descZh: '各类热缩模塑件，用于电缆分支和端接',
        descEn: 'Various heat shrink molded parts for cable branching and termination',
        image: '/images/categories/molded.jpg',
        order: 5,
      },
    }),
  ]);

  console.log(`✓ 创建了 ${categories.length} 个产品分类`);

  // 创建应用领域
  const applications = await Promise.all([
    prisma.application.create({
      data: {
        nameZh: '汽车工业',
        nameEn: 'Automotive',
        slug: 'automotive',
        descZh: '为汽车线束、电池组、充电系统提供可靠的绝缘和保护解决方案',
        descEn: 'Reliable insulation and protection solutions for automotive wiring harnesses, battery packs, and charging systems',
        image: '/images/applications/automotive.jpg',
        order: 1,
      },
    }),
    prisma.application.create({
      data: {
        nameZh: '电力能源',
        nameEn: 'Power & Energy',
        slug: 'power-energy',
        descZh: '电力传输、配电系统、新能源发电的专业防护产品',
        descEn: 'Professional protection products for power transmission, distribution systems, and renewable energy',
        image: '/images/applications/power.jpg',
        order: 2,
      },
    }),
    prisma.application.create({
      data: {
        nameZh: '通信电子',
        nameEn: 'Telecom & Electronics',
        slug: 'telecom-electronics',
        descZh: '通信基站、数据中心、电子设备的线缆管理和保护',
        descEn: 'Cable management and protection for telecom base stations, data centers, and electronic devices',
        image: '/images/applications/telecom.jpg',
        order: 3,
      },
    }),
    prisma.application.create({
      data: {
        nameZh: '轨道交通',
        nameEn: 'Rail Transit',
        slug: 'rail-transit',
        descZh: '高铁、地铁、有轨电车的线缆绝缘和防火解决方案',
        descEn: 'Cable insulation and fire protection solutions for high-speed rail, metro, and trams',
        image: '/images/applications/rail.jpg',
        order: 4,
      },
    }),
    prisma.application.create({
      data: {
        nameZh: '航空航天',
        nameEn: 'Aerospace',
        slug: 'aerospace',
        descZh: '符合航空标准的轻量化、高性能绝缘材料',
        descEn: 'Lightweight, high-performance insulation materials meeting aerospace standards',
        image: '/images/applications/aerospace.jpg',
        order: 5,
      },
    }),
    prisma.application.create({
      data: {
        nameZh: '船舶海洋',
        nameEn: 'Marine',
        slug: 'marine',
        descZh: '耐盐雾、耐腐蚀的船用电缆保护产品',
        descEn: 'Salt spray resistant, corrosion resistant marine cable protection products',
        image: '/images/applications/marine.jpg',
        order: 6,
      },
    }),
  ]);

  console.log(`✓ 创建了 ${applications.length} 个应用领域`);

  // 创建产品
  const products = await Promise.all([
    prisma.product.create({
      data: {
        code: 'HST-001',
        nameZh: '通用型单壁热缩管',
        nameEn: 'General Purpose Single Wall Heat Shrink Tubing',
        descZh: '采用优质聚烯烃材料制成，具有优异的电气绝缘性能和机械保护性能。收缩比2:1，工作温度-55°C至125°C。',
        descEn: 'Made from high-quality polyolefin material with excellent electrical insulation and mechanical protection.',
        category: 'heat-shrink-tubing',
        image: '/images/products/hst-001.jpg',
        specs: '收缩比: 2:1\n工作温度: -55°C ~ 125°C\n阻燃等级: UL VW-1',
        features: '优异的电气绝缘性能\n良好的机械保护\n阻燃环保',
        applications: '电线电缆绝缘\n焊点保护\n线束标识',
        certifications: 'UL, CSA, RoHS, REACH',
        isNew: false,
        isFeatured: true,
        order: 1,
      },
    }),
    prisma.product.create({
      data: {
        code: 'HST-002',
        nameZh: '双壁带胶热缩管',
        nameEn: 'Dual Wall Adhesive-Lined Heat Shrink Tubing',
        descZh: '外层为交联聚烯烃，内层为热熔胶。收缩后形成密封防水保护，适用于户外和潮湿环境。',
        descEn: 'Outer layer of cross-linked polyolefin with inner hot melt adhesive. Forms waterproof seal after shrinking.',
        category: 'heat-shrink-tubing',
        image: '/images/products/hst-002.jpg',
        specs: '收缩比: 3:1\n工作温度: -45°C ~ 125°C\n胶层熔点: 70°C',
        features: '防水密封\n防腐蚀\n高收缩比',
        applications: '汽车线束防水\n户外电缆接头\n防腐蚀保护',
        certifications: 'UL, RoHS, REACH, IP67',
        isNew: true,
        isFeatured: true,
        order: 2,
      },
    }),
    prisma.product.create({
      data: {
        code: 'HST-003',
        nameZh: '高温热缩管',
        nameEn: 'High Temperature Heat Shrink Tubing',
        descZh: '采用氟聚合物或硅橡胶材料，可在高温环境下长期使用，最高耐温可达260°C。',
        descEn: 'Made from fluoropolymer or silicone rubber, suitable for long-term use in high temperature environments up to 260°C.',
        category: 'heat-shrink-tubing',
        image: '/images/products/hst-003.jpg',
        specs: '收缩比: 2:1\n工作温度: -65°C ~ 260°C\n材料: PTFE/FEP/硅橡胶',
        features: '超高耐温\n优异的化学稳定性\n低摩擦系数',
        applications: '航空航天\n发动机舱线束\n高温传感器',
        certifications: 'UL, AMS-DTL-23053, RoHS',
        isNew: false,
        isFeatured: true,
        order: 3,
      },
    }),
    prisma.product.create({
      data: {
        code: 'HST-004',
        nameZh: '中壁热缩管',
        nameEn: 'Medium Wall Heat Shrink Tubing',
        descZh: '壁厚介于单壁和厚壁之间，提供更好的机械保护和绝缘性能，适用于中压电缆。',
        descEn: 'Wall thickness between single wall and heavy wall, providing better mechanical protection.',
        category: 'heat-shrink-tubing',
        image: '/images/products/hst-004.jpg',
        specs: '收缩比: 3:1\n工作温度: -40°C ~ 105°C\n电压等级: 1kV-10kV',
        features: '中等壁厚\n良好的机械强度\n优异的绝缘性能',
        applications: '中压电缆绝缘\n电缆修复\n接头保护',
        certifications: 'IEC, GB, RoHS',
        isNew: false,
        isFeatured: false,
        order: 4,
      },
    }),
    prisma.product.create({
      data: {
        code: 'CST-001',
        nameZh: '硅橡胶冷缩管',
        nameEn: 'Silicone Rubber Cold Shrink Tubing',
        descZh: '预扩张的硅橡胶管，抽出内部支撑芯后自动收缩，无需加热工具，安装快速便捷。',
        descEn: 'Pre-expanded silicone rubber tubing that shrinks automatically when the inner support core is removed.',
        category: 'cold-shrink-tubing',
        image: '/images/products/cst-001.jpg',
        specs: '收缩比: 2:1\n工作温度: -50°C ~ 180°C\n材料: 硅橡胶',
        features: '无需加热\n安装快速\n可重复使用',
        applications: '通信电缆接头\n天线馈线密封\n户外设备防护',
        certifications: 'UL, RoHS, REACH',
        isNew: true,
        isFeatured: true,
        order: 5,
      },
    }),
    prisma.product.create({
      data: {
        code: 'CST-002',
        nameZh: 'EPDM冷缩管',
        nameEn: 'EPDM Cold Shrink Tubing',
        descZh: '采用三元乙丙橡胶材料，具有优异的耐臭氧、耐紫外线性能，适用于户外长期使用。',
        descEn: 'Made from EPDM rubber with excellent ozone and UV resistance.',
        category: 'cold-shrink-tubing',
        image: '/images/products/cst-002.jpg',
        specs: '收缩比: 2.5:1\n工作温度: -40°C ~ 120°C\n电压等级: 可达35kV',
        features: '优异的耐候性\n耐臭氧老化\n良好的电气性能',
        applications: '电力电缆终端\n电缆中间接头\n户外电气设备',
        certifications: 'IEC, IEEE, RoHS',
        isNew: false,
        isFeatured: false,
        order: 6,
      },
    }),
    prisma.product.create({
      data: {
        code: 'ID-001',
        nameZh: '热缩标识管',
        nameEn: 'Heat Shrink Identification Sleeves',
        descZh: '专为线缆标识设计的热缩管，可打印或书写，收缩后标识清晰持久。',
        descEn: 'Heat shrink tubing designed for cable identification, printable or writable.',
        category: 'identification-products',
        image: '/images/products/id-001.jpg',
        specs: '收缩比: 2:1\n工作温度: -55°C ~ 105°C\n打印方式: 热转印/激光',
        features: '打印清晰\n耐磨损\n耐溶剂',
        applications: '电线电缆标识\n控制柜接线\n通信线缆管理',
        certifications: 'UL, MIL-STD, RoHS',
        isNew: false,
        isFeatured: false,
        order: 7,
      },
    }),
    prisma.product.create({
      data: {
        code: 'ID-002',
        nameZh: '热缩标签',
        nameEn: 'Heat Shrink Labels',
        descZh: '预印刷或可打印的热缩标签，适用于各种线径的电缆标识。',
        descEn: 'Pre-printed or printable heat shrink labels suitable for cable identification.',
        category: 'identification-products',
        image: '/images/products/id-002.jpg',
        specs: '收缩比: 2:1\n材料: 聚烯烃\n规格: 多种尺寸',
        features: '即贴即用\n标识清晰\n耐高温',
        applications: '电气面板标识\n工业控制系统\n数据中心布线',
        certifications: 'UL, CSA, RoHS',
        isNew: true,
        isFeatured: false,
        order: 8,
      },
    }),
    prisma.product.create({
      data: {
        code: 'MP-001',
        nameZh: '热缩分支指套',
        nameEn: 'Heat Shrink Breakout Boots',
        descZh: '用于多芯电缆分支处的保护，提供应力释放和密封防护。',
        descEn: 'Protection for multi-core cable breakouts, providing stress relief and sealing protection.',
        category: 'molded-parts',
        image: '/images/products/mp-001.jpg',
        specs: '收缩比: 2:1 ~ 3:1\n分支数: 2-6路\n材料: 交联聚烯烃',
        features: '多种分支规格\n应力释放设计\n密封防水',
        applications: '电缆分支保护\n线束分叉处理\n接线盒入口',
        certifications: 'UL, RoHS, REACH',
        isNew: false,
        isFeatured: true,
        order: 9,
      },
    }),
    prisma.product.create({
      data: {
        code: 'MP-002',
        nameZh: '热缩端帽',
        nameEn: 'Heat Shrink End Caps',
        descZh: '用于电缆末端的密封保护，防止水分和灰尘进入。',
        descEn: 'Sealing protection for cable ends, preventing moisture and dust ingress.',
        category: 'molded-parts',
        image: '/images/products/mp-002.jpg',
        specs: '收缩比: 2:1\n材料: 聚烯烃/带胶\n规格: 多种直径',
        features: '完全密封\n防水防尘\n绝缘保护',
        applications: '电缆末端封堵\n备用芯线保护\n同轴电缆封端',
        certifications: 'UL, IP67, RoHS',
        isNew: false,
        isFeatured: false,
        order: 10,
      },
    }),
  ]);

  console.log(`✓ 创建了 ${products.length} 个产品`);

  // 创建轮播图
  const banners = await Promise.all([
    prisma.banner.create({
      data: {
        titleZh: '专业热缩材料解决方案',
        titleEn: 'Professional Heat Shrink Solutions',
        subtitleZh: '30年行业经验，为全球客户提供优质产品',
        subtitleEn: '30 years of industry experience, providing quality products to global customers',
        image: '/images/banners/banner1.jpg',
        link: '/products',
        order: 1,
        isActive: true,
      },
    }),
    prisma.banner.create({
      data: {
        titleZh: '新能源汽车线束保护专家',
        titleEn: 'EV Wiring Harness Protection Expert',
        subtitleZh: '为电动汽车提供安全可靠的绝缘解决方案',
        subtitleEn: 'Safe and reliable insulation solutions for electric vehicles',
        image: '/images/banners/banner2.jpg',
        link: '/applications/automotive',
        order: 2,
        isActive: true,
      },
    }),
    prisma.banner.create({
      data: {
        titleZh: '全球认证 品质保障',
        titleEn: 'Global Certifications, Quality Assured',
        subtitleZh: 'UL、CSA、RoHS等国际认证，品质值得信赖',
        subtitleEn: 'UL, CSA, RoHS and other international certifications',
        image: '/images/banners/banner3.jpg',
        link: '/about',
        order: 3,
        isActive: true,
      },
    }),
  ]);

  console.log(`✓ 创建了 ${banners.length} 个轮播图`);

  // 创建合作伙伴
  const partners = await Promise.all([
    prisma.partner.create({ data: { name: 'Tesla', logo: '/images/partners/tesla.png', url: 'https://tesla.com', order: 1 } }),
    prisma.partner.create({ data: { name: 'BYD', logo: '/images/partners/byd.png', url: 'https://byd.com', order: 2 } }),
    prisma.partner.create({ data: { name: 'Huawei', logo: '/images/partners/huawei.png', url: 'https://huawei.com', order: 3 } }),
    prisma.partner.create({ data: { name: 'Siemens', logo: '/images/partners/siemens.png', url: 'https://siemens.com', order: 4 } }),
    prisma.partner.create({ data: { name: 'ABB', logo: '/images/partners/abb.png', url: 'https://abb.com', order: 5 } }),
    prisma.partner.create({ data: { name: 'Schneider', logo: '/images/partners/schneider.png', url: 'https://schneider-electric.com', order: 6 } }),
  ]);

  console.log(`✓ 创建了 ${partners.length} 个合作伙伴`);

  // 创建管理员用户（密码加密）
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: '管理员',
      role: 'ADMIN',
    },
  });

  console.log(`✓ 创建了管理员用户: ${admin.email}`);

  console.log('\n========================================');
  console.log('✓ 所有示例数据创建完成！');
  console.log('========================================');
}

main()
  .catch((e) => {
    console.error('创建数据时出错:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
