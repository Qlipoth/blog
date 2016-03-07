$(function(){
	$('.pagination').twbsPagination({
        totalPages: Math.ceil(all_records/5),
        href: '/post/page?page={{number}}'
    });
})