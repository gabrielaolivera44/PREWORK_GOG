-- 1a. Display the first and last names of all actors from the table actor.
SELECT first_name
     , last_name
FROM   actor;

-- 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name.
SELECT upper(concat_ws(' ',first_name,last_name))
FROM   actor;

-- 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name,
--     "Joe." What is one query would you use to obtain this information?
SELECT actor_id
	 , first_name
     , last_name
FROM   actor
WHERE  first_name = 'Joe';

-- 2b. Find all actors whose last name contain the letters GEN:
SELECT actor_id
	 , first_name
     , last_name
FROM   actor
WHERE  upper(last_name) like '%GEN%';

-- 2c. Find all actors whose last names contain the letters LI. This time, order the rows by last 
--     name and first name, in that order:
SELECT actor_id
	 , first_name
     , last_name
FROM   actor
WHERE  upper(last_name) like '%LI%'
ORDER BY last_name, first_name;

-- 2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China:
SELECT country_id
	 , country
FROM   country
WHERE  country in ('Afghanistan', 'Bangladesh', 'China');

-- 3a. You want to keep a description of each actor. You don't think you will be performing queries on a description,
--     so create a column in the table actor named description and use the data type BLOB (Make sure to research the
--     type BLOB, as the difference between it and VARCHAR are significant).
ALTER TABLE actor ADD ( description blob );

DESC actor;

-- 3b. Very quickly you realize that entering descriptions for each actor is too much effort. Delete the description column.
ALTER TABLE actor DROP COLUMN description;

-- 4a. List the last names of actors, as well as how many actors have that last name.
SELECT count(*)
     , last_name
FROM   actor
GROUP BY last_name;

-- 4b. List last names of actors and the number of actors who have that last name, but only for
--     names that are shared by at least two actors
SELECT count(*)
     , last_name
FROM   actor
GROUP BY last_name
HAVING count(*) >= 2;

-- 4c. The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS.
--     Write a query to fix the record.
select * from actor where (first_name, last_name) = ("GROUCHO", "WILLIAMS");

UPDATE actor
SET   first_name = "HARPO"
	, last_name = "WILLIAMS"
WHERE (first_name, last_name) = ("GROUCHO", "WILLIAMS");

select * from actor where (first_name, last_name) = ("HARPO", "WILLIAMS");

-- 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that GROUCHO was
--     the correct name after all! In a single query, if the first name of the actor is
--     currently HARPO, change it to GROUCHO.
UPDATE actor
SET   first_name = "GROUCHO"
	, last_name = "WILLIAMS"
WHERE (first_name, last_name) = ("HARPO", "WILLIAMS");

select * from actor where (first_name, last_name) = ("GROUCHO", "WILLIAMS");

-- 5a. You cannot locate the schema of the address table. Which query would you use to re-create it?
-- Hint: https://dev.mysql.com/doc/refman/5.7/en/show-create-table.html
use sakila;

SELECT table_schema
FROM INFORMATION_SCHEMA.TABLES
WHERE table_name = 'address';

SHOW CREATE TABLE address;


-- 6a. Use JOIN to display the first and last names, as well as the address, of each staff member.
--     Use the tables staff and address:
SELECT a.first_name
     , a.last_name
     , b.address
FROM   staff   a
     , address b
WHERE  a.address_id = b.address_id;


-- 6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment.
SELECT first_name
     , last_name
     , sum(amount)
FROM   staff
     , payment
WHERE  staff.staff_id = payment.staff_id
AND    payment_date >= '2005-08-01 00:00:00'
AND    payment_date <  '2005-09-01 00:00:00'
GROUP BY first_name, last_name;


-- 6c. List each film and the number of actors who are listed for that film.
--     Use tables film_actor and film. Use inner join.
SELECT title
     , count(*)
FROM   film
     , film_actor
WHERE  film.film_id = film_actor.film_id
GROUP BY title;


-- 6d. How many copies of the film Hunchback Impossible exist in the inventory system?
SELECT count(*), title
FROM   film      a
     , inventory b
WHERE  title = 'Hunchback Impossible'
AND    a.film_id = b.film_id
GROUP BY title;


-- 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer.
--     List the customers alphabetically by last name:
SELECT first_name
     , last_name
     , sum(amount)
FROM   customer   a
     , payment    b
