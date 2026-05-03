import React from "react";

export interface StepItem {
  id: number;
  label: string;
  icon: string;
}

interface StepperProps {
  currentStep: number;
  steps: StepItem[];
}

export default function Stepper({ currentStep, steps }: StepperProps) {
  const progressWidth = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

  return (
    <div className="w-full max-w-2xl mx-auto mb-16 px-4 mt-8">
      <div className="flex justify-between items-center relative">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-500 z-0 rounded-full transition-all duration-500"
          style={{ width: progressWidth }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                      ? "bg-slate-500 text-white shadow-md scale-110"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <i className={`${step.icon} text-2xl`}></i>
                ) : (
                  <i className={`${step.icon} text-2xl`}></i>
                )}
              </div>

              <span
                className={`absolute -bottom-8 w-32 text-center text-sm font-medium transition-colors duration-300 ${
                  isCompleted
                    ? "text-green-600"
                    : isActive
                      ? "text-slate-800 font-bold"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
