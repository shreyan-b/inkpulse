import { Box, styled } from '@mui/material';

// SVG file in public/banner.svg
const Image = styled(Box)`
  background: url('/banner.png') center/cover no-repeat #000;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Banner = () => {
  return (
    <Image />
  );
};

export default Banner;
