import React, { useEffect, useState } from "react";
import { dummyOrders, platformIcons } from "../assets/assets"; // Import the shared icons
import {
  Loader2Icon,
  Copy,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {  format } from "date-fns";
import { Eye, EyeOff,  } from "lucide-react";

const MyOrders = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { listings } = useSelector((state) => state.listing);
  const [isExpanded, setIsExpanded] = useState(null);
  const [visibleCred, setVisibleCred] = useState(null); // stores unique key like 'order1-0'

  const fetchOrders = async () => {
    try {
      // Simulate API delay
      setOrders(dummyOrders);
    } catch (err) {
      console.error("Error setting orders:", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const copyToClipboard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      toast.success("Order ID copied!");
    } catch (error) {
      toast.error("Copy failed");
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center ">
        <Loader2Icon className="size-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="px-4  md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-2xl mx-auto mt-14 bg-white rounded-xl border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-semibold">No orders yet</h3>
          <p className="text-gray-500">
            You have not purchased any listings yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32 py-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-4 ">
        {orders.map((order) => {
          const isThisOrderExpanded = isExpanded === order.id;
          const associatedListing = listings.find(
            (item) => item.id === order.listingId,
          );
          // Normalize platform name to lowercase to match the keys in assets.js
          const platformKey = order.platform?.toLowerCase();
          const IconComponent = platformIcons[platformKey];

          return (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-gray-200 p-5 
              flex flex-col md:flex-row items-center justify-between
               max-w-4xl hover:shadow-sm transition-shadow"
            >
              {/* LEFT SIDE: Icon and Main Details */}
              <div className="flex items-center gap-4 flex-1">
                {/* Dynamic Icon Rendering */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  {IconComponent ? (
                    <IconComponent className="size-8 text-indigo-600" />
                  ) : (
                    <div className="size-8 bg-gray-200 rounded animate-pulse" />
                  )}
                </div>

                <div className="flex-1 ">
                  <div className="flex items-center gap-2 ">
                    <p className="font-bold text-lg">{order.platform}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full capitalize
                     ${
                       order.status === "completed"
                         ? "bg-green-100 text-green-700"
                         : "bg-blue-100 text-blue-700"
                     }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    ID: {order.id}
                    <button
                      onClick={() => copyToClipboard(order.id)}
                      className="hover:text-indigo-600"
                    >
                      <Copy className="size-3" />
                    </button>
                  </p>

                  <div className=" ">
                    <p className="font-bold text-lg text-gray-900">
                      {currency}
                      {order.total.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      Via {order.paymentMethod}
                    </p>
                    <h3>
                      {associatedListing
                        ? associatedListing.title
                        : "Unknown Listing"}
                    </h3>
                    {associatedListing && (
                      <p className="text-sm text-indigo-600 font-medium">
                        @{associatedListing.username} .
                        <span className="capitalize">
                          {associatedListing.platform}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
                    {/*RIGHT SIDE*/}
              <div
                className="flex flex-col items-end 
               self-stretch min-w-[120px] "
              >
                <div className=" mb-5 ">
                  <p className="text-2xl font-bold text-gray-900 ">
                    {currency}
                    {Number(order.amount).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">USD</p>
                </div>
                <div className="flex  gap-2 items-center">
                  <button 
                    onClick={() =>
                      setIsExpanded(isThisOrderExpanded ? null : order.id)
                    }
                    className="flex items-center gap-1.5
                     text-sm font-medium text-indigo-600
                      hover:text-indigo-800 border rounded-md 
                      p-2 border-gray-200"
                  >
                    {isThisOrderExpanded ? (
                      <>
                        <ChevronUp className="size-4" />
                        <span className="">Hide Credentials</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="size-4" />
                        <span>View Credentials</span>
                      </>
                    )}
                  </button>
                </div>



{isThisOrderExpanded && order.credential?.updatedCredential && (
  <div className="mt-4 w-full bg-indigo-50 p-3 rounded-md
   border border-indigo-100">
    <p className="text-xs font-bold text-indigo-600 mb-2
     uppercase">
      Edit Account Details:
    </p>
    <div className="space-y-2">
      {order.credential.updatedCredential.map((cred, index) => {
        const credKey = `${order.id}-${index}`;
        const isVisible = visibleCred === credKey;

        return (
          <div key={index} className="flex items-center gap-2 bg-white p-1 rounded border border-gray-200">
            <CheckCircle2 className="size-4 text-green-600 ml-2" />
            
            <input
              type={isVisible ? "text" : "password"} // Dynamic masking
              value={cred.name}
              className="w-full bg-transparent text-sm text-gray-700 font-medium focus:outline-none p-1"
              onChange={(e) => {
                const newName = e.target.value;
                setOrders((prevOrders) =>
                  prevOrders.map((o) => {
                    if (o.id === order.id) {
                      const newCredentials = [...o.credential.updatedCredential];
                      newCredentials[index] = { ...newCredentials[index], name: newName };
                      return { ...o, credential: { ...o.credential, updatedCredential: newCredentials } };
                    }
                    return o;
                  })
                );
              }}
            />

            {/* Mask Toggle Button */}
       <div className="flex items-center gap-1 mr-1">
  {/* Copy Button */}
  <button
    type="button"
    onClick={() => copyToClipboard(cred.name)}
    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
    title="Copy to clipboard"
  >
    <Copy className="size-4" />
  </button>

  {/* Mask Toggle Button */}
  <button
    type="button"
    onClick={() => setVisibleCred(isVisible ? null : credKey)}
    className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
    title={isVisible ? "Hide" : "Show"}
  >
    {isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
  </button>
</div>
          </div>
        );
      })}
    </div>
  </div>
)}
                
                {isThisOrderExpanded && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md border border-dashed border-gray-300">
                    <p className="text-sm">
                      Username: {order.credentials?.user}
                    </p>
                    <p className="text-sm">
                      Password: {order.credentials?.pass}
                    </p>
                  </div>
                )}
                <div>
                  Credential Purchased:{format(new Date(order.createdAt), "MMMd,yyyy")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
