import React from 'react';
import { platformIcons } from '../assets/assets';
import { BadgeCheck, LineChart, MapPin, MapPinIcon, MapPinnedIcon, User } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const navigate = useNavigate()
  // Normalize the platform key to lowercase to match your assets object
  const platformKey = listing.platform.toLowerCase();
  const IconComponent = platformIcons[platformKey];

  return (
    <div className='relative bg-white rounded-2xl shadow-sm border
     border-gray-200 overflow-hidden hover:shadow-md transition'>
      {listing.featured && (
        <div className='absolute top-0 left-0 w-full
         bg-linear-to-r from-pink-500 to-purple-500 text-white 
         text-center text-xs font-semibold py-1 tracking-wide uppercase z-10'>
          Featured
        </div>
      )}
      
      <div className='p-5 pt-8'>
        <div className='flex items-center gap-3 mb-3'>
          
          {IconComponent ? <IconComponent className="w-6 h-6 text-gray-600" />
           : 
           <div className="w-6 h-6 bg-gray-200 rounded" />}
          
          <div className='flex flex-col'>
            <h2 className='font-bold text-gray-800 leading-tight'>{listing.title}</h2>
            <p className='text-sm text-gray-500'>
              @{listing.username} • <span className='capitalize'>{listing.platform}</span>
            </p>
          </div>
          {listing.verified && <BadgeCheck className='text-blue-500 ml-auto w-5 h-5'/>}
        </div>

        {/* Display Price - Added this so the card isn't empty! */}
        <div className='mt-4 flex justify-between items-center'>
            <span className='text-lg font-bold'>{currency}{listing.price.toLocaleString()}</span>
            <span className='text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 capitalize'>{listing.niche}</span>
        </div>

        <div className='flex flex-wrap justify-between max-w-lg items-center
        gap-3 my-5'>
          <div className='flex items-center text-sm text-gray-600'>
            <User className='size-6 mr-1 text-gray-400'/>
            <span className='text-lg font-medium text-slate-800
            mr-1.5'>{listing.followers_count.toLocaleString('en-US')}</span> followers
          </div>

        {listing.engagement_rate && (
          <div className='flex items-center text-sm text-gray-600'>
          <LineChart className='size-6 mr-1 text-gray-400'/>
          <span className='text-lg font-medium text-slate-800 mr-1.5'>
            {listing.engagement_rate}
          </span> % engagement
        </div>)}
        </div>
        <div className='flex items-center gap-3 mb-3'>
          <span className='text-xs font-medium bg-pink-100 
          text-pink-600 px-3 py-1 rounded-full capitalize'>{listing.niche}</span>
          {listing.country && (
            <div className=' flex items-center text-gray-500 text-sm'>
              <MapPinnedIcon/>
              {listing.country}
          
          </div>)
        }
        </div>
        <p className='text-sm text-gray-600 mb-4 line-clamp-2'>
          {listing.description}</p>
          <hr className='my-5 border-gray-200'/>
          <div className='flex items-center justify-between'>
            <div>
              <span className='text-2xl font-medium text-slate-800'>
                {currency}
                {listing.price.toLocaleString()}
              </span>
            </div>
            <button onClick={()=>{navigate(`/listing/${listing.id}`); scrollTo(0,0)}} 
            className='px-7 py-3 bg-indigo-600 transition
             text-white text-sm rounded-lg hover:bg-indigo-700'>
              More Details
             </button>
          </div>
      </div>
    </div>
  );
};

export default ListingCard;