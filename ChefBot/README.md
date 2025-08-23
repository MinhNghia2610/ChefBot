# ChefBot - AI-Powered Cooking Assistant

ChefBot is an intelligent AI cooking assistant that helps you with meal planning, recipe creation, cooking guidance, inventory management, cooking lessons, and community connections.

## Features

### 🍽️ **Meal Planning**
- Create personalized weekly meal plans
- AI-powered meal suggestions based on preferences
- Track daily meals and nutritional goals
- Integration with recipe database

### 👨‍🍳 **Cooking Guidance**
- Step-by-step cooking instructions
- Real-time AI assistance during cooking
- Temperature and timing guidance
- Technique tips and best practices

### 📖 **Recipe Creation**
- Create and save your own recipes
- Share recipes with the community
- Categorize by cuisine type and difficulty
- Include ingredients, instructions, and cooking times

### 🧊 **Refrigerator Management**
- Track ingredient inventory
- Monitor expiry dates
- Reduce food waste
- Smart shopping list generation

### 🎓 **Cooking Lessons**
- Interactive cooking tutorials
- Skill-based learning paths
- Video content integration
- Progress tracking

### 👥 **Community Connection**
- Connect with fellow food enthusiasts
- Share cooking experiences
- Find cooking mentors
- Build a culinary network

## Installation

### Prerequisites
- Python 3.8 or higher
- OpenAI API key (for AI features)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ChefBot
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**
   ```bash
   # Copy the example environment file
   cp env_example.txt .env
   
   # Edit .env and add your OpenAI API key
   OPENAI_API_KEY=your_actual_api_key_here
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## API Endpoints

### Core Features
- `POST /api/meal-plan` - Create meal plans
- `GET /api/meal-plans/<user_id>` - Get user meal plans
- `POST /api/recipes` - Create recipes
- `GET /api/recipes` - Get recipes with filters
- `POST /api/inventory` - Manage inventory
- `GET /api/inventory/<user_id>` - Get user inventory
- `POST /api/lessons` - Create cooking lessons
- `GET /api/lessons` - Get available lessons
- `POST /api/connect` - Connect users
- `GET /api/connections/<user_id>` - Get user connections

### AI Features
- `POST /api/ai-chat` - Chat with ChefBot AI
- `GET /api/cooking-guidance` - Get cooking guidance

## Database Schema

The application uses SQLite with the following main tables:
- **users** - User accounts and profiles
- **recipes** - Recipe storage and metadata
- **meal_plans** - User meal planning data
- **inventory** - Refrigerator inventory tracking
- **lessons** - Cooking lesson content
- **connections** - User social connections

## Usage Examples

### Creating a Meal Plan
```python
import requests

data = {
    "user_id": 1,
    "date": "2024-01-15",
    "meal_type": "dinner",
    "recipe_id": 5,
    "notes": "Family dinner night"
}

response = requests.post('http://localhost:5000/api/meal-plan', json=data)
print(response.json())
```

### Getting Cooking Guidance
```python
import requests

params = {
    "recipe": "Spaghetti Carbonara",
    "step": 3
}

response = requests.get('http://localhost:5000/api/cooking-guidance', params=params)
print(response.json()['guidance'])
```

### Chatting with AI
```python
import requests

data = {
    "message": "How do I make the perfect risotto?"
}

response = requests.post('http://localhost:5000/api/ai-chat', json=data)
print(response.json()['response'])
```

## Configuration

### Environment Variables
- `OPENAI_API_KEY` - Your OpenAI API key for AI features
- `FLASK_ENV` - Flask environment (development/production)
- `FLASK_DEBUG` - Enable/disable debug mode
- `HOST` - Server host address
- `PORT` - Server port number

### Customization
You can customize ChefBot by:
- Modifying the AI prompts in `app.py`
- Adding new recipe categories
- Customizing the UI theme in `templates/index.html`
- Extending the database schema
- Adding new API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## Roadmap

- [ ] Mobile app development
- [ ] Voice commands integration
- [ ] Recipe recommendation engine
- [ ] Nutritional analysis
- [ ] Shopping list automation
- [ ] Social media integration
- [ ] Multi-language support

---

**Happy Cooking with ChefBot! 🍳✨**
