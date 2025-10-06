# Security Guidelines

## Environment Variables & Sensitive Data

### Protected Files
The following files contain sensitive information and are **automatically ignored** by Git:

#### Backend
- `backend/.env` - Contains database credentials and configuration
- `backend/src/main/resources/application-*.properties` - Profile-specific configurations
- `backend/target/` - Build artifacts (may contain compiled configurations)

#### Frontend  
- `frontend/.env` - Contains API keys, Firebase configuration, and other secrets
- `frontend/.env.local` - Local environment overrides
- `frontend/.env.production.local` - Production-specific secrets

### Safe to Commit
- `.env.example` files - Template files with placeholder values
- `application.properties` - Uses environment variable references (e.g., `${DB_PASSWORD}`)

## Development Setup

1. **Copy example files:**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env  # if it exists
   ```

2. **Update with your actual values:**
   - Database credentials
   - API keys
   - Firebase configuration
   - Other environment-specific settings

## Security Checklist

- [ ] Never commit actual passwords, API keys, or secrets
- [ ] Use environment variables for all sensitive configuration
- [ ] Keep `.env` files in `.gitignore`
- [ ] Provide `.env.example` templates for other developers
- [ ] Use different credentials for development, staging, and production
- [ ] Regularly rotate API keys and passwords
- [ ] Review commits before pushing to ensure no secrets are included

## Firebase Configuration

The Firebase configuration in `frontend/.env` contains public-facing identifiers that are meant to be exposed in client-side applications. However, ensure that:

- Firebase Security Rules are properly configured
- API keys have appropriate restrictions
- Authentication is properly implemented

## Database Security

- Use strong passwords
- Limit database user permissions
- Use SSL connections in production
- Never use default credentials in production

## Reporting Security Issues

If you discover a security vulnerability, please report it privately to the maintainers rather than opening a public issue.