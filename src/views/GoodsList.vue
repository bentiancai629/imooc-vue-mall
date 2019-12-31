<template>
    <div>
        <!-- 页头-->
        <nav-header></nav-header>
        <!-- 面包屑-->

        <nav-bread>
            <!-- 插槽slot -->
            <span>Goods</span>
            <span></span>
        </nav-bread>
        <!-- 其他 -->
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a @click="sortGoods" href="javascript:void(0)" class="price">Price
                        <!--     升降序箭头                       -->
                        <svg class="icon icon-arrow-short" v-bind:class="{ 'sort-up':!sortFlag}">
                            <use xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <!-- 响应式弹出价格区间 -->
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <!-- 价格区间过滤 增加弹出的响应式样式-->
                    <div class="filter stopPop" id="filter" v-bind:class="{ 'filterby-show':filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
<!--                            <dd><a href="javascript:void(0)" v-bind:class="{'cur': priceChecked=='all'}"  @click=" priceChecked='all' ">All</a></dd>-->
                            <dd><a href="javascript:void(0)" v-bind:class="{'cur': priceChecked=='all'}"  @click=" setPriceFilter('all') ">All</a></dd>
                            <!-- 价格区间v-for循环  事件：判断价格区间-->
                            <dd v-for="(price,index) in priceFilter" :key="index">
                                <!-- cur判断选择哪一项 -->
                                <a href="javascript:void(0)" v-bind:class="{'cur': priceChecked==index}" @click=" setPriceFilter(index) "> {{ price.startPrice }} - {{ price.endPrice }}
                                </a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <!-- 商品信息列表页 -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item, index) in goodsList" :key="index">
                                    <div class="pic">
                                        <!-- 模板格式 -->
                                        <!-- <a href="#"><img src="static/mi6.jpg" alt=""></a> -->

                                        <!-- v-for -->
                                        <!-- <a href="#"><img v-bind:src=" 'static/' + item.productImg " alt=""></a> -->

                                        <!-- 懒加载 -->
                                        <a href="#"><img v-lazy=" 'static/' + item.productImage " alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{ item.productName}}</div>
                                        <div class="price">{{ item.salePrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                                <<img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- &lt;!&ndash; filterby遮罩 通过控制v-show的布尔值控制弹出 &ndash;&gt;-->
            <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        </div>

        <!--模态框 父子组件通信-->
        <modal v-bind:mdShow="mdShow" @click="closeModal">
            <!--Modal中的slot-name对应-->
            <p slot="message">
                请先登陆 否则无法加入到购物车中！
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="mdShow=false">关闭</a>
            </div>
        </modal>

        <!--加入购物车成功模态框-->
        <modal v-bind:mdShow="mdShowCart" @click="closeModal">
            <!--Modal中的slot-name对应-->
            <p slot="message">
                <svg class="icon-status-ok">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                <span>加入到购物车成功!</span>
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="mdShowCart=false">继续购物</a>
                <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
            </div>
        </modal>

        <!--页脚-->
        <nav-footer></nav-footer>
    </div>
</template>

<style>
    /*排序箭头*/
    .sort-up{
        transform: rotate(180deg);
        transition:all .3s ease-out;
    }
    /*切换购物车效果*/
    .btn:hover{
        background-color: #ffe5e6;
        transition:all .3s ease-out;
    }
</style>
<script>
    // 导入样式
    import './../assets/css/base.css'
    import './../assets/css/product.css'

    // 导入组件
    import NavHeader from '@/components/NavHeader'
    import NavBread from '@/components/NavBread'
    import NavFooter from '@/components/NavFooter'
    import Modal from '@/components/Modal'
    // 导入插件
    import axios from 'axios'

    export default {
        //data是个函数，然后页面加载data组件都不会数据串用
        data() {
            return {
                //商品数据
                goodsList: [],
                page: 1,
                pageSize:8,
                //价格区间
                priceFilter: [
                    {
                        startPrice: '0.00',
                        endPrice: '100.00'
                    },
                    {
                        startPrice: '100.00',
                        endPrice: '500.00'
                    },
                    {
                        startPrice: '500.00',
                        endPrice: '1000.00'
                    },
                    {
                        startPrice: '1000.00',
                        endPrice: '5000.00'
                    }
                ],
                // 是否默认选中价格区间
                priceChecked: 'all',
                // 响应式弹窗
                filterBy: false,
                // 懒加载
                overLayFlag: false,
                sortFlag: true,
                busy: true,
                loading:false,
                mdShow:false,
                mdShowCart:false
            }
        },

        components: {
            NavHeader,
            NavFooter,
            NavBread,
            Modal
        },
        mounted: function () {
            //初始化时候加载商品数据
            this.getGoodsList();
        },

        methods: {
            //加载商品数据 flag判断是否第一次初始化 配合滚动条
            getGoodsList(flag) {
                //加载时的分页参数
                let param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag?1:-1,
                    priceLevel: this.priceChecked,
                };
                this.loading = true;
                //查询商品列表
                axios.get("/goods/list",{
                    params:param
                }).then(response => {
                    let res = response.data;
                    this.loading = false;
                    if (res.status == "0") {
                        //判断是否需要累加 默认flag是false
                        if(flag){
                            //需要商品信息累加
                            this.goodsList = this.goodsList.concat(res.result.list);
                            //商品信息无剩余信息 禁用
                            if(res.result.count==0){
                                this.busy = true;
                            }else {
                                this.busy = false;
                            }
                        }else {
                            //第一次默认是填充数据 然后启动滚动条
                            this.goodsList = res.result.list;
                            this.busy = false;
                        }
                    }else {
                        this.goodsList = [];
                    }
                });
            },

            //排序 取反
            sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },

            //滚动条
            loadMore(){
                this.busy = true;
                setTimeout(() => {
                    this.page ++;
                    this.getGoodsList(true);
                }, 1000)
            },

            // 响应式弹出价格区间
            showFilterPop() {
                this.filterBy = true;
                this.overLayFlag = true;
            },

            //控制遮罩
            setPriceFilter(index) {
                this.priceChecked = index;
                this.closePop();
                this.getGoodsList(false);
            },

            //关闭遮罩
            closePop() {
                this.filterBy = false;
                this.overLayFlag = false;
            },

            //加入购物车
            addCart(productId){
                axios.post('/goods/addCart',{
                    productId:productId
                }).then((response)=>{
                        //请求成功
                    let res = response.data;
                    if(res.status=='0'){
                        // alert("加入购物车成功: ");
                        this.mdShowCart = true;
                        this.$store.commit("initCartCount",res.result);
                    }else {
                        // alert("加入购物车失败: "+res.data.msg);
                        this.mdShow = true; //变量通过modal传递到主键
                    }
                });
            },

            //关闭模态框
            closeModal(){
                this.mdShow =false;
            }
        }
    }
</script>