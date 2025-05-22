import styled from 'styled-components'
import { media } from '../styles/media'

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

export const Dropdown = ({ options = [], onChange, value }) => {
  // Add defensive check
  const safeOptions = Array.isArray(options) ? options : []

  return (
    <StyledDropdown onChange={onChange} value={value}>
      {safeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledDropdown>
  )
}
