import styled from 'styled-components'
import { media } from '../styles/media'
import { Children, cloneElement } from 'react'

const StyledTabs = styled.div`
  display: none;

  ${media.tablet} {
    display: none;
  }
  ${media.laptop} {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
  }
  ${media.desktop} {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`

// Add defensive programming to handle undefined children
export const Tabs = ({ children }) => {
  // Make sure children is always an array we can work with
  const safeChildren = Children.toArray(children || [])

  // Map over the children to add/modify props if needed
  const tabs = safeChildren.map((child, index) => {
    // Clone and return the child with any additional props
    return cloneElement(child, {
      key: index
    })
  })

  return <StyledTabs>{tabs}</StyledTabs>
}

export const Tab = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${(props) =>
    props.$active ? 'var(--color-primary)' : 'var(--color-border)'};
  color: ${(props) =>
    props.$active ? 'var(--color-text)' : 'var(--color-text)'};
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) =>
      props.$active ? 'var(--color-primary-dark)' : 'var(--color-text-light)'};
    color: ${(props) =>
      props.$active ? 'var(--color-text)' : 'var(--color-text-dark)'};
  }
  &.active {
    background-color: var(--color-primary);
    color: var(--color-text);
  }
`
