import React, { useEffect, useState } from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom'
import { getProfileLink, platformIcons } from '../assets/assets'
import { ArrowLeft, ArrowUpRightFromSquare, Calendar, CheckCircle, ChevronLeft, ChevronRight, DollarSign, Eye, LineChart, Loader2, MapPin, MessageSquareMore, ShoppingBag, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setChat } from '../app/features/chatSlice'

const ListingDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY || '$'
  const [listing, setListing] = useState(null)
  const profileLink = listing && getProfileLink(listing.platform, listing.username)
  const {listingId} = useParams()
  const {listings} = useSelector((state)=>state.listing)
  const [current, setCurrent] = useState(0)
  const images = listing?.images || 0

  const prevSlide = () => setCurrent((prev)=> (prev === 0 ? images.length - 1 : prev - 1))
    const nextSlide = () => setCurrent((prev)=> (prev ===  images.length - 1 ? 0 : prev + 1))

      const purchaseAccount = async() => {
    
  }
  const loadChatBox = () => {
    dispatch(setChat({listing:listing}))
  }

  useEffect(()=>{
const listing = listings.find ((listing)=> listing.id === listingId)
if(listing){
  setListing(listing)
}
  },[listingId, listings])

  return listing ? (
    <div className='mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32'>
     <button onClick={()=>navigate(-1)} className='flex items-center gap-2 py-5 '>
      <ArrowLeft size={16}className=''/> Go to previous page
      </button> 

    <div className='flex items-start max-md:flex-col gap-10 '>
    <div className='flex-1 max-md:w-full'>
      {/*Top section*/}
      <div className='bg-white rounded-xl border
       border-gray-500 p-6 mb-5'> 

<div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'> 
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-xl'>{platformIcons.listing}</div>
          <div>
            <h2 className='flex items-center gap-2 text-xl font-semibold
            text-gray-800'>{listing.title}
              <Link target='_blank' to={profileLink}>
              <ArrowUpRightFromSquare className='size-4 hover:text-indigo-500 '/>
              </Link>
            </h2>
            <p>@{listing.username} * {listing.platform?.charAt(0).toUpperCase() + listing.platform?.slice(1)}</p>
            <div className='flex gap-2 mt-2'>
              {listing.verified && (<span className='flex items-center text-xs bg-indigo-50 text-indigo-600
              px-2 py-1 rounded-md'>
                <CheckCircle className='w-3 h-3 mr-1'/> verified
              </span>)}
               {listing.monetized && (<span className='flex items-center text-xs bg-green-50 text-green-600
              px-2 py-1 rounded-md'>
                <DollarSign className='w-3 h-3 mr-1'/> Monitized
              </span>)}
            </div>
          </div>
        </div>

        <div className='text-right'>
                <h3>
                  {currency} {listing.price.toLocaleString()}
                </h3>
                <p className='text-sm text-gray-500'> USD</p>
        </div>
        </div>
        
        </div>
        {/*screenshot section*/}
                {images?.length > 0 && (
                  <div className='bg-white rounded-xl border
                   border-gray-200 mb-5 overflow-hidden'> 
                  <div className='p-4'>
                  <h4 className='font-semibold text-gray-800'>
                    Screenshots & proof
                  </h4>
                  </div>
                  {/*slider container*/}
                  <div className='relative w-full aspect-video overflow-hidden object-fit'>
                    <div className='flex transtion-transform duration-300 ease-in-out'
                     style={{transform:`translateX(-${current * 100}%)`}}>
                      {images.map((img, index)=>{
                        return(
                          <img key={index} src={img} alt='listing proof' className='w-full shrink-0 '/>
                        )
                      })}
                    </div>
                    {/*Navigation buttons*/}
                    <button onClick={prevSlide} className='absolute left-3 top-1/2 -translte-y-1/2 bg-white-/70
                    hover:bg-white p-2 rounded-full shadow'>
                      <ChevronLeft className='w-5 h-5 text-gray-700'/>
                    </button>
                    <button onClick={nextSlide} className='absolute right-3 top-1/2 -translte-y-1/2 bg-white-/70
                    hover:bg-white p-2 rounded-full shadow'>
                      <ChevronRight className='w-5 h-5 text-gray-700'/>
                    </button>
                    {/*Dots Indicator*/}
                    <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2'>
                      {images.map((_, index)=> {
                        return (
                          <button onClick={()=>setCurrent(index)} key={index}
                           className={`w-2.5 h-2.5 rounded-full ${current === index ? 'bg-indigo-600' : 'bg-gray-30'} `}></button>
                        )
                      })}
                    </div>
                  </div>
                </div>)}
                {/*Account metrics*/}
                <div className='bg-white rounded-xl border border-gray-200 mb-5'>
                  <div className='p-4 border-b border-gray-100'>
                    <h4 className='font-semibold  text-gray-800'>Account Metrics</h4>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-4 text-center'>
                    <div>
                      <User className='mx-auto text-gray-400 w-5 h-5 mb-1'/>
                      <p className='font-semibold text-gray-600'>
                        {listing.followers_count?.toLocaleString()}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Followers
                      </p>
                    </div>
                    <div>
                      <LineChart className='mx-auto text-gray-400 w-5 h-5 mb-1'/>
                      <p className='font-semibold text-gray-600'>
                        {listing.engagement_rate}%
                      </p>
                      <p className='text-sm text-gray-500'>
                        Engagement
                      </p>
                    </div>
                    <div>
                      <Eye className='mx-auto text-gray-400 w-5 h-5 mb-1'/>
                      <p className='font-semibold text-gray-600'>
                        {listing.monthly_views?.toLocaleString()}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Monthly views
                      </p>
                    </div>
                    <div>
                      <Calendar className='mx-auto text-gray-400 w-5 h-5 mb-1'/>
                      <p className='font-semibold text-gray-600'>
                        {new Date(listing.createdAt).toLocaleString()}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Followers
                      </p>
                    </div>
                  </div>
                </div>
                {/*Description*/}
                <div className='bg-white rounded-xl border
                   border-gray-200 mb-5 overflow-hidden'>
                   <div className='p-4'>
                  <h4 className='font-semibold text-gray-800'>
                    Description
                  </h4>
                  </div>
                  <div>{listing.description}</div>   
                </div>
                    {/*Additional Details*/}
                    <div className='bg-white rounded-xl border
                   border-gray-200 mb-5 overflow-hidden'>
                   <div className='p-4'>
                  <h4 className='font-semibold text-gray-800'>
                    Additional Details
                  </h4>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-4 text-sm'>
                    <div>
                      <p className='text-gray-500'>Niche</p>
                      <p className='font-medium capitalize'>{listing.niche}</p>
                    </div>
                    <div>
                      <p className='text-gray-500'>Primary Country</p>
                      <p className='font-medium  items-center flex'><MapPin className='size-4 mr-1 text-gray-400'/> {listing.country}</p>
                    </div>
                     <div>
                      <p className='text-gray-500'>Audience Age</p>
                      <p className='font-medium  items-center flex'> {listing.age_range}</p>
                    </div>
                     <div>
                      <p className='text-gray-500'>Platform Verified</p>
                      <p className='font-medium  items-center flex'> {listing.platformAssured ? 'yes' : 'No'}</p>
                    </div>
                    <div>
                      <p className='text-gray-500'>Monitization</p>
                      <p className='font-medium  items-center flex'> {listing.monetized ? 'Enabled' : 'Disabled'}</p>
                    </div>
                    <div>
                      <p className='text-gray-500'>status</p>
                      <p className='font-medium  items-center flex'> {listing.status}</p>
                    </div>
                    </div>   
                </div>
       </div>
       {/*seller info & purchase option*/}
       <div className='bg-white min-w-full md:min-w-[370px] 
       rounded-xl border boder-gray-200 p-5 max-md:mb-10'>
        <h4 className='font-semibold text-gray-800 mb-4'>Seller Information</h4>
        <div className='flex items-center gap-3 mb-2'>
          <img src={listing.owner?.image} alt="seller image" className='size-10 rounded-full'/>
          <div>
            <p className='font-medium text-gray-800'>{listing.owner?.name}</p>
            <p className='font-medium text-gray-800'>{listing.owner?.email}</p>
          </div>
        </div>
        <div className='flex items-center justify-between text-sm text-gray-600 mb-4'>
          <p>Member since <span className='font-medium'>{new Date(listing.owner?.createdAt).toLocaleString()}</span></p>
        </div>
        <div className='space-y-3'> 
     
         <button onClick={loadChatBox}  className='w-full bg-purple-600 text-white py-2 rounded-lg
         hover:bg-purple-700 transition text-sm font-medium flex items-center justify-center gap-2'>
          <MessageSquareMore className='size-4'/> Chat
        </button>
        
        {listing.credential && (<button className='w-full bg-purple-600 mt-2 text-white py-2 rounded-lg
         hover:bg-purple-700 transition text-sm font-medium flex items-center justify-center gap-2'>
          <ShoppingBag className='size-4'/> Purchase
        </button>)}
        </div>
       </div>
    </div>
    {/*Footer*/}
    <div className='bg-white border-t border-gray-200 p-4 text-center mt-28'>
      <p className='text-sm text-gray-500'>
        @ 2025 <span className=''>Kehinde murana</span>
      </p>
    </div>
    </div>
  ) : (
    <div className='h-screen flex justify-center items-center'>
      <Loader2 size={48}className=' animate-spin text-indigo-600'/>
    </div>

  )
}

export default ListingDetails
