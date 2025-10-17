import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What guarantees do I have?',
    answer: 'No hype — just method. If you don't get measurable ROI, you still get clear learnings and decision frameworks to stop wasting budget.',
  },
  {
    question: 'What about data security?',
    answer: 'We follow least-privilege access, anonymization, and human review — aligned with your internal standards (SOC2 / ISO / GDPR).',
  },
  {
    question: 'How much time does my team need?',
    answer: 'Around 2–4 hours/week per key role during the sprint — faster than traditional projects, with exponential learning gains.',
  },
  {
    question: 'Can this integrate with our current stack?',
    answer: 'Absolutely. We work through APIs and secure connectors — no vendor lock-in.',
  },
]

export default function FAQ() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about the AI Profit Sprint™.
          </p>
        </div>
        
        {/* Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="rounded-2xl border border-gray-200 px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-[#00BFA5] py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

