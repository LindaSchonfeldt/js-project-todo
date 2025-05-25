import styled from 'styled-components'

export const StyledCountBadge = styled.span`
  font-size: 0.8em;
  opacity: 0.8;
  margin-left: 4px;
  color: inherit; /* Use the tab's text color */
  background-color: transparent; /* No separate background */
`

export const CountBadge = ({ count, active }) => {
  return <StyledCountBadge $active={active}>{count}</StyledCountBadge>
}
