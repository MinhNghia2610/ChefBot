from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3
import json
import datetime
import os
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
openai.api_key = os.getenv('OPENAI_API_KEY')

class ChefBot:
    def __init__(self):
        self.db_path = 'chefbot.db'
        self.init_database()
    
    def init_database(self):
        """Initialize SQLite database with required tables"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Recipes table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS recipes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                ingredients TEXT NOT NULL,
                instructions TEXT NOT NULL,
                cooking_time INTEGER,
                difficulty TEXT,
                cuisine_type TEXT,
                created_by INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (created_by) REFERENCES users (id)
            )
        ''')
        
        # Meal plans table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS meal_plans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                date DATE NOT NULL,
                meal_type TEXT NOT NULL,
                recipe_id INTEGER,
                notes TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (recipe_id) REFERENCES recipes (id)
            )
        ''')
        
        # Refrigerator inventory table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS inventory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                item_name TEXT NOT NULL,
                quantity REAL NOT NULL,
                unit TEXT NOT NULL,
                expiry_date DATE,
                category TEXT,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        ''')
        
        # Cooking lessons table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS lessons (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                difficulty TEXT,
                duration INTEGER,
                content TEXT,
                video_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # User connections table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS connections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                connected_user_id INTEGER,
                connection_type TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (connected_user_id) REFERENCES users (id)
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def generate_ai_response(self, prompt, max_tokens=500):
        """Generate AI response using OpenAI with fallback to offline cooking assistance"""
        try:
            from openai import OpenAI
            client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
            
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are ChefBot, a helpful cooking AI assistant. Provide clear, practical cooking advice and recipes."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            # Fallback to offline cooking assistance when AI is unavailable
            return self.get_offline_cooking_assistance(prompt)
    
    def get_offline_cooking_assistance(self, prompt):
        """Provide offline cooking assistance when AI is unavailable"""
        prompt_lower = prompt.lower()
        
        # More comprehensive keyword matching
        if any(word in prompt_lower for word in ['knife', 'cut', 'chop', 'slice', 'dice', 'mince', 'julienne', 'brunoise']):
            return """🔪 **Knife Skills Tips:**
• Always use a sharp knife - dull knives are more dangerous
• Keep your fingers curled under when chopping
• Use a cutting board that won't slip
• Practice the claw grip: curl your fingertips under your knuckles
• Start with basic cuts: julienne, brunoise, and chiffonade
• Keep your knife sharp with regular honing and sharpening"""
        
        elif any(word in prompt_lower for word in ['pasta', 'noodle', 'spaghetti', 'fettuccine', 'penne', 'rigatoni', 'lasagna']):
            return """🍝 **Perfect Pasta Guide:**
• Use plenty of water (4-6 quarts per pound of pasta)
• Salt the water generously (should taste like seawater)
• Don't add oil to the water
• Cook until al dente (firm to the bite)
• Reserve 1 cup of pasta water before draining
• Don't rinse pasta after draining
• Toss pasta with sauce immediately after draining"""
        
        elif any(word in prompt_lower for word in ['rice', 'risotto', 'grain', 'quinoa', 'couscous', 'barley', 'farro']):
            return """🍚 **Rice & Grain Cooking Basics:**
• Rinse rice until water runs clear
• Use the right ratio: 1 cup rice to 1.5-2 cups water
• Bring to boil, then reduce to simmer
• Don't lift the lid while cooking
• Let rest for 10 minutes after cooking
• Fluff with a fork before serving
• For risotto: add liquid gradually and stir constantly"""
        
        elif any(word in prompt_lower for word in ['meat', 'chicken', 'beef', 'pork', 'lamb', 'turkey', 'duck', 'sear', 'roast', 'grill']):
            return """🥩 **Meat Cooking Tips:**
