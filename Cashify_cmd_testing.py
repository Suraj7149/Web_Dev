from mimetypes import init
import string
from timeit import repeat


class cmd_prompt():
        def __init__(self):
             pass

        def intro(self):
            print("Welcome to the Cashify Testing Environment. "
                "\nPlease select the device related "
                "\nto your concern below."
                "\n1. Mobile"
                "\n2. Laptop"
                "\n3. TV" 
                "\n4. Tablet" 
                "\n5. Gaming Console"
                "\n6. Smartwatch"
                "\n7. Smart Speaker"
                "\n8. IMac"
                "\n9. Earbuds"
                "\n10. DSLR Camera"
                "\n11. AC"
                "\n12. Washing Machine"
                "\n13. Refrigerator")


if __name__ == "__main__":
    cmd = cmd_prompt()
    cmd.intro()
    
    while(True):
        respond = input(">>>")
        if respond == "exit":
            break
        elif "intro" in respond:
            cmd.intro()
        elif "1" in respond:
            print("You have selected Mobile. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")  
        elif "2" in respond:
            print("You have selected Laptop. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")  
        elif "3" in respond:
            print("You have selected TV. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "4" in respond:
            print("You have selected Tablet. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "5" in respond:    
            print("You have selected Gaming Console. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "6" in respond:
            print("You have selected Smartwatch. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "7" in respond:
            print("You have selected Smart Speaker. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "8" in respond:
            print("You have selected IMac. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "9" in respond:
            print("You have selected Earbuds. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "10" in respond:  
            print("You have selected DSLR Camera. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "11" in respond:
            print("You have selected AC. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "12" in respond:  
            print("You have selected Washing Machine. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "13" in respond:
            print("You have selected Refrigerator. Please enter 'Sell' to proceed with selling query or 'Buy' to proceed buying query.")
        elif "sell" in respond.lower():
            print("You have selected the query related to selling.")
        elif "buy" in respond.lower():
            print("You have selected the query related to Buying.")
        else:
            print("Invalid input. Please try again or type 'intro' to see the options. \nType 'exit' to quit the program.")
