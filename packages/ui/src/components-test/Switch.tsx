import React, { useCallback } from 'react'
import { Switch as TamaguiSwitch, Stack, Text as TamaguiText } from 'tamagui'
import { createComponent } from '../createComponent'

const SwitchFrame = createComponent(TamaguiSwitch as any, {
  name: 'Switch',
  extends: 'Switch',
  backgroundColor: '$borderColor',
  variants: {
    disabled: {
      true: { opacity: 0.5, cursor: 'not-allowed' },
    },
  } as const,
})

interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Switch({ checked = false, onCheckedChange, label, disabled }: SwitchProps) {
  const handleCheckedChange = useCallback(
    (next: boolean) => {
      if (!disabled) onCheckedChange?.(next)
    },
    [disabled, onCheckedChange],
  )

  return (
    <Stack flexDirection="row" alignItems="center" gap="$2">
      <SwitchFrame
        checked={checked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
      >
        <TamaguiSwitch.Thumb backgroundColor="$color" />
      </SwitchFrame>
      {label && (
        <TamaguiText fontFamily="$body" fontSize="$3" color="$color">
          {label}
        </TamaguiText>
      )}
    </Stack>
  )
}
