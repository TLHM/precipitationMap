with open("/Users/TLHM/Trove/Creations/2015/Projects/PrecipitationMap/Data/ContinentalData.txt") as file:
    data = file.read()

rows = data.split("\n")
rows[0]=rows[0].replace("\"","")

output = "[\n"
fields = rows[0].split(" ")

for i in range(1,1000-1):
    output+="{\n"

    row = rows[i].split(" ")
    
    for j in range(0,len(fields)):
        output+="\t"+fields[j]+" : "+row[j+1]+",\n"
    output+="},\n"

output+="]"

with open("/Users/TLHM/Trove/Creations/2015/Projects/PrecipitationMap/Data/ContinentalData_mini.json","w") as file:
    file.write(output)
    
print('done')
