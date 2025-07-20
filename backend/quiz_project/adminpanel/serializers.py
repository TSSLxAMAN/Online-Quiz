from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from django.contrib.auth import authenticate
from .models import *

class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return user

class StudentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        exclude = ['password']

class CustomLoginSerializer(LoginSerializer):
    def validate(self, attrs):
        # Authenticate manually using email and password
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        if user.verification_status != 'approved':
            raise serializers.ValidationError("Your account is not approved by admin.")

        attrs['user'] = user
        # print( super().validate(attrs))
        return super().validate(attrs)
    

class StudentRegisterSerializer(RegisterSerializer):
    username = None
    full_name = serializers.CharField()
    course = serializers.ChoiceField(choices=COURSES)
    year = serializers.ChoiceField(choices=YEAR_CHOICES)
    semester = serializers.ChoiceField(choices=SEMESTER_CHOICES)
    college = serializers.CharField()
    mobile_number = serializers.CharField()

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['full_name'] = self.validated_data.get('full_name')
        data['course'] = self.validated_data.get('course')
        data['branch'] = self.validated_data.get('branch')
        data['year'] = self.validated_data.get('year')
        data['semester'] = self.validated_data.get('semester')
        data['college'] = self.validated_data.get('college')
        data['mobile_number'] = self.validated_data.get('mobile_number')
        return data

    def save(self, request):
        user = super().save(request)
        user.full_name = self.validated_data.get('full_name')
        user.course = self.validated_data.get('course')
        user.branch = self.validated_data.get('branch')
        user.year = self.validated_data.get('year')
        user.semester = self.validated_data.get('semester')
        user.college = self.validated_data.get('college')
        user.branch = self.validated_data.get('branch')
        user.mobile_number = self.validated_data.get('mobile_number')
        user.verification_status = 'pending'
        user.save()
        return user
