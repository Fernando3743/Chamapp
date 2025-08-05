# Settings Page Architecture

This document describes the refactored settings page implementation following clean code principles.

## Architecture Overview

The settings page has been refactored from a monolithic component into a modular, maintainable architecture:

```
settings/
├── page.js                 # Main page component with lazy loading
├── components/
│   ├── ErrorBoundary.js   # Error boundary for graceful error handling
│   ├── SettingsNavigation.js # Navigation sidebar component
│   ├── shared/            # Reusable UI components
│   │   ├── Button.js      # Button component with variants
│   │   ├── FormInput.js   # Form input with validation & sanitization
│   │   ├── SettingsSection.js # Section wrapper component
│   │   ├── ToggleSwitch.js # Accessible toggle switch
│   │   └── index.js       # Barrel export
│   └── sections/          # Settings section components
│       ├── GeneralSettings.js
│       ├── BusinessSettings.js
│       ├── TeamSettings.js
│       ├── NotificationSettings.js
│       ├── BillingSettings.js
│       ├── IntegrationSettings.js
│       └── SecuritySettings.js
├── hooks/
│   ├── useSettingsForm.js # Form state management hook
│   └── useCSRFToken.js    # CSRF token management
├── utils/
│   ├── sanitization.js    # Input sanitization utilities
│   └── validation.js      # Form validation functions
└── constants/
    └── index.js           # Configuration constants

```

## Key Features

### 1. Component Decomposition
- Each settings section is a separate component
- Shared UI components are reusable across sections
- Clear separation of concerns

### 2. Performance Optimizations
- Lazy loading of section components
- React.memo for preventing unnecessary re-renders
- useCallback for memoized event handlers
- Suspense for loading states

### 3. Security Enhancements
- CSRF token support in forms
- Input sanitization for XSS prevention
- Proper validation on all user inputs

### 4. Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management

### 5. Clean Code Principles
- DRY (Don't Repeat Yourself)
- Single Responsibility Principle
- Extracted constants and configuration
- Proper error boundaries

## Usage Examples

### Using the Form Hook

```javascript
const form = useSettingsForm({
  initialValues: {
    firstName: '',
    lastName: ''
  },
  validate: validateAccountInfo,
  onSubmit: async (values) => {
    // Handle form submission
  }
});

// In component
<FormInput {...form.getFieldProps('firstName')} />
```

### Creating a New Settings Section

1. Create a new component in `components/sections/`
2. Add the section to `constants/index.js`
3. Import and add to `SECTION_COMPONENTS` in `page.js`

### Adding a New Shared Component

1. Create the component in `components/shared/`
2. Export it from `components/shared/index.js`
3. Use it in any section component

## Form State Management

The `useSettingsForm` hook provides:
- Form values and errors
- Dirty state tracking
- Validation on blur and submit
- CSRF token integration
- Loading states

## Validation

Validation functions are centralized in `utils/validation.js`:
- `validateAccountInfo` - User account validation
- `validateBusinessInfo` - Business details validation
- `validatePasswordChange` - Password change validation
- `validatePaymentMethod` - Payment information validation

## Security

### Input Sanitization
All text inputs are sanitized using functions from `utils/sanitization.js`:
- HTML tag removal
- Special character escaping
- Type-specific sanitization (email, phone, URL)

### CSRF Protection
Forms automatically include CSRF tokens when `enableCSRF` is true:
- Token fetched from `/api/csrf`
- Included in form submissions
- Verified on the server side

## Error Handling

The ErrorBoundary component catches and displays errors gracefully:
- User-friendly error messages
- Development mode shows detailed errors
- Recovery options (refresh/retry)

## Accessibility Features

- All interactive elements are keyboard accessible
- ARIA labels for screen readers
- Focus indicators
- Semantic HTML structure
- Role attributes for complex widgets

## Testing Considerations

The modular structure makes testing easier:
- Unit test individual components
- Test hooks in isolation
- Mock API calls for integration tests
- Test validation and sanitization functions separately

## Future Enhancements

- Add animation transitions between sections
- Implement real API endpoints
- Add optimistic UI updates
- Include data caching
- Add undo/redo functionality