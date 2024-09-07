import {cva, VariantProps} from 'class-variance-authority';
import React from 'react';
import {Pressable} from 'react-native';
import {cn} from '../utils/cn';

export const buttonVariants = cva('border-[1px]', {
  variants: {
    variant: {
      primary: 'bg-primary',
      secondary: 'bg-white',
    },
    size: {
      lg: 'p-4',
      md: 'p-3',
      sm: 'p-2',
    },
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({className, ...props}, ref) => {
  return (
    <Pressable
      className={cn(buttonVariants(props), className)}
      ref={ref}
      {...props}
    />
  );
});

export default Button;
