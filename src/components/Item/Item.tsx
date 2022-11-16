import { Button } from "@mui/material";

// Types
import { CartItemType } from "../../App";

// Styled
import { Wrapper } from "./Item.styles";


type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void; 
}

const Item: React.FC<Props> = ({ item, addToCart }) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />

        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>

        <Button
            onClick={() => addToCart(item)}
        >Add to Cart</Button>
    </Wrapper>
)

export default Item