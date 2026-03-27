import { CircleX, Key, Loader2Icon, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

const ManageListing = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {userListings, balance} = useSelector((state)=>state.listing)
  const [loadingListing, setLoadingListing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
             title:'',
           platform:'',
           username:'',
           followers_count:'',
           engagement_rate:'',
           monthly_views:'',
           niche:'',
           price:'',
           description:' ',
           verified:false,
           monetized:false,
           country:'',
           age_range:'',
           status:'',
           featured:'',
           images:[],
  })
  const platforms = [ ' youtube',     
  '  instagram','tiktok',  ' twitch',  'facebook', 'twiter',
   'linkedln','  pinterest','snapchat', 'twitch', 'discord']
   const niches = ['lifestyle','fitness', 'food', 'travel','tech',
    'gaming', 'fashion','beauty', 'business','education','entertainment',
    'music', 'art', 'sports', 'health','finance', 'other'
   ]
const ageRanges = [
  '13-17yrs','18-24yrs','25-34yrs','35-44yrs',
  '45-54yrs','55+yrs', 'mixed ages'
]

const handleInputChange = (field, value) => {
  setFormData((prev)=>({...prev, [field]: value}))
}
const handleImageUpload = async(e) => {
const files = Array.from(e.target.files)
if(!files.length) return;
if(files.length + formData.images.length > 5) return toast.error('You can add up to 5 images')
  setFormData((prev)=> ({...prev, images: [...prev.images, ...files]}))
}

const removeImage = (indexToRemove) => {
  setFormData((prev)=>({...prev, images:prev.images.filter((_, i)=>i !==indexToRemove)}))
}
useEffect(()=>{
  if(!id) return;
   setIsEditing(true) 
  setLoadingListing(true)
const listing = userListings.find((listing)=>listing.id === id)
if(listing){
setFormData(listing)
setLoadingListing(false)
 } else{
  toast.error('Listing not found')
  navigate('/my-listings')
 }
},[id])

const handleSubmit = async(e) => {
  e.preventDefault()
}

