---
layout: page
title:  Verwendung des Python Connectors
toc: true
disable_anchor_heading: false
lang: de
---

This topic provides a series of examples that illustrate how to use the Python Connector to perform standard operations such as user login, table creation, data insertion, and querying.

The sample code at the end of this topic combines the examples into a single, working Python program.



## Connecting to Polypheny-DB

Import the `poylpheny` module:
```python
import polypheny
```

Establish a connection:
```python
connection = polypheny.connect('localhost', 20591, user='pa', password='')
```

## Interacting with Polypheny-DB

Before interacting with Polypheny-DB you need to create a `cursor`-object from your established connection:
```python
cursor = connection.cursor()
```
This `cursor` is used to read from or write to Polypheny-DB.


### Read from Polypheny-DB

```python
cursor.execute("SELECT * FROM emps")
result = cursor.fetchall()
print (result)
```

### Write to Polypheny-DB

Insert values into table:
```python
cursor.execute("INSERT INTO dummy VALUES (407 , 'de', 93)")
connection.commit()
```

### Terminating connections

As soon as you are finished with your database operations, it's recommended to close your connection object.
```python
connection.close()
```
This automatically closes the `cursor`-object as well.


## Logging

The Polypheny Connector for Python leverages the standard Python logging module to log status at regular intervals so that the application can trace its activity working behind the scenes. The simplest way to enable logging is call `logging.basicConfig()` in the beginning of the application.

```python
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.DEBUG)
```

## Sample Program

```python
import polypheny
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.DEBUG)
connection = polypheny.connect('localhost', 20591, user='pa', password='')
cursor = connection.cursor()
# Create a new table
cursor.execute("CREATE TABLE dummy (id INT NOT NULL, text VARCHAR(2), num INT, PRIMARY KEY(id))")
# Insert values into table
cursor.execute("INSERT INTO dummy VALUES (407 , 'de', 93)")
connection.commit()
# Execute a query
cursor.execute("SELECT * from dummy")
result = cursor.fetchall()
print("Result Set: ", result)
# Close the connection
connection.close()
```