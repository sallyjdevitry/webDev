Gold App navigation info:
The init path initializes my database driven API with the necessary conversions, then redirects the user to the goldApp home page.

The API url is http://localhost:8000/unitconv/convert

An example of a request to my API: Going to the url http://localhost:8000/unitconv/convert?from=lb&to=t_oz&value=3.14159&type=mass will query the database and return a Json with the new units, t_oz, the new value, and the type, mass.

The goldApp home page allows a user to enter their weight in US pounds and get an output of how much they are worth in gold by the latest gold price. 

Citations:
Conversion factors were taken from Google.com
Technique for getting the date 5 days ago was borrowed from RobG on stackOverflow.


