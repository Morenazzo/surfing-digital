import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Clock, Target } from "lucide-react";

const features = [
  {
    name: "Smart Business Assessment",
    description:
      "Our AI-powered assessment analyzes your business operations to identify the most promising AI implementation opportunities.",
    icon: Brain,
  },
  {
    name: "ROI Calculator",
    description:
      "Get detailed financial projections and ROI estimates for each recommended AI project, helping you make data-driven decisions.",
    icon: TrendingUp,
  },
  {
    name: "Quick Results",
    description:
      "Complete the assessment in just 5 minutes and receive immediate, actionable insights tailored to your business.",
    icon: Clock,
  },
  {
    name: "Action Plan",
    description:
      "Receive a comprehensive 30-60-90 day implementation roadmap with clear milestones and objectives.",
    icon: Target,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32 bg-gradient-to-b from-teal/5 to-white" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-darkblue font-sans">
            Transform Your Business with <span className="text-brand-500">AI</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 font-body">
            Our platform helps you identify and implement the most impactful AI solutions
            for your business, ensuring maximum <span className="font-semibold text-brand-500">ROI</span> and sustainable growth.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {features.map((feature) => (
              <Card 
                key={feature.name} 
                className="border-2 border-turquoise/20 hover:border-turquoise hover:shadow-xl hover:shadow-turquoise/20 transition-all rounded-2xl bg-white/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-teal flex items-center justify-center shadow-lg shadow-turquoise/30">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="mt-4 text-darkblue font-sans font-semibold">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 font-body font-light leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
