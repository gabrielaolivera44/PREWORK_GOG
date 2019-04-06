LOAD DATA INFILE "/ProgramData/MySQL/MySQL Server 5.7/Uploads/indeedjobs_all2.csv" INTO TABLE indeed_db.metadata
COLUMNS TERMINATED BY ',' ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
( id
, category
, employer
, city
, state
, zipcode
, jobtitle
, joblink
, jobdate
, latitude
, longitude
, description
, skilled_excel
, skilled_python
, skilled_database
, skilled_r_language
, skilled_java
, skilled_scala
, skilled_c_laguage
, skilled_spark
, skilled_hadoop
, skilled_AWS
, skilled_bi
, skilled_linux
, skilled_hive
, skilled_matlab
, skilled_tableau
, skilled_perl
, skilled_tensorflow
, skilled_mongo
);

