class Solution:
    def mergeTwoLists(self, l1: Listnode, l2: Listnode) -> Listnode:

        dummy = ListNode()
        tail = dummy
        while l1 and l2:
            if l1.val < l2.val:
                tail.next = l1
                l1 = l1.next
            else:
                tail.next = l2
                l2 = l2.next
            tail = tail.next
        
        if l1:
            tail.next = l1
        elif l2:
            tail.next = l2
        
        return dummy.next