import { LoaderFunctionArgs, json } from "@remix-run/node";





export const loader = async ({ request }: LoaderFunctionArgs) => {

    const url = new URL(request.url);

    const customerid = url.searchParams.get('customerid')!;
    const shopid = url.searchParams.get('shopid')!;
    const producthandle = url.searchParams.get('producthandle')!;

    
    try{

      const wish = await prisma.wishlist.findFirst({
        where:{
            customerid,
            producthandle,
            shopid
        }
      })
        
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
