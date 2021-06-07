import clone from '@/lib/clone'
const localStorageKey='records'
const recordStore={
    recordList:[] as RecordType[],
    recordFetch(){
        this.recordList=JSON.parse(window.localStorage.getItem(localStorageKey)||'[]') as RecordType[];
        return this.recordList
    },
    createRecord(record:RecordType){
      const deepClone:RecordType = clone(record)
        deepClone.time=new Date().toISOString()
        this.recordList&&this.recordList.push(deepClone)
        // this.recordList?.push(deepClone) //最新语法，结果同上
        recordStore.saveRecord();
    },
    saveRecord(){
      window.localStorage.setItem(localStorageKey,JSON.stringify(this.recordList))
    }
}
recordStore.recordFetch();
export default recordStore