from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print("Creating user with data:", validated_data)
        try:
            user = User.objects.create_user(**validated_data)
            print("User created successfully:", user)
            return user
        except Exception as e:
            print("Error creating user:", e)
            raise e
