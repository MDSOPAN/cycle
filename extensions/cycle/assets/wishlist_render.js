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

const app_url = "http://localhost:37635";
const wish_cont=document.querySelector('.wish_cont');
console.log('startedd 4')
if(wish_cont){
    const shopid = window.Shopify.shop;
    const customerid = wish_cont.getAttribute('data-customerid');
    const promises= new Array();
    fetch(`${app_url}/api/getwishlist?shopid=${shopid}&customerid=${customerid}`).then(async (res)=>{
        const response = await res.json();
        response.wish.forEach((el)=>{
            promises.push(fetch(window.Shopify.routes.root + `products/${el.producthandle}.js`))    
        });
        Promise.allSettled(promises).then((data)=>{
            data.forEach(async (el)=>{
                const prod = await el.value.json()
                console.log(prod);
                let temp=`
                <a href="${prod.url}" style="text-decoration: none;color: #000;text-align:center">
                    <img class="pro_img" src="${prod.featured_image}">
                    <p>${prod.title}</p>
                    <p>${formatMoney(prod.price,"Tk {{amount}}")}</P>
                </a>
                `
                const div = document.createElement('div');
                div.innerHTML=temp;
            
                wish_cont.appendChild(div);
            })
        })
    })
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

