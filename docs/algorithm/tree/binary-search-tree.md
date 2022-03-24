# 二叉搜索树

对于二叉搜索树 BST 的每⼀个节点 node，其左⼦树节点的值都⽐ node 的值⼩，其右⼦树节点的值都⽐ node 的值⼤，且左⼦树和右⼦树也都是 BST。

因此，BST 的中序遍历结果是有序的（升序）。

## 700. 二叉搜索树中的搜索

[LeetCode](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)
:star:

```python
class Solution:
    def searchBST(self, root: TreeNode, val: int) -> TreeNode:
        return self.traverse(root, val)

    def traverse(self, root: TreeNode, val: int) -> TreeNode:
        if not root:
            return None
        # 利用 BST 性质简化遍历
        elif root.val == val:
            return root
        elif root.val > val:
            return self.traverse(root.left, val)
        elif root.val < val:
            return self.traverse(root.right, val)
```

## 98. 验证二叉搜索树

[LeetCode](https://leetcode-cn.com/problems/validate-binary-search-tree/)
:star::star:

不使用左右子树向上反馈的方式（后续遍历），而通过限制子树最大最小值的方式（前序遍历），很巧妙。

:::: code-group
::: code-group-item 前序遍历
```python
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        return self.traverse(root, None, None)

    def traverse(self, root: TreeNode, minVal: int, maxVal: int) -> bool:
        if not root:
            return True

        if minVal is not None and root.val <= minVal:
            return False
        if maxVal is not None and root.val >= maxVal:
            return False
        return self.traverse(root.left, minVal, root.val) and self.traverse(root.right, root.val, maxVal)
```
:::
::: code-group-item 后序遍历
```python
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        return self.traverse(root)[0]

    # (是否BST, 树最小值, 树最大值)
    def traverse(self, root: TreeNode) -> tuple:
        if not root:
            return (True, float("inf"), float("-inf"))

        leftRes = self.traverse(root.left)
        rightRes = self.traverse(root.right)

        # 左右子树均为 BST 且根节点大于左子树最大值并小于右子树最小值
        if leftRes[0] and rightRes[0] and root.val > leftRes[2] and root.val < rightRes[1]:
            rootMin = min([root.val, leftRes[1]])
            rootMax = max([root.val, rightRes[2]])
            return (True, rootMin, rootMax)
        else:
            return (False,)
```
:::
::::

## 701. 二叉搜索树中的插入操作

[LeetCode](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)
:star::star:

:::: code-group
::: code-group-item 递归
```python
class Solution:
    def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
        if not root:
            root = TreeNode(val)
        elif root.val > val:
            root.left = self.insertIntoBST(root.left, val)
        else:
            root.right = self.insertIntoBST(root.right, val)
        return root
```
:::
::: code-group-item 迭代
```python
class Solution:
    def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
        node = TreeNode(val)
        if not root:
            return node

        cur = root
        while cur:
            parent = cur
            cur = cur.left if cur.val > val else cur.right

        if parent.val > val:
            parent.left = node
        else:
            parent.right = node

        return root
```
:::
::::

## 230. 二叉搜索树中第 K 小的元素

[LeetCode](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)
:star::star:

利用中序遍历的特点。

:::: code-group
::: code-group-item 递归
```python
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        self.rank = 0
        self.res = None
        self.traverse(root, k)
        return self.res

    def traverse(self, root: Optional[TreeNode], k: int):
        if not root:
            return

        self.traverse(root.left, k)
        self.rank += 1
        if self.rank == k:
            self.res = root.val
            return
        self.traverse(root.right, k)
```
:::
::: code-group-item 迭代
```python
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []

        while root or len(stack):
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop(-1)
            k -= 1
            if k == 0:
                return root.val
            root = root.right
```
:::
::::

## 450. 删除二叉搜索树中的节点

[LeetCode](https://leetcode-cn.com/problems/delete-node-in-a-bst/)
:star::star:

被删除节点存在左右子树时最为复杂，考虑用左子树中最大的节点或右子树中最小的节点取代被删除节点。

```python
class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root:
            pass
        elif root.val > key:
            root.left = self.deleteNode(root.left, key)
        elif root.val < key:
            root.right = self.deleteNode(root.right, key)
        else:
            if not root.right:
                root = root.left
            elif not root.left:
                root = root.right
            else:
                # 寻找右子树中最小节点
                cur = root.right
                while cur.left:
                    cur = cur.left
                root.right = self.deleteNode(root.right, cur.val)
                cur.left, cur.right = root.left, root.right
                root = cur
        return root
```

## 538. 把二叉搜索树转换为累加树

[LeetCode](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/)
:star::star:

:::: code-group
::: code-group-item 递归
```python
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        self.sumVal = 0
        self.traverse(root)
        return root

    def traverse(self, root: Optional[TreeNode]):
        if not root:
            return

        self.traverse(root.right)
        self.sumVal += root.val
        root.val = self.sumVal
        self.traverse(root.left)
```
:::
::: code-group-item 迭代
```python
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        node = root
        sumVal = 0
        stack = []

        while node or stack:
            while node:
                stack.append(node)
                node = node.right
            node = stack.pop(-1)
            sumVal += node.val
            node.val = sumVal
            node = node.left

        return root
```
:::
::::

## 96. 不同的二叉搜索树

[LeetCode](https://leetcode-cn.com/problems/unique-binary-search-trees/)
:star::star:

二叉搜索树和动态规划结合。

```python
class Solution:
    def numTrees(self, n: int) -> int:
        self.dp = [1, 1] + [-1] * (n - 1)
        return self.traverse(n)

    def traverse(self, n: int) -> int:
        if self.dp[n] != -1:
            return self.dp[n]

        s = 0
        for i in range(0, n):
            s += self.traverse(i) * self.traverse(n - 1 - i)
        self.dp[n] = s
        return s
```

## 95. 不同的二叉搜索树 II

[LeetCode](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)
:star::star:

思路和前一题基本一致。

```python
class Solution:
    def generateTrees(self, n: int) -> List[TreeNode]:
        return self.traverse(1, n)

    def traverse(self, low: int, high: int) -> List[TreeNode]:
        tree = []
        if low > high:
            tree.append(None)
        for i in range(low, high + 1):
            left = self.traverse(low, i - 1)
            right = self.traverse(i + 1, high)
            for lRoot in left:
                for rRoot in right:
                    tree.append(TreeNode(i, lRoot, rRoot))
        return tree
```

## 1373. 二叉搜索子树的最大键值和

[LeetCode](https://leetcode-cn.com/problems/maximum-sum-bst-in-binary-tree/)
:star::star::star:

立足于当前节点，需要知道以下具体信息：左右⼦树是否是 BST、左⼦树的最⼤值和右⼦树的最⼩值、左右⼦树的节点值之和。
采用后续遍历的方式，可以有效地维护所需要的具体信息。

```python
class Solution:
    def maxSumBST(self, root: Optional[TreeNode]) -> int:
        self.maxBstSum = 0
        self.traverse(root)
        return self.maxBstSum

    def traverse(self, root: Optional[TreeNode]) -> tuple:
        if not root:
            return (True, 40001, -40001, 0)

        leftRes = self.traverse(root.left)
        rightRes = self.traverse(root.right)

        if leftRes[0] and rightRes[0] and root.val > leftRes[2] and root.val < rightRes[1]:
            rootMin = min([root.val, leftRes[1]])
            rootMax = max([root.val, rightRes[2]])
            rootSum = sum([root.val, leftRes[3], rightRes[3]])
            self.maxBstSum = max(self.maxBstSum, rootSum)
            return (True, rootMin, rootMax, rootSum)
        else:
            return (False, 0, 0, 0)
```
