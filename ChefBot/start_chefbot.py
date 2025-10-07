#!/usr/bin/env python3
"""
ChefBot Startup Script
This script helps you start ChefBot with proper configuration
"""

import os
import sys
import subprocess
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        print(f"Current version: {sys.version}")
        return False
    print(f"✅ Python version: {sys.version.split()[0]}")
    return True

def check_dependencies():
    """Check if required packages are installed"""
    print("\n📦 Checking dependencies...")
    
    required_packages = [
        'flask', 'flask-cors', 'openai', 'python-dotenv'
    ]   
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"✅ {package}")
        except ImportError:
            missing_packages.append(package)
            print(f"❌ {package}")
    
    if missing_packages:
        print(f"\n⚠️  Missing packages: {', '.join(missing_packages)}")
        print("Installing missing packages...")
        
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install'] + missing_packages)
            print("✅ Dependencies installed successfully")
        except subprocess.CalledProcessError:
            print("❌ Failed to install dependencies")
            return False
    
    return True

def check_environment():
    """Check environment configuration"""
    print("\n🔧 Checking environment configuration...")
    
    env_file = Path('.env')
    
    if not env_file.exists():
        print("⚠️  .env file not found")
        print("Creating .env file from template...")
        
        try:
            # Copy env_example.txt to .env
            if Path('env_example.txt').exists():
                with open('env_example.txt', 'r') as src, open('.env', 'w') as dst:
                    dst.write(src.read())
                print("✅ .env file created from template")
            else:
                print("❌ env_example.txt not found")
                return False
        except Exception as e:
            print(f"❌ Failed to create .env file: {e}")
            return False
    
    # Check if OpenAI API key is set
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except ImportError:
        print("❌ python-dotenv not installed")
        return False
        
    api_key = os.getenv('OPENAI_API_KEY')
    
    if not api_key or api_key == 'your_openai_api_key_here':
        print("⚠️  OpenAI API key not configured")
        print("Please edit .env file and add your OpenAI API key")
        print("You can get one from: https://platform.openai.com/api-keys")
        return False
    
    print("✅ Environment configured")
    return True

def start_chefbot():
    """Start ChefBot application"""
    print("\n🚀 Starting ChefBot...")
    
    try:
        # Import and start the app
        from app import app
        print("✅ ChefBot started successfully!")
        print("\n🌐 Open your browser and go to: http://localhost:5000")
        print("🛑 Press Ctrl+C to stop ChefBot")
        
        app.run(debug=True, host='0.0.0.0', port=5000)
        
    except ImportError as e:
        print(f"❌ Failed to import ChefBot: {e}")
        return False
    except Exception as e:
        print(f"❌ Failed to start ChefBot: {e}")
        return False

def main():
    """Main startup function"""
    print("🍳 Welcome to ChefBot - Your AI Cooking Assistant!")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        return
    
    # Check dependencies
    if not check_dependencies():
        print("\n❌ Please install dependencies manually:")
        print("pip install -r requirements.txt")
        return
    
    # Check environment
    if not check_environment():
        print("\n❌ Please configure your environment first")
        print("1. Edit .env file")
        print("2. Add your OpenAI API key")
        print("3. Run this script again")
        return
    
    # Start ChefBot
    start_chefbot()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 ChefBot stopped. Goodbye!")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        print("Please check the error and try again")
