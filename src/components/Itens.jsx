import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { Context } from "../context/Context";

export default function Itens(props){
   const { Cart, setCart } = useContext(Context);

   function QuantityIncrement(id) {
      setCart((Cart) => Cart.map(
         (CartMap) => CartMap.productName === id ? {...CartMap, 
            productquantity: CartMap.productquantity + 1,
            priceTotal: CartMap.priceTotal + props.productPrice}
            : 
            CartMap))
   }

   function QuantityDencrement(id){
      setCart((Cart) => Cart.map(
         (CartMap) => CartMap.productName === id ? {...CartMap, 
            productquantity: CartMap.productquantity - 1,
            priceTotal: CartMap.priceTotal - props.productPrice}
            : 
            CartMap))
   }

   function Quantity(){
      const quantityTrue = Cart.find(CartFind => CartFind.productName === props.productName);
      return quantityTrue ? quantityTrue.productquantity : 0;
   }

   return (
       <Box width="290px">
          <Card>
                <Grid>
                  <img src={props.productImgDesktop} className="rounded-2xl" />
                     <Flex justify="center">
                        { Quantity() == 0 ?
                           <>               
                           <Button 
                              variant="outline"
                              radius="full"
                              className="text-black font-medium py-6 px-8"
                              onClick={() => {QuantityIncrement(props.productName)}}
                           >
                              <img src="images/icon-add-to-cart.svg" alt="icon-add-to-cart.svg" />
                              Add to cart
                           </Button>
                        </>
                        :
                        <>
                        <Flex> 
                           <Button 
                              radius="full"
                              className="bg-red-700 text-black font-medium py-6 px-8 border-none">
                              <Button
                                 className="bg-transparent border-solid border-white border-2"
                                 onClick={() => {QuantityDencrement(props.productName)}}>
                                 -
                              </Button>
                                 <Box className="text-white">
                                    {
                                       Quantity()
                                    }
                                 </Box>
                              <Button 
                                 onClick={() => {QuantityIncrement(props.productName)}}
                                 className="bg-transparent border-solid border-white border-2">
                                 +
                              </Button>
                           </Button>
                        </Flex>
                        </>
                        }
                     </Flex>
                </Grid>
                <Grid>
                  <Text className="opacity-50 font-bold text-base">{props.productCategory}</Text>
                  <Text className="font-black text-lg">{props.productName}</Text>
                  <Text className="text-red-700">${props.productPrice}</Text>
                </Grid>
          </Card>
       </Box>
   );   
}