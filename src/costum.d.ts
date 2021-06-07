type RecordType = {
    tags:string[],
    notes:string,
    type:string,
    amount:number,
    time?:string //除了写七种数据类型，还可以写类
  }
type Tag = {
  id:string;
  name:string;
}
type TagListModel={
    data:Tag[];
    fetch:()=>Tag[];
    create:(name:string)=>string;//成功：success 内容重复：duplicated 如果只有两种可以写成联合类型 'success'|'duplicated' 这样前台拼错，可以捕获错误
    updata:(id:string,name:string)=>'success'|'not found'|'duplicated';
    remove:(id:string)=>boolean;
    save:()=>void;
}
// interface Window {
//   tagList:Tag[],
//   createTag:(name:string)=>void,
//   removeTag:(id:string)=>boolean,
//   // updataTag:(id:string,name:string)=>'success'|'not found'|'duplicated';//类型一致 可以简写成下面的
//   updataTag:TagListModel['updata'],
//   findTag:(id:string)=>Tag,
//   recordList:RecordType[],
//   createRecord:(record:RecordType)=>void,
//   saveRecord:()=>void
// }
interface Window {
  store:{
    tagList:Tag[],
    createTag:(name:string)=>void,
    removeTag:(id:string)=>boolean,
    // updataTag:(id:string,name:string)=>'success'|'not found'|'duplicated';//类型一致 可以简写成下面的
    updataTag:TagListModel['updata'],
    findTag:(id:string)=>Tag,
    recordList:RecordType[],
    createRecord:(record:RecordType)=>void,
    saveRecord:()=>void
  }
}
type rootState={
  tagList:Tag[],
  recordList:RecordType[],
  currentTag?:Tag,
  createTagError:Error|null
}