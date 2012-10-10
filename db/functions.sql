create procedure addBlogBloglist(in nblog char(32),in nblist char(32))
insert into blog_bloglist values((select id from blog where title = nblog),
(select id from bloglist where listName=nblist));

