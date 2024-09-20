import React from 'react'
import { Text, TextInput, View } from 'react-native'

import { cn } from '@/utils/cn'

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  errorMessage?: string
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, errorMessage, ...props }, ref) => {
    return (
      <View
        className={cn(
          'w-full border-[1px] py-[10px] text-[13px] px-[12px] border-gray-300 ',
          className,
          errorMessage
            ? 'border-red-500 h-[65px] justify-center'
            : 'border-gray-300',
        )}
        style={props.style}
      >
        <TextInput
          ref={ref}
          {...props}
          className={cn('border-none text-[13px]')}
        />
        {errorMessage && (
          <Text className={cn('text-red-500 mt-[9px] text-[8px]')}>
            {errorMessage}
          </Text>
        )}
      </View>
    )
  },
)

Input.displayName = 'Input'

export default Input
