#!/usr/bin/env python3
"""
Demo Data Script for ChefBot
This script populates the database with sample data for demonstration
"""

import sqlite3
from datetime import datetime, date, timedelta

def create_demo_data():
    """Create demo data for ChefBot"""
    print("🍳 Creating demo data for ChefBot...")
    
    # Connect to database
    conn = sqlite3.connect('chefbot.db')
    cursor = conn.cursor()
    
    try:
        # Create demo users
        print("👥 Creating demo users...")
        cursor.execute('''
            INSERT OR REPLACE INTO users (id, username, email, created_at)
            VALUES 
                (1, 'chef_john', 'john@example.com', CURRENT_TIMESTAMP),
                (2, 'cooking_master', 'master@example.com', CURRENT_TIMESTAMP),
                (3, 'foodie_sarah', 'sarah@example.com', CURRENT_TIMESTAMP)
        ''')
        
        # Create demo recipes
        print("📖 Creating demo recipes...")
        demo_recipes = [
            (1, 'Spaghetti Carbonara', 'Spaghetti, Eggs, Pecorino Cheese, Pancetta, Black Pepper', 
             '1. Cook pasta al dente\n2. Cook pancetta until crispy\n3. Mix eggs and cheese\n4. Combine all ingredients', 
             25, 'medium', 'Italian', 1),
            (2, 'Chicken Stir Fry', 'Chicken Breast, Vegetables, Soy Sauce, Ginger, Garlic', 
             '1. Cut chicken into pieces\n2. Stir fry chicken\n3. Add vegetables\n4. Season with sauce', 
             30, 'easy', 'Asian', 2),
            (3, 'Classic Caesar Salad', 'Romaine Lettuce, Parmesan, Croutons, Caesar Dressing', 
             '1. Wash and chop lettuce\n2. Make dressing\n3. Toss ingredients\n4. Top with cheese', 
             15, 'easy', 'American', 3),
            (4, 'Beef Tacos', 'Ground Beef, Tortillas, Onions, Tomatoes, Spices', 
             '1. Cook beef with spices\n2. Warm tortillas\n3. Assemble tacos\n4. Add toppings', 
             35, 'medium', 'Mexican', 1),
            (5, 'Chocolate Cake', 'Flour, Sugar, Cocoa, Eggs, Milk, Butter', 
             '1. Mix dry ingredients\n2. Beat wet ingredients\n3. Combine and bake\n4. Frost when cool', 
             60, 'hard', 'Dessert', 2)
        ]
        
        cursor.executemany('''
            INSERT OR REPLACE INTO recipes (id, name, ingredients, instructions, cooking_time, difficulty, cuisine_type, created_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', demo_recipes)
        
        # Create demo meal plans
        print("📅 Creating demo meal plans...")
        today = date.today()
        demo_meal_plans = [
            (1, 1, today.isoformat(), 'breakfast', 3, 'Quick and healthy start'),
            (2, 1, today.isoformat(), 'lunch', 2, 'Light lunch option'),
            (3, 1, today.isoformat(), 'dinner', 1, 'Family dinner night'),
            (4, 2, (today + timedelta(days=1)).isoformat(), 'breakfast', 3, 'Weekend brunch'),
            (5, 3, (today + timedelta(days=1)).isoformat(), 'dinner', 4, 'Date night dinner')
        ]
        
        cursor.executemany('''
            INSERT OR REPLACE INTO meal_plans (id, user_id, date, meal_type, recipe_id, notes)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', demo_meal_plans)
        
        # Create demo inventory
        print("🧊 Creating demo inventory...")
        demo_inventory = [
            (1, 1, 'Tomatoes', 8, 'pieces', (today + timedelta(days=7)).isoformat(), 'vegetables'),
            (2, 1, 'Chicken Breast', 2, 'kg', (today + timedelta(days=5)).isoformat(), 'meat'),
            (3, 1, 'Milk', 2, 'liters', (today + timedelta(days=10)).isoformat(), 'dairy'),
            (4, 2, 'Onions', 5, 'pieces', (today + timedelta(days=14)).isoformat(), 'vegetables'),
            (5, 2, 'Ground Beef', 1.5, 'kg', (today + timedelta(days=3)).isoformat(), 'meat'),
            (6, 3, 'Lettuce', 2, 'heads', (today + timedelta(days=4)).isoformat(), 'vegetables'),
            (7, 3, 'Cheese', 500, 'grams', (today + timedelta(days=21)).isoformat(), 'dairy')
        ]
        
        cursor.executemany('''
            INSERT OR REPLACE INTO inventory (id, user_id, item_name, quantity, unit, expiry_date, category)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', demo_inventory)
        
        # Create demo lessons
        print("🎓 Creating demo lessons...")
        demo_lessons = [
            (1, 'Knife Skills Basics', 'Learn essential knife techniques for safe and efficient food preparation', 
             'beginner', 45, 'This lesson covers proper knife grip, basic cuts, and safety practices. You\'ll learn julienne, brunoise, and chiffonade cuts.', 'https://example.com/knife-basics'),
            (2, 'Sauce Making Fundamentals', 'Master the art of creating delicious sauces from scratch', 
             'intermediate', 60, 'Learn the five mother sauces and how to create variations. Includes roux making and emulsion techniques.', 'https://example.com/sauce-making'),
            (3, 'Bread Baking Masterclass', 'From simple loaves to artisan breads', 
             'advanced', 90, 'Advanced bread making techniques including sourdough starters, shaping, and scoring. Learn about fermentation and gluten development.', 'https://example.com/bread-baking'),
            (4, 'Pasta Making', 'Handmade pasta from scratch', 
             'intermediate', 75, 'Learn to make various pasta shapes, from simple fettuccine to complex ravioli. Includes dough making and shaping techniques.', 'https://example.com/pasta-making'),
            (5, 'Dessert Fundamentals', 'Essential techniques for sweet treats', 
             'beginner', 60, 'Basic dessert making including custards, mousses, and simple cakes. Learn about temperature control and ingredient ratios.', 'https://example.com/dessert-basics')
        ]
        
        cursor.executemany('''
            INSERT OR REPLACE INTO lessons (id, title, description, difficulty, duration, content, video_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', demo_lessons)
        
        # Create demo connections
        print("👥 Creating demo connections...")
        demo_connections = [
            (1, 1, 2, 'friend'),
            (2, 1, 3, 'mentor'),
            (3, 2, 1, 'friend'),
            (4, 2, 3, 'student'),
            (5, 3, 1, 'mentor'),
            (6, 3, 2, 'friend')
        ]
        
        cursor.executemany('''
            INSERT OR REPLACE INTO connections (id, user_id, connected_user_id, connection_type)
            VALUES (?, ?, ?, ?)
        ''', demo_connections)
        
        # Commit changes
        conn.commit()
        print("✅ Demo data created successfully!")
        
        # Show summary
        print("\n📊 Demo Data Summary:")
        cursor.execute('SELECT COUNT(*) FROM users')
        print(f"Users: {cursor.fetchone()[0]}")
        
        cursor.execute('SELECT COUNT(*) FROM recipes')
        print(f"Recipes: {cursor.fetchone()[0]}")
        
        cursor.execute('SELECT COUNT(*) FROM meal_plans')
        print(f"Meal Plans: {cursor.fetchone()[0]}")
        
        cursor.execute('SELECT COUNT(*) FROM inventory')
        print(f"Inventory Items: {cursor.fetchone()[0]}")
        
        cursor.execute('SELECT COUNT(*) FROM lessons')
        print(f"Lessons: {cursor.fetchone()[0]}")
        
        cursor.execute('SELECT COUNT(*) FROM connections')
        print(f"Connections: {cursor.fetchone()[0]}")
        
    except Exception as e:
        print(f"❌ Error creating demo data: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    create_demo_data()
