import { Badge, BadgeProps, styled } from "@mui/material";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 5,
    boxShadow: "0px 0px 5px #999999",
  },
}));

export default StyledBadge;
