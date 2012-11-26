Delimiter || 
create trigger `bloglist_delete`
after delete on `bloglist`
for each row begin
update user set selectedList=0 where selectedList=old.id; 
delete from blog_bloglist where 
(blog_bloglist.bloglist_id not in (select id from bloglist));
END||
Delimiter ;