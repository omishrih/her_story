from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from memories import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('book/', views.book_view, name='book_cover'),
    path('book/<int:page>/', views.book_view, name='book_page'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
