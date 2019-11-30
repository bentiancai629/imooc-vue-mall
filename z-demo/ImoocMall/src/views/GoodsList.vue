<template>
    <div>
        商品列表
        <!-- 动态路由 router传递goodsId -->
        <!-- http://localhost:8080/#/goods/88 -->
        <span>{{ $route.params.goodsId }}</span>
        <br>
        <!-- '/goods/:goodsId/user/:name', -->
         <span>{{ $route.params.name }}</span>

        <!-- 子路由 路由跳转  绝对地址-->
        <!-- <router-link to="/goods/title">显示商品标题</router-link> -->
        <!-- <router-link to="/goods/image">显示商品图片</router-link> -->
        <router-view></router-view>
         <!-- 一级router-view -->
         <!-- <div>
             <router-view></router-view>
         </div> -->
    </div>
</template>

<script>
import HeaderComponent from 'vue'
import OtherComponent from 'vue'

export default ({
    data (){
        return {
            msg :'hi vue'
        }
    }
})
</script>
