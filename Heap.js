class Heap {
  constructor() {
    this.items = [];
  }
  addItem(value) {
    this.items.push(value);
    let curId = this.items.length - 1;
    let parId = Math.floor((curId - 1) / 2);
    while (curId > 0 && this.items[curId] > this.items[parId]) {
      [this.items[curId], this.items[parId]] = [
        this.items[parId],
        this.items[curId],
      ];
      curId = parId;
      parId = Math.floor((curId - 1) / 2);
    }
  }

  sort(curId) {
    let maxId = curId;
    let leftId = curId * 2 + 1;
    let rightId = curId * 2 + 2;

    if (leftId < this.items.length && this.items[maxId] < this.items[leftId]) {
      [maxId, leftId] = [leftId, maxId];
    }
    if (
      rightId < this.items.length &&
      this.items[maxId] < this.items[rightId]
    ) {
      [maxId, rightId] = [rightId, maxId];
    }

    [this.items[curId], this.items[maxId]] = [
      this.items[maxId],
      this.items[curId],
    ];
    if (curId != maxId) {
      this.sort(maxId);
    }
  }
  getMax() {
    const result = this.items[0];
    const lastItem = this.items[this.items.length - 1];
    this.items[0] = lastItem;
    this.items.pop();

    if (this.items.length > 0) {
      this.sort(0);
    }
    return result;
  }

  heapSort(l) {
    let result = [];
    l.forEach((e) => this.addItem(e));
    for (let i = 0; i < l.length; i++) {
      result.push(this.getMax());
    }
    return result.reverse();
  }
}

let heap = new Heap();
let l = [23, 64, 12, 34, 65, 83, 21];
console.log(heap.heapSort(l));
