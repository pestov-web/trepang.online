import prisma from '@/app/lib/prisma';

export async function fetchGoods() {
  try {
    console.log('Fetching goods data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await prisma.product.findMany({
      include: {
        images: true,
      },
    });

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goods data.');
  }
}
