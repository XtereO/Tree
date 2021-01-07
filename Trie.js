class Node{
    constructor(value,behavior=0){
        this.value=value
        this.behavior=behavior
        this.childs=[]
    }
}
class Trie{
    constructor(){
        this.root=new Node("")
    }
    
    AddNode(curNode,value,behavior=0){
        if(curNode.childs.length===0){
            curNode.childs.push(new Node(value,behavior))
            return "AddSuccessfull"
        }
        
        //CheckOnCopy
        let check=1
        for(let key in curNode.childs){
            if(curNode.childs[key].value===value){
                check=0
            }
        }
        
        //CheckSuccessfull
        if(check===1){
            curNode.childs.push(new Node(value,behavior))
        }
    }
    AddWord(curNode,word){
    
        if (word.length===1){
            this.AddNode(curNode,word,1)
            return "Add Successfull"
        }
        
        this.AddNode(curNode,word[0])
        
        for (let key in curNode.childs){
            if(curNode.childs[key].value===word[0]){
                this.AddWord(curNode.childs[key],word.slice(1))
            }
        }
    }
    RemoveWord(curNode,word){
      if (word.length===0){
            console.log(curNode)
            curNode.behavior=0
            return "Remove Successfull"
        }
        
        for (let key in curNode.childs){
            if(curNode.childs[key].value===word[0]){
                this.RemoveWord(curNode.childs[key],word.slice(1))
            }
        }  
    }
    
    Search(curNode,word){
        for(let key in curNode.childs){
            if(curNode.childs[key].value===word[0]){
                if(curNode.childs[key].behavior===1){
                    return true
                }
                else{
                    return (this.Search(curNode.childs[key],word.slice(1)))
                }
            }
        }
        return false
    }
    
    Support(curNode,word){
        if (curNode.behavior==1){
            console.log("Did you mean: "+word)
            return word
        }
        for(let key in curNode.childs){
            let neWord=word+curNode.childs[key].value
            return this.Support(curNode.childs[key],neWord)
        }
        return false
    }
    Mean(curNode,word,orig=word){
        if ((word.length===1) && (curNode.behavior===1)){
            console.log("Did you Mean:"+orig)
            return true
        }
        if (word.length===0){
            return this.Support(curNode,orig)
        }
        
        for(let key in curNode.childs){
            if(word[0]===curNode.childs[key].value){
                return this.Mean(curNode.childs[key],word.slice(1),orig)
            }
        }
        return false
    }
}

trie=new Trie()

trie.AddWord(trie.root,"hello")
trie.AddWord(trie.root,"help")
trie.AddWord(trie.root,"javascript")
trie.AddWord(trie.root,"jax")
trie.RemoveWord(trie.root,"jax")
console.log(trie.Mean(trie.root,"jax"))
