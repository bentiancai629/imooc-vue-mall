<template>
    <div>
        商品列表
        <!-- 动态路由 router传递goodsId -->
        <!-- http://localhost:8080/#/goods/88 -->
        <span>{{ $route.params.goodsId }}</span>
        <br>
        <!-- '/goods/:goodsId/user/:name', -->
         <span>{{ $route.params.name }}</span>
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