if(loadingListing){

return (
  <div className='h-screen flex items-center justify-center'>
    <Loader2Icon className='size-7 animate-spin text-indigo-600'/>
  </div>
)
}
  return (
    <div className='min-h-screen py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>
          {isEditing ? 'Edit Listing' : 'List your Account'}
        </h1>
        <p className='text-gray-600 mt-2'>
          {isEditing ? 'Update your existing account listing' : 'Create a mock listing to display your account info'}
        </p>
      </div>
      <form action="" onSubmit={handleSubmit} className='space-y-8'>
       {/*Basic info*/}
        <Section title='Basic Information' className=''>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center
          justify-center'>
          <InputField type="text" label='Listing Title'
           value={formData.title} placeholder='Premium Travel Instagram Account'
            onChange={(v)=>handleInputChange('title',v)} required='true'/>
            <SelectField label='platform ' options={platforms} value={formData.platform}
             onChange={(v)=> handleInputChange('platform',v)} required='true'/>
              <InputField type="text" label='Username/Handle'
           value={formData.username} placeholder='@username'
            onChange={(v)=>handleInputChange('username',v)} required='true'/>
             <SelectField label='Niche/category'options={niches} value={formData.niche}
             onChange={(v)=> handleInputChange('niche',v)} required='true'/>
          </div>
        </Section>
            {/*METRICS*/}
           <Section title='Account Metrics' className=''>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

          <InputField type="text" min={0} label='followers_count'
           value={formData.followers_count} placeholder='10000'
            onChange={(v)=>handleInputChange('title',v)} required='true'/>
         

              <InputField type="number" label='Engagement Rate (%)' min={0} max={100}
           value={formData.engagement_rate} placeholder='4'
            onChange={(v)=>handleInputChange('engagement_rate',v)} required='true'/>
            

                 <InputField type="number" label='Monthly views/impression' min={0} max={100}
           value={formData.monthly_views} placeholder='100000'
            onChange={(v)=>handleInputChange('monthly_views',v)} required='true'/>
          
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <InputField  label='primary Audience Country' 
           value={formData.age_range} placeholder='United State'
            onChange={(v)=>handleInputChange('country',v)} required='true'/>
             <SelectField label='primary Auience Age Range'options={platforms} value={formData.age_range}
             onChange={(v)=> handleInputChange('age_range',v)}  required={true}/>
          </div>
          
          <div className='space-y-3'>
        <CheckboxField label='Account is verified on the platform' checked={formData.verified}
        onChange={(v)=>handleInputChange('verified')}/>
           <CheckboxField label='Account is monitized' checked={formData.monetized}
        onChange={(v)=>handleInputChange('monetized')}/>
          </div>
          </Section>
          {/*PRICING*/}
          <Section title='Pricing & Description'>
               <InputField  label='Asking Price (USD)' type='number' min={0} 
           value={formData.price} placeholder='United State'
            onChange={(v)=>handleInputChange('price',v)} required='true'/>

            <TextareaField label='Description' value={formData.description}
            onChange={(v)=>handleInputChange('description',v)} required='true'/>
          </Section>

          {/*IMAGES*/}
          <Section title='Screenshots & proof'>
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-6
            text-center '>
              <input type="file" id='images' multiple accept='image/*'
               onChange={handleImageUpload} className='hidden' />
               <Upload className='w-12 h-12 textgray-400 mx-auto mb-4'/>
               <label htmlFor="images" className='px-4 py-2 border 
               border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer'>Choose Files</label>
               <p className='text-sm text-gray-500 mt-2'>
                Upload screenshotsor proof of account analytics
               </p>
            </div>
              {formData.images.length > 0 && (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
                  {formData.images.map((img, index)=>{
                    return (
                      <div key={index} className='relative'>
                        <img src={typeof img === 'string' ? img : URL.createObjectURL(img)} alt={`image ${index + 1}`}
                        className='w-full h-24 object-cover rounded-lg'/>
                        <button type='button' onClick={()=> removeImage(index)} className='absolute 
                        top-0 right-2   bg-red-500 text-white'>
                              <CircleX  />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
          </Section>
          <div className='flex justify-end gap-3 text-sm'>
              <button onClick={()=>navigate(-1)} type='button' className='px-6 py-2 border
               border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
                Cancel
               </button>
                   <button  type='submit' className='px-6 py-2 
               bg-indigo-700 rounded-lg hover:bg-gray-50 transition-colors'>
                {isEditing ? 'Update Listing' : 'Create Listing'}
               </button>
          </div>
      </form>
       </div>
    </div>
  )
}

const Section = ({title, children}) => {
  return(
  <div className='bg-white rounded-lg border
   border-gray-200 p-6 space-y-6'>
    <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
    {children}
  </div>
   )
}

const InputField = ({label, value, onChange, placeholder, type = 'text', required = 'false',min= null, max = null}) => {
  return( 
  <div>
    <label className='block text-sm font-medium text-gray-700 mb-2' >{label}</label>
    <input type={type} min={min} max={max} placeholder={placeholder} 
    value={value}
    onChange={(e)=> onChange(e.target.value)}
     className='w-full px-3 py-2.5 text-gray-600
    border rounded-md focus:outline-none focus:ring-2
    focus:ring-indigo-500 border-gray-300'required={required} />
  </div>
  )
}

const SelectField = ({ label, options = [], value, onChange, required = false }) => {
  // Added return statement here
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className='w-full px-3 py-1.5 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300' 
        required={required}
      >
        <option value=''>Select...</option>
        {/* Added a fallback empty array to prevent .map() errors */}
    {options.map((opt)=>{
      return (
           <option key={opt} value={opt}>{opt}</option>
      )
    })}
      </select>
    </div>
  )
  };
  const CheckboxField = ({label, checked, onChange,required=false}) => {
    return(
    <label className='flex items-center space-x-2 cursor-pointer'>
      <input type="checkbox" checked ={checked} 
      onChange={(e)=>onChange(e.target.checked)} className='size-4' required={required} />
      <span className='text-sm text-gray-700'>{label}</span>
    </label>
     )
  }
  const TextareaField = ({label, value, onChange, required=false}) => {
    return(
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
      </label>
      <textarea rows={5} value={value} onChange={(e)=>onChange(e.target.value)}
        className='w-full px-3 py-1.5 text-gray-600 border rounded-md 
        focus:outline-none focus:ring-2 focus:ring-indigo-500  border-gray-300'
        required={true}
        />

    </div>
     )
  }


export default ManageListing
