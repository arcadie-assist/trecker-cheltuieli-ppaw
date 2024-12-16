import { prisma } from "@/lib/prismaClient";

export async function GET() {
  try {
    const memberships = await prisma.membership.findMany();
    return Response.json(memberships);
  } catch (error) {
    return Response.json({ error: "GET MEMBERSHIPS ERROR" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId, membershipId } = await request.json();

  const membership = await prisma.membership.findUnique({
    where: { id: membershipId },
  });

  if (!membership) {
    return Response.json(
      { error: "CHOOSE MEMBERSHIP ERROR: MEMBERSHIP NOT FOUND" },
      { status: 404 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return Response.json(
      { error: "CHOOSE MEMBERSHIP ERROR: USER NOT FOUND" },
      { status: 404 }
    );
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      scans_remaining: user.scans_remaining + membership.scans,
    },
  });

  return Response.json(membership);
}
