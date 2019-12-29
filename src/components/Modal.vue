<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="closeModal">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <!--槽 组件传值的demo-->
                        <slot name="message"></slot>
                    </div>
                </div>
                <div class="btn-wrap">
                    <slot name="btnGroup"></slot>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
    </div>
</template>
<script>
    export default {
        //接受父主键的值
        props: ["mdShow"],
        data() {
            return {
                msg: 'hello modal'
            }
        },
        methods: {
            //关闭模态框
            closeModal() {
                this.$emit("close"); //通知父组件closeModal 出发事件
            }
        }
    }
</script>
