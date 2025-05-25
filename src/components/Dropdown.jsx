import styled from 'styled-components'
import { media } from '../styles/media'

const DropdownContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 14px;
  color: var(--color-text);
`

const StyledDropdown = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  font-size: 16px;
  color: var(--color-text);
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 5px rgba(var(--color-primary-rgb, 74, 144, 226), 0.5);
  }
  ${media.tablet} {
  }
  ${media.laptop} {
    display: none;
  }
  ${media.desktop} {
    display: none;
  }
`

export const Dropdown = ({
  options = [],
  onChange,
  value,
  label,
  id = 'dropdown',
  ariaLabel,
  required = false
}) => {
  // Add defensive check
  const safeOptions = Array.isArray(options) ? options : []

  return (
    <DropdownContainer>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span aria-hidden='true'> *</span>}
        </Label>
      )}
      <StyledDropdown
        id={id}
        onChange={onChange}
        value={value}
        aria-label={!label ? ariaLabel || 'Select an option' : undefined}
        aria-required={required}
      >
        {safeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledDropdown>
    </DropdownContainer>
  )
}
