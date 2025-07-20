from django.urls import path, include
from .views import AdminLoginView, CustomConfirmEmailView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  
    path('auth/registration/account-confirm-email/<str:key>/',
        CustomConfirmEmailView.as_view(),
        name='account_confirm_email'
    ),
]
