#!/bin/bash

echo "🚨 CREDENTIAL CLEANUP SCRIPT"
echo "This will remove sensitive data from git history"
echo ""

# Backup current branch
echo "📦 Creating backup branch..."
git branch backup-before-cleanup

# Remove the specific password from git history
echo "🧹 Removing credentials from git history..."
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch backend/src/main/resources/application.properties' \
  --prune-empty --tag-name-filter cat -- --all

# Alternative approach using git-filter-repo (if available)
# git filter-repo --path backend/src/main/resources/application.properties --invert-paths

echo "✅ Cleanup complete!"
echo ""
echo "⚠️  IMPORTANT NEXT STEPS:"
echo "1. Force push to overwrite GitHub history:"
echo "   git push origin --force --all"
echo ""
echo "2. Tell all collaborators to re-clone the repository"
echo "3. Change your database password immediately"
echo "4. Update your .env file with the new password"
echo ""
echo "🔒 Security Note: Anyone who had access to the old commits"
echo "   can still see the credentials. Consider the old password compromised."