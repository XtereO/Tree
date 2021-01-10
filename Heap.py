class Heap():
    items=[]
    def showMax(self):
        if len(self.items)==0:
            return None
        print(self.items[0])
        return(self.items[0])
    def addItem(self,value):
        #AddValue and DoIndentification
        self.items.append(value)
        curId=len(self.items)-1
        parId=((curId-1)//2) 
        
        #Do balance 
        while(curId>0 and self.items[parId]<self.items[curId]):
            
            self.items[parId],self.items[curId]=self.items[curId],self.items[parId]
            
            curId=parId
            parId=((curId-1)//2)
            
    def balanceHeap(self,curId):
        #Identification
        maxId=curId
        leftId=(2*curId)+1
        rightId=(2*curId)+2
        
        #FindMaxId
        if leftId<len(self.items) and self.items[leftId]>self.items[maxId]:
            maxId,leftId=leftId,maxId
        
        if rightId<len(self.items) and self.items[rightId]>self.items[maxId]:
            rightId,maxId=maxId,rightId
        
        #Swop
        self.items[curId],self.items[maxId]=self.items[maxId],self.items[curId]
        
        #RecursionKey
        if curId!=maxId:
            self.balanceHeap(maxId)
    def getMax(self):
        #Take MaxElement
        result=self.items[0]
        
        #SwopLastElementWithFirst
        lastItem=self.items[-1]
        self.items[0]=lastItem
        
        #DeleteLastElement
        self.items.pop(-1)
        
        #CheckOnExistItems
        if len(self.items)!=0:
            #BalanceHeap
            self.balanceHeap(0)
        
        return result
    
    def heapSort(self,l):
        
        #FillHeap
        for a in l:
            self.addItem(a)
        
        l=[]
        
        #RealeseHeap
        for a in range(len(self.items)):
            l.append(self.getMax())
        
        newL=[]
        
        #Reverse
        for a in range(len(l)-1,-1,-1):
            newL.append(l[a])
        
        return newL
        
heap=Heap()
l=[23,13,54,342,76,54]
print(heap.heapSort(l))
            