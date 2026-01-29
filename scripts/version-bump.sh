#!/bin/bash

# Usage: ./scripts/version-bump.sh <version> <message>
# Example: ./scripts/version-bump.sh v0.2.0-auth "Authentication module complete"

VERSION=$1
MESSAGE=$2

if [ -z "$VERSION" ] || [ -z "$MESSAGE" ]; then
    echo "Usage: ./scripts/version-bump.sh <version> <message>"
    exit 1
fi

echo "Creating version $VERSION..."

# Add all changes
git add .

# Commit with version message
git commit -m "chore: release $VERSION

$MESSAGE"

# Create annotated tag
git tag -a "$VERSION" -m "$MESSAGE"

# Push commits and tags
git push origin main
git push origin "$VERSION"

echo "✅ Version $VERSION released and pushed to GitHub!"
