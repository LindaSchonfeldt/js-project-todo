import styled from 'styled-components'
import { media } from '../styles/media'

const StyledDropdown = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 16px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
  }
  ${media.tablet} {
    font-size: 18px;
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
