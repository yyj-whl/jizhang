import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from './components/Nav.vue'
import Layout from './components/Layout.vue'
import Icon from './components/Icon.vue'
import {tagList} from '@/models/tagList'
import {model} from '@/models/recordList'
Vue.config.productionTip = false
Vue.component('Nav',Nav)
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)
//全局变量太多
//过度依赖window
//标签记录
// window.tagList = tagList.fetch();
// window.createTag=(name:string)=>{
//     let createNum=tagList.create(name) //写进了tagList里面  //最小知识点
//     if(createNum==='success'){
//       window.alert('创建成功')
//     }
//     if(createNum==='duplicated'){
//       window.alert('内容重复')
//     }
// }
// window.findTag=(id:string)=>{
//   return window.tagList.filter(tag=>tag.id===id)[0]
// }
// window.removeTag=(id:string)=>{
//   // if(tagList.remove(id)){
//   //   return true
//   // }else{
//   //   return false
//   // }
//   return tagList.remove(id)
// }
// window.updataTag=(id:string,name:string)=>{
//   return tagList.updata(id,name)
// }
// //记账记录
// window.recordList=model.fetch()
// window.createRecord=(record:RecordType)=>{
//   model.createRecordList(record)
// }
// window.saveRecord=()=>{
//   model.save()
// }

//消除对window的依赖
// window.store={
//   tagList : tagList.fetch(),
//   createTag:(name:string)=>{
//     let createNum=tagList.create(name) //写进了tagList里面  //最小知识点
//     if(createNum==='success'){
//       window.alert('创建成功')
//     }
//     if(createNum==='duplicated'){
//       window.alert('内容重复')
//     }
//   },
//   findTag:(id:string)=>{
//     return window.store.tagList.filter(tag=>tag.id===id)[0]
//   },
//   removeTag:(id:string)=>{
//     return tagList.remove(id)
//   },
//   updataTag:(id:string,name:string)=>{
//     return tagList.updata(id,name)
//   },
//   recordList:model.fetch(),
//   createRecord:(record:RecordType)=>{
//     model.createRecordList(record)
//   },
//   saveRecord:()=>{
//     model.save()
//   }
// }
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.onload=function(){setTimeout(function() {window.scrollTo(0, 10000)}, 0)}