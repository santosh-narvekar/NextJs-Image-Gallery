import SearchPage from "./SearchPage"

// metadata needs to be exported from a server component, not a client component
export const metadata = {
  title:"Search-NextJs 14 Image Gallery"
}

// client component in server component
export default function Page(){
  return <SearchPage />
}