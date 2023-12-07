const product_type = document.querySelector('.prod_type');

let range_input=document.querySelector("#rainput");
let question = document.querySelector('.ques_title');
const ev = new Event("val_change");

    range_input.addEventListener('val_change',(ev)=>{
        if(/(safari|chrome)/.test(navigator.userAgent.toLowerCase())){
            var value = (ev.target.value-ev.target.min)/(ev.target.max-ev.target.min)*100
            console.log(ev.target.min);
            ev.target.style.background = 'linear-gradient(to right, rgba(214, 249, 137, 1) 0%, rgba(214, 249, 137, 1) ' + value + '%, #ccc ' + value + '%, #ccc 100%)'
        }

    })


console.log('upd29');
const fil_types= product_type.querySelectorAll('input');
let url= 'collections/all?'
product_type.querySelectorAll('div').forEach((el,i)=>{
    el.addEventListener('click',()=>{
        if(fil_types[i].checked == true){
            fil_types[i].checked =false
            const re = new RegExp(`&filter.p.product_type=${encodeURIComponent(fil_types[i].value)}&filter.p.product_type=${encodeURIComponent(fil_types[i].value)}%20reconditionné`);
            url=url.replace(re,'');
            url =url.replace(`filter.p.product_type=${encodeURIComponent(fil_types[i].value)}&filter.p.product_type=${encodeURIComponent(fil_types[i].value)}%20reconditionné`,'');
            // if(url!='collections/all?') url=url.slice(0, -1);
            console.log(url)
        }else{
            fil_types[i].checked = true;
            if(url!='collections/all?') url+='&';
            url+=`filter.p.product_type=${encodeURIComponent(fil_types[i].value)}&filter.p.product_type=${encodeURIComponent(fil_types[i].value)}%20reconditionné`
            console.log(url)
        }
    })
});

const product_size = document.querySelector('.prod_size');
const fil_sizes= product_size.querySelectorAll('input');
product_size.querySelectorAll('div').forEach((el,i)=>{
    el.addEventListener('click',()=>{
        if(fil_sizes[i].checked == true){
            fil_sizes[i].checked =false
            const re = new RegExp(`&filter.v.option.taille=${encodeURIComponent(fil_sizes[i].value)}`);
            url=url.replace(re,'');
            url = url.replace(`filter.v.option.taille=${encodeURIComponent(fil_sizes[i].value)}`,'');
            // if(url!='collections/all?') url=url.slice(0, -1);
            console.log(url)
        }else{
            fil_sizes[i].checked = true;
            if(url!='collections/all?') url+='&';
            url+=`filter.v.option.taille=${encodeURIComponent(fil_sizes[i].value)}`
            console.log(url)
        }
    })
});


const product_price = document.querySelector('.prod_price');
const fil_prices= product_price.querySelectorAll('input');

let price_filter='';
product_price.querySelectorAll('div').forEach((el,i)=>{
    el.addEventListener('click',()=>{
        if(fil_prices[i].checked == true){
            fil_prices[i].checked =false
            // const re = new RegExp(`&${fil_prices[i].value}`);
            // url=url.replace(re,'');
            // url = url.replace(`&${fil_prices[i].value}`,'');
            price_filter='';
            // if(url!='collections/all?') url=url.slice(0, -1);
            console.log(price_filter)
        }else{
            fil_prices[i].checked = true;
            // if(url!='collections/all?') url+='&';
            // url+=`${fil_prices[i].value}`
            price_filter=`&${fil_prices[i].value}`;
            console.log(price_filter)
        }
    })
});

const continue_btn = document.querySelector('.continue_button');
const previous_btn = document.querySelector('.back_button');
const result = document.querySelector('.result');

continue_btn.addEventListener('click',(e)=>{
    let curr = e.target.parentElement.getAttribute('data-current')
    console.log(curr);
    if(curr == "type"){
        product_type.classList.add('hide');
        product_size.classList.remove('hide');
        range_input.value= 34;
        range_input.dispatchEvent(ev);
        question.textContent = 'Quelle taille ?';
        e.target.parentElement.setAttribute('data-current','size');
    }else if(curr== "size"){
        product_size.classList.add('hide');
        product_price.classList.remove('hide');
        range_input.value= 68;
        range_input.dispatchEvent(ev);
        question.textContent = "Quel Budget ?";
        e.target.parentElement.setAttribute('data-current','price');
    }else{
        result.classList.remove('hide');
        product_price.classList.add('hide');
        range_input.value= 100;
        range_input.dispatchEvent(ev);
        question.textContent = 'Votre résultat personnalisé';
        e.target.parentElement.setAttribute('data-current','result');
    }
})

previous_btn.addEventListener('click',(e)=>{
    let curr = e.target.parentElement.getAttribute('data-current')
    console.log(curr);
    if(curr == "size"){
        product_size.classList.add('hide');
        product_type.classList.remove('hide');
        range_input.value= 0;
        range_input.dispatchEvent(ev);
        question.textContent = 'Quel type de vélo ?';
        e.target.parentElement.setAttribute('data-current','type');
    }else if(curr== "price"){
        product_price.classList.add('hide');
        product_size.classList.remove('hide');
        range_input.value= 34;
        range_input.dispatchEvent(ev);
        question.textContent = 'Quelle taille ?';
        e.target.parentElement.setAttribute('data-current','size');
    }else if(curr == 'result'){
        result.classList.add('hide');
        product_price.classList.remove('hide');
        range_input.value= 68;
        range_input.dispatchEvent(ev);
        question.textContent = 'Quel Budget ?';
        e.target.parentElement.setAttribute('data-current','price');
    }
})

document.querySelector(".discover_btn").addEventListener('click',(ev)=>{
    window.location = `https://loewi.fr/${url}${price_filter}`
})