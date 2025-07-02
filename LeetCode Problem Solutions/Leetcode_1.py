class Solution:
    def twoSum(self, nums: list[int], target: list[int]):
        List = nums
        targets = target
        sum = False
        i = False

        print(targets)

        for i in targets:
            sum = List[i] + sum

        return sum

Aps = Solution()
print(Aps.twoSum(nums = [2,7,11,5], target=[0,1]))
