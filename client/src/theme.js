const { createMuiTheme } = require("@material-ui/core");
const { blue } = require("@material-ui/core/colors");

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

export default theme;
