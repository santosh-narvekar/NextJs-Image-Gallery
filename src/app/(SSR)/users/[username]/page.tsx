import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import {Alert} from '@/app/components/bootstrap'
interface PageProps{
  params:{username:string}
}

// next js automatically deduplicates the request but only in fetch 
async function getUser(username:string):Promise<UnsplashUser> {
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);

    // in pages directory, there was need to use getServerSideProps or getStaticProps
    if(response.status===404){
      notFound();
    }

    return await response.json();
}


// special function if you are not using native fetch Api
// const getUserCache = cache(getUser);


export async function generateMetadata({params:{username}}:PageProps):Promise<Metadata> {
  const user = await getUser(username)

  return {
    title:user.first_name + " " + user.last_name + ' NextJs 14 Image Gallery',
  }

}

//  /params
export default async function Page({params:{username}}:PageProps){
 const user = await getUser(username);

 return(
    <div>
      <Alert>
        This ProfilePage uses <strong>GenerateMetadata</strong> to set the page title dynamically from the API Responses
      </Alert>
      <h1>{user.username}</h1>
      <p>First name: {user.first_name}</p>
      <p>Last name: {user.last_name} </p>
      <a href={"https://unsplash.com/"+user.username}>Unsplash Profile</a>
    </div>
  )
}