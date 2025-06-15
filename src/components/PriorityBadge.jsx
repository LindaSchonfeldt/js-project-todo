import styled from 'styled-components'

const StyledBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${(props) => {
    switch (props.$priority) {
      case 'high':
        return 'var(--color-priority-high)'
      case 'medium':
        return 'var(--color-priority-medium)'
      default:
        return 'var(--color-priority-low)'
    }
  }};
  color: var(--color-text);
`

export const PriorityBadge = ({ priority }) => {
  // Don't render if priority is empty or undefined
  if (!priority || priority.trim() === '') {
    return null
  }

  return <StyledBadge $priority={priority}>{priority}</StyledBadge>
}
