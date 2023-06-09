import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {Product} from "../../app/models/Product";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync} from "../basket/basketSlice";
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { AddShoppingCart } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface Props {
  product: Product;
}

export default function ProductCard({product}: Props) {
  const {status} = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch();

  return (
    <Card sx={{height: '100%', width: '100%', display: 'flex',
    flexDirection: 'column', position: 'relative'}}>
      <CardActionArea sx={{flexGrow: 1}}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: "secondary.main"}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {fontWeight: "bold", color: "primary.main"},
        }}/>
      <CardMedia 
        sx={{height: 140, backgroundSize: "contain", bgcolor: "inherit"}}
        image={product.pictureUrl}
        title={product.name}
      />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.name} / {product.brand}
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: 'space-between'}}>
      <LoadingButton 
          loading={status ==='pendingAddItem' + product.id} 
          onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
          size="small">{<AddShoppingCart />}</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`}  size="small">{<RemoveRedEyeIcon/>}</Button>
      </CardActions>
    </Card>
  );
}
