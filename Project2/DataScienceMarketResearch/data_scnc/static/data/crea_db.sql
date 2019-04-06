-- Create and use bart_db
DROP DATABASE IF EXISTS indeed_db;
CREATE DATABASE indeed_db;
USE indeed_db;

-- Create ridership table for raw data to be loaded into
CREATE TABLE opportunities (
ID FLOAT PRIMARY KEY AUTO_INCREMENT,
Entry_Station TEXT,
Exit_Station TEXT,
Yr_Mo DATE,
`Year` FLOAT,
`Month` TEXT,
Avg_Weekday_Trips DECIMAL(2)
);

-- Create metadata table for raw data to be loaded into 
CREATE TABLE metadata (
ID float primary key
, category				text
, employer				text
, city					text
, state					text
, zipcode				text
, jobtitle				text
, joblink				text
, jobdate				date
, latitude				float
, longitude				float
, description			varchar(4000)
, skilled_excel			boolean
, skilled_python		boolean
, skilled_database		boolean
, skilled_r_language	boolean
, skilled_java			boolean
, skilled_scala			boolean
, skilled_c_laguage		boolean
, skilled_spark			boolean
, skilled_hadoop		boolean
, skilled_AWS			boolean
, skilled_bi			boolean
, skilled_linux			boolean
, skilled_hive			boolean
, skilled_matlab		boolean
, skilled_tableau		boolean
, skilled_perl			boolean
, skilled_tensorflow	boolean
, skilled_mongo			boolean
);

-- Select all data
select * from opportunities;
select * from metadata;

SHOW VARIABLES LIKE "secure_file_priv";