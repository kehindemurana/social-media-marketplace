import { Loader2, Loader2Icon, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dummyChats } from "../assets/assets";
import { clearChat } from "../app/features/chatSlice";

const ChatBox = () => {
  const dispatch = useDispatch();
  const { listing, isOpen, chatId } = useSelector((state) => state.chat);
  const user = { id: "user_2" };


  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const fetchChat = async () => {
    setChat(dummyChats[0]);
    setMessages(dummyChats[0].messages);
    setIsLoading(false);
  };

  useEffect(() => {
    if (listing) {
      fetchChat();
    }
  }, [listing, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setChat(null);
      setMessages([]);
      setIsLoading(true);
      setNewMessage("");
      setIsSending(false);
    }
  }, [isOpen]);

    const messagesEndRef = useRef(null)
    useEffect(()=>{
      messagesEndRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages.length])

    const handleSendMessage = async(e) => {
      e.preventDefault()
      if(!newMessage.trim() || isSending) return;
        setMessages([...messages, {id:Date.now(), 
          chatId:chat.id,senderId: user.id,
           text:newMessage,createdAt:new Date().toISOString()}]);
        setNewMessage('')
      
    }

  if (!isOpen || !listing) return null;


  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur z-[999]
         flex items-center justify-center sm:p-4"
    >
      <div
       className="bg-white sm:rounded-l shadow-2xl w-full 
            max-w-2xl h-screen sm:h-[500px] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-pink-400 text-white p-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg">{listing.title}</h3>
            <p className="text-xs opacity-80">
              
              {user.id === listing?.ownerId
                ? `Chatting with buyer (${chat?.chatUser?.name || "Loading..."})`
                : `Chatting with Seller (${chat?.ownerUser?.name})`}{" "}
            </p>
          </div>
          <button
            onClick={() => dispatch(clearChat())}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/*Messages Area*/}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="size-6 animate-spin text-indigo-500" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-500 mb-2">No message yet</p>
                <p className="text-gray-400 text-sm">Start the conversation</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === user.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-1 rounded-lg max-w-[80%] ${message.senderId === user.id ? "bg-indigo-600 text-white" : "bg-white border text-gray-800"}`}
                >
                  <p> {message.text} </p>
                  <p className={`text-[10px] opacity-70 mt-1 ${message.senderId === user.id ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {isNaN(new Date(message.createdAt).getTime())
                      ? message.createdAt
                      : new Date(message.createdAt).toLocaleString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef}/>
        </div>
        {/*input Area  */}
       {/* Use the 'listing' from Redux directly if 'chat' hasn't loaded yet */}
{(chat?.listing?.status === 'active' || listing?.status === 'active') ? (
  <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
    <div className="flex gap-2"> 
      <textarea 
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e)=>{if(e.key === 'Enter' && !e.shiftKey){
          e.preventDefault();
          handleSendMessage(e)

        }} }
        placeholder="Type your message..."
        className="flex-1 resize-none border border-gray-300
         rounded-lg px-4 py-2 focus:outline-indigo-500 max-h-32" 
        rows={1}
      />
      <button type="submit" disabled={!newMessage.trim() || isSending} 
      className="disabled:bg-gray-400 bg-indigo-600 text-white px-4 py-2 rounded-lg">
        {isLoading ? <Loader2Icon className="w-5 h-5 animate-spin"/> : <Send className="w-5 h-5"/>}
        Send</button>
    </div>
  </form>
) : (
  <div className='p-4 bg-white border-t border-gray-200 
  rounded-b-lg text-center'>
     <p className="text-gray-500 italic text-center">
       {chat ? `This listing is ${chat?.listing?.status}` : 'Preparing your conversation...'}
     </p>
  </div>
)}
      </div>
    </div>
  );
};

export default ChatBox;
