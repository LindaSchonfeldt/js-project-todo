import styled from 'styled-components'

export const StyledCountBadge = styled.span`
  font-size: 0.8em;
  opacity: 0.8;
  margin-left: 4px;
  color: var(--color-text-dark);
  background-color: ${(props) =>
    props.$active ? 'var(--color-primary)' : 'var(--color-background)'};
  color: ${(props) =>
    props.$active ? 'var(--color-text)' : 'var(--color-text-light)'};
`

export const CountBadge = ({ count, active }) => {
  return <StyledCountBadge $active={active}>{count}</StyledCountBadge>
}
