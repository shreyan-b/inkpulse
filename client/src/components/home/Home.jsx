import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Grow from "@mui/material/Grow";
import Banner from "../banner/Banner";
import Categories from "./Categories";

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <Grow in={show} timeout={500}>
        <Box>
          <Banner />
          <Grid container>
            <Grid item lg={2} sm={2} xs={12}>
              <Categories />
            </Grid>
            <Grid container item xs={12} sm={10} lg={10} >
              Posts
            </Grid>
          </Grid>
        </Box>
      </Grow>
    </Box>
  );
};

export default Home;
