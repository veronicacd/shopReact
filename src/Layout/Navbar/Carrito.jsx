import { useContext } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { BsCart } from 'react-icons/bs'

import CartContext from '../../Context/CartContext'
import Producto from './Producto'
import { Link } from 'react-router-dom'

const Carrito = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { cart, vaciarCarrito, calcularTotal } = useContext(CartContext)

  const total = calcularTotal()

  return (
    <>
      <Button onClick={onOpen} bg={useColorModeValue('none')}>
        {<BsCart />} {cart.length}
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carrito</DrawerHeader>
          {!!cart.length || (
            <DrawerBody>
              <Text> No hay productos en el carrito ☹️</Text>
            </DrawerBody>
          )}

          {!!cart.length && (
            <>
              <DrawerBody>
                {cart.map((producto) => (
                  <Producto
                    producto={producto}
                    key={`cartProduct${producto.id}`}
                  />
                ))}
              </DrawerBody>
              <DrawerFooter display="flex" flexDir="column">
                <Button
                  variant="outline"
                  mb={3}
                  w="full"
                  onClick={() => vaciarCarrito()}
                >
                  Vaciar Carrito
                </Button>
                <Text>Total: {total}</Text>
                <Link to="/carrito">
                  <Button
                    variant="solid"
                    mt={3}
                    mb={3}
                    colorScheme={'blue'}
                    w="full"
                    onClick={onClose}
                  >
                    Continuar compra
                  </Button>
                </Link>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Carrito
