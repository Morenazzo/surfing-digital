import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Intentar obtener el último assessment
    const latestAssessment = await prisma.assessment.findFirst({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        companyName: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    })

    if (latestAssessment) {
      return NextResponse.json({
        success: true,
        message: 'Database connection successful!',
        assessment: {
          id: latestAssessment.id,
          email: latestAssessment.user.email,
          companyName: latestAssessment.companyName,
          createdAt: latestAssessment.createdAt,
        },
        resultsUrl: `/results/${latestAssessment.id}`,
        fullUrl: `http://localhost:3000/results/${latestAssessment.id}`,
        ngrokUrl: `https://semiprecious-unelastic-ronnie.ngrok-free.dev/results/${latestAssessment.id}`,
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'No assessments found in database',
      })
    }
  } catch (error) {
    console.error('❌ Database error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        solution: error instanceof Error && error.message.includes('P1001')
          ? 'Go to https://console.neon.tech/ and wake up your database'
          : 'Check your database connection',
      },
      { status: 500 }
    )
  }
}


