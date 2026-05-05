"use client";

import React from "react";
import { motion } from "framer-motion";

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
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full bg-white px-8 pt-14 pb-10">
      <div className="max-w-2xl mx-auto">
        {/* Outer flex: step circles + labels */}
        <div className="flex items-center justify-between relative">

          {/* Background track — inset to start/end at circle centers (w-14/2 = 28px = 1.75rem) */}
          <div className="absolute inset-x-7 top-7 h-[2px] bg-gray-200 z-0" />

          {/* Animated progress fill */}
          <div
            className="absolute top-7 left-7 h-[2px] bg-[#16A34A] z-0 transition-all duration-500 ease-in-out"
            style={{
              width: `calc((100% - 3.5rem) * ${progressPercent / 100})`,
            }}
          />

          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                {/* Circle */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor:
                      isCompleted ? "#16A34A" : isActive ? "#86000D" : "#E5E7EB",
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-14 h-14 rounded-full flex items-center justify-center relative"
                >
                  {isCompleted ? (
                    <motion.i
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="ri-check-line text-2xl text-white"
                    />
                  ) : (
                    <i
                      className={`${step.icon} text-xl ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                  )}

                  {/* Pulse ring for active step only */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#86000D]/40"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <motion.span
                  animate={{
                    color: isCompleted ? "#16A34A" : isActive ? "#86000D" : "#9CA3AF",
                    fontWeight: isActive ? 700 : isCompleted ? 600 : 400,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-center whitespace-nowrap"
                >
                  {step.label}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
