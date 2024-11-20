import { Box, Paper } from '@mui/material'
import '../index.css'
import { Children } from 'react'


export default function LongShortOnShortBoxLayout({ children }: { children: React.ReactNode }) {

  return (
    <Box sx={{ gap: 1, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
      <Paper elevation={3} sx={{ margin: 1, width: "calc(75% - 8px)", height: "calc(100% - 16px)" }}>
        {Children.toArray(children)[0]}
      </Paper>
      <Box sx={{ marginRight: 1, gap: 1, width: "calc(25% - 8px)", height: "calc(100% - 16px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
        <Paper elevation={3} sx={{ width: "100%", height: "50%" }}>
          {Children.toArray(children)[1]}
        </Paper>
        <Paper elevation={3} sx={{ width: "100%", height: "50%" }}>
          {Children.toArray(children)[2]}
        </Paper>
      </Box>
    </Box >
  )
}