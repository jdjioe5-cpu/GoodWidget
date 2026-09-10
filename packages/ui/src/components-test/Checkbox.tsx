import React, { useCallback } from 'react'
import { Checkbox as TamaguiCheckbox, Stack, Text as TamaguiText } from 'tamagui'
import { createComponent } from '../createComponent'

const CheckboxFrame = createComponent(TamaguiCheckbox as any, {
  name: 'Checkbox',
  extends: 'Checkbox',
  backgroundColor: '$backgroundTransparent',
  borderColor: '$borderColor',
  hoverStyle: {
    borderColor: '$borderColorHover',
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

interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Checkbox({ checked = false, onCheckedChange, label, disabled }: CheckboxProps) {
  const handleCheckedChange = useCallback(
    (next: boolean) => {
      if (!disabled) onCheckedChange?.(next)
    },
    [disabled, onCheckedChange],
  )

  return (
    <Stack flexDirection="row" alignItems="center" gap="$2">
      <CheckboxFrame
        checked={checked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
      >
        <TamaguiCheckbox.Indicator>
          <TamaguiText fontFamily="$body" fontSize="$2" color="$color">
            ✓
          </TamaguiText>
        </TamaguiCheckbox.Indicator>
      </CheckboxFrame>
      {label && (
        <TamaguiText fontFamily="$body" fontSize="$3" color="$color">
          {label}
        </TamaguiText>
      )}
    </Stack>
  )
}
