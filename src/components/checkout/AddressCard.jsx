import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { changeActiveAddress, deleteAddress } from "@/requests/user";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AddressCard({ address, setAddresses }) {
  const [expanded, setExpanded] = React.useState(false);
  console.log("address", address);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);
    setAddresses(res.addresses);
  };
  const deleteHandler = async (id) => {
    const res = await deleteAddress(id);
    setAddresses(res.addresses);
  };

  return (
    <Card sx={{ marginY: 3, maxWidth: "300px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {address.firstName.slice(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={address.lastName + " " + address.firstName}
        subheader={address.phoneNumber}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {address.address1 +
            " " +
            address.city +
            " " +
            address.country +
            " " +
            address.state}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <CheckCircleIcon
            color={address.active ? "success" : ""}
            onClick={() => changeActiveHandler(address._id)}
          />
        </IconButton>
        <IconButton aria-label="share">
          <DeleteIcon
            color="error"
            onClick={() => deleteHandler(address._id)}
          />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Địa Chỉ Chính: {address.address1}</Typography>
          {address.address2 && (
            <Typography paragraph>Địa Chỉ Phụ: {address.address2}</Typography>
          )}
          <Typography paragraph>Thành Phố: {address.city}</Typography>
          <Typography paragraph>Tỉnh Thành: {address.state}</Typography>
          <Typography paragraph>Mã Bưu Chính: {address.zipCode}</Typography>
          <Typography paragraph>Quốc Gia: {address.country}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
