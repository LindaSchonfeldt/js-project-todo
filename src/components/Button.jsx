import styled from "styled-components"
// Variants of buttons - primary, secondary, danger, success

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &.primary {
    background-color: var(--color-primary);
    color: var(--color-surface);

    &:hover {
      background-color: var(--color-primary-dark);
    }

    &:disabled {
      background-color: var(--color-border);
      cursor: not-allowed;
    }
  }

  &.secondary {
    background-color: var(--color-secondary);
    color: var(--color-surface);

    &:hover {
      background-color: var(--color-secondary-dark);
    }
  }

  &.danger {
    background-color: var(--color-danger);
    color: var(--color-surface);

    &:hover {
      background-color: var(--color-danger-dark);
    }
  }

  &.success {
    background-color: var(--color-success);
    color: var(--color-surface);

    &:hover {
      background-color: var(--color-success-dark);
    }
  }

  &.medium {
    font-size: 16px;
  }

  &.small {
    font-size: 14px;
  }
`
export const Button = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      className={`${variant} ${size}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
