# 数组与链表

## 两数之和

给定一个整数数组`nums`和一个整数目标值`target`，请你在该数组中找出和为目标值`target` 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

::: details 解答

利用哈希表做额外存储。
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hash = {}
        for i, n in enumerate(nums):
            v = target - n
            if v in hash:
                return [i, hash[v]]
            else:
                hash[n] = i
```

:::

## 有效的括号

给定一个只包括 `(`，`)`，`{`，`}`，`[`，`]` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：
* 左括号必须用相同类型的右括号闭合。
* 左括号必须以正确的顺序闭合。

::: details 解答

使用栈。
```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        bracket = {
            '(': ')',
            '{': '}',
            '[': ']'
        }

        for br in s:
            if br in bracket:
                stack.append(br)
            elif stack and bracket[stack[-1]] == br:
                stack.pop(-1)
            else:
                return False

        return not len(stack)
```

:::

## 合并两个有序链表

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

::: details 解答

```python
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        head = l1 = ListNode(0, l1)

        while l1.next and l2:
            if l2.val < l1.next.val:
                l1.next, l2 = l2, l1.next
            l1 = l1.next

        if l2:
            l1.next = l2

        return head.next
```

:::

## 最大子序和

给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

::: details 解答

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        res_max = nums[0]
        max_sum = nums[0]
        for num in nums[1:]:
            max_sum = max(max_sum + num, num)
            res_max = max(max_sum, res_max)
        return res_max
```

:::