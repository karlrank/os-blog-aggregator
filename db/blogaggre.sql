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






#Listid Kasutajalt
select listName from bloglist where 
id IN (select BLOGLIST_ID from user_bloglist where 
USER_ID IN (select id from user where email='test1@gmail.com')); 

#Blogs by Bloglist
select title,htmlUrl,xmlUrl from blog where 
id IN (select BLOG_ID from blog_bloglist where 
BLOGLIST_ID IN (select id from bloglist where listName='list1')); 

#Tags by Blog
select name from tag where 
id IN (select TAG_ID from blog_tag where 
BLOG_ID IN (select id from blog where title='Blog2')); 

#Blogs by tags
select title,htmlUrl,xmlUrl from blog where 
id IN (select BLOG_ID from blog_tag where 
TAG_ID IN (select id from tag where name='tag1')); 

#Kasutaja blogid kindlas listis
select title,htmlUrl,xmlUrl from blog where 
id IN (select BLOG_ID from blog_bloglist where 
BLOGLIST_ID IN (select id from bloglist where listName='list1' and 
id IN (select BLOGLIST_ID from user_bloglist where 
USER_ID IN (select id from user where email='test1@gmail.com')))); 




#Kasutaja blogid kindlas listis
select title,htmlUrl,xmlUrl from blog where 
id IN (select BLOG_ID from blog_bloglist where 
BLOGLIST_ID IN (select id from bloglist where listName=(select listName from bloglist where id=(select selectedList from user where email='karlrank@gmail.com')) and 
id IN (select BLOGLIST_ID from user_bloglist where 
USER_ID IN (select id from user where email='karlrank@gmail.com'))));

select title,htmlUrl,xmlUrl from blog where id IN (select BLOG_ID from blog_bloglist where BLOGLIST_ID IN (select id from bloglist where listName=(select listName from bloglist where id=(select selectedList from user where email='karlrank@gmail.com')) and id IN (select BLOGLIST_ID from user_bloglist where USER_ID IN (select id from user where email='karlrank@gmail.com'))));

#Add user to database
insert into user (email)
value('something@gmail.com');

#Create bloglist
insert into bloglist (listName)
values ('listname');

#Create blog
INSERT INTO blog (title, htmlUrl, xmlUrl)
VALUES ('Blog1', 'https://htmlUrl1.com', 'https://xmlUrl1.com');

#Create Tag
insert into tag (name)
values ('tag1');

#Add bloglist to user
insert into user_bloglist
value(user_id,bloglist_id);

#Add blog to list
insert into blog_bloglist
values (blog_id,bloglist_id);

#Add tag to user 
insert into user_tag
values (user_id,tag_id);

#Add tag to blog
insert into blog_tag
values (blog_id,tag_id);

#Update selectedList
update user 
set selectedList=2
where email='test1@gmail.com';

#Get selectedList
select listName from bloglist where 
id=(select selectedList from user where email='test1@gmail.com');

#Get Blogs with popularity
select id, title, htmlUrl, xmlUrl, count(distinct id) as Popularity 
from blog where id in (select id from blog_bloglist) group by title ORDER BY Popularity DESC;