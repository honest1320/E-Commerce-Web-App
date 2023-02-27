import styled from "styled-components"
import Announcements from '../components/Announcements'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Add, Remove } from "@material-ui/icons"
import { mobile } from "../responsive"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import StripeCheckout from 'react-stripe-checkout'
import { userRequest } from "../requestMethods"
import { useHistory } from "react-router-dom"

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
    
`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding: '10px'})}
`
const Title = styled.div`
    font-weight: 300;
    font-size: 30px;
    text-align:center;
`
const Top = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor:pointer;
    border: ${props=>props.type==='filled' && 'none'};
    background-color: ${props=>props.type==='filled' ? 'black' : 'transparent'};
    color: ${props=>props.type==='filled' && 'white'};
`
const TopTexts = styled.div`
  ${mobile({display: 'none'})}
`

const TopText = styled.span`
  text-decoration:underline;
  cursor:pointer;
  margin: 0px 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: 'column'})}
`
const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: 'column'})}
`
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`

const Image = styled.img`
  width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`
    
`
const ProductId = styled.div`
    
`

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius:50%;
    background-color: ${props => props.color};
`
const ProductSize = styled.span`
    
`
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display:flex;
    align-items: center;
    margin-bottom: 20px;
`
  
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin: '5px 15px'})}
`
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid gray;
    border-radius: 10px;
    padding: 20px;
    height: 60vh;
`
const SummaryTitle = styled.h1`
  font-weight: 50;
`
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props=>props.type === 'total'&& '500'};
  font-size: ${props=>props.type === 'total' && '24px'};
`
const SummaryItemText = styled.span`
  
`
const SummaryItemPrice = styled.span`
  
`
const Button = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  font-weight: 600;
`

const Cart = () => {

  const cart = useSelector(state=>state.cart)
  const [stripeToken, setStripeToken]= useState(null)
  const history = useHistory()


  const onToken = (token)=>{
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async ()=>{
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        })
        history.push("/success", {data:res.data})

      } catch (error) {
        
      }
    }
    stripeToken && makeRequest()
  }, [stripeToken,cart.total,history])
  

  console.log(stripeToken);

  return (
    <Container>
          <Announcements />
          <Navbar />
          <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
              <TopButton>CONTINUE SHOPPIING</TopButton>
                <TopTexts>
                  <TopText>Shopping Bag(2)</TopText>
                  <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
              <TopButton type = 'filled'>CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
              <Info>
                {cart.products.map(product=>(
                  <Product>
                  <ProductDetail>
                    <Image src={product.img}></Image>
                    <Details>
                      <ProductName><b>Product: </b>{product.title}</ProductName>
                      <ProductId><b>ID: </b>{product._id}</ProductId>
                      <ProductColor color = {product.color}/>
                      <ProductSize><b>Size: </b>{product.size}</ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                  </PriceDetail>
                </Product>
                ))}
                
                <hr />
                
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                  <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total} </SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total} </SummaryItemPrice>
                  </SummaryItem>

                  <StripeCheckout
                    name="ILANEST SHOP"
                    image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
                    shippingAddress
                    billingAddress
                    description={`Your Total Is $${cart.total}`}
                    amount={cart.total*100}
                    token={onToken}
                    stripeKey={KEY}
                  >
                    <Button>CHECKOUT NOW</Button>
                  </StripeCheckout>
                  
              </Summary>
            </Bottom>
          </Wrapper>
          <Footer />
    </Container>
  )
}

export default Cart