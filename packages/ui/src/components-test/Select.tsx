import React, { useState, useCallback } from 'react'
import { Select as TamaguiSelect, Stack, Text as TamaguiText } from 'tamagui'
import { createComponent } from '../createComponent'

const SelectFrame = createComponent(TamaguiSelect.Trigger as any, {
  name: 'Select',
  extends: 'Select',
  backgroundColor: '$background',
  borderColor: '$borderColor',
  borderRadius: '$2',
  borderWidth: 1,
  paddingHorizontal: '$3',
  height: '$10',
  cursor: 'pointer',
  fontFamily: '$body',
  fontSize: '$3',
  color: '$color',

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

const OptionItem = createComponent(TamaguiSelect.Item as any, {
  name: 'SelectOption',
  extends: 'SelectItem',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  cursor: 'pointer',
  backgroundColor: '$background',
  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },
})

export interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select...',
  disabled,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState<string | undefined>(value)
  const selectedValue = value !== undefined ? value : internalValue
  const selected = options.find((o) => o.value === selectedValue)

  const handleValueChange = useCallback(
    (next: string) => {
      setInternalValue(next)
      onValueChange?.(next)
    },
    [onValueChange],
  )

  return (
    <TamaguiSelect value={selectedValue} onValueChange={handleValueChange} disabled={disabled}>
      <TamaguiSelect.Trigger>
        <SelectFrame>
          <TamaguiText
            color={selected ? '$color' : '$placeholderColor'}
            fontFamily="$body"
            fontSize="$3"
          >
            {selected?.label ?? placeholder}
          </TamaguiText>
          <TamaguiSelect.Icon>
            <TamaguiText color="$placeholderColor" fontSize="$2">
              ▼
            </TamaguiText>
          </TamaguiSelect.Icon>
        </SelectFrame>
      </TamaguiSelect.Trigger>
      <TamaguiSelect.Content>
        <TamaguiSelect.Viewport>
          <TamaguiSelect.Group>
            {options.map((option) => (
              <OptionItem key={option.value} value={option.value}>
                <TamaguiSelect.ItemText>
                  <TamaguiText fontFamily="$body" fontSize="$3" color="$color">
                    {option.label}
                  </TamaguiText>
                </TamaguiSelect.ItemText>
              </OptionItem>
            ))}
          </TamaguiSelect.Group>
        </TamaguiSelect.Viewport>
      </TamaguiSelect.Content>
    </TamaguiSelect>
  )
}
