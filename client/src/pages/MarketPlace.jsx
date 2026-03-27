import { ArrowLeft, Filter } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import FilterSidebar from "../components/FilterSidebar";

const MarketPlace = () => {
const [searchParams] = useSearchParams();
const search = searchParams.get('search')
  const { listings } = useSelector((state) => state.listing);
  const navigate = useNavigate();
  const [showFilterPhone, setShowFilterPhone] = useState(false);
  const [filters, setFilters] = useState({
    platform: null,
    maxPrice: 100000,
    minFollowers: 0,
    niche: null,
    verified: false,
    monitized: false,
  });
  const filteredListings = listings.filter((listing) => {
   
      if(filters.platform && filters.platform.length > 0){
       if(!filters.platform.includes(listing.platform)) return false
    }
     if(filters.maxPrice !==null){
       if(listing.price > filters.maxPrice) return false
    }
     if(filters.minFollowers !==null){
       if(listing.followers_count <  filters.minFollowers) return false
    }
     if(filters.niche && filters.niche.length > 0){
       if(!filters.niche.includes(listing.niche)) return false
    }
    if(filters.verified && listing.verified !== filters.verified) return false
    if(filters.monitized && listing.monitized !== filters.monitized) return false
    if(search){
const trimmed = search.trim();
if(
  !listing.title?.toLowerCase().includes(trimmed.toLowerCase()) &&
!listing.username?.toLowerCase().includes(trimmed.toLowerCase()) &&
!listing.description?.toLowerCase().includes(trimmed.toLowerCase()) &&
!listing.platform?.toLowerCase().includes(trimmed.toLowerCase()) &&
!listing.niche?.toLowerCase().includes(trimmed.toLowerCase()) 
)
return false
    }
    return true;
  });
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex items-center justify-between text-slate-600">
        <button
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </button>
        <button
          onClick={() => setShowFilterPhone(true)}
          className="flex max-sm:flex sm:hidden items-center gap-2 py-5"
        >
          <Filter size-4 />
          Filter
        </button>
      </div>
      <div className="relative flex items-start justify-between 
      gap-8 pb-8 mt-10">
            <FilterSidebar filters={filters} setFilters={setFilters}
            setShowFilterPhone={setShowFilterPhone} showFilterPhone={showFilterPhone}/>

        <div className="flex-1 grid xl:grid-cols-2 gap-4">
          {filteredListings
            .sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0))
            .map((listing, index) => {
              return <ListingCard listing={listing} />;
            })}
        </div>
      </div>
  
    </div>
  );
};

export default MarketPlace;
