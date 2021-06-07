// import {tagList} from '@/models/tagList'
// import {model} from '@/models/recordList'
import recordStore from '@/store/recordStore'
import tagStore from '@/store/tagStore'
const store={
  //store的一个bug
    count:0,
    addCount(){
      this.count+=1;
    },
    ...recordStore,
    ...tagStore
    // tagList : tagList.fetch(),
    // createTag:(name:string)=>{
    //   let createNum=tagList.create(name) //写进了tagList里面  //最小知识点
    //   if(createNum==='success'){
    //     window.alert('创建成功')
    //   }
    //   if(createNum==='duplicated'){
    //     window.alert('内容重复')
    //   }
    // },
    // findTag(id:string){
    //   return this.tagList.filter(tag=>tag.id===id)[0]
    // },
    // removeTag:(id:string)=>{
    //   return tagList.remove(id)
    // },
    // updataTag:(id:string,name:string)=>{
    //   return tagList.updata(id,name)
    // },
    // recordList:model.fetch(),
    // createRecord:(record:RecordType)=>{
    //   model.createRecordList(record)
    // },
    // saveRecord:()=>{
    //   model.save()
    // }
  }
  export default store
  