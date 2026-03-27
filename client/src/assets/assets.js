import logo from './logoflip.png';
import image_1 from './image_1.jpg';
import image_2 from './image_2.jpg';
import image_3 from './image_3.jpg';
import image_4 from './image_4.jpg';
import user_profile from './user_profile.jpg'
import { Youtube, Instagram, Music, Monitor, Share2 } from 'lucide-react';
import search_1 from './search_1.jpg';
export const socialMediaLinks = {
    youtube:'https://www.youtube.com',
    instagram:'https://www.instagram.com',
    tiktok:'https://www.tiktok.com',
    facebook:'https://www.facebook.com',
    twitter:'https://www.twitter.com',
    linkedin:'https://www.linkedin.com',
    pinterest:'https://www.pinterest.com',
    snapchat:'https://www.snapchat.com',
    twitch:'https://www.twitch.com',
    discord:'https://www.discord.com',
};

export function getProfileLink(platform, username) {
    if (!platform || !username) return null;
    const key = platform.toLowerCase();
    const base = socialMediaLinks[key];
    
    // Logic error fixed: only return null if base DOES NOT exist
    if (!base) return null; 

    const cleanUsername = username.startsWith('@') ? username.slice(1) : username;

    // Syntax fixed: changed $(...) to ${...}
    switch (key) {
        case 'youtube':
            return `https://www.youtube.com/@${cleanUsername}`;
        default:
            return `${base}/${cleanUsername}`;
    }
}



export const platformIcons = {
    youtube: Youtube,     
    instagram: Instagram,
    tiktok: Music, 
    twitch: Monitor,
    pinterest: Share2,
};

export const assets = {
    logo,
    user_profile,
    search_1
}


export const dummyUsers = [
    {
        id:'user_1',
        email:'creator1@example.com',
        name:'Alex Johnson',
        image:'https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg',
        createdAt: '2025-10-16T12:52:10.000Z',
        updatedAt:'2025-10-16T12:52:12.000Z',
          
    },
        {
        id:'user_2',
        email:'creator2@example.com',
        name:'Sophia Lee',
        image:' https://i.pinimg.com/736x/61/85/46/61854647279aa9c3feb2b51bc0374332.jpg',
        createdAt: '2025-10-16T12:52:10.000Z',
        updatedAt:'2025-10-16T12:52:05.020Z',
    },
        {
        id:'user_3',
        email:'creator3@example.com',
        name:'David Kim',
        image:'https://i.pinimg.com/736x/6a/e1/66/6ae1661d120502ebf4c1683c9922b6b4.jpg',
        createdAt: '2025-10-16T12:52:10.000Z',
        updatedAt:'2025-10-16T12:52:01.000Z',
    },
    {
        id:'user_4',
        email:'creator4@example.com',
        name:'David Becham',
        image:'https://i.pinimg.com/736x/18/ed/25/18ed2513b196b31bca2ed78797608add.jpg',
        createdAt: '2024-11-16T12:52:10.000Z',
        updatedAt:'2025-10-16T12:52:01.000Z',
    },
]


