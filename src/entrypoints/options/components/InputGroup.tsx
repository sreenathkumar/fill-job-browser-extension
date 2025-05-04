import { Grid } from '@mui/material'
import { ReactNode } from 'react'

function InputGroup({ children }: { children: ReactNode }) {
   return (
      <Grid container rowSpacing={'1rem'} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
         {children}
      </Grid>
   )
}

export default InputGroup