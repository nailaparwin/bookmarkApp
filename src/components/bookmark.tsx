import React from "react"
import { useQuery, useMutation} from '@apollo/client';
import gql from 'graphql-tag';
import { 
        makeStyles,
         Button, 
         TextField,
         Card,
         CardActionArea,
         CardActions,
         CardContent,         
         Grid,
         Paper,
         Typography,         
        } from "@material-ui/core";

    
      const useStyles = makeStyles((theme) => ({
          root: {
            marginBottom: '30px'
          },
          media: {
            height: 140,
          },
          proot: {
            
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
              margin: theme.spacing(3),
              width: theme.spacing(40),
              height: theme.spacing(16),
            },
            
          },
        }));
      

const GET_BOOKS = gql`
query GetBooks {
    books {   
        id     
        title
        url
        about
    }
}
`

const DELETE_BOOK = gql`
mutation DeleteBook($id: ID!){
  deleteBook(id: $id){
    title
    }
}
`


export default function Bookmark() {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const [DeleteBookMark] = useMutation(DELETE_BOOK);
  const arr =[ 'orange', 'pink', 'yellow', 'purple',  'lightgreen', 'white', 'red', 'lightblue']
  return (
    <div>
    
    
    {loading && <p>Loading Client Side Query...</p>}
    {error && <p>Error: ${error.message}</p>}


    <Grid container spacing={2}>
    
    <Grid item xs={12} md={2}/>
    <Grid item xs={12} md={8}>
      <div className={classes.proot}>
    
   
        {!loading && !error && (
        data.books.map((book, i) => (
          <Paper>
            
          <Card style={{backgroundColor: arr[Math.ceil(Math.random() * 8 + 1)]}}>
            <CardActionArea>
               
               <CardContent>
                 <Typography gutterBottom variant="h5" component="h2">
                 {book.title}
                 </Typography>
                 <Typography variant="body2" color="textSecondary" component="p">
                 {book.about}
                 </Typography>
               </CardContent>
             </CardActionArea>
             <CardActions>
               <Button size="small" color="primary" onClick={(e)=>{
                 e.preventDefault();
                 DeleteBookMark({ variables: { id: book.id},
                  refetchQueries: [{ query: GET_BOOKS }],
                });
               }}>
                 Delete
               </Button>
               <Button size="small" color="primary" onClick={()=>{
                 window.open(book.url, '_blank'); 
                  
               }}>
                 Read More
               </Button>
               
             </CardActions>
             
           </Card>
           </Paper> 
          ))                 
         )}                    
      </div> 
      </Grid>
      <Grid item xs={12} md={2}/>
      
    </Grid>
  
  </div>
  )
}
