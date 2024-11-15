import { Box, Paper, Typography } from '@mui/material'
import '../index.css'

export default function Homepage() {
  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
      <Paper elevation={1} sx={{ margin: 1, width: "calc(50% - 8px)", height: "calc(100% - 16px)", backgroundColor: "primary.main" }}>
        <Typography>Hello</Typography>
      </Paper>
      <Paper elevation={1} sx={{ margin: 1, width: "calc(50% - 8px)", height: "calc(100% - 16px)", backgroundColor: "primary.main" }}>
        <Typography>Hello2</Typography>
      </Paper>
    </Box >
  )
}
