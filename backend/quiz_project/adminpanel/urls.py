from django.urls import path, include
from .views import AdminLoginView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
