from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, style = {'input_type': 'password'}, min_length = 8)
    confirm_password = serializers.CharField(write_only = True, style = {'input_type': 'password'}, min_length = 8)

    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    role = serializers.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone', 'first_name', 'last_name', 'role', 'password', 'confirm_password']
        read_only_fields = ['id']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password" : "Passwords do not match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')

        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            phone=validated_data.get('phone', ''),
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role'],
            password=validated_data['password']
            
        )

        return user