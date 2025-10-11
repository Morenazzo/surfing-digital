import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the 5-minute assessment work?",
    answer:
      "Our smart assessment uses AI to analyze your business through a series of targeted questions. The algorithm processes your responses in real-time to identify the most promising AI implementation opportunities specific to your business needs and goals.",
  },
  {
    question: "How accurate are the ROI estimates?",
    answer:
      "Our ROI calculations are based on industry benchmarks, real-world case studies, and market data. While estimates may vary based on implementation specifics, our projections provide a reliable foundation for decision-making, typically accurate within a 15-20% range.",
  },
  {
    question: "What kind of businesses can benefit from your service?",
    answer:
      "Our platform is designed to help businesses of all sizes and across various industries. Whether you're a startup looking to scale or an established enterprise seeking digital transformation, our assessment adapts to your specific context and provides relevant AI solutions.",
  },
  {
    question: "What's included in the 30-60-90 day action plan?",
    answer:
      "The action plan includes detailed implementation steps, resource requirements, timeline milestones, and expected outcomes. It's designed to be practical and achievable, breaking down complex AI projects into manageable phases with clear objectives.",
  },
  {
    question: "Do you provide support during implementation?",
    answer:
      "While our primary service is the assessment and planning phase, we can connect you with vetted implementation partners who specialize in executing the type of AI projects we recommend. We also provide resources and guidelines to help you manage the implementation process.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-turquoise/5" id="faq">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-darkblue font-sans">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 font-body">
            Find answers to common questions about our <span className="font-semibold text-brand-500">AI assessment platform</span> and how
            it can benefit your business.
          </p>
        </div>
        <div className="mx-auto max-w-3xl mt-16">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-turquoise/20"
              >
                <AccordionTrigger className="text-left text-darkblue hover:text-brand-500 font-sans font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-body leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
