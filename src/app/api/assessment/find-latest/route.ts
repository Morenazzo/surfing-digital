import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

/**
 * GET /api/assessment/find-latest
 * Finds the most recent assessment (created in the last 2 minutes)
 * This is used by the fillout-redirect page to find the user's assessment
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    
    // Find assessment created in the last 5 minutes (increased from 2 to give more time)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    
    console.log('🔍 Searching for assessments:', {
      email,
      createdAfter: fiveMinutesAgo.toISOString()
    })
    
    const whereClause: Prisma.AssessmentWhereInput = {
      createdAt: {
        gte: fiveMinutesAgo,
      },
    }
    
    // If email is provided, filter by email
    if (email) {
      whereClause.user = {
        email: email
      }
    }
    
    const assessment = await prisma.assessment.findFirst({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            email: true,
          }
        }
      },
    })

    console.log('📊 Assessment search result:', assessment ? {
      id: assessment.id,
      email: assessment.user.email,
      status: assessment.status,
      createdAt: assessment.createdAt
    } : 'No assessment found')

    if (!assessment) {
      return NextResponse.json(
        { 
          success: false,
          error: 'No recent assessment found',
          message: email 
            ? `No assessment found for ${email} in the last 5 minutes`
            : 'No assessment was created in the last 5 minutes' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      email: assessment.user.email,
      status: assessment.status,
    })

  } catch (error) {
    console.error('❌ Error finding latest assessment:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
