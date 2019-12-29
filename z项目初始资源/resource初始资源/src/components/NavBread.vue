<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <router-link :to="{path: '/'}" >Home</router-link>
        <slot></slot>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavBread',
}
</script>
