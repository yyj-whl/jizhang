<template>
    <div>
        <Layout>
            <div class="tags" >
                <router-link 
                  v-for="tag in tags" 
                  :key="tag.id" 
                  :to='`/labels/edit/${tag.id}`'
                  class="tag"
                ><span>{{tag.name}}</span><Icon name='#right'></Icon></router-link>
            </div>
             <div class="createTag-wrapper">
                <Yjbutton @click="creatTag">新建标签</Yjbutton>
            </div>
        </Layout>
    </div>
</template>

<script lang="ts">
    // import Vue from 'vue'
    import {Component} from 'vue-property-decorator'
    // import {tagList} from '@/models/tagList'
    import Yjbutton from '@/components/Button.vue'
    // import store from '@/store/index2'
    import { mixins } from 'vue-class-component'
    import {tagHelper} from '@/mixins/tagHelper'
    @Component({
      components:{Yjbutton},
      computed:{
        tags(){
          return this.$store.state.tagList
        }
      }
    })
    export default class Label extends mixins(tagHelper){
        // tags=window.tagList; //在window里读
        //tags=store.tagList;
        created() {
          this.$store.commit('tagFetch')
        }
        //createTag(){
            // const name=window.prompt('请输入标签名') as string;
            // //console.log(name)
            // if(name===null)return
            // if(name===''){
            //     window.alert('标签名不能为空')
            // }else{

            //     console.log('创建新标签',name)
            //    let createNum=tagList.create(name) //写进了tagList里面  //最小知识点
            //    if(createNum==='success'){
            //      window.alert('创建成功')
            //    }
            //    if(createNum==='duplicated'){
            //      window.alert('内容重复')
            //    }
            // }
        //     const name=window.prompt('请输入标签名') as string;
        //     if(name===null)return
        //     if(name===''){
        //         window.alert('标签名不能为空')
        //     }else{
        //       // window.createTag(name)
        //       //store.createTag(name)
        //       this.$store.commit('createTag',name)
        //     }

        // }
    }
</script>

<style scoped lang="scss">
   .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      svg {
        width: 18px;
        height: 18px;
        color: #666;
        margin-right: 16px;
      }
    }
  }
  .createTag-wrapper{
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
  }
</style>
