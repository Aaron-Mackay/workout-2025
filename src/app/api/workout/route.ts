// app/api/workouts/route.ts

import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, {params}: { params: Promise<{ userId: string, weekId: string }> }) {
  const {userId, weekId} = await params;

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        weekId: Number(weekId),  // Ensure the ID is a number
        week: {userId: Number(userId)}, // Ensure the ID is a number
      },
    });

    return NextResponse.json(workouts);
  } catch (error) {
    console.error(error)
    return NextResponse.json({error: 'Failed to fetch workouts'}, {status: 500});
  }
}