export const dummyListings = [
    {
        id:'listing_1',
        ownerId:'user_1',
        title:'Tech Youtube Channel with 120k subscribers',
        platform:'youtube',
        username:'TechSavyAlex',
        followers_count:120000,
        engagement_rate:4,
        monthly_views:850000,
        niche:'tech',
        price:7500,
        description:'Established tech channel with high engagement and steady ads revenue.Incliude full transfer and assets.',
        verified:true,
        monetized:true,
        country:'USA',
        age_range:'25-44',
        status:'active',
        featured:true,
        images:[image_1,image_2,image_3,image_4],
        customer:[image_1,image_2,image_3,image_4],
        platformAssured:false,
        owner:dummyUsers[1],
        isCredentialSubmitted:false,
        isCredentialVerified:true,
        isCredentialChanged:true,
        createdAt: '2025-10-16T12:52:09.010Z'  
    },
     {
        id:'listing_2',
        ownerId:'user_2',
        title:'Travel Instagram page with 50k Followers',
        platform:'instagram',
        username:'Wanderlust.sophia',
        followers_count:50000,
        engagement_rate:3,
        monthly_views:21000,
        niche:'travel',
        price:2000,
        description:'Beautiful curated travel page with loyal audience and collaboration history with travel brands.',
        verified:false,
        monetized:false,
        country:'Canada',
        age_range:'25-44',
        status:'sold',
        featured:true,
        images:[image_1,image_2,image_3,image_4],
         customer:[image_1,image_2,image_3,image_4],
        platformAssured:false,
        owner:dummyUsers[2],
         isCredentialSubmitted:true,
        isCredentialVerified:true,
        isCredentialChanged:true,
        createdAt: '2025-10-16T12:52:10.020Z'   
    },
     {
        id:'listing_4',
        ownerId:'user_1',
        title:'Fashion Pinterest Board with 90k Monthly views',
        platform:'pinterest',
        username:'Stylebyalex',
        followers_count:15000,
        engagement_rate:4,
        monthly_views:9000,
        niche:'fashion',
        price:950,
        description:'Highly active fashion and design inspiration board with organic traffic and steady audience growth.',
        verified:false,
        monetized:true,
        country:'USA',
        age_range:'25-44',
        status:'active',
        featured:true,
        images:[image_1,image_2,image_3,image_4],
         customer:[image_1,image_2,image_3,image_4],
        platformAssured:false,
        owner:dummyUsers[4],
         isCredentialSubmitted:true,
        isCredentialVerified:true,
        isCredentialChanged:true,
       createdAt: '2025-10-16T12:52:11.520Z'    
    },
     {
        id:'listing_3',
        ownerId:'user_3',
        title:'Fitness TikTok with 300k Followers',
        platform:'tiktok',
        username:'fitwithdavid',
        followers_count:3000000,
        engagement_rate:5,
        monthly_views:2500000,
        niche:'fitness',
        price:12000,
        description:'Viral fitness content and consistent posting schedule. Brand deals available and audience in the US & UK.',
        verified:true,
        monetized:true,
        country:'Uk',
        age_range:'18-34',
        status:'pending',
        featured:true,
        images:[image_1,image_2,image_3,image_4],
         customer:[image_1,image_2,image_3,image_4],
        platformAssured:false,
        owner:dummyUsers[3],
         isCredentialSubmitted:true,
        isCredentialVerified:true,
        isCredentialChanged:true,
       createdAt: '2025-10-16T12:52:10.000Z'    
    },
     {
        id:'listing_5',
        ownerId:'user_2',
        title:'Music Twitch channel with 20k followers',
        platform:'twitch',
        username:'sophiaBeats',
        followers_count:20000,
        engagement_rate:6,
        monthly_views:60000,
        niche:'music',
        price:3000,
        description:'Active music streaming channel with loyal audience and consistent income from subscribers and donations.',
        verified:true,
        monetized:true,
        country:'Australia',
        age_range:'18-44',
        status:'sold',
        featured:true,
        images:[image_1,image_2,image_3,image_4],
         customer:[image_1,image_2,image_3,image_4],
        platformAssured:false,
        owner:dummyUsers[1],
         isCredentialSubmitted:true,
        isCredentialVerified:true,
        isCredentialChanged:true,
        createdAt: '2025-10-16T12:52:10.000Z'   
    },
]
export const dummyChats = [
    {
        id: 'chat_1',
        listingId: 'listing_2', // Travel Instagram page
        ownerUser: dummyUsers[1], // Sophia (Seller)
        chatUser: dummyUsers[0],  // Alex (Buyer)
        updatedAt:'2025-10-16T12:52:01.000Z',
         lastMessage: "What is the primary audience location?",
        isLastMessageRead: false,
        isLastMessageSenderId: 'user_1',
        messages: [
            { id: 'm1', senderId: 'user_1', text: "Hi Sophia, I'm interested in your Travel Instagram page!", createdAt: '10:00 AM' },
            { id: 'm2', senderId: 'user_2', text: "Hi Alex! Glad to hear that. It's a great page.", createdAt: '10:05 AM' },
            { id: 'm3', senderId: 'user_1', text: "What is the primary audience location?", createdAt: '10:10 AM' },
        ]
    },
    {
        id: 'chat_2',
        listingId: 'listing_1', // Tech Youtube Channel
        ownerUser: dummyUsers[0], // Alex (Seller)
        chatUser: dummyUsers[1],  // Sophia (Buyer)
        updatedAt:'2025-10-16T12:52:01.000Z',
        lastMessage: "Slightly, if we can close the deal this week.",
        isLastMessageRead: true,
        isLastMessageSenderId: 'user_1',
          messages: [
            { id: 'm4', senderId: 'user_2', text: "Is the price for the Tech channel negotiable?", createdAt: '11:00 AM' },
            { id: 'm5', senderId: 'user_1', text: "Slightly, if we can close the deal this week.", createdAt: '11:15 AM' },
        ]
    }
];


