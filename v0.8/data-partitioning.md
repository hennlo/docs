---
layout: default
title: Data Partitioning
#toc: true
docs_area: architecture
---

Data partitioning is a common concept in Database Management Systems (DBMS) to split data in chunks or fragments. In general, it can be distinguished between *Replication*, *Vertical Partitioning* and *Horizontal Partitioning*. Polypheny also supports combining these techniques. This allows selectively replicating parts of the data and therefore efficiently optimize for multiple application requirements at the same time.




## Replication
Polypheny-DB allows storing an entity on multiple data stores. This allows optimizing for different workloads, since Polypheny-DB always selects the data store with the best characteristics for executing a query. By exploiting the advantages of the available data stores, Polypheny is able to provide the best possible performance for heterogeneous workloads. 

In the Polypheny context, the assignment of a full replica to a data store is called *Full Placement*.



## Vertical Partitioning
In addition to fully replicating an entity, Polypheny-DB also allows replicating only a subset of the fields. Every field needs to be assigned to at least one data store. In the Polypheny context, these assignments are called *Column Placements*.  It is distinguished between automatic placements and manual placements. The former are created and removed automatically by Polypheny. There are always automatic placements for the primary key fields.



## Horizontal Partitioning
Refers to the partitioning of entities into a disjoint set of tuples that are stored separately. Polypheny-DB comes with support for multiple partition [algorithms](#existing-horizontal-partition-algorithms). These algorithms can be applied to any entity based on an arbitrary field (i.e. the partition column), which results in a fragmentation of the entity based on the values of the selected field. 

Every partition is assigned to one or multiple data stores. In the Polypheny context, these assignments are called *Partition Placements*.



### Available Horizontal Partition Algorithms
Polypheny supports the following partition functions:
* **List** - the entity is partitioned by explicitly specifying values for each partition.
* **Hash** - the entity is partitioned based on the hash of the values of the partition field. 
* **Range** - the entity is partitioned into numerical "ranges". There needs to be no overlap between the ranges. 
* **Temperature-aware Partitioning** - Serves as an extension to the classical partition functions. It places data based on their "temperature" in either a *HOT*- or *COLD* partition group. This classification depends on certain cost metrics like the access frequency. It internally uses the hash partitioning function.