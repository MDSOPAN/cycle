const formatMoney = function(cents, format) {
    if (typeof cents == 'string') { cents = cents.replace('.',''); }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || this.money_format);
  
    function defaultOption(opt, def) {
       return (typeof opt == 'undefined' ? def : opt);
    }
  
    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ',');
      decimal   = defaultOption(decimal, '.');
  
      if (isNaN(number) || number == null) { return 0; }
  
      number = (number/100.0).toFixed(precision);
  
      var parts   = number.split('.'),
          dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
          cents   = parts[1] ? (decimal + parts[1]) : '';
  
      return dollars + cents;
    }
  
    switch(formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
    }
  
    return formatString.replace(placeholderRegex, value);
  };


const wish_cont=document.querySelector('.wish_cont');
let wishlist = JSON.parse(localStorage.getItem("wishlist"));

if(wishlist == null){
    wishlist = new Array();
}
console.log('startedd 13')

if(wish_cont){
    const promises= new Array();
    if(wishlist.length != 0){
        wishlist.forEach((el)=>{
            promises.push(fetch(window.Shopify.routes.root + `products/${el}.js`))    
        });
        Promise.allSettled(promises).then((data)=>{
            let products = new Array();
            data.forEach((el)=>{
                products.push(el.value.json())
            })
            Promise.all(products).then((dat)=>{
                dat.forEach((prod)=>{
                    let temp=`
                    <a href="${prod.url}" class="wish_link" style="text-decoration: none;color: #000;text-align:center">
                        <img class="pro_img" style="aspect-ratio: 1/1" src="${prod.featured_image}">
                        <p style="margin:0">${prod.title}</p>
                        <p style="margin:0;font-size:1.3rem">${prod.vendor}</p>
                        ${prod.compare_at_price == null ? `
                        <p style="color: #31b769;margin:0">${formatMoney(prod.price,"€{{amount}}")}</p>
                        `:`
                        <p class="wish_inline_p" style="color: #31b769;margin:0;font-weight: 700;font-size:120%">${formatMoney(prod.price,"€{{amount}}")}</p>
                        <p class="wish_inline_p" style="color: #202020;margin:0;opacity: 0.5;font-size: 95%"><s>${formatMoney(prod.compare_at_price,"€{{amount}}")}</s></p>
                        `}
                    </a>
                    `
                    const div = document.createElement('div');
                    div.innerHTML=temp;
                    div.style.display = 'flex';
                    wish_cont.appendChild(div);
                })  
            })
        })
    }
    
}

// fetch(window.Shopify.routes.root + `products/the-compare-at-price-snowboard.js`).then(async (res)=>{
//     const response = await res.json();
//     let temp=`
//     <a href="${response.url}" style="text-decoration: none;color: #000;text-align:center">
//         <img class="pro_img" src="${response.featured_image}">
//         <p>${response.title}</p>
//         <p>${formatMoney(response.price,"Tk {{amount}}")}</P>
//     </a>
//     `
//     const div = document.createElement('div');
//     div.innerHTML=temp;

//     wish_cont.appendChild(div);
// })

