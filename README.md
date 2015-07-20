# precipitationMap

A short weekend project to display precipitation data from ftp://ftp.ncdc.noaa.gov/pub/data/normals/1981-2010/

The project uses the Famous javascript engine and CLI. The Famous project is found in /precipitationMap, while the data, somewhat processed through R and python, is found in /Data

A live build of the project can be found at http://codetako.com/examples/precipitation/index.html

# Issues

Currently, there are many issues facing this project.

With 1000 datapoints, the application gets quite laggy - a better form of displaying (or focusing on regions and thereby reducing the active data) would be advisable.

On a similar vein, loading the data dynamically rather than having static data would be a noticable improvement.

The visual aspects of the project ran into some issues, with shaders not working. This requires further research.

There needs to be a proper scale for the data, to make it meaningful.

The expression of the data could be switched from linear to logarithmic, which might make it more useful.

Finally, Famous, while exciting and interesting, has a ways to go still before becoming a top-class tool. Documentation is currently quite lacking, and an example in their tutorials for Materials wasn't working for some reason.
