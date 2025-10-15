import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/fillout-debug
 * Debug endpoint to see exactly what Fillout is sending
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('🔍 ==================== FILLOUT DEBUG ====================')
    console.log('📦 Full body:', JSON.stringify(body, null, 2))
    console.log('🔑 Body keys:', Object.keys(body))
    console.log('📝 Questions:', body.questions)
    console.log('🔍 =======================================================')

    return NextResponse.json({
      success: true,
      message: 'Debug data logged to console',
      received: {
        bodyKeys: Object.keys(body),
        hasQuestions: !!body.questions,
        questionsCount: body.questions?.length || 0,
        submissionId: body.submissionId,
      },
    })
  } catch (error) {
    console.error('❌ Error in debug endpoint:', error)
    return NextResponse.json(
      {
        error: 'Failed to parse body',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'fillout-debug',
    message: 'Send a POST request to see the payload',
  })
}


