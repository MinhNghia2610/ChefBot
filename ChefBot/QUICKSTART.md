# ChefBot Quick Start Guide

Get ChefBot up and running in 5 minutes! 🚀

## Prerequisites
- Python 3.8 or higher
- OpenAI API key (get one at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys))

## Quick Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
# Copy the environment template
cp env_example.txt .env

# Edit .env and add your OpenAI API key
# Replace 'your_openai_api_key_here' with your actual API key
```

### 3. Run ChefBot
```bash
python start_chefbot.py
```

### 4. Open Your Browser
Navigate to: [http://localhost:5000](http://localhost:5000)

## Alternative: Manual Start

If you prefer to start manually:

```bash
# Set your API key
export OPENAI_API_KEY="your_actual_api_key_here"

# Run the app
python app.py
```

## What You'll See

- **Homepage**: Beautiful landing page with ChefBot features
- **Chat Interface**: AI-powered cooking assistant
- **Dashboard**: Quick access to all features
- **Demo Data**: Sample recipes, meal plans, and lessons

## Test the System

Run the test script to verify everything works:

```bash
python test_chefbot.py
```

## Add Demo Data

Populate the database with sample content:

```bash
python demo_data.py
```

## Features to Try

1. **Chat with ChefBot**: Ask cooking questions
2. **Browse Recipes**: View sample recipes
3. **Check Inventory**: See demo inventory items
4. **Explore Lessons**: Browse cooking tutorials
5. **View Connections**: See user relationships

## Troubleshooting

### Common Issues

**"Module not found" errors**
```bash
pip install -r requirements.txt
```

**"OpenAI API key not configured"**
- Check your `.env` file
- Ensure `OPENAI_API_KEY` is set correctly

**"Port already in use"**
- Change the port in `app.py` or `start_chefbot.py`
- Kill the process using the port

**Database errors**
```bash
# Remove and recreate the database
rm chefbot.db
python app.py
```

### Getting Help

- Check the full [README.md](README.md)
- Run `python test_chefbot.py` for diagnostics
- Ensure all dependencies are installed

## Next Steps

- Customize the UI in `templates/index.html`
- Add your own recipes and meal plans
- Extend the AI prompts in `app.py`
- Integrate with external APIs

---

**Happy Cooking! 🍳✨**

Need help? Check the full documentation or create an issue in the repository.
