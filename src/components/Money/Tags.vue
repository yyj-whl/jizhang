<template>
  <div class="tags">
    <div class="new">
      <!-- <button @click="creatTag">新增标签</button> -->
      <button @click="creatTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="(item,index) in tags" :key='index'
        @click="toggle(item)"
        :class="{'selected':selectedTags.findIndex(tag=>tag.id===item.id)>=0}"
      >{{item.name}}</li>
      
    </ul>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component,Prop} from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import {tagHelper} from '@/mixins/tagHelper'
  //import store from '@/store/index2'
  @Component({
    computed:{
      tags(){
        return this.$store.state.tagList
      }
    }
  })
  export default class Tags extends mixins(tagHelper) {
    // @Prop(Array) readonly dataSource:string[]|undefined;
    //tags=store.tagFetch()
    selectedTags:Tag[]=[];
    created() {
      this.$store.commit('tagFetch')
    }
    toggle(value:Tag){
      const index = this.selectedTags.findIndex(item=>item.id===value.id)
      if(index>=0){
        this.selectedTags.splice(index,1)
      }else{
        this.selectedTags.push(value);
      }
      this.$emit('update:selected',this.selectedTags)
    }
    // creatTag(){
    //   const name=window.prompt('请输入标签名') as string;
    //   console.log(name)
    //   if(name===null)return
    //   if(name===''){
    //     window.alert('标签名不能为空')
    //   }else{
    //     //store.createTag(name)
    //     this.$store.commit('createTag',name)
    //     // window.createTag(name)
    //     // if(this.dataSource){
    //     //   this.$emit('update:dataSource',[...this.dataSource,{id:name,name:name}])
    //     // }
    //   }
    // }
  };
</script>

<style lang="scss" scoped>
  .tags {
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    display: flex;
    background: #fff;
    flex-direction: column-reverse;
    > .current {
      display: flex;
      flex-wrap: wrap;
      > li {
        background: #d9d9d9;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;
        &.selected{
          background: rgb(37, 18, 83,0.5);
          color: #fff;
        }
      }
    }
    > .new {
      padding-top: 16px;
      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }

</style>