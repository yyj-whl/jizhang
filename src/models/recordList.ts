import clone from '@/lib/clone'
const localStorageKey='records'
const model = {
    data:[] as RecordType[],
    clone(data:RecordType[]|RecordType){
        return JSON.parse(JSON.stringify(data))
    },
    createRecordList(record:RecordType){
        const deepClone:RecordType = clone(record)
        deepClone.time=new Date().toISOString()
        this.data.push(deepClone)
    },
    fetch(){
        this.data=JSON.parse(window.localStorage.getItem(localStorageKey)||'[]') as RecordType[];
        return this.data
    },
    save(){
        window.localStorage.setItem(localStorageKey,JSON.stringify(this.data))
    }
}
export  {model};
//如果想全局使用自定义类型 需要创建.d.ts文件，在该文件下声明