export const dummyMessages = [
    {
        id: 'm1',
        chatId: 'chat_1',
        senderId: 'user_1',
        text: "Hi Sophia, I'm interested in your Travel Instagram page!",
        createdAt: '2025-10-16T13:00:00Z'
    },
    {
        id: 'm2',
        chatId: 'chat_1',
        senderId: 'user_2', // Sophia
        text: "Hi Alex! Glad to hear that. It's a great page with high engagement.",
        createdAt: '2025-10-16T13:05:00Z'
    },
    {
        id: 'm3',
        chatId: 'chat_1',
        senderId: 'user_1',
        text: "What is the primary audience location?",
        createdAt: '2025-10-16T13:04:10Z'
    }
];


export const dummyOrders = [
    {
        id: 'ord_001',
        platform:'Youtube',
        listingId: 'listing_1', // Tech Youtube Channel
        buyerId: 'user_2',      // Sophia Lee
        sellerId: 'user_1',     // Alex Johnson
        amount: 7500,
        platformFee: 375,       // 5% Fee
        total: 7875,
        status: 'completed',    // options: 'pending', 'escrow', 'completed', 'cancelled'
        paymentMethod: 'Stripe',
        credential: {
            updatedCredential: [
                { name: "Channel Email: tech-admin@example.com" },
                 { name: "password: " },
                { name: "Recovery Phone: +1-555-0199" },
                { name: "Backup Codes: Generated" }
            ]
        },
        createdAt: '2025-10-18T10:30:00Z',
        updatedAt: '2025-10-20T14:20:00Z'
    },
    {
        id: 'ord_002',
        platform:'Twitch',
        listingId: 'listing_5', // Music Twitch channel
        buyerId: 'user_1',      // Alex Johnson
        sellerId: 'user_2',     // Sophia Lee
        amount: 3000,
        platformFee: 150,
        total: 3150,
        status: 'escrow',       // Money held by platform until credentials transfer
        paymentMethod: 'Crypto',
        credential: {
            updatedCredential: [
                { name: "Stream Key: live_8429302_asdf..." },
                 { name: "password: tech-admin@example.com" },
                { name: "Email: sophia-twitch@example.com" }
            ]
        },
        createdAt: '2025-10-22T09:15:00Z',
        updatedAt: '2025-10-22T09:15:00Z'
    }
];

export const dummyWithdrawalRequests = [
    {
        id: 'wd_101',
        userId: 'user_1',       // Alex Johnson
        user:dummyUsers[0],
        amount: 7125,           // (Order amount - platform fee)
        status: 'approved',     // options: 'pending', // 'approved', 'rejected', 'processing'
        isWithdrawn: true,
        account: [
            { name: 'Bank Name', value: 'HDFC Bank' },
            { name: 'Account Number', value: 'xxxx xxxx 6789' },
            { name: 'IFSC Code', value: 'HDFC0001234' }
        ],
        method: 'Bank Transfer',
        accountDetails: '****6789',
        requestedAt: '2025-10-21T08:00:00Z',
        processedAt: '2025-10-22T12:00:00Z',
        credential: { updatedCredential: [] }
    },
    {
        id: 'wd_102',
        userId: 'user_2',       // Sophia Lee
         user:dummyUsers[1],
        amount: 1200,
        status: 'pending',
        isWithdrawn: false,
        account: [
            { name: 'PayPal Email', value: 'creator2@example.com' }
        ],
        method: 'PayPal',
        accountDetails: 'creator2@example.com',
        requestedAt: '2025-10-23T15:45:00Z',
        processedAt: null,
        credential: { updatedCredential: [] }
    }
];

