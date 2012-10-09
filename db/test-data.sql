use blogaggregator1;

insert into user (email) value('test@gmail.com');

#Create bloglist
insert into bloglist (listName) values ('Esimene List');

#Add bloglist to user 
insert into user_bloglist value(1, 1);

#Create blogs
INSERT INTO blog (title, htmlUrl, xmlUrl) VALUES ('Booking it some more', 'http://bookingitsomemore.blogspot.com/', 'http://bookingitsomemore.blogspot.com/feeds/posts/default');
INSERT INTO blog (title, htmlUrl, xmlUrl) VALUES ('Grafomania', 'http://grafomania.wordpress.com', 'http://grafomania.wordpress.com/feed/');
INSERT INTO blog (title, htmlUrl, xmlUrl) VALUES ('Vinttikamarissa', 'http://vinttikamarissa.blogspot.com/', 'http://vinttikamarissa.blogspot.com/feeds/posts/default');
INSERT INTO blog (title, htmlUrl, xmlUrl) VALUES ('Tuulevin lukublogi', 'http://tuulevi.wordpress.com', 'http://tuulevi.wordpress.com/feed/');

#Create Tags
insert into tag (name) values ('Finnish');
insert into tag (name) values ('Books');

#Add bloglist to user 
insert into user_bloglist value(1,1);

#Add blog to list
insert into blog_bloglist values (1,1);
insert into blog_bloglist values (2,1);
insert into blog_bloglist values (3,1);
insert into blog_bloglist values (4,1);

#Add tag to blog
insert into blog_tag values (1,1);
insert into blog_tag values (1,2);
insert into blog_tag values (2,1);
insert into blog_tag values (3,1);
insert into blog_tag values (3,2);
insert into blog_tag values (4,1);

#Update selectedList
update user set selectedList=1 where email='test@gmail.com';