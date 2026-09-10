import React, { useCallback } from 'react'
import { Button as TamaguiButton } from 'tamagui'
import { createComponent } from '../createComponent'

const ButtonFrame = createComponent(TamaguiButton as any, {
  name: 'Button',
  extends: 'Button',
  backgroundColor: '$background',
  color: '$color',
  fontFamily: '$body',
  fontSize: '$3',
  borderRadius: '$2',
  paddingHorizontal: '$4',
  height: '$10',
  cursor: 'pointer',
  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },
  pressStyle: {
    backgroundColor: '$backgroundPress',
  },
  focusStyle: {
    borderColor: '$borderColorFocus',
  },
  variants: {
    disabled: {
      true: { opacity: 0.5, cursor: 'not-allowed' },
    },
  } as const,
})

interface ButtonProps {
  onPress?: () => void
  disabled?: boolean
  children?: React.ReactNode
}

export function Button({ onPress, disabled, children }: ButtonProps) {
  const handlePress = useCallback(() => {
    if (!disabled) onPress?.()
  }, [disabled, onPress])

  return (
    <ButtonFrame onPress={handlePress} disabled={disabled}>
      {children}
    </ButtonFrame>
  )
}
