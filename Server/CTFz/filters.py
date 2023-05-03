from django_filters.rest_framework import filters
from django_filters.rest_framework.filterset import FilterSet
from CTFz.models import Category

class UserFilter(FilterSet):
    username = filters.CharFilter(
        field_name='username', lookup_expr='icontains')
    team = filters.NumberFilter(field_name='team__id', lookup_expr='exact')


class ChallengeFilter(FilterSet):
    category = filters.NumberFilter(method='filter_category')
    tag = filters.NumberFilter(field_name='tag__id', lookup_expr='exact')
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')

    def filter_category(self, queryset, name, value):
        if value:
            if (Category.objects.get(id=value).name != 'All'):
                queryset = queryset.filter(category__id=value)
        return queryset


class ChallengeCommentFilter(FilterSet):
    user = filters.NumberFilter(field_name='user__id', lookup_expr='exact')
    challenge = filters.NumberFilter(
        field_name='challenge__id', lookup_expr='exact')


class TeamApplicationFilter(FilterSet):
    team = filters.NumberFilter(field_name='team__id', lookup_expr='exact')


class ResultRecordFilter(FilterSet):
    user = filters.NumberFilter(field_name='user__id', lookup_expr='exact')


class TeamFilter(FilterSet):
    captain = filters.NumberFilter(
        field_name='captain__id', lookup_expr='exact')
    name = filters.CharFilter(field_name='name', lookup_expr='icontains')
