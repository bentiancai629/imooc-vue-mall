//导入插件
import ToastComponet from './vue-toast.vue'

//静态类
let Toast = {};
//静态函数 供Vue.use找到
Toast.install = function (Vue,options) {

    var opt = {
        duration:3000
    }

    for (var key in options){
        opt[key] = options[key];
    }

    Vue.prototype.$toast = function (message, option) {
        if(typeof option == 'object'){
            for (var key in option){
                opt[key] = options[key];
            }
        }

        //创建构造函数继承
        const ToastController = Vue.extend(ToastComponet);
        //New一个实例挂载到div中
        var instance = new ToastController().$mount(document.createElement("div"));

        instance.message = message;
        instance.visable = true;

        setTimeout(() => {
            instance.visable = false;
            document.body.removeChild(instance.$el);
        }, opt.duration)
    }
    Vue.prototype.$toast['show']=function(message,option){
        Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast['success']=function(message,option){
        Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast['info']=function(message,option){
        Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast['error']=function(message,option){
        Vue.prototype.$toast(message,option);
    }
}
//导出类
export default Toast;