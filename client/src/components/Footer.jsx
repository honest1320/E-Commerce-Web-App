import styled from 'styled-components'
import { Facebook,Twitter,Instagram, MailOutlined, Place, Phone } from '@material-ui/icons'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection: 'column'})}
`

const Left = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const Center = styled.div`
  flex:1;
  padding: 20px;
  ${mobile({display: 'none'})}
`
const Title = styled.h3`
  margin-bottom: 30px;
`
const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`

const Right = styled.div`
  flex:1;
  padding: 20px;
`
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`
const Payment = styled.img`
  height: 20px;
`

const Logo = styled.h1``
const Disc = styled.p`
  margin: 20px 0px;
`
const SocialContainer = styled.div`
  display: flex;
`
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props=>props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`

const Footer = () => {
  return (
    <Container>

      <Left>
        <Logo>ILANEST.</Logo>
        <Disc>
          <b>More brands than any other fashion retailer</b>
          <br/>
          Explore over 5,800 brands – from high street to high-end – with free shipping and returns*
          </Disc>
        <SocialContainer>
          <SocialIcon color = '#3B5999'>
            <Facebook />
          </SocialIcon>
          <SocialIcon color = '#E4405F'>
            <Instagram />
          </SocialIcon>
          <SocialIcon color = '#55ACEE'>
            <Twitter />
          </SocialIcon>
          <SocialIcon color = 'light-blue'>
            <image src="https://1000logos.net/wp-content/uploads/2022/01/Onlyfans-Logo-2016-768x432.png" alt="NEGRO" />
          </SocialIcon>
        </SocialContainer>
      </Left>
      

      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men's Fashion</ListItem>
          <ListItem>Women's Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Terms & Conditions</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Place /> Via Due Martiri 8/a, San Vittore Olona MI, Italy
        </ContactItem>
        <ContactItem>
          <Phone /> +39 346 9721315
        </ContactItem>
        <ContactItem>
          <MailOutlined /> ila.honest@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" alt="negro"/>
      </Right>
    </Container>
  )
}

export default Footer