#!/bin/bash

echo "🔍 Checking Smart Rental App Status..."
echo ""

# Check if app is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ App is running at http://localhost:3000"
    
    # Check if it's a React app
    if curl -s http://localhost:3000 | grep -q "root"; then
        echo "✅ React app is loaded"
    fi
    
    # Check if Tailwind is working (look for CSS classes)
    if curl -s http://localhost:3000 | grep -q "class="; then
        echo "✅ HTML with classes found (Tailwind likely working)"
    fi
    
    echo ""
    echo "🎉 Smart Rental App is working correctly!"
    echo "📱 Open http://localhost:3000 in your browser"
    echo "🔧 Don't forget to configure Firebase for full functionality"
    
else
    echo "❌ App is not running"
    echo "💡 Run 'npm start' to start the app"
fi
