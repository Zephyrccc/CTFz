from rest_framework.pagination import PageNumberPagination


class DefaultPagination(PageNumberPagination):
    page_size = 15    # 表示每页的默认显示数量
    max_page_size = 15  # max_page_size：表示每页最大显示数量，做限制使用，避免突然大量的查询数据，数据库崩溃
    page_size_query_param = 'size'   # page_size_query_param：表示url中每页数量参数
    page_query_param = 'page'   # page_query_param：表示url中的页码参数