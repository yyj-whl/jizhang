<template>
  <Layout class-prefix="layout">
    <NumberPad @updata:value='updataAmount' @submit='saveRecord'/>
    <!-- <Types :propA="undefined" @updata:value='updataTypes'/> -->
    <Tabs :data-source='recordTypeList' :value.sync='record.type'/>
    <div class="yj_notes">
      <Notes @updata:value='updataNotes' field-name='备注' placeholder="请输入备注" 
      :value="record.notes"/>
    </div>
    <!-- <Tags :dataSource.sync="tags" @update:selected='updataTags'/> -->
    <Tags :selected.sync="record.tags"/>
    <!-- {{count2}} -->
    <!-- {{count}}
    <button type="text" @click="add">count+1</button> 不可以直接用 store.commit('increment') store找不到 可以用$store.commit--> 
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import NumberPad from '@/components/Money/NumberPad.vue';
  // import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Tabs from '@/components/Tabs.vue'
  import{Component} from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import {tagHelper} from '@/mixins/tagHelper'
  import recordTypeList from '@/constant/recordTypeList'; 
  // import store from '@/store/index2'
  // import storeNew from '@/store'
  //import model from '@/model.js' 不能在ts中直接import js
  //const model = require('@/model.js') //可以在ts中使用require导入js 若model中使用了 default 则需要找到model.default
  // import {model} from '@/models/recordList'
  // import {tagList} from '@/models/tagList'
  //console.log(model,tagList.fetch())
  //类型声明
  // type RecordType = {
  //   tags:string[],
  //   notes:string,
  //   type:string,
  //   amount:number,
  //   time?:Date //除了写七种数据类型，还可以写类
  // }
  @Component({
    components: { Tags, Notes,  NumberPad,Tabs},
    // computed:{
    //   // count2(){
    //   //   return storeNew.state.count
    //   // }
    //   records(){
    //     return this.$store.state.recordList
    //   }
    // }
  })
  export default class Money extends mixins(tagHelper) {
    // tags=['衣','食','住','行'];
    // tags = window.tagList;
    // 消除对window的依赖
    //测试store的bug 用computed来解决
    //count=this.$store.count
    // tags=this.$store.state.tagList
    get records (){
      return (this.$store.state as rootState).recordList
    }
    // get record(){
    //   return {
    //     tags:[],
    //     notes:'',
    //     type:'-',
    //     amount:0
    //   } as RecordType
    // }
    recordTypeList = recordTypeList;
    record:RecordType={
      tags:[],
      notes:'',
      type:'-',
      amount:0
    };
    // records:RecordType[]=model.model.fetch();
    // records:RecordType[]=model.fetch();
    // 消除对window的依赖
    // records=window.recordList
    //records=this.$store.state.recordList
    // updataTags(tags:string[]){
    //   this.record.tags=tags
    // }
    created() {
      this.$store.commit('recordFetch')
    }
    add(){
      //this.$store.addCount()
    }
    updataNotes(notes:string){
      this.record.notes=notes
    }
    updataTypes(type:string){
      this.record.type=type
    }
    updataAmount(amount:string){
      this.record.amount=parseFloat(amount)
    }
    saveRecord(){
      // const deepClone=JSON.parse(JSON.stringify(this.record))
      // model.createRecordList(this.record)
      // window.createRecord(this.record)
      // store.createRecord(this.record)
      if(this.record.tags.length===0){
        window.alert('请至少选择一个标签')
        return
      }
      this.$store.commit('createRecord',this.record)
      window.alert('保存成功')
      this.record.notes=''
      //console.log(this.records)
    }
    // @Watch('records')
    // onRecordsChange(){
    //   // model.model.save(this.records)
    //   // model.save()
    //   window.saveRecord()
    // }
  };
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .yj_notes{
    padding: 12px 0;
  }
</style>