<template>
   <div>
<!-- 页头-->
       <nav-header></nav-header>
<!-- 面包屑-->

            <bread>
                <!-- 插槽slot -->
                <span>Goods</span>
            </bread>
<!-- 其他 -->
            <div class="accessory-result-page accessory-page">
           <div class="container">
               <div class="filter-nav">
                   <span class="sortby">Sort by:</span>
                   <a href="javascript:void(0)" class="default cur">Default</a>
                   <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                   <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
               </div>
               <div class="accessory-result">
                   <!-- filter -->
                   <div class="filter stopPop" id="filter">
                       <dl class="filter-price">
                           <dt>Price:</dt>
                           <dd><a href="javascript:void(0)">All</a></dd>
                           <dd>
                               <a href="javascript:void(0)">0 - 100</a>
                           </dd>
                           <dd>
                               <a href="javascript:void(0)">100 - 500</a>
                           </dd>
                           <dd>
                               <a href="javascript:void(0)">500 - 1000</a>
                           </dd>
                           <dd>
                               <a href="javascript:void(0)">1000 - 2000</a>
                           </dd>
                       </dl>
                   </div>

                   <!-- search result accessories list -->
                   <!-- 商品信息列表页 -->
                   <div class="accessory-list-wrap">
                       <div class="accessory-list col-4">
                           <ul>
                               <li v-for="(item,index) in goodsList">
                                   <div class="pic">
                                       <a href="#"><img v-bind:src=" '/static/'+item.productImg " alt=""></a>
                                   </div>
                                   <div class="main">
                                       <div class="name">{{ item.productName}} </div>
                                       <div class="price">{{ item.productPrice}}</div>
                                       <div class="btn-area">
                                           <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                       </div>
                                   </div>
                               </li>
                               <li>
                                   <div class="pic">
                                       <a href="#"><img src="static/2.jpg" alt=""></a>
                                   </div>
                                   <div class="main">
                                       <div class="name">XX</div>
                                       <div class="price">1000</div>
                                       <div class="btn-area">
                                           <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                       </div>
                                   </div>
                               </li>
                               <li>
                                   <div class="pic">
                                       <a href="#"><img src="static/3.jpg" alt=""></a>
                                   </div>
                                   <div class="main">
                                       <div class="name">XX</div>
                                       <div class="price">500</div>
                                       <div class="btn-area">
                                           <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                       </div>
                                   </div>
                               </li>
                               <li>
                                   <div class="pic">
                                       <a href="#"><img src="static/4.jpg" alt=""></a>
                                   </div>
                                   <div class="main">
                                       <div class="name">XX</div>
                                       <div class="price">2499</div>
                                       <div class="btn-area">
                                           <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                       </div>
                                   </div>
                               </li>
                           </ul>
                       </div>
                   </div>
               </div>
           </div>
       </div>
<!--页脚-->
       <nav-footer></nav-footer>
   </div>
</template>

<script>
    // 导入样式
    import './../assets/css/base.css'
    import './../assets/css/product.css'

    // 导入组件
    import NavHeader from '@/components/NavHeader'
    import Bread from '@/components/Bread'
    import NavFooter from '@/components/NavFooter'

    // 导入插件
    import axios from 'axios'

    //
    export default {
        //data是个函数，然后页面加载data组件都不会数据串用
        data(){
            return {
               goodsList: []
            }
        },

        components: {
            NavHeader,
            NavFooter,
            Bread,
        },
        mounted: function (){
            //初始化时候加载商品数据
            this.getGoodsList();
        },

        methods: {
            //加载商品数据
            getGoodsList(){
                axios.get("/goods").then(res=>{
                    var res = result.data;
                    this.goodsList = res.result;
                });
            }
        }

    }
</script>