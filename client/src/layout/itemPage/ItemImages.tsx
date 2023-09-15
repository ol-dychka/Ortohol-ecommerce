import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  NavigateBeforeOutlined,
  NavigateNextOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ImageGallery from "react-image-gallery";

type Props = {
  images: string[];
};
const ItemImages = ({ images }: Props) => {
  return (
    <ImageGallery
      items={images.map((image) => ({
        original: image,
        thumbnail: image,
        thumbnailWidth: 30,
        // thumbnailHeight: 50,
      }))}
      showPlayButton={false}
      renderThumbInner={({ original }) => {
        return <img src={original} alt="m" style={{ height: "3rem" }} />;
      }}
      renderLeftNav={(onClick) => {
        return (
          <IconButton
            onClick={onClick}
            sx={{
              position: "absolute",
              top: "45%",
              left: "20px",
              zIndex: 5,
            }}
            color="secondary"
          >
            <NavigateBeforeOutlined sx={{ fontSize: "2rem" }} />
          </IconButton>
        );
      }}
      renderRightNav={(onClick) => {
        return (
          <IconButton
            onClick={onClick}
            sx={{
              position: "absolute",
              top: "45%",
              right: "20px",
              zIndex: 5,
            }}
            color="secondary"
          >
            <NavigateNextOutlined sx={{ fontSize: "2rem" }} />
          </IconButton>
        );
      }}
      renderFullscreenButton={(onClick, isFullscreen) => {
        return (
          <IconButton
            onClick={onClick}
            sx={{
              position: "absolute",
              bottom: "0",
              right: "20px",
              zIndex: 5,
            }}
            color="secondary"
          >
            {isFullscreen ? (
              <FullscreenExitOutlined sx={{ fontSize: "2rem" }} />
            ) : (
              <FullscreenOutlined sx={{ fontSize: "2rem" }} />
            )}
          </IconButton>
        );
      }}
    />
  );
};
export default ItemImages;
