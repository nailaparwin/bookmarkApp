import React, { Component, useRef, useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import Bookmark from '../components/bookmark';
import AddForm from '../components/form';
import gql from 'graphql-tag';
import { 
        makeStyles,
         Button, 
         TextField,
         Card,
         CardActionArea,
         CardActions,
         CardContent,
         FormGroup,
         FormControlLabel,
         Checkbox,
         Grid,
         Paper,
         Typography,         
        } from "@material-ui/core";

    
      const useStyles = makeStyles((theme) => ({
          root: {
            maxWidth: 345,
          },
          media: {
            height: 140,
          },
          proot: {
            
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
              margin: theme.spacing(1),
              width: theme.spacing(35),
              height: theme.spacing(16),
            },
          },
        }));
      

const GET_BOOKS = gql`
query GetBooks {
    books {        
        title
        url
        about
    }
}
`

export default function Home() {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const arr =[ 'orange', 'pink', 'yellow', 'purple',  'lightgreen', 'white', 'red', 'lightblue']
  return (
    <div>
    
  

    <Grid container spacing={2}>
    
    <Grid item xs={12} md={3}/>
    <Grid item xs={12} md={6}>   
       <AddForm/>     
      </Grid>
      <Grid item xs={12} md={3}/>



    
    <Grid item xs={12} md={12}>
      <Bookmark/>
     
      </Grid>
     
      
    </Grid>
  
  </div>
  )
}
