

use blogaggregator;

insert ignore into user(email) value('test@gmail.com');

insert into bloglist(listName,email) values ('Esimene List','test@gmail.com');

INSERT INTO blog (title, xmlUrl) VALUES ('Booking it some more', 'http://bookingitsomemore.blogspot.com/feeds/posts/default');
INSERT INTO blog (title, xmlUrl) VALUES ('Grafomania', 'http://grafomania.wordpress.com/feed/');
INSERT INTO blog (title, xmlUrl) VALUES ('Vinttikamarissa', 'http://vinttikamarissa.blogspot.com/feeds/posts/default');
INSERT INTO blog (title, xmlUrl) VALUES ('Tuulevin lukublogi', 'http://tuulevi.wordpress.com/feed/');

insert into tag (name) values ('Finnish');
insert into tag (name) values ('Books');


insert into blog_bloglist values (1,2);
insert into blog_bloglist values (2,2);
insert into blog_bloglist values (3,2);
insert into blog_bloglist values (4,1);

insert into blog_tag values (1,1);
insert into blog_tag values (1,2);
insert into blog_tag values (2,1);
insert into blog_tag values (3,1);
insert into blog_tag values (3,2);
insert into blog_tag values (4,1);

update user set selectedList=1 where email='test@gmail.com';