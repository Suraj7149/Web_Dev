import pandas as pd 
from openpyxl import load_workbook
from datetime import datetime, date, time
import pywhatkit

# Whatsapp Group ID and Deepak's WhatsApp number
group_id = "LjzxC7ZM1173cJmM7uwwBm" # whatsapp group 
Deepak_Numbers = '+919650298885'  # Deepak WhatsApp number

workbook = load_workbook("C:/Users/Suraj/Documents/Work/output.xlsx")
 
df = pd.read_excel("C:/Users/Suraj/Documents/Work/output.xlsx")
Total_rows = len(df)

sheet = workbook.active

i = 0
for i in range(1, len(df)):
    first_row = [cell.value for cell in sheet[i]]
    try:
        AHT_time  = datetime.combine(date.today(), first_row[3])
    except TypeError:
        pass

    # first_row[1], # Name
    # first_row[2], # Status
    # first_row[3], # TAT
    # first_row[4], # TL Name
    # first_row[5], # Designation Name
    # first_row[6], # Break Reason
    # first_row[8]) # Employee Queues
    
    if first_row[2] == "busy" and first_row[8] == "Chat Queue BB Sell Phone":
        try: 
            if AHT_time.hour >= 1 or AHT_time.minute >= 7:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id, 
                             f"Agent : {first_row[1]} from {first_row[8]} has been on the same chat for over {AHT_time.hour} hours and {AHT_time.minute} minutes.", 
                             wait_time=10, 
                             tab_close=True)
                        
                        if AHT_time.hour >= 1 or AHT_time.minute >= 10:
                             pywhatkit.sendwhatmsg_instantly(
                                Deepak_Numbers,
                                f"Agent : {first_row[1]} from {first_row[8]} has been on the same chat for over {AHT_time.hour} hours and {AHT_time.minute} minutes.",
                                wait_time=10,
                                tab_close=True)
            else:
                pass
        except Exception as e:
            print(e)
            continue

    if first_row[2] == "busy" and first_row[8] == "Support":
        try: 
            if AHT_time.hour >= 1 or AHT_time.minute >= 7:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id, 
                             f"Agent : {first_row[1]} from {first_row[8]} Queue has been on the same email for over {AHT_time.hour} hours and {AHT_time.minute} minutes.", 
                             wait_time=10, 
                             tab_close=True)
                        
                        if AHT_time.hour >= 1 or AHT_time.minute >= 10:
                             pywhatkit.sendwhatmsg_instantly(
                                Deepak_Numbers,
                                f"Agent : {first_row[1]} from Queue {first_row[8]} Queue has been on the same email for over {AHT_time.hour} hours and {AHT_time.minute} minutes.",
                                wait_time=10,
                                tab_close=True)
            else:
                pass
        except Exception as e:
            print(e)
            continue
    
    if first_row[2] == "busy" and (first_row[8] == "Whatsapp Queue (Buyback)" or first_row[8] == "Whatsapp OOH - Buyback"):
        try: 
            if AHT_time.hour >= 1 or AHT_time.minute >= 7:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id, 
                             f"Agent : {first_row[1]} from {first_row[8]} has been on the same chat for over {AHT_time.hour} hours and {AHT_time.minute} minutes.", 
                             wait_time=10, 
                             tab_close=True)
                        
                        if AHT_time.hour >= 1 or AHT_time.minute >= 10:
                             pywhatkit.sendwhatmsg_instantly(
                                Deepak_Numbers,
                                f"Agent : {first_row[1]} from {first_row[8]} has been on the same chat for over {AHT_time.hour} hours and {AHT_time.minute} minutes.",
                                wait_time=10,
                                tab_close=True)
            else:
                pass
        except Exception as e:
            print(e)
            continue
    
    if first_row[2] == "Not Avaliable" and (first_row[6]== "Bio Break" or first_row[6] == "Lunch Break" or first_row[6] == "Tea Break"):
        try: 
            if first_row[6]== "Bio Break" and AHT_time.minute >= 5:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id, 
                             f"Agent : {first_row[1]} from {first_row[8]} has exceeded their {first_row[6]} for over {AHT_time.minute} minutes.", 
                             wait_time=10, 
                             tab_close=True)
            
            if first_row[6]== "Tea Break" and AHT_time.minute >= 15:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id, 
                             f"Agent : {first_row[1]} from {first_row[8]} has exceeded their {first_row[6]} for over {AHT_time.minute} minutes.", 
                             wait_time=10, 
                             tab_close=True)
            
            if first_row[6]== "Lunch" and AHT_time.minute >= 30:
                        pywhatkit.sendwhatmsg_to_group_instantly(
                             group_id, 
                             f"Agent : {first_row[1]} from {first_row[8]} has exceeded their {first_row[6]} for over {AHT_time.minute} minutes.", 
                             wait_time=10, 
                             tab_close=True)
            
            else:
                pass
        except Exception as e:
            print(e)
            continue
         
        

        


