

#Listid Kasutajalt
select listName from bloglist where email='test@gmail.com';

#Blogs by Bloglist
select title,xmlUrl from blog where 
id IN (select BLOG_ID from blog_bloglist where 
BLOGLIST_ID IN (select id from bloglist where listName='Esimene List')); 

#Tags by Blog
select name from tag where 
id IN (select TAG_ID from blog_tag where 
BLOG_ID IN (select id from blog where id = 0)); 

#Blogs by tags
select title,xmlUrl from blog where 
id IN (select BLOG_ID from blog_tag where 
TAG_ID IN (select id from tag where name='tag1')); 

#Kasutaja blogid kindlas listis
select title,xmlUrl from blog where 
id IN (select BLOG_ID from blog_bloglist where 
BLOGLIST_ID IN (select id from bloglist where email='test@gmail.com')); 

#Add user to database
insert ignore into user (email)
value('something@gmail.com');

#Bloglist with user
insert into bloglist(listName,email) values ('Esimene List','test@gmail.com');

#Create blog
INSERT INTO blog (title , xmlUrl)
VALUES ('Blog1', 'https://xmlUrl1.com');

#Create Tag
insert into tag (name)
values ('tag1');

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
Update user 
set selectedList=2
where email='test1@gmail.com';

#Get selectedList
select listName from bloglist where email='test@gmail.com';
