import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "../shopify.server";


import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export const loader=async ({ request }: LoaderFunctionArgs) => {
  return json({
    data: 'SAFE',
  },{
    headers:{
      'Access-Control-Allow-Origin':'*',
      "Content-Type": "application/json",
    }
  });
}
export const action = async ({ request }: ActionFunctionArgs) => {
    // const { admin } = await authenticate.admin(request);
    
    

    let reqdata = await request.json();
    try{

      const wish = await prisma.wishlist.create({
        data:{
          customerid: reqdata.customerid,
          shopid: reqdata.shopid,
          producthandle: reqdata.producthandle,
        }
      });
      return json({
        wish,
      },{
        headers:{
          'Access-Control-Allow-Origin':'*',
          "Content-Type": "application/json",
        }
      });
    }catch(err){
      return json({
        Error: err,
      },{
        headers:{
          'Access-Control-Allow-Origin':'*',
          "Content-Type": "application/json",
        },
        status: 400
      });
    }
  };
