import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: palevioletred;
  text-transform: uppercase
`

export const Input = styled.input`
  margin: 0.25em;
  height: 1.5em
`

export const Button = styled.button`
  background: ${props => props.green ? '#1ADE96': '#B2FFE3'};
  font-size: 0.85em;
  margin: 0.25em;
  padding: 0.25em 1em;
  border: 1px solid black;
  border-radius: 3px;
`

export const LogoutButton = styled(Button)`
text-transform: uppercase;
margin: 1em;
background: #FCB2D9;

`

export const Navigation = styled.div`
  padding: 5;
  background: #FCB2D9;
  display: 'inline-block';
  width:'100%';
  margin-bottom: 5px;
  background-color: rgba(255, 178, 239, 0.7);
`
// https://retool.com/blog/building-a-react-table-component/
export const Table = styled.div`
table {
    border: 1px solid black;

    tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

    td {
      padding: 0.8em;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
 
      :last-child {
        border-right: 0;
      }
    }
   
    thead {
      background: rgba(255, 178, 239, 0.7);
    }
  }
`

