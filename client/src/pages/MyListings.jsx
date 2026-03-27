import {
  ArrowDownCircleIcon,
  BanIcon,
  CheckCircle,
  Clock,
  CoinsIcon,
  DollarSign,
  DollarSignIcon,
  Edit,
  Eye,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  Plus,
  PlusIcon,
  StarIcon,
  TrashIcon,
  TrendingUp,
  TrendingUpDown,
  TrendingUpIcon,
  User,
  WalletIcon,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { platformIcons } from "../assets/assets";
import CredentialSubmission from "../components/CredentialSubmission";
import WithdrawModel from "../components/WithdrawModel";

const MyListings = () => {
  const { userListings, balance } = useSelector((state) => state.listing);
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [showCredentialSubmission, setShowCredentialSubmission] = useState(null);
    const [showWithdrawal, setShowWithdrawal] = useState(null)
  const totalValue = userListings.reduce(
    (sum, listing) => sum + (listing.price || 0),
    0,
  );
  const activeListings = userListings.filter(
    (listing) => listing.status === "active",
  ).length;
  const soldListings = userListings.filter(
    (listing) => listing.status === "sold",
  ).length;

  const formatNum = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num?.toString() || "0";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="size-3.5" />;
        break;
      case "sold":
        return <DollarSignIcon className="size-3.5" />;
        break;
      case "ban":
        return <BanIcon className="size-3.5" />;
        break;
      case "inactive":
        return <XCircle className="size-3.5" />;
        break;
      default:
        return <Clock className="size-3.5" />;
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-800";
        break;
      case "sold":
        return "text-indigo-800";
        break;
      case "ban":
        return "text-red-800";
        break;
      case "inactive":
        return "text-gray-800";
        break;
      default:
        return <Clock className="size-3.5" />;
    }
  };
  async function toggleStatus(listingId) {}
  async function deleteListing(listingId) {}
  async function markAsFeatured(listingId) {}

  
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8">
      {/*Header*/}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
          <p className="text-gray-600 mt-1">
            Manage your social media account listings
          </p>
        </div>
        <button
          onClick={() => navigate("/create-listing")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 
        rounded font-medium flex items-center space-x-2 mt-4 md:mt-0"
        >
          <Plus className="size-4" /> <span>New Listing</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Listing"
          value={userListings.length}
          icon={<Eye className="size-6 text-indigo-600" />}
          color="indigo"
        />
        <StatCard
          title="Active Listing"
          value={userListings.length}
          icon={<CheckCircle className="size-6 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Sold Listing"
          value={userListings.length}
          icon={<TrendingUp className="size-6 text-indigo-600" />}
          color="indigo"
        />
        <StatCard
          title="Total "
          value={`${currency}${totalValue.toLocaleString()}`}
          icon={<DollarSign className="size-6 text-yellow-600" />}
          color="yellow"
        />
      </div>

      {/*Balance Section*/}
      <div
        className="flex flex-col sm:flex-row justify-between gap-4
       xl:gap-20 p-6 mb-10 bg-white rounded-xl border border-gray-200"
      >
        {[
          { label: "Earned", value: balance.earned, icon: WalletIcon },
          {
            label: "withdrawn",
            value: balance.withdrawn,
            icon: ArrowDownCircleIcon,
          },
          { label: "Available", value: balance.available, icon: CoinsIcon },
        ].map((item, index) => {
          return (
            <div onClick={()=>item.label === 'Available' && setShowWithdrawal(true)}
              key={index}
              className="flex flex-1 items-center justify-between
            p-4 rounded-lg border border-gray-500 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <item.icon className="text-gray-500 w-6 h-6" />
                <span className="font-medium text-gray-600">{item.label}</span>
              </div>
              <span>
                {currency}
                {item.value.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
      {/*Listings*/}
      {userListings.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-16">
          <div
            className="w-16 h-16 bg-gray-100 rounded-full flex 
          items-center justify-center mx-auto mb-1"
          >
            <PlusIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            No Listing yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start by creating your first listing
          </p>
          <button
            onClick={() => navigate("/create-listing")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6
          py-2 rounded-lg font-medium"
          >
            Create first listing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userListings.map((listing) => {
            const IconComponent = platformIcons[listing.platform.toLowerCase()];
            return (
              <div
                key={listing.id}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-lg
                shadow-gray-200/70 transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 justify-between mb-4">
                    {IconComponent ? (
                      <IconComponent className="size-8 text-red-600" />
                    ) : (
                      <div className="size-8 bg-gray-100 rounded" />
                    )}
                    <div className="flex-1">
                      <div className="flex  items-start">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {listing.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="relative group">
                            <LockIcon size={14} />
                            <div
                              className="absolute invisible group-hover:visible
                              right-0 top-0 pt-4.5 z-10"
                            >
                              <div
                                className="bg-white text-gray-600 text-xs rounded border
                          border-gray-200 p-2 px-3"
                              >
                                {!listing.isCredentialSubmitted && (
                                  <>
                                    <button onClick={()=>setShowCredentialSubmission(listing)} className="flex items-center gap-2 text-nowrap">
                                      Add Credential
                                    </button>
                                    <hr className="border-gray-200 my-2" />
                                  </>
                                )}
                                <button className="text-nowrap">
                                  Status:
                                  <span
                                    className={
                                      listing.isCredentialSubmitted
                                        ? listing.isCredentialVerified
                                          ? listing.isCredentialChanged
                                            ? "text-green-600"
                                            : "text-indigo-600"
                                          : "text-slate-800"
                                        : "text-red-600"
                                    }
                                  >
                                    {listing.isCredentialSubmitted
                                      ? listing.isCredentialVerified
                                        ? listing.isCredentialChanged
                                          ? "Changed"
                                          : "Verified"
                                        : "Submitted"
                                      : "Not Submitted"}
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                          {listing.status === "active" && (
                            <StarIcon
                              onClick={() => markAsFeatured(listing.id)}
                              size={18}
                              className={`text-yellow-500 cursor-pointer
                         ${listing.featured && "fill-yellow-500"}`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span>@{listing.username}</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm ">
                    <div className="flex items-center space-x-2 mb-5">
                      <User className="size-4 text-gray-400" />
                      <span className="">
                        {formatNum(listing.followers_count)}
                      </span>
                    </div>
                    <span
                      className={`flex gap-2 items-center justify-center ${getStatusColor(listing.status)}`}
                    >
                      {getStatusIcon(listing.status)}
                      {<IconComponent />}
                      <span>{listing.status}</span>
                    </span>
                    <div className="flex items-center gap-4">
                      <TrendingUpIcon className="size-4 text-gray-400" />
                      <span>{listing.engagement_rate}% engagement</span>
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-between 
                   pt-3 border-t border-gray-200"
                  >
                    <span>
                      {currency} {listing.price.toLocaleString()}
                    </span>
                 
                  <div className="flex items-center space-x-2">
                    {listing.status !== "sold" && (
                      <button
                        onClick={() => deleteListing(listing.id)}
                        className="p-2 border border-gray-300 
                        rounded-lg  hover:bg-gray-50 hover:text-red-500"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/edit-listing/${listing.id}`)}
                      className="p-2 border border-gray-300 
                        rounded-lg  hover:bg-gray-50 hover:text-indigo-600"
                    >
                      <Edit className="size-4" />
                    </button>
                    <button
                      onClick={() => toggleStatus(listing.id)}
                      className="p-2 border border-gray-300 
                        rounded-lg  hover:bg-gray-50 hover:text-indigo-600"
                    >
                      {listing.status === "active" && (
                        <EyeOffIcon className="size-4" />
                      )}
                      {listing.status !== "active" && (
                        <EyeIcon className="size-4" />
                      )}
                    </button>
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
         {showCredentialSubmission && (
          <CredentialSubmission listing={showCredentialSubmission} onClose={()=>setShowCredentialSubmission(null)} />
        )}
        {showWithdrawal && (
          <WithdrawModel  onClose={()=>setShowWithdrawal(null)}/>
        )}
      {/*Footer*/}
      <div className="bg-white border-t border-gray-200 p-4 text-center mt-28">
        <p className="text-sm text-gray-500">
          @ 2025 <span className="">Kehinde murana</span>
        </p>
      </div>
    </div>
  );
};

export default MyListings;
