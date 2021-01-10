class Heap{
    constructor(){
        this.items=[]
    }
    addItem(value){
        //AddValue
        this.items.push(value);
        
        //Take curId and Find Parents
        let curId=(this.items.length)-1
        let parId=Math.floor((curId-1)/2)
        
        //Do balance
        while(curId>0 && this.items[curId]>this.items[parId]){
            
            let temp=this.items[curId]
            this.items[curId]=this.items[parId]
            this.items[parId]=temp
            
            curId=parId
            parId=Math.floor((curId-1)/2)
        }
    }
    
    Sort(curId){
        //Do identification
        let maxId=curId;
        let leftId=(curId*2)+1
        let rightId=(curId*2)+2
        
        //Find maxId
        if(leftId<this.items.length && this.items[maxId]<this.items[leftId]){
            let temp=maxId
            maxId=leftId
            leftId=temp
        }
        if(rightId<this.items.length && this.items[maxId]<this.items[rightId]){
            let temp=maxId
            maxId=rightId
            rightId=temp
        }
        
        //Do swop maxId and curId elements
        let temp= this.items[curId]
        this.items[curId]=this.items[maxId]
        this.items[maxId]=temp
        
        //Recursion Key
        if(curId!=maxId){
            this.Sort(maxId)
        }
        
    }
    getMax(){
        //Take max element
        let result=this.items[0]
        
        //Take last item and swop with max
        let lastItem=this.items[(this.items.length)-1]
        this.items[0]=lastItem
        this.items.pop()
        
        //CheckOnExistItems
        if(this.items.length>0){
            this.Sort(0)
        }
        
        return result
    }
    
    heapSort(l){
        //Fill Heap
        for(let key in l){
            this.addItem(l[key])
        }
        
        l=[]
        let count=this.items.length
        //RealeaseHeap
        for(let i=0;i<count;i++){
            l.push(this.getMax())
        }
        
        //Reverse
        l=l.reverse();
        return l
    }
}

let heap=new Heap()
let l=[23,64,12,34,65,83,21]
console.log(heap.heapSort(l))