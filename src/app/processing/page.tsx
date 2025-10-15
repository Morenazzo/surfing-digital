import { Suspense } from 'react'
import ProcessingClient from './ProcessingClient'

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProcessingClient />
    </Suspense>
  )
}

