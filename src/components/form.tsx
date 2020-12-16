import React, { useRef, useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import ErrorMsg from './errorMsg';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { 
        makeStyles,
         Button, 
         TextField,
        Box,                  
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

        
        const initialValues = {
            title: "",
            url: "",
            about: "",
          };
          
          const validationSchema = Yup.object().shape({
            title: Yup.string().required("Title is required"),          
            url: Yup.string().required("book link is required"),
            about: Yup.string(),
          });
          

const GET_BOOKS = gql`
query GetBooks {
    books {        
        title
        url
        about
    }
}
`

const ADD_BOOK = gql`
mutation AddBook($title: String!, $url: String!, $about: String!){
    addBook(title: $title, url: $url, about: $about,){
        title
        url
        about
    }
}
`;

export default function AddForm() {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const [add_book] = useMutation(ADD_BOOK);
  const arr =[ 'orange', 'pink', 'yellow', 'purple',  'lightgreen', 'white', 'red', 'lightblue']
  
  
  
  const onSubmit = (values, actions) => {
    add_book({
      variables: {
        title: values.title,
        url: values.url,
        about: values.about,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    });
    
    actions.resetForm({
      values: {
        title: "",
        url: "",
        about: "",
      },
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={classes.root}>
        <Box p={3}>
          <Box pb={1}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <Box pb={2}>
                  <Typography
                    color="secondary"
                    
                  >
                    Add Bookmark
                  </Typography>
                </Box>
                <Box style={{ paddingBottom: "12px" }}>
                  <div>
                    <Field
                      as={TextField}
                      color="secondary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="title"
                      id="title"
                      type="text"
                      label="Title"
                    />
                    {}
                    <ErrorMessage name="title" component={ErrorMsg} />
                  </div>
                </Box>
                <Box style={{ paddingBottom: "12px" }}>
                  <div>
                    <Field
                      as={TextField}
                      color="secondary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="url"
                      id="url"
                      type="text"
                      label="Url"
                    />
                    <ErrorMessage name="url" component={ErrorMsg} />
                  </div>
                </Box>
                <Box style={{ paddingBottom: "12px" }}>
                  <div>
                    <Field
                      as={TextField}
                      color="secondary"
                      multiline
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="about"
                      id="about"
                      label="about"
                      rows={3}
                    />
                    <ErrorMessage name="description" component={ErrorMsg} />
                  </div>
                </Box>
                <Button variant="contained" color="secondary" type="submit">
                  Submit
                </Button>
              </Form>
            </Formik>
          </Box>
        </Box>
      </div>
    </div>
  );
};
  
  
  
  
  
  /* return (
    <div>
    
    

    <Grid container spacing={2}>
    
    <Grid item xs={12} md={2}/>
    <Grid item xs={12} md={8}> BookMarks </Grid>
    <Grid item xs={12} md={2}/>


    <Grid item xs={12} md={2}/>
    <Grid item xs={12} md={8}>
       {<form

        onSubmit={async e => {
        e.preventDefault();
        // await AddBook({ variables: { text: todo},
        //   refetchQueries: [{ query: GET_BOOKS }],
        // });
                        
        // setTodo("");

      }}>
 
          <TextField
              fullWidth
              variant="outlined"
              //value={todo}
              //onChange={(e) => setTodo(e.target.value)}
              label="Add New Todo"                  
              name="todo"
             
              required
            />

      <br/> <br/>
      <Button type="submit" variant="contained" color="primary" style={{alignContent:'center'}}>Submit</Button>
    </form> }
     
      </Grid>
      <Grid item xs={12} md={2}/>
      </Grid>


        
      
      
      </div> 
      
 
  )
}


 */



