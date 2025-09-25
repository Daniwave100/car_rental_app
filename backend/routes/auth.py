# Author: Daniel Canhedo

from backend.supabase_client import supabase
from fastapi import APIRouter

router = APIRouter(prefix="/auth")

@router.post("/sign-up")
def sign_up(email, password):
    try:
        user = supabase.auth.sign_up({"email": email, "password": password})
        return user
    except Exception as e:
        print(f"Error signing up: {e}")
        return None
    
@router.post("/sign-in")
def sign_in(email, password):
    try:
        user = supabase.auth.sign_in_with_password({"email": email, "password": password})
        return user
    except Exception as e:
        print(f"Error signing in: {e}")
        return None
    
@router.post("/sign-out")
def sign_out():
    try:
        supabase.auth.sign_out()
        return {"message": "Signed out successfully"}
    except Exception as e:
        print(f"Error signing out: {e}")
        return None
    
@router.post("/forgot-password")
def forgot_password(email):
    try:
        response = supabase.auth.reset_password_for_email(email)
        return response
    except Exception as e:
        print(f"Error in forgot password: {e}")
        return None