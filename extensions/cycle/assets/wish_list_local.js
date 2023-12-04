
console.log("PO");



const wishbtn = document.querySelector("#spn_wishlist_btn")

let wishlist = JSON.parse(localStorage.getItem("wishlist"));

if(wishlist == null){
    wishlist = new Array();
}

let svg_path = wishbtn.querySelector('div');
let lab=wishbtn.querySelector('p');

if(wishbtn){
    const producthandle = wishbtn.getAttribute('data-producthandle');
    
    if(wishlist && wishlist.includes(producthandle)){
        wishbtn.classList.add('spn_active');
        svg_path.innerHTML ='<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#fff"></path> </g></svg>'
        lab.textContent= 'Sauvegardé';
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
        svg_path.innerHTML ='<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#fff"></path> </g></svg>'
        lab.textContent= 'Sauvegardé';
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
        lab.textContent = 'Sauvegarder'
        svg_path.innerHTML=`
        <svg fill="#000000" width="30px" height="30px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M128.00586,220a3.993,3.993,0,0,1-1.9541-.51,312.79378,312.79378,0,0,1-50.72168-37.01685C41.27344,151.82263,24.00586,121.38306,24.00586,92a56.013,56.013,0,0,1,104-28.87823A56.013,56.013,0,0,1,232.00586,92c0,29.38306-17.26758,59.82263-51.32422,90.47314A312.79378,312.79378,0,0,1,129.96,219.49,3.993,3.993,0,0,1,128.00586,220Zm-48-176a48.054,48.054,0,0,0-48,48c0,59.701,82.17578,111.14148,96,119.36853,13.82422-8.227,96-59.66754,96-119.36853a48.00892,48.00892,0,0,0-92.30957-18.49268,3.99954,3.99954,0,0,1-7.38086,0A47.90343,47.90343,0,0,0,80.00586,44Z"></path> </g>
        </svg>
        `
        new Noty({
            text: "Removed from wishlist",
            type: "error",
            theme: 'mint',
            timeout:500
            }).show()
    }
    
})