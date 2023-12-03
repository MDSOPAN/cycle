
console.log("PO");

const app_url ="http://localhost:37635";

const wishbtn = document.querySelector("#spn_wishlist_btn")


let wid = null;
if(wishbtn){
    const producthandle = wishbtn.getAttribute('data-producthandle');
    const customerid = wishbtn.getAttribute('data-customerid');
    const shopid = window.Shopify.shop;
    fetch(`${app_url}/api/checkwishlist?shopid=${shopid}&customerid=${customerid}&producthandle=${producthandle}`,{
        referrerPolicy: "unsafe-url" 
    }).then(async (res)=>{
        const response = await res.json();
        if(response.wish){
            wishbtn.classList.add('spn_active');
            wid=response.wish.id;
        }
    })

    fetch(window.Shopify.routes.root + `products/${producthandle}.js`).then(async (res)=>{
        const response = await res.json();
        console.log(response);
    })
}

wishbtn.addEventListener('click',async ()=>{
    const producthandle = wishbtn.getAttribute('data-producthandle');
    const customerid = wishbtn.getAttribute('data-customerid');
    const shopid = window.Shopify.shop;
    if(!wishbtn.classList.contains("spn_active")){
        const response = await fetch(`${app_url}/api/addtowishlist`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
            //   "Content-Type": "application/json",
            "Content-Type": "text/plain",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(
                {
                    producthandle:producthandle,
                    customerid : customerid,
                    shopid : shopid 
                }
            ), // body data type must match "Content-Type" header
          });
        if(response.status == 200){
            wishbtn.classList.add('spn_active');
            new Noty({
                text: "Added to wishlist",
                type: "success",
                theme: 'mint'
              }).show();
        }
        const res = await response.json();
        wid = res.wish.id;
        console.log(res);

    }else{
        const response = await fetch(`${app_url}/api/removefromwishlist`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
            //   "Content-Type": "application/json",
            "Content-Type": "text/plain",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(
                {
                    id: wid,
                }
            ), // body data type must match "Content-Type" header
          });
        if(response.status == 200){
            wishbtn.classList.remove('spn_active');
            new Noty({
                text: "Removed from wishlist",
                type: "error",
                theme: 'mint'
              }).show();
        }
        const res = await response.json();
        console.log(res);
    }
    
})