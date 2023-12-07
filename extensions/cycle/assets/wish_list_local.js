
console.log("PO");



const wishbtn = document.querySelector("#spn_wishlist_btn")

let wishlist = JSON.parse(localStorage.getItem("wishlist"));

if(wishlist == null){
    wishlist = new Array();
}

let svg_path = wishbtn.querySelector('div');
// let lab=wishbtn.querySelector('p');

if(wishbtn){
    const producthandle = wishbtn.getAttribute('data-producthandle');
    
    if(wishlist && wishlist.includes(producthandle)){
        wishbtn.classList.add('spn_active');
        svg_path.innerHTML =`
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            
            <g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#000000"/> </g>
        
        </svg>
        `
        // lab.textContent= 'Sauvegardé';
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
        // svg_path.innerHTML ='<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#fff"></path> </g></svg>'
        svg_path.innerHTML =`
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            
            <g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#000000"/> </g>
        
        </svg>
        ` 
        // lab.textContent= 'Sauvegardé';
        new Noty({
            text: "added",
            type: "success",
            theme: 'mint',
            timeout:1000
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
        // lab.textContent = 'Sauvegarder'
        // svg_path.innerHTML=`
        // <svg fill="#000000" width="30px" height="30px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
        //     <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M128.00586,220a3.993,3.993,0,0,1-1.9541-.51,312.79378,312.79378,0,0,1-50.72168-37.01685C41.27344,151.82263,24.00586,121.38306,24.00586,92a56.013,56.013,0,0,1,104-28.87823A56.013,56.013,0,0,1,232.00586,92c0,29.38306-17.26758,59.82263-51.32422,90.47314A312.79378,312.79378,0,0,1,129.96,219.49,3.993,3.993,0,0,1,128.00586,220Zm-48-176a48.054,48.054,0,0,0-48,48c0,59.701,82.17578,111.14148,96,119.36853,13.82422-8.227,96-59.66754,96-119.36853a48.00892,48.00892,0,0,0-92.30957-18.49268,3.99954,3.99954,0,0,1-7.38086,0A47.90343,47.90343,0,0,0,80.00586,44Z"></path> </g>
        // </svg>
        // `
        svg_path.innerHTML=`
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

        <g id="SVGRepo_bgCarrier" stroke-width="0"/>

        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

        <g id="SVGRepo_iconCarrier"> <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z" fill="#000000"/> </g>

        </svg>
        `
        new Noty({
            text: "removed",
            type: "error",
            theme: 'mint',
            timeout:1000
            }).show()
    }
    
})