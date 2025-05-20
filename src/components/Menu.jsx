import styled from 'styled-components'

export const StyledMenu = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;

  li {
    margin: 0 20px;
    padding: 10px 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`

export const Menu = () => {
  return (
    <StyledMenu>
      <li>Current tasks</li>
      <li>Upcoming tasks</li>
      <li>Completed tasks</li>
    </StyledMenu>
  )
}
