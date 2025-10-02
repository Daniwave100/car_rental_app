# Author: Daniel Canhedo

from backend.supabase_client import supabase
from fastapi import APIRouter

router = APIRouter(prefix="/auth")

@router.post("/sign-up")
async def sign_up(details: dict):
    try:
        # log to see payload hit server
        print("HIT /auth/sign-up", flush=True)
        print("details:", details, flush=True)

        user = supabase.auth.sign_up({"email": details.get("email"), "password": details.get("password")})
        return {"status": "ok", "user": user}
    except Exception as e:
        print(f"Error signing up: {e}")
        return None
    
@router.post("/sign-in")
async def sign_in(details:dict):
    try:
        # log to see payload hit server
        print("HIT /auth/sign-in", flush=True)
        print("details:", details, flush=True)

        user = supabase.auth.sign_in_with_password({"email": details.get("email"), "password": details.get("password")})
        return {"status": "ok", "user": user}
    except Exception as e:
        print(f"Error signing in: {e}")
        return None
    
# v inactive for now

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