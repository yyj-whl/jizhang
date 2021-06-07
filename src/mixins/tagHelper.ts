import Vue from 'vue'
import Component from 'vue-class-component'
const map:{[key:string]:string}={
  'tag name duplicated':'标签名不能重复'
}
@Component
export class tagHelper extends Vue {
  creatTag(){
    const name=window.prompt('请输入标签名') as string;
    if(name===null)return
    if(name===''){
      window.alert('标签名不能为空')
    }else{
      this.$store.commit('createTag',name)
      // if(this.$store.state.createTagError){
      //   window.alert(this.$store.state.createTagError.message)
      // }
      if(this.$store.state.createTagError){
        window.alert(map[this.$store.state.createTagError.message]||'未知错误')
      }
    }
  }
}