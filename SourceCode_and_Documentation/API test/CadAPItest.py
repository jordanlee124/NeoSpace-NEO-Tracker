import requests 

# api-endpoint 
URL = "https://ssd-api.jpl.nasa.gov/cad.api"

print("Example Date: 2021-02-28")
print("MAX DATE RANGE IS 7 DAYS")

StartDate = input("Enter a start date: ")
EndDate = input("Enter an end date: ")

# defining a params dict for the parameters to be sent to the API 
Dates = {'date-min':StartDate, 'date-max': EndDate} 

# sending get request and saving the response as response object 
r = requests.get(url = URL, params = Dates)

# extracting data in json format 
data = r.json() 

#print(data['near_earth_objects']['2021-02-28'])

#iterates through the big ass dictionary that the query provides
#for key in data['near_earth_objects'].keys():
#    for element in data['near_earth_objects'][key]:
#        for e in element['close_approach_data']:
#            for bruh in e.keys():
#                if bruh != "close_approach_date_full" and bruh != "epoch_date_close_approach":
#                    print(str(bruh) + "  :  " + str(e[bruh]))
#            print("\n")
#        for e in element.keys():
#            if e != "close_approach_data" and e !="links" and e != "nasa_jpl_url" and e != "neo_reference_id":
#                print(str(e) + "  :  " + str(element[e]))
#        print("\n\n________________________________________________________\n\n")

#print("________________________________________________________\n________________________________________________________\n\n")
#print("       Number of near earth objects in total: " + str(data['element_count']))
#print("\n________________________________________________________\n________________________________________________________\n\n")

#data: 'des', 'orbit_id', 'jd', 'cd', 'dist', 'dist_min', 'dist_max', 'v_rel', 'v_inf', 't_sigma_f', 'h'

print(data)