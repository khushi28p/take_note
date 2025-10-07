import React, { FC } from 'react';
import { Sparkles, CheckSquare, Brain, ArrowRight } from 'lucide-react';

/**
 * Renders the Hero Section for the AI-Powered Todo Application.
 * This component uses the custom color palette defined in the global CSS
 * and includes a subtle animation for engaging visual entrance.
 */
const HeroSection: FC = () => {

  // Simple mock data for the AI feature preview
  const mockTasks = [
    { id: 1, text: "Schedule team sync-up on Tuesday", icon: <CheckSquare className="w-5 h-5 text-chart-3" /> },
    { id: 2, text: "Draft proposal for Q4 planning", icon: <CheckSquare className="w-5 h-5 text-chart-1" /> },
    { id: 3, text: "Buy milk and bread (AI flagged as urgent)", icon: <Brain className="w-5 h-5 text-destructive" /> },
  ];

  return (
    <section className="min-h-[85vh] flex items-center justify-center pt-24 pb-12 sm:py-32 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">

          {/* Sparkle Tagline */}
          <div className="inline-flex items-center space-x-2 mb-4 bg-secondary/70 text-secondary-foreground text-sm font-semibold px-4 py-1 rounded-full border border-border animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Smart Task Management Just Got Smarter</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up delay-100">
            <span className="block">
              Organize <span className="text-primary">Effortlessly.</span>
            </span>
            <span className="block mt-2">
              <span className="text-primary">Powered</span> by AI.
            </span>
          </h1>

          {/* Subtitle/Description */}
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in-up delay-200">
            Stop worrying about priority. Our intelligent todo application uses
            advanced models to automatically categorize, schedule, and suggest
            next steps, so you can focus on getting things done.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up delay-300">
            <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary/50">
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-3 border border-input text-base font-medium rounded-lg text-foreground bg-background hover:bg-secondary transition-colors duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-ring/50">
              View Demo
            </button>
          </div>

        </div>

        {/* Mock App Preview (Illustrating the AI feature) */}
        <div className="mt-20 flex justify-center animate-fade-in-up delay-500">
            <div className="w-full max-w-xl bg-card border border-border shadow-2xl shadow-primary/30 rounded-xl p-6 transition-all duration-500 hover:shadow-primary/50">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-foreground flex items-center">
                      Today's Focus
                      <Brain className="w-5 h-5 ml-2 text-primary" />
                    </h2>
                    <span className="text-sm text-muted-foreground">Oct 7, 2025</span>
                </div>
                
                <ul className="space-y-3">
                    {mockTasks.map((task) => (
                        <li key={task.id} className="flex items-center p-3 bg-secondary/50 rounded-lg border border-secondary/70">
                            <div className="flex-shrink-0 mr-3 opacity-80">
                                {task.icon}
                            </div>
                            <p className="text-base font-medium text-secondary-foreground">
                                {task.text}
                            </p>
                        </li>
                    ))}
                    <li className="p-3 bg-input rounded-lg text-muted-foreground text-center italic mt-4">
                        + Add new task (AI will prioritize it automatically)
                    </li>
                </ul>
            </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
