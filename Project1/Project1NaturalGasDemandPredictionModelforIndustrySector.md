# Project 1 - Natural Gas Demand  Prediction  Model  for  Industry Sector
Natural gas has played an important role in the energy transition because it is a cleaner, more efficient and cheaper energy compared to other fossil fuels and it is one of the fuels that will maintain significant growth in the next fifteen years.

The objective of this project is to compare the linear and multiple regression analysis to perform the prediction of natural gas demand for the industrial sector.

***Succesful  model  is  the  one  that has lower  prediction error.***

## Constraints

* The data or the predictive model of natural gas demand for the   
   industrial sector was taken from the INEGI and SENER pages
* The range of historical information considered for the prediction is 
   10 years
* The model will be tested using two approaches: Simple linear regression Multiple regression    
* The variables that will be used for this model are:
  * Natural gas price (USD / MMBtu)
  * Fuel oil price (USD / MMBtu)
  * GDP/  gross domestic product (billions of pesos)

## Design
### Data
The coded program loads the data of the model variables using an Excel file with the following structure:
![alt text](https://github.com/gabrielaolivera44/PREWORK_GOG/blob/master/Project1/Imagenes/Tabla_datos.png "Tabla_datos")



### Code functions
The program is organized by three groups of functions, that are executed in the presented order:
* Data processing:
  * read_data (filname)
  * lagged_dataframe (data, lags = 1)
* Variables analysis
  * plot_demanda_gas_natural_subsector (data)
  * boxplot_standardized variables (data)
  * calc_timeseries (data)
  * histogram (data)
  * relacion_entre_variables (data)
  * correlacion_entre_variables (data)
* Predictive Models
  * calc_regresion_lineal (data)
  * calc_regresion_lineal_multiple (datos_lagged)

# Outputs




## plot_demanda_gas_natural_subsector (data)
To present the demand for natural gas by sector, a line chart comparing all sectors was used.

![alt text](https://github.com/gabrielaolivera44/PREWORK_GOG/blob/master/Project1/Imagenes/plot_demanda_gas_natural_subsector.png "plot_demanda_gas_natural_subsector")


## calc_timeseries (data)
It shows by sector the data recorded on a regular basis that show the demand for natural gas with standardized data

![alt text](https://github.com/gabrielaolivera44/PREWORK_GOG/blob/master/Project1/Imagenes/calc_timeseries.png "calc_timeseries")


## boxplot_standardized_variables (data)
* To analyze the dependent variables to the demand by sector, a box graph was used
* The variables analyzed are: demand, GDP, fuel oil price, and natural gas price
* In order to make the comparison between the variables, the data was standardized

![alt text](https://github.com/gabrielaolivera44/PREWORK_GOG/blob/master/Project1/Imagenes/boxplot_standardized_variables.png "boxplot_standardized_variables.png")


## histogram (data)
Histograms were used to study the variables by sector, which represent the input data for the analysis.

![alt text](https://github.com/gabrielaolivera44/PREWORK_GOG/blob/master/Project1/Imagenes/histogram.png "histogram")


## relacion_entre_variables (data)
This function presents, through the use of a scatter plot, the relationship between the pairs of the variable possibilities. That is, it is identified if the relationship between the variables is indeed direct.

![alt text](https://github.com/gabrielaolivera44/PREWORK_GOG/blob/master/Project1/Imagenes/relacion_entre_variables.png "relacion_entre_variables")


## correlation_entre_variables (data)
The purpose of the correlation is to examine the direction and strength of the association between two quantitative variables. This way we will know the intensity of the relationship between them and if, when increasing the value of one variable, the value of the other variable increases or decreases.

![alt text](https://github.com/gabrielaolivera44/PREWORK_GOG/blob/master/Project1/Imagenes/correlation_entre_variables.png "correlation_entre_variables")


## calc_regresion_lineal (data)
Regression methods are used to study the relationship between two numerical variables.

This relationship will allow in the future, to measure an unknown sample and know approximately its true value.

![alt text](https://github.com/gabrielaolivera44/PREWORK_GOG/blob/master/Project1/Imagenes/calc_regresion_lineal.png "calc_regresion_lineal")


## calc_regresion_lineal_multiple (datos_lagged)
In this case, 3 dependent variables were used: GDP, Fuel oil price and natural gas price

![alt text](https://github.com/gabrielaolivera44/PREWORK_GOG/blob/master/Project1/Imagenes/datos_lagged.png "datos_lagged")


## Results and conclusions