• Let meat come to room temperature before cooking
• Season generously with salt and pepper
• Use high heat for searing, low heat for cooking through
• Don't overcrowd the pan
• Let meat rest for 5-10 minutes after cooking
• Use a meat thermometer for accuracy
• For chicken: cook to 165°F internal temperature
• For beef: 145°F for medium-rare, 160°F for medium"""
        
        elif any(word in prompt_lower for word in ['sauce', 'gravy', 'dressing', 'marinade', 'glaze', 'reduction']):
            return """🥘 **Sauce Making Fundamentals:**
• Start with a roux for thickening (equal parts fat and flour)
• Deglaze the pan with wine or broth
• Reduce liquids to concentrate flavors
• Season gradually and taste often
• Finish with butter or cream for richness
• Strain for smooth texture if needed
• Balance flavors: sweet, sour, salty, umami"""
        
        elif any(word in prompt_lower for word in ['bake', 'oven', 'bread', 'cake', 'cookie', 'pastry', 'muffin', 'brownie']):
            return """🍞 **Baking Essentials:**
• Preheat your oven properly
• Measure ingredients accurately
• Don't overmix batter
• Use room temperature ingredients
• Check for doneness with a toothpick
• Let baked goods cool before cutting
• For bread: look for golden brown crust and hollow sound when tapped"""
        
        elif any(word in prompt_lower for word in ['salad', 'vegetable', 'greens', 'lettuce', 'spinach', 'kale', 'arugula']):
            return """🥗 **Fresh Salad Tips:**
• Wash greens thoroughly and dry completely
• Tear instead of cut for better texture
• Dress at the last minute to prevent wilting
• Use a variety of textures and colors
• Season with salt before dressing
• Add nuts or cheese for protein
• For vinaigrette: 3 parts oil to 1 part acid"""
        
        elif any(word in prompt_lower for word in ['egg', 'scramble', 'omelet', 'poach', 'fry', 'boil']):
            return """🥚 **Egg Cooking Mastery:**
• For scrambled eggs: cook low and slow, don't over-stir
• For omelets: use high heat, don't overfill
• For poached eggs: use fresh eggs and simmering water
• For fried eggs: start with hot pan, don't flip too early
• For hard-boiled: start in cold water, ice bath after cooking"""
        
        elif any(word in prompt_lower for word in ['fish', 'seafood', 'salmon', 'tuna', 'shrimp', 'scallop']):
            return """🐟 **Seafood Cooking Guide:**
• Don't overcook - seafood cooks quickly
• For fish: cook until it flakes easily with a fork
• For shrimp: cook until pink and curled
• For scallops: sear on high heat, don't move until ready to flip
• Season lightly - seafood has delicate flavor
• Use fresh seafood when possible"""
        
        elif any(word in prompt_lower for word in ['soup', 'stew', 'broth', 'stock', 'bisque', 'chowder']):
            return """🍲 **Soup & Stew Basics:**
• Start with good stock or broth
• Build flavors by sautéing aromatics first
• Don't boil vigorously - simmer gently
• Season at the end to avoid over-salting
• For stews: brown meat first for better flavor
• Let soups rest before serving for flavors to meld"""
        
        elif any(word in prompt_lower for word in ['spice', 'herb', 'seasoning', 'salt', 'pepper', 'garlic', 'onion']):
            return """🌿 **Seasoning & Spices:**
• Salt enhances flavors - use it throughout cooking
• Fresh herbs: add delicate herbs at the end
• Dried herbs: add early to release flavors
• Toast whole spices before grinding
• Balance flavors: sweet, sour, salty, bitter, umami
• Taste as you go and adjust seasoning"""
        
        elif any(word in prompt_lower for word in ['temperature', 'heat', 'hot', 'cold', 'warm', 'cool']):
            return """🌡️ **Temperature Control:**
• High heat: for searing, browning, and quick cooking
• Medium heat: for most cooking tasks
• Low heat: for slow cooking and keeping warm
• Don't overcrowd the pan - it lowers the temperature
• Use the right burner size for your pan
• Preheat pans and ovens properly"""
        
        elif any(word in prompt_lower for word in ['time', 'duration', 'how long', 'minutes', 'hours']):
            return """⏰ **Cooking Timing:**
