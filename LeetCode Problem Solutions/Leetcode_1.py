Number_list = [2,7,11,15] 
target = 9

def twoSum(nums, target):
        elements = {}

        for i, num in enumerate(nums):
            if target - num in elements:
                   return [elements[target - num], i]
        else:
                return []
           

twoSum(nums=Number_list, target=target)