from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('adminpanel/', include('adminpanel.urls')),
    path('quiz/', include('quiz.urls')),
    path('admin/', admin.site.urls),
]
