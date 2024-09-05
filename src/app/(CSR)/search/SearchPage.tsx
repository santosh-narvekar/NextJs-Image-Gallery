'use client';

import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from './SearchPage.module.css'
export default function SearchPage(){

  const [searchResults,setSearchResults] = useState<UnsplashImage[] | null>(null);
  const [searchResultsLoading,setterSearchResultsLoading] =  useState(false);
  const [searchResultsLoadingIsError,setterSearchResultsLoadingIsError] =  useState(false);

  // swr for client-side fetching;



  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get(`query`)?.toString().trim();
    
    if(query){
      try{

        setSearchResults(null);
        setterSearchResultsLoadingIsError(false);
        setterSearchResultsLoading(true);

      // backend route that will run on server so that there is no need to put api credentials in client route
      const response = await fetch(`/api/search?query=${query}`);
      const images:UnsplashImage[] = await response.json();
      setSearchResults(images);
    }catch(err){
      console.error(err);
      setterSearchResultsLoadingIsError(true);
    }finally{
      setterSearchResultsLoading(false);
    }
      
    }

  }

  return(
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>. In order to not leak API credentials. the request is sent to a NextJs <strong>route handler</strong> that runs on the server. This route handler then fetches the data from the Unsplash  API and returns it to the client 
      </Alert>

      <Form onSubmit={handleSubmit} >
        <Form.Group  className="mb-3" controlId="search-input">
          <Form.Label>Search Query</Form.Label>
          <Form.Control name='query' placeholder="eg: cats,hotdogs..."/> 
        </Form.Group>

        <Button type='submit' className="mb-3" disabled={searchResultsLoading} >
          Search
        </Button>
      </Form>

      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border"/>}
        {searchResultsLoadingIsError && <p>Something went wrong!please try again</p>}
        {searchResults?.length === 0 && <p>Nothing found. Try a different query!</p>}
      </div>
      {
        searchResults && 
        <>
           {
            searchResults.map(image=>(
              <Image src={image.urls.raw}
              width={250}
              height={250}
              alt={image.description}
              key={image.urls.raw}
              className={styles.image}
              />
            ))
           }
        </>
      }
    </div>
  )
}