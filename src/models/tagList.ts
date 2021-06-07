import createId from '@/lib/idcreator'
const localStorageKey='tagKey'

const tagList:TagListModel = {
    data:[],
    fetch(){
        this.data=JSON.parse(window.localStorage.getItem(localStorageKey)||'[]')
        return this.data;
    },
    updata(id:string,name:string){
        let _idlist=this.data.map(item=>item.id)
        if(_idlist.indexOf(id)>=0){
            const names=this.data.map(item=>item.name)
            if(names.indexOf(name)>=0){
                return 'duplicated'
            }else{
                const tag = this.data.filter(item=>item.id===id)[0]
                tag.name=name
                this.save()
                return 'success'
            }
            
        }else{
            return 'not found'
        }
    },
    create(name:string){
        //this.data=[{id:'1',name:'1'}]
        let names= this.data.map(item=>item.name)
        if(names.indexOf(name)>=0) {return 'duplicated'}
        const id=createId().toString()
        this.data.push({id,name:name});
        this.save();
        return 'success'
    },
    save(){
        window.localStorage.setItem(localStorageKey,JSON.stringify(this.data))
    },
    remove(id:string){
        const index = this.data.findIndex(item=>item.id===id)
        this.data.splice(index,1)
        this.save();
        return true
    }
}
export  {tagList};
//如果想全局使用自定义类型 需要创建.d.ts文件，在该文件下声明