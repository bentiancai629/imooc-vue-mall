<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price<svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>
              <dd v-for="(price, index) in priceFilter" :key="index">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':true}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <!--<li v-for="(item, index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#"><img :src="item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.product.name}}</div>
                    <div class="price">{{item.product.price}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>-->
                <li v-for="(item, index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.productPrice}}</div>
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
      <div class="md-overlay hidden" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
  export default {
    name: 'GoodsList',
    data () {
      return {
        goodsList: [],
        priceFilter: [
          {
          startPrice: '0.00',
          endPrice: '500.00'
          },
          {
          startPrice: '500.00',
          endPrice: '1000.00'
          },
          {
          startPrice: '1000.00',
          endPrice: '2000.00'
          }
        ],
        priceChecked: "all",
        filterBy: false,
        overLayFlag: false,
        name:''
      }
    },
    mounted: function() {
      axios.get('/goods').then((response)=>{
        let res = response.data;
        if(res.status=="0"){
          this.goodsList = res.result.list;
        }else{
          this.goodsList = [];
        }
      });
    },
    components: {
      NavHeader: NavHeader,
      NavFooter: NavFooter,
      NavBread: NavBread
    },
    methods: {
      getGoodsList() {
        axios.get("/goods").then((result) => {
          var res = result.data;
          this.goodsList = res.result;
        })
      },
      showFilterPop () {
        //this.filterBy = true;
        //this.overLayFale = true;
      },
      setPriceFilter () {
        this.priceChecked = index;
        this.closePop
      },
      closePop () {
       
        //this.filterBy = false;
        //this.overLayFale = false;
       this.overLayFale = !(this.overLayFale);
      }
    }
  }
</script>

<style scoped>
  .inner {
    width: 100px;
    height: 100px;
    background: #000;

  }
</style>
