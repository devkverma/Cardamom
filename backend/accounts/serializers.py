from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'},
        required=False,
        allow_blank=True
    )
    confirm_password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'},
        required=False,
        allow_blank=True
    )

    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    email = serializers.CharField(required=False, allow_blank=True)
    username = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'confirm_password']
        read_only_fields = ['id']

    def validate(self, attrs):
        # Check all fields manually
        required_fields = ['username', 'email', 'first_name', 'last_name', 'password', 'confirm_password']
        for field in required_fields:
            if not attrs.get(field) or not str(attrs.get(field)).strip():
                raise serializers.ValidationError({"error": "Fields may not be empty"})

        # Username uniqueness
        if CustomUser.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"error": "Username already exists"})

        # Password length
        if len(attrs['password']) < 8:
            raise serializers.ValidationError({"error": "Password must be at least 8 characters"})

        # Password match
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"error": "Passwords do not match"})

        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        return user
