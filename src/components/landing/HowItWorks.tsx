import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    name: "Complete the Assessment",
    description:
      "Answer a series of smart questions about your business operations, goals, and challenges. Our AI analyzes your responses in real-time.",
    step: "01",
    icon: "💡",
  },
  {
    name: "Get AI Recommendations",
    description:
      "Receive your top 3 AI project recommendations tailored to your business, complete with ROI estimates and impact analysis.",
    step: "02",
    icon: "⚙️",
  },
  {
    name: "Review Your Action Plan",
    description:
      "Access your comprehensive 30-60-90 day implementation roadmap with clear milestones, resources needed, and expected outcomes.",
    step: "03",
    icon: "📈",
  },
  {
    name: "Start Implementation",
    description:
      "Begin executing your AI strategy with confidence, knowing you're focusing on the projects with the highest potential ROI for your business.",
    step: "04",
    icon: "🚀",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-teal/5 via-white to-turquoise/5" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-darkblue font-sans">
            How It Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 font-body">
            Get actionable AI insights in just <span className="font-semibold text-brand-500">4 simple steps</span>. Our platform guides you
            from assessment to implementation.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-5xl">
          <div className="grid grid-cols-1 gap-4 md:gap-5">
            {steps.map((step, index) => (
              <div key={step.name}>
                <div className="relative rounded-2xl border-2 border-turquoise/20 bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl hover:shadow-turquoise/10 transition-all group hover:border-turquoise">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-teal flex items-center justify-center shadow-lg shadow-turquoise/30 font-sans font-bold text-white">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-darkblue mb-2 font-sans flex items-center gap-2">
                        <span className="text-2xl">{step.icon}</span>
                        {step.name}
                        <CheckCircle2 className="h-5 w-5 text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-sm text-gray-600 font-body font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Arrow indicator between steps */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="h-8 w-8 rounded-full bg-turquoise/10 flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-turquoise rotate-90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
