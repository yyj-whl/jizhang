<template>
  <div>
    <ul class="types">
      <!-- <li :class="type==='-'&&'selected'" @click="changeType('-')">支出</li> -->
      <li :class="{selected:type==='-',[classPrefix+'-item']:classPrefix}" @click="changeType('-')">支出</li>
      <!-- 有变量用中括号来写 -->
      <li :class="type==='+'&&'selected'" @click="changeType('+')">收入</li>
    </ul>
  </div>
</template>
<script lang='ts'>
  //提示更智能
  //不能随便写toString
  //编译时报错
  import Vue from 'vue'
  import {Component,Prop,Watch} from 'vue-property-decorator'
  @Component
  export default class Types extends Vue {
    type:string='-';
    @Prop (Number) propA:number|undefined;
    @Prop (String) classPrefix?:string;
    //Prop 告诉变量是prop不是data
    //Number 告诉Vue 变量是Number 必须大写，vue规定（运行时，在浏览器能报错）
    //属性名
    //number|undefined 告诉TS propA的类型（编译时，在编辑器报错）
    @Watch('type')
    onTypeChange(newVal:string){
      this.$emit('updata:value',newVal)
    }
    changeType(type:string){
      if(type!=='-'&&type!=='+'){
          throw new Error('type is unknown')
        }
        this.type=type
    }
    mounted() {
      //如果上边定义了undefined 必须做检查
      if(this.propA===undefined){
        console.log('undefined')
      }else{
        console.log(this.propA.toString(),5555)
      }
      
    }
  }
  // ts必须用class data 生命周期 methods可以直接写 npm查看最新版本npm info typescript -version
</script>
<style lang="scss" scoped>
  .types {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;
    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }

</style>