• Always read recipe timing before starting
• Prep ingredients first (mise en place)
• Use a timer for precise cooking
• Don't rush - good food takes time
• Rest meat after cooking for better texture
• Some dishes improve with longer cooking times"""
        
        elif any(word in prompt_lower for word in ['recipe', 'ingredient', 'measurement', 'portion', 'serving']):
            return """📖 **Recipe & Ingredient Tips:**
• Read the entire recipe before starting
• Gather all ingredients and equipment first
• Measure ingredients accurately
• Use fresh, quality ingredients when possible
• Don't substitute ingredients unless you understand the chemistry
• Taste and adjust seasoning throughout cooking"""
        
        else:
            # Provide more helpful guidance based on the actual question
            if '?' in prompt:
                return f"""🤔 **I understand you're asking about cooking, but I need more specific keywords to help you best.**

**Your question:** "{prompt}"

💡 **Try asking about specific topics like:**
• "How do I cook pasta perfectly?"
• "What are the best knife techniques?"
• "How do I make a good sauce?"
• "What temperature should I cook chicken to?"
• "How do I bake bread?"

🔍 **Or use these keywords in your question:**
• Knife skills, pasta, rice, meat, sauce, baking, salad, eggs, fish, soup, spices, temperature, timing, recipes"""
            else:
                return """🍳 **Welcome to ChefBot's Cooking Assistant!**

I'm here to help you with all your cooking questions. Here are some popular topics I can help with:

🔪 **Techniques:** Knife skills, cooking methods, temperature control
🍝 **Foods:** Pasta, rice, meat, fish, vegetables, baking
🥘 **Skills:** Sauce making, seasoning, timing, measurements
📚 **Basics:** Recipe reading, ingredient prep, kitchen safety

