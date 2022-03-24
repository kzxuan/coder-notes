# 二叉树

二叉树的基本结构：
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

## 226. 翻转二叉树

[LeetCode](https://leetcode-cn.com/problems/invert-binary-tree/)
:star:

:::: code-group
::: code-group-item 递归
```python
class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        if root is None:
            return None
        # 前序递归
        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root
```
:::

::: code-group-item 迭代
```python
class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        if root is None:
            return None
        # 使用队列
        queue = [root]
        while len(queue):
            now = queue.pop()
            now.left, now.right = now.right, now.left
            if now.left:
                queue.append(now.left)
            if now.right:
                queue.append(now.right)
        return root
```
:::
::::

## 105. 从前序与中序遍历序列构造二叉树

[LeetCode](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
:star::star::fire:

当前序列中，**前序序列的第一个元素一定是当前的根节点**，并**在中序序列中刚好夹在左右子树序列中间**，因此递归思路非常简单。

维护栈则相对复杂，需要关注前序指针、中序指针和栈尾指针。
前序指针始终向后游走，但每次比较的对象是**中序指针**和**栈尾指针**。
当两者指向元素不同时，意味着**前序指针所指元素**在左子树方向延伸。
一旦两者指向元素相同，意味着**前序指针所指元素**应是某个节点的右子树，而该节点为**中序指针不断后移**和**栈尾指针不断前移**中最后一个相等的节点。

:::: code-group
::: code-group-item 递归
```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        if not preorder:
            return None
        # 前序的第一个元素一定是当前的根节点
        root_val = preorder[0]
        # 找到根节点在中序中的位置
        in_ind = inorder.index(root_val)
        # 递归构造左右子树
        left = self.buildTree(preorder[1:in_ind + 1], inorder[:in_ind])
        right = self.buildTree(preorder[in_ind + 1:], inorder[in_ind + 1:])
        return TreeNode(root_val, left, right)
```
:::
::: code-group-item 迭代
```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        # 构造根节点并入栈
        root = TreeNode(preorder[0])
        stack = [root]
        # 中序指针的初始化
        in_ind = 0
        for pre_ind in range(1, len(preorder)):
            node = stack[-1]
            if node.val != inorder[in_ind]:
                # 栈顶元素与中序指针所指值不同，就可以持续添加到左子树
                node.left = TreeNode(preorder[pre_ind])
                stack.append(node.left)
            else:
                # 栈顶元素与中序指针所指值相同，持续出栈并向由挪动中序指针
                while stack and stack[-1].val == inorder[in_ind]:
                    node = stack.pop(-1)
                    in_ind += 1
                # 不再相同时，应将当前值添加到右子树
                node.right = TreeNode(preorder[pre_ind])
                stack.append(node.right)
        return root
```
:::
::::

## 106. 从中序与后序遍历序列构造二叉树

[LeetCode](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
:star::star:

:::: code-group
::: code-group-item 递归
```python
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        if not inorder:
            return None
        # 后序的最后一个元素一定是当前的根节点
        root_val = postorder[-1]
        # 找到根节点在中序中的位置
        in_ind = inorder.index(root_val)
        # 递归构造左右子树
        left = self.buildTree(inorder[:in_ind], postorder[:in_ind])
        right = self.buildTree(inorder[in_ind + 1:], postorder[in_ind:-1])
        return TreeNode(root_val, left, right)
```
:::
::: code-group-item 迭代
```python
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        # 初始化栈
        stack = [TreeNode(inorder[0])]
        # 中序指针的初始化
        post_ind = 0
        for in_ind in range(1, len(inorder)):
            node = stack[-1]
            if node.val != postorder[post_ind]:
                # 栈顶元素与中序指针所指值不同，就可以持续添加到左子树
                node.right = TreeNode(inorder[in_ind])
                stack.append(node.right)
            else:
                # 栈顶元素与中序指针所指值相同，持续出栈并向由挪动中序指针
                while stack and stack[-1].val == postorder[post_ind]:
                    node = stack.pop(-1)
                    post_ind += 1
                # 不再相同时，应将当前值添加到右子树
                node = TreeNode(inorder[in_ind], node, None)
                if stack:
                    stack[-1].right = node
                stack.append(node)
        return stack[0]
```
:::
::::

## 652. 寻找重复的子树

[LeetCode](https://leetcode-cn.com/problems/find-duplicate-subtrees/)
:star::star:

```python
class Solution:
    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:
        def traversal(root: Optional[TreeNode]) -> string:
            if not root:
                return "#"
            left = traversal(root.left)
            right = traversal(root.right)
            trace = "{},{},{}".format(left, right, root.val)

            count.setdefault(trace, 0)
            count[trace] += 1
            if count[trace] == 2:
                result.append(root)
            return trace

        count = {}
        result = []
        traversal(root)
        return result
```

## 654. 最大二叉树

[LeetCode](https://leetcode-cn.com/problems/maximum-binary-tree/)
:star::star:

用递归很常规，用栈维护比较有意思。

:::: code-group
::: code-group-item 递归
```python
class Solution:
    def constructMaximumBinaryTree(self, nums: List[int]) -> TreeNode:
        if not nums:
            return None
        val = max(nums)
        ind = nums.index(val)
        # 递归构造左右
        left = self.constructMaximumBinaryTree(nums[:ind])
        right = self.constructMaximumBinaryTree(nums[ind + 1:])
        return TreeNode(val, left, right)
```
:::
::: code-group-item 迭代
```python
class Solution:
    def constructMaximumBinaryTree(self, nums: List[int]) -> TreeNode:
        stack = []
        for n in nums:
            node = TreeNode(n)
            # 若栈内的最后一个节点值比当前值小，应将其暂时作为左子节点，并继续往左试探有没有其父节点
            while stack and stack[-1].val < n:
                node.left = stack.pop()
            # 若栈中存在一个节点值比当前值大，把当前节点作为其右子节点
            if stack:
                stack[-1].right = Node
            # 当前节点必然入栈
            stack.append(node)
        # 栈头是根节点，栈内应只剩下树的最右链路上的节点
        return stack[0]
```
:::
::::

## 114. 二叉树展开为链表

[LeetCode](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)
:star::star:

:::: code-group
::: code-group-item 递归
```python
class Solution:
    def flatten(self, root: TreeNode) -> None:
        if not root:
            return
        self.flatten(root.left)
        self.flatten(root.right)

        # 把左子树挪到右子树的位置，再把原先的右子树拼接到后面
        if root.left:
            right = root.right
            root.left, root.right = None, root.left
            p = root
            while p.right:
                p = p.right
            p.right = right
```
:::
::: code-group-item 迭代
```python
class Solution:
    def flatten(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        r = root
        while r:
            if r.left:
                p = r.left
                while p and p.right:
                    p = p.right
                p.right = r.right
                r.right = r.left
                r.left = None
            r = r.right
```
:::
::::

## 116. 填充每个节点的下一个右侧节点指针

[LeetCode](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)
:star::star:

注意当前节点层已经连接好，所以 `root.right.next = root.next.left`。

:::: code-group
::: code-group-item 递归
```python
class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        if not root:
            return None
        if root.left:
            # 左右子节点连接
            root.left.next = root.right
        if root.right and root.next:
            # 右子节点连向右侧节点的左节点
            root.right.next = root.next.left
        self.connect(root.left)
        self.connect(root.right)
        return root
```
:::
::: code-group-item 迭代
```python
# 根据题目特点使用双指针循环
class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        p = root
        # p 始终指向每一行的第一个元素
        while p:
            q = p
            # q 始终在当前行里向后遍历
            while q and q.left:
                # 修改 q 的子节点，完成下一行的连接
                q.left.next = q.right
                if q.right and q.next:
                    q.right.next = q.next.left
                q = q.next
            p = p.left

        return root
```
:::
::::

## 297. 二叉树的序列化与反序列化

[LeetCode](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)
:star::star::star:

考虑前中后序和层次这几种常见的遍历方式。
其中中序遍历可以完成序列化，但由于无法知晓根所在位置，不能完成反序列化。

:::: code-group
::: code-group-item 前序遍历
```python
class Codec:
    def serialize(self, root: TreeNode) -> string:
        def traverse(root: TreeNode):
            if not root:
                data.append("#")
            else:
                # 根左右序列化
                data.append(str(root.val))
                traverse(root.left)
                traverse(root.right)

        data = []
        traverse(root)
        return ",".join(data)


    def deserialize(self, data: string) -> TreeNode:
        # 由于空节点全部被标记，前序时不需要考虑额外的节点位置信息，为空时置 None 即可
        def traverse(data: string) -> TreeNode:
            if not data:
                return None
            # 第一个元素为当前根
            val = data.pop(0)
            if val == "#":
                return None
            else:
                # 按根左右复原
                root = TreeNode(int(val))
                root.left = traverse(data)
                root.right = traverse(data)
                return root

        data = data.split(",")
        return traverse(data)
```
:::
::: code-group-item 后序遍历
```python
class Codec:
    def serialize(self, root: TreeNode) -> string:
        def traverse(root: TreeNode):
            if not root:
                data.append("#")
            else:
                # 左右根序列化
                traverse(root.left)
                traverse(root.right)
                data.append(str(root.val))

        data = []
        traverse(root)
        return ",".join(data)


    def deserialize(self, data: string) -> TreeNode:
        def traverse(data):
            if not data:
                return None
            # 最后一个元素为当前根
            val = data.pop(-1)
            if val == "#":
                return None
            else:
                # 按根右左复原
                root = TreeNode(int(val))
                root.right = traverse(data)
                root.left = traverse(data)
                return root

        data = data.split(",")
        return traverse(data)
```
:::
::::
