<template>
    <div>
        <Layout>
            <div class="navBar">
                <Icon name='#left' @click="back"></Icon>
                <span class="title">编辑标签</span>
                <span class="rightIcon"></span>
            </div>
            <div class="form-wrapper">
                <Notes @updata:value='updataNotes' field-name='标签名' placeholder="请输入标签名" :value="tag.name"/>
            </div>
            <div class="button-wrapper">
                <Yjbutton @click="delLabel">删除标签</Yjbutton>
            </div>
        </Layout>
            
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
// import {tagList} from '@/models/tagList'
import Notes from '@/components/Money/Notes.vue';
import Yjbutton from '@/components/Button.vue'
//import store from '@/store/index2'
@Component({
    components: {Notes,Yjbutton},
    // computed:{
    //     tag(){
    //         return this.$store.state.currentTag
    //     }
    // }
  })
export default class EditLabel extends Vue{
    //tag?:{id:string,name:string}=undefined
    get tag(){
        return this.$store.state.currentTag
    }
    created() {
        const id = this.$route.params.id
        // tagList.fetch()
        // let tags=tagList.data;
        // let tags = window.tagList
        // let tag = tags.filter(tag=>tag.id===id)[0]
        // let tag = window.findTag(id)
        //let tag = store.findTag(id)
        //let tag=this.$store.findTag(id)
        this.$store.commit('tagFetch') //解决当前页面刷新问题
        this.$store.commit('findTag',id)
        // if(this.tag){
        //     this.tag=this.tag

        // }else{
        //     this.$router.replace('/404')
        // }
        if(!this.tag){
            this.$router.replace('/404')
        }
    }
    updataNotes(notes:string){
        if(this.tag){
            // tagList.updata(this.tag.id,notes)
            // window.updataTag(this.tag.id,notes)
            this.$store.commit('updataTag',{id:this.tag.id,name:notes})
            //this.$store.updataTag(this.tag.id,notes)
        }
    }
    delLabel(){
        if(this.tag){
            this.$store.commit('removeTag',this.tag.id)
            // if(tagList.remove(this.tag.id)){
            //     this.$router.back()
            // }
            // if(window.removeTag(this.tag.id)){
            //     this.$router.back()
            // }else{
            //     alert('删除失败')
            // }
            // if(this.$store.removeTag(this.tag.id)){
            //     this.$router.back()
            // }else{
            //     alert('删除失败')
            // }
        }
        
    }
    back(){
        this.$router.back()
    }
}
</script>

<style lang='scss' scoped>
    .navBar {
        text-align: center;
        font-size: 16px;
        padding: 12px 16px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > .leftIcon {
        width: 24px;
        height: 24px;
        }
        > .rightIcon {
        width: 24px;
        height: 24px;
        }
    }
    .form-wrapper{
        background: white;
        margin-top: 8px;
    }
    .button-wrapper{
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
</style>