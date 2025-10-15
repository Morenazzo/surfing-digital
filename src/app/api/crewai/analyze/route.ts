import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

// Vercel timeout (max 300s on Pro plan, 60s on Hobby)
export const maxDuration = 300; // 5 minutes
// Disable response caching for this dynamic route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const assessmentData = await req.json();
    
    console.log('📥 Received assessment data for CrewAI:', assessmentData);
    
    // Path to CrewAI project
    const crewaiPath = path.join(process.cwd(), '..', 'surfing-ai-agents');
    
    // Prepare the command
    const dataJson = JSON.stringify(assessmentData).replace(/"/g, '\\"');
    const command = `cd "${crewaiPath}" && PYTHONPATH=src python3 src/surfing_digital/main.py '${dataJson}'`;
    
    console.log('🚀 Executing CrewAI crew...');
    
    // Execute CrewAI with timeout
    const { stdout, stderr } = await execAsync(command, {
      timeout: 300000, // 5 minutes
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer for large outputs
    });
    
    if (stderr) {
      console.warn('⚠️  CrewAI stderr:', stderr);
    }
    
    console.log('✅ CrewAI execution completed');
    
    // Try to parse the output
    // The crew output might be mixed with execution logs,
    // so we'll return the full stdout for now
    
    return NextResponse.json({
      success: true,
      output: stdout,
      stderr: stderr || null,
      message: 'CrewAI analysis completed successfully',
    });
    
  } catch (error) {
    console.error('❌ Error calling CrewAI:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to analyze with CrewAI',
          message: error.message,
          details: 'stdout' in error ? (error as Error & { stdout: string }).stdout : null,
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to analyze with CrewAI',
        message: 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'crewai-analyze',
    message: 'POST assessment data to this endpoint to trigger CrewAI analysis',
    example: {
      companyName: 'Example Corp',
      industry: 'Technology',
      companySize: '100',
      // ... other fields
    }
  });
}

