
// list转成字符串数组
function listToString(l) {
  let res = '['
  while (l) {
    res += l.val + ', '
    l = l.next
  }
  res += ']'
  return res
}

// 数组转成链表
function arrayToList(arr) {
  let res = new ListNode(-1)
  let cur = res
  for (let item of arr) {
    let node = new ListNode(item)
    cur.next = node
    cur = cur.next
  }
  return res.next
}

// 链表定义
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

// 模拟堆结构
class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn
    this.queue = []
  }

  push(item) {
    this.queue.push(item)

    // 上浮
    let index = this.size() - 1 // 推入的元素下标
    let parent = Math.floor((index - 1) / 2) // 父节点下标

    while (parent >= 0 && this.compare(parent, index) > 0) {
      [this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]]

      // 更新下标
      index = parent
      parent = Math.floor((index - 1) / 2)
    }

  }

  // 获取堆顶元素并移除
  pop() {
    // 堆顶元素
    const out = this.queue[0]

    // 移除堆顶元素，填入最后一个元素
    this.queue[0] = this.queue.pop()

    // 下沉
    let index = 0 // 记录下沉元素坐标
    let left = 1  // left是左子节点下标，left + 1是右子节点下标
    let searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left

    while (searchChild !== undefined && this.compare(index, searchChild) > 0) {
      [this.queue[index], this.queue[searchChild]] = [this.queue[searchChild], this.queue[index]];

      index = searchChild
      left = 2 * index + 1
      searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left
    }

    return out
  }

  size() {
    return this.queue.length
  }

  compare(index1, index2) {
    if (this.queue[index1] === undefined) return 1
    if (this.queue[index2] === undefined) return -1

    return this.compareFn(this.queue[index1], this.queue[index2])
  }
}

module.exports = { listToString, arrayToList, ListNode, TreeNode, Heap }