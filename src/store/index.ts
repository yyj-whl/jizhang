import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/idcreator'
import router from '@/router'
//import tagStore from './tagStore'
Vue.use(Vuex) //把store 绑到Vue.propotype上 Vue.propotype.$store=store

 const store = new Vuex.Store({
  state: { //data
    // count:1
    tagList:[],
    recordList:[],
    createTagError:null,
    currentTag:undefined
  } as rootState,
  mutations: {//methods 同步方法
    // increment(state,payload){
    //   state.count+=payload //没有this，默认返回state
    // }
    tagFetch(state){
      state.tagList=JSON.parse(window.localStorage.getItem('tagKey')||'[]')
      if(!state.tagList||state.tagList.length===0){
        store.commit('createTag','衣')
        store.commit('createTag','食')
        store.commit('createTag','住')
        store.commit('createTag','行')
      }
    },
    findTag(state,id:string){
       state.currentTag=state.tagList.filter(tag=>tag.id===id)[0]
    },
    saveTags(state){
      window.localStorage.setItem('tagKey',JSON.stringify(state.tagList))
    },
    createTag(state,name:string){
      state.createTagError=null
      let names= state.tagList.map(item=>item.name)
      if(names.indexOf(name)>=0) {
        //window.alert('标签名重复了')
        state.createTagError=new Error('tag name duplicated')
        return
      }
      const id=createId().toString()
      state.tagList.push({id,name:name});
      store.commit('saveTags')
      //window.alert('添加成功');
    },
    updataTag(state,payload:{id:string,name:string}){
      let _idlist=state.tagList.map(item=>item.id)
        if(_idlist.indexOf(payload.id)>=0){
            const names=state.tagList.map(item=>item.name)
            if(names.indexOf(payload.name)>=0){
                window.alert('标签名重复了')
            }else{
                const tag = state.tagList.filter(item=>item.id===payload.id)[0]
                tag.name=payload.name
                store.commit('saveTags')
                window.alert('修改成功')
            }
            
        }
    },
    removeTag(state,id:string){
      const index = state.tagList.findIndex(item=>item.id===id)
      if(index!=-1){
        state.tagList.splice(index,1)
        store.commit('saveTags')
        router.back() //拿不到this 引用一次router
      }else{
        window.alert('删除失败')
      }
        
    },
    //record
    recordFetch(state){
      state.recordList=JSON.parse(window.localStorage.getItem('records')||'[]') as RecordType[];
    },
    createRecord(state,record:RecordType){
      const deepClone:RecordType = clone(record)
        deepClone.time=new Date().toISOString()
        state.recordList&&state.recordList.push(deepClone)
        // this.recordList?.push(deepClone) //最新语法，结果同上
        //recordStore.saveRecord();
        store.commit('saveRecord')
    },
    saveRecord(state){
      window.localStorage.setItem('records',JSON.stringify(state.recordList))
    }
  },
  actions: { //异步操作 调用method
  },
  modules: {
  }
})
//console.log(store.state.count)
// store.mutations.increment(store.state) 这样拿不到state
//store.commit('increment',10) //调用方法 函数名叫type 参数叫payload
//console.log(store.state.count)
export default store
//vuex 原理 数据读写工具
// 所有computed在@component写，在函数里读取不到，需要用get set方法做
