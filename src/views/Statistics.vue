<template>
    <div>
        <Layout>
            <Tabs class-prefix='type' :value.sync="tab" :dataSource="recordTypeList"/>
            <!-- <Tabs class-prefix='interval' :value.sync="day" :dataSource="days"/> -->
            <ol>
                <li v-for="(group,index) in resultList" :key='index'>
                    
                    <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
                    <ol>
                        <li v-for="item in group.items" :key='item.id' class="record">
                            <span>{{tagString(item.tags)}}</span>
                            <span class="notes">{{item.notes}}</span>
                            <span>￥{{item.amount}} </span>
                        </li>
                    </ol>
                </li>
            </ol>
            <router-link to="/money" v-if="resultList.length===0" class="nodata">
                暂无数据，去记一笔吧
            </router-link>
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import recordTypeList from '@/constant/recordTypeList'; 
    import intervalList from '@/constant/intervalList'; 
    import clone from '@/lib/clone'
    import dayjs from 'dayjs'
    @Component({
        components:{
            Tabs
        }
    })
    export default class Statistics extends Vue{
        get recordList(){
            return (this.$store.state as rootState).recordList //$store返回的是any 需要as一下
        }
        get resultList(){
            // let hasList:{[key:string]:{title:string,items:RecordType[]}}={}
            // for(let i=0;i<this.recordList.length;i++){
            //     //console.log(this.recordList[i].time)
            //     let [date,clock]=this.recordList[i].time!.split('T')
            //     console.log(date,clock)
            //     hasList[date]=hasList[date]||{title:date,items:[]}
            //     hasList[date].items.push(this.recordList[i])
            // }
            // return hasList
            //排序
            type hasItem={title:string,total?:number,items:RecordType[]} //不小心把string写成了String报错No overload matches this call。
            if(this.recordList.length===0) return [] as hasItem[];
            let cloneRecordList=clone(this.recordList)
                .filter(r => r.type === this.tab)
                .sort((a,b)=>dayjs(b.time).valueOf()-dayjs(a.time).valueOf()) //按时间排序
            if(cloneRecordList.length===0) return [] as hasItem[];
            let hasList:hasItem[]=[{title: dayjs(cloneRecordList[0].time).format('YYYY-MM-DD'),items: [cloneRecordList[0]]}];//先把第一项放进去
            for (let i = 1; i < cloneRecordList.length; i++) {
                const current = cloneRecordList[i];
                const last = hasList[hasList.length - 1];
                if (dayjs(last.title).isSame(dayjs(current.time), 'day')) {
                    last.items.push(current);
                } else {
                    hasList.push({title: dayjs(current.time).format('YYYY-MM-DD'), items: [current]});
                }
            }
            hasList.map(group => {
                group.total = group.items.reduce((sum, item) => {
                    // console.log(sum);
                    // console.log(item);
                    return sum + item.amount;
                }, 0);
            });
            return hasList

        }
        tab='-';
        day='day'
        recordTypeList=recordTypeList
        days=intervalList
        created() {
           this.$store.commit('recordFetch') 
        }
        tagString(tags:Tag[]){
            return tags.length === 0 ? '无' : tags.map(item=>item.name).join(',');
        }
        beautify(time:string){
            //时间和今天相同 显示今天
            //不用day.js
            // let d=new Date(Date.parse(time))
            // console.log(d)
            // let y=d.getFullYear()
            // let m=d.getMonth()
            // let dd=d.getDay()
            // let now = new Date()
            // if(now.getFullYear()===y&&now.getMonth()===m&&now.getDay()===dd){
            //     return '今天'
            // }else{
            //     return time
            // }
            //若用day.js subtract 减去指定时间
            const day = dayjs(time)
            const now = dayjs()
            if(day.isSame(now,'day')){
                return '今天'
            }else if(day.isSame(now.subtract(1,'day'),'day')){
                return '昨天'
            }else if(day.isSame(now.subtract(2,'day'),'day')){
                return '前天'
            }else if(day.isSame(now,'year')){
                return day.format('M月D日')
            }
            else{
                return day.format('YYYY年M月D日')
            }

        }
    }
</script>

<style scoped lang="scss">
  ::v-deep { //在scoped的情况下，改变里面元素的样式
    .type-tabs-item {
      background: #C4C4C4;
      &.selected {
        background: white;
        &::after {
          display: none;
        }
      }
    }
    .interval-tabs-item {
      height: 48px;
    }
  }
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
  .nodata{
      text-align: center;padding: 50px 0 50px;display: block;color: #f7b11b;
  }
</style>