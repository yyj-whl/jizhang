<template>
  <div class="numberPad">
    <div class="output" >{{output||'0'}}</div>
    <div class="buttons">
      <button @click="outputContent">1</button>
      <button @click="outputContent">2</button>
      <button @click="outputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="outputContent">4</button>
      <button @click="outputContent">5</button>
      <button @click="outputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="outputContent">7</button>
      <button @click="outputContent">8</button>
      <button @click="outputContent">9</button>
      <button class="ok" @click="ok">OK</button>
      <button class="zero">0</button>
      <button @click="outputContent">.</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component
export default class NumberPad extends Vue{
  output:string='';
  outputContent(e:MouseEvent){
    let button = e.target as HTMLButtonElement
    let input = button.textContent as string //或者写成 button.textContent!
    if(this.output.length>=16) return
    if(this.output==='0'){
      if(input ==='0'){
         //当结果是0 ，再输入0 还是0
      }else if('0123456789'.indexOf(input)>=-1){
        this.output = input //如果开始是0 输入任何数字，替换掉0
      }else{
        this.output += input
      }
      return
    }
    if(this.output.indexOf('.')>=0&&input==='.') return
    this.output += input
  }
  ok(){
    this.output='0'
    this.$emit('updata:value',this.output)
    this.$emit('submit',this.output)
  }
  remove(){
    this.output= this.output.slice(0,-1)
  }
  clear(){
    this.output='0'
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/assets/styles/base.scss";
  .numberPad {
    .output {
      @extend %clearFix;
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;
    }
    .buttons {
      @extend %clearFix;
      > button {
        width: 25%;
        height: 64px;
        float: left;
        background: transparent;
        border: none;
        &.ok {
          height: 64*2px;
          float: right;
        }
        &.zero {
          width: 25*2%;
        }
        $bg: #f2f2f2;
        &:nth-child(1) {
          background: $bg;
        }
        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }
        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4*2%);
        }
        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($bg, 4*3%);
        }
        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($bg, 4*4%);
        }
        &:nth-child(14) {
          background: darken($bg, 4*5%);
        }
        &:nth-child(12) {
          background: darken($bg, 4*6%);
        }
      }
    }
  }
</style>