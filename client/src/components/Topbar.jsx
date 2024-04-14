import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import useEth from "../contexts/EthContext/useEth.js";

const Topbar = () => {
  const {
    state: {accounts, loading},
  } = useEth()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  if (loading) {
    return (
      <h1>Please Wait</h1>
    )
  } else {
      return (
          <Box display="flex" justifyContent="space-between" p={2}>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                  {accounts[0]}
              </Typography>
            {/* ICONS */}
            <Box display="flex">
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
            </Box>
          </Box>
        );
  }

  
};

export default Topbar;