import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons"
import { Link } from "react-router-dom"
import styled from 'styled-components'

const Info =styled.div`
   width: 100%;
   height:100%;
   position:absolute;
   top:0;
   left:0;
   background-color: gray;
   z-index: 3;
   display: flex;
   justify-content: center;
   align-items:center;
   opacity: 0;
   cursor: pointer;
`

const Container = styled.div`
    flex: 1;
    margin:5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: centre;
    justify-content: center;
    background-color:aliceblue;
    position: relative;

    &:hover ${Info}{
      opacity: 0.5;
      transition: all 1.5s ease;
    }
`

const Image =styled.img`
   height: 75%;
   z-index: 2;
`

const Icon = styled.div`
   width: 40px;
   height:40px;
   border-radius: 50%;
   background-color:white;
   display: flex;
   justify-content: center;
   align-items:center;
   margin: 10px;
   

   &:hover{
      background-color: cadetblue;
      transform: scale(1.1);
      transition: all 0.5s ease; 
   }
`


const Product = ({item}) => {
  
  return (
    <Container>
        <Image src={item.img}/>
        <Info>
            <Icon>
               <ShoppingCartOutlined /> 
            </Icon>
            <Icon>
               <Link to = {`/product/${item._id}`}>
               <SearchOutlined />  
               </Link>
            </Icon>
            <Icon>
               <FavoriteBorderOutlined /> 
            </Icon>
        </Info>
    </Container>
  )
}

export default Product