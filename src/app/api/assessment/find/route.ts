import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        assessments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    })

    if (!user || user.assessments.length === 0) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      )
    }

    const assessment = user.assessments[0]

    return NextResponse.json({
      assessmentId: assessment.id,
      status: assessment.status,
      createdAt: assessment.createdAt,
    })
  } catch (error) {
    console.error('❌ Error finding assessment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

