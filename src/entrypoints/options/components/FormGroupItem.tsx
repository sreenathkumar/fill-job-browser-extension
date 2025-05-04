import { Info } from '@mui/icons-material';
import { Grid, IconButton, TextField, Tooltip, } from '@mui/material';
import { useEffect, useState } from 'react';
import FormInfo from './FormInfo';

function FormGroupItem({ field, value, fieldInfo, disabled, size }: { field: formInputFieldType, value?: string, fieldInfo?: string, disabled?: boolean, size?: any }) {
   const [fieldValue, setFieldValue] = useState(value);

   useEffect(() => {
      setFieldValue(value)
   }, [value])

   return (
      <Grid size={size} sx={{ position: 'relative', }} width={'100%'}>
         <TextField
            name={field.id}
            fullWidth
            id={field.id}
            label={field.label}
            disabled={disabled}
            autoFocus
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
         />
         <Tooltip title={<FormInfo info={fieldInfo} />} arrow placement='right' sx={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)' }}>
            <IconButton>
               <Info />
            </IconButton>
         </Tooltip>
      </Grid>
   )
}

export default FormGroupItem