import { useState } from 'react';
import {useQuery} from 'react-query';

// Material
import { Drawer, LinearProgress, Grid, Badge } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

//  Components
import { Wrapper } from './components/styledComponents';
import Item from './components/Item/Item';
import Cart from './components/Cart/Cart';
import { StyledButton } from './components/styledComponents';


// Types
export type CartItemType = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
await (await fetch('https://fakestoreapi.com/products')).json();


const App = () => {

  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts,
  );

  const getTotalItems = (items: CartItemType[]) => items.reduce((acumulator: number, item: CartItemType) => acumulator += item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {

    setCartItems((currentItems: CartItemType[]) => {

      // 1. Is the item already in cart?
      const isItemInCart = currentItems.find((item: CartItemType) => item.id === clickedItem.id);

      if (isItemInCart) {
        return currentItems.map((item: CartItemType) => 
          item.id === clickedItem.id
            ? {...item, amount: item.amount+1}
            : item
        )
      }

      // First time the item is added
      return [...currentItems, {...clickedItem, amount: 1}];
    });
  };

  const handleRemoveFromCart = (itemId: number) => {

    setCartItems((currentItems: CartItemType[]) => (

      currentItems.reduce((acumulator, item) => {
          if (item.id === itemId) {
            
            if (item.amount === 1) return acumulator;

            return [...acumulator, {...item, amount: item.amount - 1}]
          } else {
            return [...acumulator, item];
          }
      }, [] as CartItemType[])
    ))
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong.</div>

  return (
      <Wrapper>

        <Drawer
          anchor='right'
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            items={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>

        <StyledButton
          onClick={() => setCartOpen(true)}
        >
          <Badge
            badgeContent={getTotalItems(cartItems)}
            color='error'
          >
            <AddShoppingCartIcon />
          </Badge>  
        </StyledButton>

        <Grid container spacing={3}>
          {data?.map((item: CartItemType) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} addToCart={handleAddToCart}/>
            </Grid>
          ))}
        </Grid>
      </Wrapper>
  );
}

export default App;
