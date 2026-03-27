import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuIcon, X, BadgeCent, MessageCircleMore, List, PackageOpen } from 'lucide-react';
import { useClerk, useUser, UserButton,  } from '@clerk/clerk-react';

const Navbar = () => {
     const [menuOpen, setMenuOpen] = React.useState(false)
       const navigate = useNavigate();
         const {user} = useUser()
         const {openSignIn} = useClerk()
  return (
    <div>
        <nav className='h-20'>
                <div className='fixed left-0 top-0 right-0 z-100
                 flex items-center justify-between px-6 md:px-16
                  lg:px-24 xl:px-32 py-4 border-b border-gray-300
                   bg-white transition-all'>
                  <div className='flex items-center'>
                    <img  onClick={() => { navigate('/'); scrollTo(0,0) }} src={assets.logo} alt='logo'
                     className='h-10 cursor-pointer'/>
                     <span className='font-semibold text-xl text-gray-900'>earn.</span>
                  </div>

                    {/* Desktop Menu */}
                    <div className='hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800'>
                        <Link to="/" onClick={() => scrollTo(0, 0)}> Home </Link>
                        <Link to= "/marketplace"  onClick={() => scrollTo(0, 0)}> MarketPlace </Link>
                        <Link to='/messages' onClick={()=> scrollTo(0,0)}> Messages </Link>
                        <Link to='/my-listings' onClick={()=> scrollTo(0,0)}> MyListings </Link>
                             <Link to='/create-listing' onClick={()=> scrollTo(0,0)}> ManageListing </Link>
                    </div>
                    {!user ? (<div>
                        <button onClick={openSignIn} className='max-sm:hidden cursor-pointer px-8 py-2
                         bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>Login</button>
                       <Menu onClick={() => setMenuOpen(true)} className='sm:hidden'/>
                    </div>) : ( <UserButton> 
                      <UserButton.MenuItems>
          <UserButton.Action label="kenys marketplace"
           labelIcon={ <BadgeCent  color="gray" size={18}/>} 
           onClick={()=> navigate('/marketplace')} />
        </UserButton.MenuItems>
        <UserButton.MenuItems>
          <UserButton.Action label="Messages"
           labelIcon={ <MessageCircleMore  color="gray" size={16}/>} 
           onClick={()=> navigate('/messages')} />
        </UserButton.MenuItems>
         <UserButton.MenuItems>
          <UserButton.Action label="My List"
           labelIcon={ <List  color="gray" size={16}/>} 
           onClick={()=> navigate('/my-listings')} />
        </UserButton.MenuItems>
         <UserButton.MenuItems>
          <UserButton.Action label="My Orders"
           labelIcon={ <PackageOpen  color="gray" size={16}/>} 
           onClick={()=> navigate('/my-orders')} />
        </UserButton.MenuItems>
        
        </UserButton>)}
                 

                </div>
                {/* Mobile Menu */}
                <div className={`sm:hidden fixed inset-0 ${menuOpen ? 'w-full' : 'w-0'} overflow-hidden bg-white backdrop-blur shadow-xl rounded-lg z-[200] text-sm transition-all`}>
                    <div className='flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4'>
                        <Link to={'/marketplace'}  onClick={() => setMenuOpen(false)}> Marketplace </Link>
                        <Link to= "/marketplace"  onClick={() => setMenuOpen(false)}> Messages </Link>
                        <button onClick={openSignIn} > MyListings </button>
                        <button className=' cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>Login</button>
                          <X onClick={() => setMenuOpen(false)} className='absolute top-6 right-6 size-8 text-gray-500 hover:text-gray-700 cursor-pointer'/>
                    </div>
                </div>
            </nav>

    </div>
  )
}

export default Navbar
