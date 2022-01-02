# 链表

链表的基本结构：
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

## 206. 反转链表 :star::fire:

[LeetCode](https://leetcode-cn.com/problems/reverse-linked-list/)

两种方式均有所优化，非常精巧。

:::: code-group
::: code-group-item 双指针
```python
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        last = None
        while head:
            # 巧用多元赋值，将head.next向后指，同时向前挪动两个指针
            head.next, head, last = last, head.next, head
        return last
```
:::
::: code-group-item 尾递归
```python
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head
        # last始终是原列表的最后一个元素
        last = self.reverseList(head.next)
        # 反转，由递归来帮助保存当前元素
        head.next.next = head
        head.next = None
        return last
```
:::
::::

## 92. 反转链表 II :star::star:

[LeetCode](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

:::: code-group
::: code-group-item 递归
```python
class Solution:
    def reverseBetween(self, head: ListNode, left: int, right: int) -> ListNode:
        if left is 1:
            return self.reverseN(head, right)
        # 向前前进，直到left为1时，开始执行对前(right-left+1)个元素的反转
        head.next = self.reverseBetween(head.next, left - 1, right - 1)
        return head

    def reverseN(self, head: ListNode, n: int) -> ListNode:
        # 当n为1时，当前为断开点，需要保存下一节点以便续接
        if n is 1:
            self.restore = head.next
            return head
        # 先前前进，直到n为1
        last = self.reverseN(head.next, n - 1)
        head.next.next = head
        # 每次都把当前节点和断开位置相连，若递归未完成，上一行会在外层重写当前节点的next
        head.next = self.restore
        return last
```
:::
::: code-group-item 正向指针
```python
class Solution:
    def reverseBetween(self, head: ListNode, left: int, right: int) -> ListNode:
        # 向链表前面添加一个空元素
        head = front = ListNode(None, head)
        # 让front向后走走到left左侧，当left为1即不动
        index = 1
        while index < left:
            front = front.next
            index += 1
        # 双指针走法
        last, p = None, front.next
        # 直到index为right时，last刚好在right处，p则在右侧一个位置
        while index <= right:
            p.next, p, last = last, p.next, p
            index += 1
        # 将反转后的末尾的next指向p
        front.next.next = p
        # 将front.next指向反转后的头
        front.next = last
        return head.next
```
:::
::: code-group-item 复杂指针逻辑
```python
class Solution:
    def reverseBetween(self, head: ListNode, left: int, right: int) -> ListNode:
        # 向链表前面添加一个空元素
        head = front = ListNode(None, head)
        # 让front向后走走到left左侧，当left为1即不动
        index = 1
        while index < left:
            front = front.next
            index += 1
        # p指向left处，通过不断挪动front来达成
        p = front.next
        while index < right:
            # q始终随着p.next往后走
            q = p.next
            # 将p.next指向q的后一个元素
            p.next = q.next
            # 将q.next指向front.next
            q.next = front.next
            # front.next始终跟随q
            front.next = q
            index += 1
        return head.next
```
:::
::::