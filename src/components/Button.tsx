import { cva, VariantProps } from 'class-variance-authority'
import React, { PropsWithChildren } from 'react'
import { Pressable, Text } from 'react-native'

import { cn } from '@/utils/cn'

export const buttonVariants = cva('flex w-full items-center rounded-[5px]', {
  variants: {
    variant: {
      primary: 'bg-primary active:bg-pink-500',
      secondary: 'bg-white border-[1px] border-primary active:opacity-50',
      disabled: 'bg-gray-300 border-none',
    },
    size: {
      lg: 'py-[13px]',
      md: 'py-[10px]',
      sm: 'p-[5px]',
    },
    disabled: {
      true: 'bg-[#c63b6450]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
  },
  compoundVariants: [
    {
      variant: 'secondary',
      disabled: true,
      class: 'border-none',
    },
  ],
})

export const buttonTextVariants = cva('font-semibold', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'text-primary',
    },
    size: {
      lg: 'text-[16px]',
      md: 'text-[16px]',
      sm: 'text-[9px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
})

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps & PropsWithChildren
>(({ className, children, variant, size, disabled, ...props }, ref) => (
  <Pressable
    className={cn(
      buttonVariants({
        variant,
        size,
        disabled,
      }),
      className,
    )}
    ref={ref}
    {...props}
  >
    <Text
      className={buttonTextVariants({
        variant,
        size,
        disabled,
      } as VariantProps<typeof buttonTextVariants>)}
    >
      {children}
    </Text>
  </Pressable>
))

Button.displayName = 'Button'

export default Button
