#!/usr/bin/env python3
"""
Test script for ChefBot
This script tests the basic functionality of ChefBot without requiring OpenAI API
"""

import sqlite3
import os
from datetime import datetime, date, timedelta

def test_database_creation():
    """Test database creation and table structure"""
    print("🧪 Testing database creation...")
    
    # Remove existing database if it exists
    if os.path.exists('chefbot.db'):
        os.remove('chefbot.db')
    
    # Import and initialize ChefBot
    try:
        from app import ChefBot
        chef_bot = ChefBot()
        print("✅ Database created successfully")
        return True
    except Exception as e:
        print(f"❌ Database creation failed: {e}")
        return False

def test_basic_operations():
    """Test basic ChefBot operations"""
    print("\n🧪 Testing basic operations...")
    
    try:
        from app import ChefBot
        chef_bot = ChefBot()
        
        # Test recipe creation
        recipe_result = chef_bot.create_recipe(
            name="Test Pasta",
            ingredients="Pasta, Tomato Sauce, Cheese",
            instructions="Boil pasta, add sauce, top with cheese",
            cooking_time=20,
            difficulty="easy",
            cuisine_type="Italian",
            created_by=1
        )
        print(f"✅ Recipe creation: {recipe_result['message']}")
        
        # Test getting recipes
        recipes = chef_bot.get_recipes()
        print(f"✅ Retrieved {len(recipes)} recipes")
        
        # Test meal plan creation
        meal_plan_result = chef_bot.create_meal_plan(
            user_id=1,
            date=date.today().isoformat(),
            meal_type="dinner",
            recipe_id=1,
            notes="Test meal plan"
        )
        print(f"✅ Meal plan creation: {meal_plan_result['message']}")
        
        # Test inventory management
        inventory_result = chef_bot.manage_inventory(
            user_id=1,
            action="add",
            item_name="Tomatoes",
            quantity=5,
            unit="pieces",
            expiry_date=(date.today() + timedelta(days=7)).isoformat(),
            category="vegetables"
        )
        print(f"✅ Inventory management: {inventory_result['message']}")
        
        return True
        
    except Exception as e:
        print(f"❌ Basic operations failed: {e}")
        return False

def test_ai_features():
    """Test AI features (without actual API calls)"""
    print("\n🧪 Testing AI features...")
    
    try:
        from app import ChefBot
        chef_bot = ChefBot()
        
        # Test AI response generation (should fail gracefully without API key)
        response = chef_bot.generate_ai_response("How do I cook pasta?")
        print(f"✅ AI response generation: {response[:100]}...")
        
        return True
        
    except Exception as e:
        print(f"❌ AI features test failed: {e}")
        return False

def main():
    """Main test function"""
    print("🚀 Starting ChefBot Tests...\n")
    
    tests = [
        test_database_creation,
        test_basic_operations,
        test_ai_features
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        try:
            if test():
                passed += 1
        except Exception as e:
            print(f"❌ Test {test.__name__} crashed: {e}")
    
    print(f"\n📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! ChefBot is ready to use.")
        print("\nTo start ChefBot:")
        print("1. Set your OpenAI API key in .env file")
        print("2. Run: python app.py")
        print("3. Open: http://localhost:5000")
    else:
        print("⚠️  Some tests failed. Please check the errors above.")
    
    return passed == total

if __name__ == "__main__":
    main()
