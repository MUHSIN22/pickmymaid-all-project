import React from "react";

interface StepperProps {
  steps: number; // total steps
  activeStep: number; // current step (1-based)
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="flex items-center w-full">
      {[...Array(steps)].map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < activeStep;
        const isActive = stepNumber === activeStep;

        return (
          <React.Fragment key={index}>
            {/* Circle */}
            <div
              className={`flex items-center z-[100] justify-center w-10 h-10 rounded-full transition-colors 
                ${
                  isCompleted
                    ? "bg-blue-600 text-white"
                    : isActive
                    ? "bg-blue-100 text-blue-600 ring-2 ring-blue-600"
                    : "bg-gray-200 text-gray-500"
                }`}
            >
              {stepNumber}
            </div>

            {/* Connector line (skip after last circle) */}
            {index < steps - 1 && (
              <div
                className={`flex-1 h-1 ${
                  isCompleted ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
