// api route handler

import { unsplashSearchResponse } from "@/models/unsplash-image";
import { NextResponse } from "next/server";


// in old pages directory we used to have single handler function and then  needed a new request method.

// THIS IS OUR API ROUTE HANDLER, a little server endpoint directly inside our nextJs project
// connection to express backend can also be done for larger projects
export async function GET(request:Request){
  // ?
  const {searchParams} = new URL(request.url);
  const query = searchParams.get("query");

  if(!query){
    return NextResponse.json({error:'No request provided'},{
      status:400, // bad request
    })
  }

  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
  const {results}:unsplashSearchResponse = await response.json();

  return NextResponse.json(results);
}
