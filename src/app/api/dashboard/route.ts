import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        assessments: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            companyName: true,
            industry: true,
            companySize: true,
            status: true,
            createdAt: true,
            strategicThreats: true,
            currentChallenges: true,
            primaryGoal: true,
            topKPI: true,
            urgency: true,
            goals: true,
            // AI Maturity fields - NEW
            currentAIUsage: true,
            aiCapabilities: true,
            dataQuality: true,
            aiTalent: true,
            aiBudget: true,
            aiStrategy: true,
            aiMaturityScore: true,
            aiMaturityLevel: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        email: user.email,
        name: user.name,
      },
      assessments: user.assessments,
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

