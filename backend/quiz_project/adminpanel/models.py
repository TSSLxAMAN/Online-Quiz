from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

# Create your models here.

YEAR_CHOICES = [('1', 'First Year'), ('2', 'Second Year'), ('3', 'Third Year'), ('4', 'Fourth Year')]
SEMESTER_CHOICES = [(str(i), f'Semester {i}') for i in range(1, 9)]
VERIFICATION_STATUS = [('pending', 'Pending'), ('approved', 'Approved'), ('banned', 'Banned')]
COURSES = [('B.Tech','B.Tech'),('M.Tech','M.Tech'),('BCA','BCA'),('MCA','MCA'),('Diploma','Diploma'),('Polytechnic','Polytechnic')]
BRANCHES= [("CSE","CSE"),("IT","IT"),("ECE","ECE"),("EEE","EEE"),("MECH","MECH"),("CIVIL","CIVIL"),("OTHERS","OTHERS")]

class StudentUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("verification_status", "approved")
        return self.create_user(email, password, **extra_fields)

    
class StudentUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)
    course = models.CharField(max_length=16,choices=COURSES)
    branch = models.CharField(max_length=16,choices=BRANCHES,blank=True, null=True)
    year = models.CharField(max_length=1, choices=YEAR_CHOICES)
    semester = models.CharField(max_length=1, choices=SEMESTER_CHOICES)
    college = models.CharField(max_length=200)
    mobile_number = models.CharField(max_length=15)
    verification_status = models.CharField(max_length=10, choices=VERIFICATION_STATUS, default='pending')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'mobile_number']

    objects = StudentUserManager()

    def __str__(self):
        return self.email