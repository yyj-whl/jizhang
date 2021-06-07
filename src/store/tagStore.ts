import createId from '@/lib/idcreator'
const localStorageKey='tagKey'
const tagStore= {
    tagList:[] as Tag[],
    createTag(name:string){
      let names= this.tagList.map(item=>item.name)
      if(names.indexOf(name)>=0) {
        window.alert('标签名重复了')
        return 'duplicated'
      }
      const id=createId().toString()
      this.tagList.push({id,name:name});
      this.saveTags();
      window.alert('添加成功');
      return 'success'
    },
    saveTags(){
      window.localStorage.setItem(localStorageKey,JSON.stringify(this.tagList))
    },
    tagFetch(){
        this.tagList=JSON.parse(window.localStorage.getItem(localStorageKey)||'[]')
        return this.tagList;
    },
    findTag(id:string){
      return this.tagList.filter(tag=>tag.id===id)[0]
    },
    removeTag(id:string){
      const index = this.tagList.findIndex(item=>item.id===id)
        this.tagList.splice(index,1)
        this.saveTags();
        return true
    },
    updataTag(id:string,name:string){
      let _idlist=this.tagList.map(item=>item.id)
        if(_idlist.indexOf(id)>=0){
            const names=this.tagList.map(item=>item.name)
            if(names.indexOf(name)>=0){
                return 'duplicated'
            }else{
                const tag = this.tagList.filter(item=>item.id===id)[0]
                tag.name=name
                this.saveTags()
                return 'success'
            }
            
        }else{
            return 'not found'
        }
    }
}
tagStore.tagFetch()
export default tagStore