WHERE  a.customer_id = b.customer_id
GROUP BY first_name, last_name
ORDER BY last_name;


-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence.
--     As an unintended consequence, films starting with the letters K and Q have
--     also soared in popularity. Use subqueries to display the titles of movies
--     starting with the letters K and Q whose language is English.
SELECT title
FROM   film
WHERE  title like 'Q%'
OR     title like 'K%'
AND    EXISTS (SELECT language_id 
               FROM   language where name = 'English'
               AND    language.language_id = film.language_id);


-- 7b. Use subqueries to display all actors who appear in the film Alone Trip.


-- 7c. You want to run an email marketing campaign in Canada, for which you will need
--     the names and email addresses of all Canadian customers. Use joins to retrieve
--     this information.
SELECT first_name
     , last_name
FROM   customer a
     , address  b
     , city     c
     , country  d
WHERE  a.address_id = b.address_id
AND    b.city_id    = c.city_id
AND    c.country_id = d.country_id
AND    country = 'Canada';


-- 7d. Sales have been lagging among young families, and you wish to target all family
--     movies for a promotion. Identify all movies categorized as family films.
SELECT title
     , name
FROM   film           a
     , film_category  b
     , category       c
WHERE  a.film_id     = b.film_id
AND    b.category_id = c.category_id
AND    c.name        = 'Family';

-- 7e. Display the most frequently rented movies in descending order.
SELECT title, count(*)
FROM   film        a
     , inventory   b
     , rental      c
WHERE  a.film_id      = b.film_id
AND    b.inventory_id = c.inventory_id
GROUP BY title
ORDER BY count(*) DESC;

-- 7f. Write a query to display how much business, in dollars, each store brought in.
SELECT * 
FROM   sakila.sales_by_store;

SELECT CONCAT(c.city, _utf8',', cy.country) store
     , CONCAT(m.first_name, _utf8' ', m.last_name) manager
     , SUM(p.amount)                               total_sales
FROM   payment   p
	,  rental    r
    ,  inventory i
    ,  store     s
    ,  address   a
    ,  city      c
    ,  country   cy
    ,  staff     m
WHERE  p.rental_id = r.rental_id
AND    r.inventory_id = i.inventory_id
AND    i.store_id = s.store_id
AND    s.address_id = a.address_id
AND    a.city_id = c.city_id
AND    c.country_id = cy.country_id
AND    s.manager_staff_id = m.staff_id
GROUP BY s.store_id
ORDER BY cy.country, c.city;

-- 7g. Write a query to display for each store its store ID, city, and country.
SELECT s.store_id
     , c.city
     , cy.country 
FROM   store     s
    ,  address   a
    ,  city      c
    ,  country   cy
WHERE  s.address_id = a.address_id
AND    a.city_id = c.city_id
AND    c.country_id = cy.country_id;

-- 7h. List the top five genres in gross revenue in descending order. (Hint: you may need to
-- use the following tables: category, film_category, inventory, payment, and rental.)
SELECT c.name        category
     , SUM(p.amount) total_sales
FROM   payment        p
     , rental         r
     , inventory      i
     , film_category  fc
     , category       c
WHERE  p.rental_id = r.rental_id
AND    r.inventory_id = i.inventory_id
AND    i.film_id = fc.film_id
AND    fc.category_id = c.category_id
GROUP BY c.name
ORDER BY total_sales DESC
LIMIT 5;

-- 8a. In your new role as an executive, you would like to have an easy way of viewing the Top
--     five genres by gross revenue. Use the solution from the problem above to create a view. If
--     you haven't solved 7h, you can substitute another query to create a view.
CREATE VIEW five_genres_by_gross_revenue
AS
SELECT c.name        category
     , SUM(p.amount) total_sales
FROM   payment        p
     , rental         r
     , inventory      i
     , film_category  fc
     , category       c
WHERE  p.rental_id = r.rental_id
AND    r.inventory_id = i.inventory_id
AND    i.film_id = fc.film_id
AND    fc.category_id = c.category_id
GROUP BY c.name
ORDER BY total_sales DESC
LIMIT 5;

-- 8b. How would you display the view that you created in 8a?
SELECT * 
FROM   five_genres_by_gross_revenue;

-- 8c. You find that you no longer need the view top_five_genres. Write a query to delete it.
DROP VIEW five_genres_by_gross_revenue;

