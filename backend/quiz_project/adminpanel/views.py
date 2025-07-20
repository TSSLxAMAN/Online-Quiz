from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AdminLoginSerializer
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from allauth.account.models import EmailConfirmationHMAC
from allauth.account.views import confirm_email
from django.http import Http404
from django.http import HttpResponseRedirect
from allauth.account.views import ConfirmEmailView


# Create your views here.

class AdminLoginView(APIView):
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            return Response({"message": "Login successful"}, status=200)
        return Response(serializer.errors, status=400)

        
class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        confirmation.confirm(self.request)
        return HttpResponseRedirect("http://localhost:5173/email-confirmed")
