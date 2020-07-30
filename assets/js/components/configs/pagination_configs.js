export const ADMIN_USERS_PAGE_PAGINATION_ITEMS_PER_PAGE = 8;
export const ADMIN_PROJECTS_PAGE_PAGINATION_ITEMS_PER_PAGE = 6;
export const ADMIN_PROJECT_PAGE_PAGINATION_ITEMS_PER_PAGE = 7;
export const ADMIN_USER_PAGE_PAGINATION_ITEMS_PER_PAGE = 8;
export const LIST_PROJECTS_PAGE_PAGINATION_ITEMS_PER_PAGE = 12;


function determinePaginationConfig(items, itemsPerPage, currentPage) {

    const pagesCount = Math.ceil(items.length / itemsPerPage);

    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const start = currentPage * itemsPerPage - itemsPerPage;
    const paginatedItems = items.slice(start, start + itemsPerPage)

    return {
        pagesCount: pagesCount,
        pages: pages,
        start: start,
        paginatedItems: paginatedItems
    }
}


export default {
    determinePaginationConfig
}
