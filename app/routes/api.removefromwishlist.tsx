import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
    // const { admin } = await authenticate.admin(request);
    
    

    let reqdata = await request.json();
    try{

      const wish = await prisma.wishlist.delete({
        where:{
            id: reqdata.id,
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
