
console.log("PO");



const wishbtn = document.querySelector("#spn_wishlist_btn")

let wishlist = JSON.parse(localStorage.getItem("wishlist"));

if(wishlist == null){
    wishlist = new Array();
}

let wid = null;
if(wishbtn){
    const producthandle = wishbtn.getAttribute('data-producthandle');
    
    if(wishlist && wishlist.includes(producthandle)){
        wishbtn.classList.add('spn_active');
    }
    

    fetch(window.Shopify.routes.root + `products/${producthandle}.js`).then(async (res)=>{
        const response = await res.json();
        console.log(response);
    })
}

wishbtn.addEventListener('click',async ()=>{
    const producthandle = wishbtn.getAttribute('data-producthandle');
    if(!wishbtn.classList.contains("spn_active")){
        wishlist.push(producthandle);
        localStorage.setItem('wishlist',JSON.stringify(wishlist));
        wishbtn.classList.add('spn_active');
        new Noty({
            text: "Added to wishlist",
            type: "success",
            theme: 'mint',
            timeout:500
            }).show();
    }else{
        wishlist = wishlist.filter((el)=>{
            if(el == producthandle){
                return false;
            }
            return true;
        })
        localStorage.setItem('wishlist',JSON.stringify(wishlist));
        wishbtn.classList.remove('spn_active');
        new Noty({
            text: "Removed from wishlist",
            type: "error",
            theme: 'mint',
            timeout:500
            }).show()
    }
    
})