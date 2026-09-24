import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField, type TextFieldProps } from '@mui/material'

interface SearchFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: string
  onValueChange: (value: string) => void
}

export function SearchField({
  value,
  onValueChange,
  placeholder = 'Search…',
  ...textFieldProps
}: SearchFieldProps) {
  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      placeholder={placeholder}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="Clear search"
                onClick={() => onValueChange('')}
                edge="end"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  )
}
