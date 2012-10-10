CREATE DATABASE blogaggregator;

USE blogaggregator;

set sql_safe_updates=0;

CREATE TABLE user( 
id int not null AUTO_INCREMENT primary key,
email VARCHAR(64),
selectedList INT,
unique (email));

CREATE TABLE blog(
id int not null AUTO_INCREMENT primary key,
title VARCHAR(32) not null,
htmlUrl varchar(256) not null,
xmlUrl varchar(256) not null,
unique (htmlUrl));

CREATE TABLE bloglist(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
listName VARCHAR(32));

CREATE TABLE tag(
id int not null AUTO_INCREMENT primary key,
name VARCHAR(32) not null,
unique (name));

CREATE TABLE blog_bloglist(
BLOG_ID INT,
BLOGLIST_ID INT,
Primary key (BLOG_ID,BLOGLIST_ID)
);

CREATE TABLE user_bloglist(
USER_ID INT,
BLOGLIST_ID INT,
Primary key (USER_ID,BLOGLIST_ID)
);

CREATE TABLE blog_tag(
BLOG_ID INT,
TAG_ID INT,
primary key(BLOG_ID,TAG_ID)
);

CREATE TABLE user_tag(
USER_ID INT,
TAG_ID INT,
primary key (USER_ID,TAG_ID));

DELIMITER $$
create trigger blog_bloglist_delete 
after delete on bloglist
for each row begin
delete from blog_bloglist where 
(blog_bloglist.bloglist_id not in (select id from bloglist));END$$
DELIMITER ;