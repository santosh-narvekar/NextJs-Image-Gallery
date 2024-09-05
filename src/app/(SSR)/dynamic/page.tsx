import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "../../components/bootstrap";


export const metadata = {
  title: "Dynamic Fetching - NextJs 14 Image Gallery",
};


// revalidate on every refresh
export const revalidate = 0;

export default async function Page(){
  const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY,{
    //  cache:'no-cache'
  });
  const image:UnsplashImage = await response.json();


  const width = Math.min(500,image.width);
  const height = (width/image.width) * image.height

  return (
      <div className="d-flex flex-column align-items-center ">
      
      <Alert>
        This page <strong>fetches  data dynamically</strong> on every refresh
      </Alert>

      <Image  
      alt={image.description}
      src={image.urls.raw}
      width={width}
      height={height}
      className="rounded shadow mw-100 h-100"
      />
      by <Link href={"/users/"+image.user.username}>{image.user.username}</Link>
    </div>
  )
}