import { CheckCircle } from 'lucide-react'

const reasons = [
  {
    title: 'Learn by doing',
    description: '10% content, 70% action, 20% sharing.',
  },
  {
    title: 'Gamified process',
    description: 'Focus, accountability, and velocity.',
  },
  {
    title: 'Secure & responsible',
    description: 'Human-in-the-loop, privacy by design.',
  },
  {
    title: 'Tech-agnostic',
    description: 'Works with Microsoft, Google, or AWS stacks.',
  },
]

export default function WhyItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#00BFA5]/5 via-white to-[#FF6F61]/5">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Why It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A methodology designed for speed, safety, and real learning.
          </p>
        </div>
        
        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-5xl">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#00BFA5]">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

