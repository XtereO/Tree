class Node():
    def __init__(self,value,behavior):
        self.value=value
        self.behavior=behavior
        self.childs=[]
class Trie():
    
    root=Node("",0)
    
    def AddNode(self,curNode,value,behavior):
        if len(curNode.childs)==0:
            curNode.childs.append(Node(value,behavior))
            pass
        for a in curNode.childs:
            if a.value!=value:
                curNode.childs.append(Node(value,behavior))
        
    def AddWord(self,curNode,word):
        if len(word)==1:
            self.AddNode(curNode,word[0],1)

        elif len(word)!=0:
            self.AddNode(curNode,word[0],0)
            for a in range(len(curNode.childs)):
                if curNode.childs[a].value==word[0]:
                    self.AddWord(curNode.childs[a],word[1:])
            
    def Search(self,curNode,word):
        if len(word)==0:
            return True
        for a in curNode.childs:
            if word[0]==a.value:
                return self.Search(a,word[1:])
        return False
    
    def Remove(self,curNode,word):
        if len(word)==0:
            curNode.behavior=0
        elif len(word)!=0:
            for a in range(len(curNode.childs)):
                if curNode.childs[a].value==word[0]:
                    self.Remove(curNode.childs[a],word[1:])
       
    def Support(self,curNode,word):
        if curNode.behavior==1:
                return (word+a.value)
        if len(curNode.childs)==0:
            return "Are you sure right write?"
        curNodes=curNode.childs
        for a in curNodes:
            if a.behavior==1:
                return (word+a.value)
            else:
                return self.Support(a,word+a.value)
    def Mean(self,curNode,word,orig):
        if len(word)==0:
            return self.Support(curNode,orig)
        for a in curNode.childs:
            if a.behavior==1 and len(word)==1:
                return orig
            if word[0]==a.value:
                return self.Mean(a,word[1:],orig)
        return "Are you sure right write?"

trie=Trie()
trie.AddWord(trie.root,"python")
trie.AddWord(trie.root,"pylot")
trie.AddWord(trie.root,"privat")
trie.AddWord(trie.root,"HelloWorld")
trie.Remove(trie.root,"pylot")
word=input("What are you search?")
print("Did you mean: "+(trie.Mean(trie.root,word,word)))
    