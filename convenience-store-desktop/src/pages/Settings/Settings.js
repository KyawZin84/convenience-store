import React from 'react'
import { Grid } from '@mui/material';
import Shop from './Shop'
import Printer from './Printer';

function Settings() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Shop />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Printer />
      </Grid>
    </Grid>
  )
}

export default Settings