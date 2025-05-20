import styled from 'styled-components'

const StyledDropdown = styled.select``

StyledDropdown.defaultProps = {
  options: [],
  onChange: () => {}
}

export const Dropdown = ({ options, onChange, value }) => {
  return (
    <StyledDropdown onChange={onChange} value={value}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledDropdown>
  )
}

// Set default props on the component itself
Dropdown.defaultProps = {
  options: [],
  onChange: () => {},
  value: ''
}