💡 **Just ask me anything about cooking!** For example:
• "How do I cook perfect pasta?"
• "What are the best knife techniques?"
• "How do I make a good sauce?"
• "What temperature should I cook chicken to?" """
    
    def create_meal_plan(self, user_id, date, meal_type, recipe_id=None, notes=""):
        """Create a meal plan entry"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO meal_plans (user_id, date, meal_type, recipe_id, notes)
            VALUES (?, ?, ?, ?, ?)
        ''', (user_id, date, meal_type, recipe_id, notes))
        
        plan_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return {"id": plan_id, "message": "Meal plan created successfully"}
    
    def get_meal_plans(self, user_id, date=None):
        """Get meal plans for a user"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        if date:
            cursor.execute('''
                SELECT mp.*, r.name as recipe_name
                FROM meal_plans mp
                LEFT JOIN recipes r ON mp.recipe_id = r.id
                WHERE mp.user_id = ? AND mp.date = ?
                ORDER BY mp.meal_type
            ''', (user_id, date))
        else:
            cursor.execute('''
                SELECT mp.*, r.name as recipe_name
                FROM meal_plans mp
                LEFT JOIN recipes r ON mp.recipe_id = r.id
                WHERE mp.user_id = ?
                ORDER BY mp.date DESC, mp.meal_type
            ''', (user_id,))
        
        plans = cursor.fetchall()
        conn.close()
        
        return plans
    
    def provide_cooking_guidance(self, recipe_name, step_number=None):
        """Provide step-by-step cooking guidance"""
        prompt = f"Provide detailed cooking guidance for {recipe_name}"
        if step_number:
            prompt += f" at step {step_number}"
        prompt += ". Include timing, temperature, and technique tips."
        
        return self.generate_ai_response(prompt)
    
    def create_recipe(self, name, ingredients, instructions, cooking_time, difficulty, cuisine_type, created_by):
        """Create a new recipe"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO recipes (name, ingredients, instructions, cooking_time, difficulty, cuisine_type, created_by)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (name, ingredients, instructions, cooking_time, difficulty, cuisine_type, created_by))
        
        recipe_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return {"id": recipe_id, "message": "Recipe created successfully"}
    
    def get_recipes(self, cuisine_type=None, difficulty=None):
        """Get recipes with optional filters"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        query = "SELECT * FROM recipes WHERE 1=1"
        params = []
        
        if cuisine_type:
            query += " AND cuisine_type = ?"
            params.append(cuisine_type)
        
        if difficulty:
            query += " AND difficulty = ?"
            params.append(difficulty)
        
        query += " ORDER BY created_at DESC"
        
        cursor.execute(query, params)
        recipes = cursor.fetchall()
        conn.close()
        
        return recipes
    
    def manage_inventory(self, user_id, action, item_name, quantity=None, unit=None, expiry_date=None, category=None):
        """Manage refrigerator inventory"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        if action == "add":
            cursor.execute('''
                INSERT INTO inventory (user_id, item_name, quantity, unit, expiry_date, category)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (user_id, item_name, quantity, unit, expiry_date, category))
            message = "Item added to inventory"
        elif action == "remove":
            cursor.execute('''
                DELETE FROM inventory 
                WHERE user_id = ? AND item_name = ? AND quantity = ? AND unit = ?
            ''', (user_id, item_name, quantity, unit))
            message = "Item removed from inventory"
        elif action == "update":
            cursor.execute('''
                UPDATE inventory 
                SET quantity = ?, expiry_date = ?
                WHERE user_id = ? AND item_name = ?
            ''', (quantity, expiry_date, user_id, item_name))
            message = "Inventory updated"
        elif action == "get":
            cursor.execute('''
                SELECT * FROM inventory 
                WHERE user_id = ?
                ORDER BY expiry_date ASC
            ''', (user_id,))
            items = cursor.fetchall()
            conn.close()
            return items
        
        conn.commit()
        conn.close()
        return {"message": message}
    
    def get_cooking_lessons(self, difficulty=None):
        """Get cooking lessons"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        if difficulty:
            cursor.execute('SELECT * FROM lessons WHERE difficulty = ? ORDER BY created_at DESC', (difficulty,))
        else:
            cursor.execute('SELECT * FROM lessons ORDER BY created_at DESC')
        
        lessons = cursor.fetchall()
        conn.close()
        
        return lessons
    
    def create_lesson(self, title, description, difficulty, duration, content, video_url=None):
        """Create a new cooking lesson"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO lessons (title, description, difficulty, duration, content, video_url)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (title, description, difficulty, duration, content, video_url))
        
        lesson_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return {"id": lesson_id, "message": "Lesson created successfully"}
    
    def connect_users(self, user_id, connected_user_id, connection_type="friend"):
        """Connect users for social features"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Check if connection already exists
        cursor.execute('''
            SELECT * FROM connections 
            WHERE (user_id = ? AND connected_user_id = ?) 
            OR (user_id = ? AND connected_user_id = ?)
        ''', (user_id, connected_user_id, connected_user_id, user_id))
        
        if cursor.fetchone():
            conn.close()
            return {"message": "Connection already exists"}
        
        cursor.execute('''
            INSERT INTO connections (user_id, connected_user_id, connection_type)
            VALUES (?, ?, ?)
        ''', (user_id, connected_user_id, connection_type))
        
        conn.commit()
        conn.close()
        
        return {"message": "Users connected successfully"}
    
    def get_connections(self, user_id):
        """Get user connections"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT c.*, u.username as connected_username
            FROM connections c
            JOIN users u ON c.connected_user_id = u.id
            WHERE c.user_id = ?
        ''', (user_id,))
        
        connections = cursor.fetchall()
        conn.close()
        
        return connections
    
    def check_api_status(self):
        """Check if OpenAI API is available and working"""
        try:
            from openai import OpenAI
            client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
            
            # Try a simple API call
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": "Hello"}],
                max_tokens=5
            )
            return {"status": "online", "message": "AI service is working"}
        except Exception as e:
            error_msg = str(e)
            if "insufficient_quota" in error_msg or "429" in error_msg:
                return {
                    "status": "quota_exceeded", 
                    "message": "AI service quota exceeded. Using offline cooking assistance.",
                    "suggestion": "Check your OpenAI billing or upgrade your plan."
                }
            elif "api_key" in error_msg.lower():
                return {
                    "status": "no_api_key", 
                    "message": "No OpenAI API key configured.",
                    "suggestion": "Add your API key to the .env file."
                }
            else:
                return {
                    "status": "error", 
                    "message": f"AI service error: {error_msg}",
                    "suggestion": "Check your internet connection and API key."
                }

# Initialize ChefBot
chef_bot = ChefBot()

# API Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/meal-plan', methods=['POST'])
def create_meal_plan():
    data = request.json
    result = chef_bot.create_meal_plan(
        user_id=data['user_id'],
        date=data['date'],
        meal_type=data['meal_type'],
        recipe_id=data.get('recipe_id'),
        notes=data.get('notes', '')
    )
    return jsonify(result)

@app.route('/api/meal-plans/<int:user_id>')
def get_meal_plans(user_id):
    date = request.args.get('date')
    plans = chef_bot.get_meal_plans(user_id, date)
    return jsonify(plans)

@app.route('/api/cooking-guidance')
def cooking_guidance():
    recipe_name = request.args.get('recipe')
    step = request.args.get('step')
    guidance = chef_bot.provide_cooking_guidance(recipe_name, step)
    return jsonify({"guidance": guidance})

@app.route('/api/recipes', methods=['POST'])
def create_recipe():
    data = request.json
    result = chef_bot.create_recipe(
        name=data['name'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        cooking_time=data['cooking_time'],
        difficulty=data['difficulty'],
        cuisine_type=data['cuisine_type'],
        created_by=data['created_by']
    )
    return jsonify(result)

@app.route('/api/recipes')
def get_recipes():
    cuisine_type = request.args.get('cuisine_type')
    difficulty = request.args.get('difficulty')
    recipes = chef_bot.get_recipes(cuisine_type, difficulty)
    return jsonify(recipes)

@app.route('/api/inventory', methods=['POST'])
def manage_inventory():
    data = request.json
    result = chef_bot.manage_inventory(
        user_id=data['user_id'],
        action=data['action'],
        item_name=data['item_name'],
        quantity=data.get('quantity'),
        unit=data.get('unit'),
        expiry_date=data.get('expiry_date'),
        category=data.get('category')
    )
    return jsonify(result)

@app.route('/api/inventory/<int:user_id>')
def get_inventory(user_id):
    items = chef_bot.manage_inventory(user_id, "get")
    return jsonify(items)

@app.route('/api/lessons')
def get_lessons():
    difficulty = request.args.get('difficulty')
    lessons = chef_bot.get_cooking_lessons(difficulty)
    return jsonify(lessons)

@app.route('/api/lessons', methods=['POST'])
def create_lesson():
    data = request.json
    result = chef_bot.create_lesson(
        title=data['title'],
        description=data['description'],
        difficulty=data['difficulty'],
        duration=data['duration'],
        content=data['content'],
        video_url=data.get('video_url')
    )
    return jsonify(result)

@app.route('/api/connect', methods=['POST'])
def connect_users():
    data = request.json
    result = chef_bot.connect_users(
        user_id=data['user_id'],
        connected_user_id=data['connected_user_id'],
        connection_type=data.get('connection_type', 'friend')
    )
    return jsonify(result)

@app.route('/api/connections/<int:user_id>')
def get_connections(user_id):
    connections = chef_bot.get_connections(user_id)
    return jsonify(connections)

@app.route('/api/ai-chat', methods=['POST'])
def ai_chat():
    data = request.json
    response = chef_bot.generate_ai_response(data['message'])
    return jsonify({"response": response})

@app.route('/api/status')
def check_status():
    """Check ChefBot and AI service status"""
    status = chef_bot.check_api_status()
    return jsonify(status)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
