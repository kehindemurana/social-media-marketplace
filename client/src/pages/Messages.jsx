import React, { useEffect, useState, useMemo } from "react";
import { dummyChats } from "../assets/assets";
import { MessageCircle } from "lucide-react";
import { assets } from "../assets/assets";
import {format, isToday, isYesterday, parseISO} from 'date-fns'
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../app/features/chatSlice";
const Messages = () => {

  const dispatch = useDispatch()
    const { listing, isOpen, chatId } = useSelector((state) => state.chat);
  
    const user = { id: "user_1" };
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const filteredChats = useMemo(()=>{
  const query = searchQuery.toLowerCase();
  return chats.filter((chat)=>{
    const chatUser = chat.chatUserId === user?.id ? chat?.ownerUser : chat?.chatUser;
    return chat.listing?.title?.toLowerCase().includes(query) || chatUser?.name?.toLowerCase().includes(query)
  })
},[chats, searchQuery]) 

function handleOpenChat(chat){
  dispatch(setChat({listing: chat.listing, chatId:chat.id}))
  console.log("Dispatching chat:", chat.id)
}


  const formatTime = (dateString) =>{
    if(!dateString) return;
    const date = parseISO(dateString)
    if(isToday(date)){
      return 'Today'+ format(date, 'HH:mm')
    }
        if(isYesterday(date)){
      return 'Yesterday'+ format(date, 'HH:mm')
  } 
  return format(date, 'MMM d')
}



  const fetchUserChats = async () => {
    setChats(dummyChats);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserChats();
    const interval = setInterval(function fetchUserChats() {}, 10 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="mx-auto min-h-screen px-6 md:px-16 
    lg:px-24 xl:px-32"
    >
      {/*Header*/}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Messages</h1>
        <p className="text-gray-600">Chat with buyers and sellers</p>
      </div>
      {/*search bar*/}
      <div className="relative max-w-xl mb-8">
        <div
          className="  transform -translate-y-1/2
    text-gray-500  flex items-center"
        >
         
          <input
          
            type="text"
            placeholder="Search converstion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full
    pl-10 pr-4 py-2 border border-gray-300 rounded-lg
     focus:outline-indigo-500 absolute "
          />
           <img src={assets.search_1} alt=""  className="w-10"/>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-gray-500 py-20">
          Loading messages...
        </div>
      ) : filteredChats.length === 0 ? (
        <div
          className="bg-white rounded-lg shadow-xs border
          border-gray-200 p-16 text-center"
        >
          <div
            className="w-16 h-16 bg-gray-100 rounded-full
           flex items-center justify-center mx-auto mb-4"
          >
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {searchQuery ? "No chats found" : "No messages yet"}
          </h3>
          <p>
            {searchQuery
              ? "Try a different search term"
              : 'start a conversation by viewing a listing and clicking"chat with seller"'}
          </p>
        </div>
      ) : (
        <div
          className="bg-white rounded-lg shadow-xs border
          border-gray-200 divide-y  divide-gray-200"
        >
          {filteredChats.map((chat) => {
            const chatUser =
              chat.chatUserId === user?.id ? chat.ownerUser : chat.chatUser;
            return (
              <button onClick={()=>handleOpenChat(chat)}
                key={chat.id}
                className="w-full p-4 hover:bg-yellow-50
                  transition-colors text-left"
              >
                <div className="flex items-start space-x-4">
                  <div>
                    <img
                      src={chatUser?.image}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {chat.listing?.title || "unknown Listing"}
                      </h3>
                      <span className="text-xs text-gray-500 shrink-0 ml-2">
                        {formatTime( chat.updatedAt) }
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mb-1">
                      {chatUser?.name}
                    </p>
                    <p className={`text-sm truncate ${!chat.isLastMessageRead && chat.isLastMessageSenderId !== user?.id ? 'text-indigo-600 font-medium' : '' }`}>{chat.lastMessage || 'No messages yet'}</p>
                  </div>

                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Messages;
