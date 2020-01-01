import './../css/index.css'

// require(['./common.js','jquery'], (common,$)=> {
require(['./common.js'], (common)=> {
    common.initCart();

    $(function(){
        console.log("this is jQuery")
    })
        
})