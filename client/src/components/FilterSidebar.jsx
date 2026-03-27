import React, { useEffect, useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = ({
  showFilterPhone,
  setShowFilterPhone,
  filters,
  setFilters,
}) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onChangeSearchParams = (e) => {
    if (e.target.value) {
      setSearchParams({ search: e.target.value });
      setSearch(e.target.value);
    } else {
      navigate("/marketplace");
    }
  };
  const [expandedSections, setExpandedSections] = useState({
    platform: true,
    price: true,
    followers: true,
    status: true,
  });
  const toggleChevron = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  const platforms = [
    { value: "youtube", label: "Youtube" },
    { value: "instagram", label: "Instagram" },
    { value: "tiktok", label: "TikTok" },
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "twitch", label: "Twitch" },
    { value: "discord", label: "Discord" },
  ];
  const onClearFilters = () => {
    if(search){
      navigate('/marketplace')
    } setFilters({
          platform: null,
    maxPrice: 100000,
    minFollowers: 0,
    niche: null,
    verified: false,
    monitized: false,
    })
  }

  const onFiltersChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };
  useEffect(() => {
    console.log("Curent filters", filters);
  });

  const niches = [
    {value:'lifestyle', label:'Lifestyle'},
    {value:'fitness', label:'Fitness'},
    {value:'food', label:'Food'},
    {value:'travel', label:'Travel'},
    {value:'tech', label:'Technology'},
    {value:'gaming', label:'Gaming'},
    {value:'fashion', label:'Fashion'},
    {value:'beauty', label:'Beauty'},
    {value:'business', label:'Business'},
    {value:'education', label:'Education'},
    {value:'entertainment', label:'Entertainment'},
    {value:'music', label:'Music'},
    {value:'art', label:'Art'},
    {value:'sports', label:'Sports'},
    {value:'health', label:'Health'},
    {value:'finance', label:'Finance'},
  ]
  return (
    <div
      className={`${showFilterPhone ? "max-sm:fixed" : "max-sm:hidden"}
    max-sm:inset-0 z-100 max-sm:h-screen
     max-sm:overflow-scroll bg-white rounded-lg shadow-sm 
     border border-gray-200 h-fit sticky top-24 md:min-w-[300px]`}
    >
      <div className="p-4 b-bottom border-gray-200 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700">
            <Filter className="size-4" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <div className="flex items-center gap-2">
            <X onClick={onClearFilters}
              className="size-6 text-gray-500
                 hover:text-gray-700 p-1 hover:bg-gray-100 rounded
                 transition-colors cursor-pointer"
            />
            <button
              onClick={() => setShowFilterPhone(false)}
              className="sm:hidden
                  max-sm:flex text-sm border text-gray-700
                 px-3 py-1 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <div
        className="p-4 space-y-6 sm:max-h-[calc(100vh-200px)]
      overflow-y-scroll no-scrollbar"
      >
        <div>
          <input
            value={search}
            onChange={onChangeSearchParams}
            type="text"
            placeholder="Search by username, platform, niche etc"
            className="w-full text-sm px-3 py-2 border bg-gray-300
            rounded-md outline-indigo-500"
          />
        </div>

        <div className="flex justify-between">
          <p>platform</p>

          <div>
            <button
              onClick={() => toggleChevron("platform")}
              className="flex items-center justify-between w-full
          mb-3"
            >
              <label htmlFor="" className="text-sm font-medium text-gray-800">
              </label>
              <ChevronDown
                className={`size-4 transition-transform ${expandedSections.platform ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
        <div>
          {expandedSections.platform && (
            <div>
              {platforms.map((platform) => {
                return (
                  <label
                    key={platform.value}
                    className="flex items-center gap-2 
                text-gray-700 text-sm"
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={
                        filters.platform?.includes(platform.value) || false
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const current = filters.platform || [];
                        const updated = checked
                          ? [...current, platform.value]
                          : current.filter((p) => p !== platform.value);
                        onFiltersChange({
                          ...filters,
                          platform: updated.length > 0 ? updated : null,
                        });
                      }}
                    />
                    <span>{platform.label}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div>
        {/* price change */}
        <div>
          <button
            onClick={() => toggleChevron("price")}
            className="flex items-center justify-between w-full
          mb-3"
          >
            <label htmlFor="" className="text-sm font-medium text-gray-800">
              Price Range
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.price && (
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="100000"
                step="100"
                value={filters.maxPrice || 10000}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    maxPrice: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none
             cursor-pointer accent-indigo-600"
              />
              <div
                className="flex items-center justify-between text-sm 
             text-gray-600"
              >
                <span>{currency}0</span>
                <span>{(filters.maxPrice || 100000).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
        {/*Followers Range  */}
         <div>
          <button
            onClick={() => toggleChevron("followers")}
            className="flex items-center justify-between w-full
          mb-3"
          >
            <label htmlFor="" className="text-sm font-medium text-gray-800">
              
              Minimum Followers
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expandedSections.followers ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.followers && (
          <select name="" id="" className="w-full 
          px-3 py-2 border border-gray-300 rounded-lg
           text-gray-700 outline-indigo-500"
           value={filters.minFollowers?.toString()|| '0'}
           onChange={(e)=>onFiltersChange({...filters, minFollowers:parseInt(e.target.value) || 0})}
           >
            <option value="0">Any Amount</option>
            <option value="1000">1k+</option>
            <option value="10000">10k+</option>
            <option value="50000">50k+</option>
            <option value="100000">100k+</option>
            <option value="5000000">500k+</option>
            <option value="100000">1M+</option>
          </select>
          )}
        </div>
        {/*niche filter*/}
        <div>
           <div>
          <button
            onClick={() => toggleChevron("niche")}
            className="flex items-center justify-between w-full
          mb-3"
          >
            <label htmlFor="" className="text-sm font-medium text-gray-800">
              
              niche
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expandedSections.niche ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.niche && (
          <select name="" id="" className="w-full 
          px-3 py-2 border border-gray-300 rounded-lg
           text-gray-700 outline-indigo-500"
           value={filters.niche || '0'}
           onChange={(e)=>onFiltersChange({...filters, niche:(e.target.value) || null})}
           >
           <option value="">All niches</option>
           {niches.map((niche)=>{
            return(
              <option key={niche.value} value={niche.value}>
                {niche.label}
              </option>
            )
           })}
          </select>
          )}
        </div>
        </div>
        {/*veriication status*/}
         <div>
          <button
            onClick={() => toggleChevron("status")}
            className="flex items-center justify-between w-full
          mb-3"
          >
            <label htmlFor="" className="text-sm font-medium text-gray-800">
              
              Account Status
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${expandedSections.status ? "rotate-180" : ""}`}
            />
          </button>
          {expandedSections.niche && (
          <div className="space-y-3">
            <label htmlFor="" className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox"
              checked={filters.verified || false}
              onChange={(e)=>onFiltersChange({...filters,verified: e.target.checked})}
              />
              <span className="text-sm text-gray-700">Verified accounts only</span>
            </label>
             <label htmlFor="" className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox"
              checked={filters.monitized || false}
              onChange={(e)=>onFiltersChange({...filters,monitized: e.target.checked})}
              />
              <span className="text-sm text-gray-700">Verified accounts only</span>
            </label>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
