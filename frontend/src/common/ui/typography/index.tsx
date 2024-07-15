import React from 'react';

type TypographyProp = {
  variant?: 'h1' | 'h2' | 'h3' | 'p'; // Define the possible variants
  className?: string; // Allow additional Tailwind classes
  children?: React.ReactNode;
};

export const Typography: React.FC<TypographyProp> = ({
  variant = 'p', // Default to 'p' if no variant is provided
  className = '', // Default to an empty string if no className is provided
  children,
}) => {
  // Define the Tailwind classes for each variant
  const variants = {
    h1: '',
    h2: '',
    h3: 'text-lg font-bold',
    p: 'text-sm font-normal',
  };

  // Get the classes for the current variant
  const variantClasses = variants[variant];

  // Combine the variant classes with the additional classes
  const combinedClasses = `${variantClasses} w-full ${className}`.trim();

  return <div className={combinedClasses}>{children}</div>;
};
