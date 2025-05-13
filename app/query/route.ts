// DELETE this on production
//
// The code above is a query that lists all goods from the database.

import prisma from '@/app/lib/prisma';

async function listGoods() {
  const data = await prisma.product.findMany();

  return data;
}

export async function GET() {
  try {
    return Response.json(await listGoods());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
