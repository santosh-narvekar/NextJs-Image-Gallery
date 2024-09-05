/** @type {import('next').NextConfig} */
const nextConfig = {
  // telling nextjs in advance which image url to resize
  images:{
    remotePatterns:[{
      hostname:'images.unsplash.com'
    },{
      hostname:'plus.unsplash.com'
    }]
  }
};

export default nextConfig;
