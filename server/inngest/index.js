import { Inngest } from "inngest";
import prisma from "../prisma.config.js";

export const inngest = new Inngest({ id: "profile-marketplace" });
// 1. Sync User Creation
const syncUserCreation = inngest.createFunction(
  { 
    id: "sync-user-from-clerk",
    event: "clerk/user.created" // <-- Trigger belongs inside this first object
  },
  async ({ event }) => {
    const { data } = event;
    
    // check if user alresdy exist in the database
    const user = await prisma.user.findFirst({
      where: { id: data.id }
    })
    if(user){
      // update user data if it exist
      await prisma.user.update({
        data: {
          email: data?.email_address[0]?.email_address,
          name:  data?.first_name + " " + data?.last_name,
          image: data?.image_url,
        }
      })
      return;
    }
    await prisma.user.create({
      id: data.id,
       email: data?.email_address[0]?.email_address,
          name:  data?.first_name + " " + data?.last_name,
          image: data?.image_url,
    })

    const userData = {
      email: data.email_addresses?.[0]?.email_address,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    if (user) {
      return await prisma.user.update({
        where: { id: data.id },
        data: userData
      });
    }

    return await prisma.user.create({
      data: { id: data.id, ...userData }
    });
  }
);

// 2. inngest function to delete user from database
const syncUserDeletion = inngest.createFunction(
 
  { 
    id: "delete-user-from-clerk",
    event: "clerk/user.created" // <-- Trigger belongs inside this first object
  },
  async ({ event }) => {
    const { data } = event;
    
   const listings = await prisma.listing.findMany({
    where: {ownerId: data.id}
   })
   const chats = await prisma.chat.findMany({
    where:{OR: [{ownerUserId: data.id}, {chatUserId: data.id}]}
   })
       
   const transactions = await prisma.transaction.findMany({
    where: {ownerId: data.id}
   })
   
   if(listings.length === 0 && chats.length === 0 && transactions.length === 0){
    awaitprisma.use.delete({where: {id: data.id}})
   } else {
    await prisma.listing.updateMany({
      while: {ownerId: data.id},
      data: {status: "inactive"}
    })
   }
    const userData = {
      email: data.email_addresses?.[0]?.email_address,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    if (user) {
      return await prisma.user.update({
        where: { id: data.id },
        data: userData
      });
    }

    return await prisma.user.create({
      data: { id: data.id, ...userData }
    });
  }

);

// 3. Inngest function to  Update user data in database
const syncUserUpdation = inngest.createFunction(
  { 
    id: "update-user-with-clerk",
    event: "clerk/user.updated" 
  },
  async ({ event }) => {
    const { data } = event;
    
    // Prisma .update MUST have a 'where' clause
    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email_addresses?.[0]?.email_address,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        image: data.image_url,
      }
    });
  }
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation
];