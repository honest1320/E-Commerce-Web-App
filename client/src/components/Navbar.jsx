import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  height:60px;
  ${mobile({height: '50px'})};
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({padding: '10px 0px'})};
`;
const Left = styled.div`
   flex: 1;
   display: flex;
   align-items: center;
`
const Language = styled.div`
  font-size: 14;
  cursor: pointer;
  ${mobile({display: 'none'})}
`
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px; 
`
const Input = styled.input`
  ${mobile({width:'50px'})}
`
const Center = styled.div`
  flex: 1;
  text-align: center;
`
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({fontSize :'24px'})}
`
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({flex: '2', justifyContent: 'center'})}
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({fontSize: '11px', marginLeft: '10px'})}
`

const Navbar = () => {

  const quantity = useSelector(state=>state.cart.quantity)

  console.log(quantity);

  return (
    <Container>
      <Wrapper>
        
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input style={{border: 'none'}}></Input>
            <Search style={{color:"gray", fontSize:16 }}/>
          </SearchContainer>
        </Left>

        <Center>
          <Logo> ILANEST.</Logo>
        </Center>

        <Right>

          <MenuItem>
            REGISTER
          </MenuItem>

          <MenuItem>
            SIGN IN
          </MenuItem>

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          

        </Right>
      </Wrapper>
    </Container>

  )
}

export default Navbar