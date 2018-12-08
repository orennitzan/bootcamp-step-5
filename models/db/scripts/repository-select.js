module.exports = `
select r.id as repository_id
,r.owner as repository_owner
,r.full_name as repository_full_name
,r.description as repository_desc
,r.html_url as repository_html_url
,r.language as repository_language
,r.stargazer_count as repository_stargazer_count
,r.create_date as repository_create_date
,u.login as users_login
,u.avatar_url as users_avatar_url
,u.html_url as users_html_url
,u.phone as users_phone
,u.create_date as users_create_date

from repository r
left join users u on u.id = r.owner

`