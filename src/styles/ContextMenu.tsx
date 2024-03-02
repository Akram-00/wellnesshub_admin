import styled, { css } from 'styled-components';

interface ContextMenuProps {
  top: number;
  left: number;
}

const ContextMenu = styled.div<ContextMenuProps>`
  position: absolute;
  width: 200px;
  z-index:100;
  background-color: #383838;
  border-radius: 5px;
  box-sizing: border-box;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    list-style: none;
  }
  li {
    padding: 18px 12px;
  }
  li:hover {
    cursor: pointer;
    background-color: #000000;
  }
`;

export default ContextMenu;