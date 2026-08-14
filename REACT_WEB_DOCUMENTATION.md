# React Web Documentation - react-native-lite-ui

## Overview

This documentation explains how to use and adapt the **react-native-lite-ui** package for **React Web** applications. While the package is primarily designed for React Native, many components can be adapted for web use or used with compatible libraries.

> **Note**: This package is optimized for React Native. For web development, consider using the base component patterns shown here or use web-specific UI libraries. This guide shows best practices for adaptation.

**Version:** 1.1.4  
**Package:** react-native-lite-ui  
**Repository:** [https://github.com/chandannath98/react-native-lite-ui](https://github.com/chandannath98/react-native-lite-ui)

---

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Theme System](#theme-system)
3. [Component Patterns](#component-patterns)
4. [Web Adaptations](#web-adaptations)
5. [Best Practices](#best-practices)

---

## Installation & Setup

### Prerequisites

```bash
npm install react react-dom
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons
```

### Basic Setup

```tsx
import React from 'react';
import { ThemeProvider } from 'react-native-lite-ui';

interface ThemeConfig {
  colors: {
    primary: string;
    secondary?: string;
    backgroundColor: string;
    buttonColor: string;
    textColor: string;
    disabledColor: string;
    errorColor: string;
    [key: string]: string | undefined;
  };
  themesColors?: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  fontSizes: {
    extraExtraSmall?: number;
    extraSmall?: number;
    small?: number;
    medium?: number;
    large?: number;
    extraLarge?: number;
    extraExtraLarge?: number;
  };
  fonts: {
    regular?: string;
    medium?: string;
    bold?: string;
  };
}

const themeConfig: ThemeConfig = {
  colors: {
    primary: '#007AFF',
    secondary: '#FF3B30',
    backgroundColor: '#FFFFFF',
    buttonColor: '#007AFF',
    textColor: '#000000',
    disabledColor: '#E7E8E9',
    errorColor: '#FF3B30',
  },
  themesColors: {
    light: {
      primary: '#007AFF',
      secondary: '#FF3B30',
      backgroundColor: '#FFFFFF',
      buttonColor: '#007AFF',
      textColor: '#000000',
      disabledColor: '#E7E8E9',
      errorColor: '#FF3B30',
    },
    dark: {
      primary: '#0A84FF',
      secondary: '#FF453A',
      backgroundColor: '#000000',
      buttonColor: '#0A84FF',
      textColor: '#FFFFFF',
      disabledColor: '#3A3A3C',
      errorColor: '#FF453A',
    },
  },
  fontSizes: {
    extraExtraSmall: 10,
    extraSmall: 12,
    small: 14,
    medium: 16,
    large: 18,
    extraLarge: 20,
    extraExtraLarge: 24,
  },
  fonts: {
    regular: 'Roboto, sans-serif',
    medium: 'Roboto, sans-serif',
    bold: 'Roboto, sans-serif',
  },
};

function App() {
  return (
    <ThemeProvider initialValues={themeConfig}>
      <YourComponents />
    </ThemeProvider>
  );
}

export default App;
```

---

## Theme System

### Using the Theme Hook

Access theme values in your React web components:

```tsx
import { useTheme } from 'react-native-lite-ui';
import React from 'react';

function MyComponent() {
  const theme = useTheme();

  return (
    <div style={{
      backgroundColor: theme.colors.backgroundColor,
      color: theme.colors.textColor,
      padding: '16px',
      fontFamily: theme.fonts.regular,
    }}>
      <h1>Welcome to My App</h1>
    </div>
  );
}
```

### Theme Properties

```tsx
const theme = useTheme();

// Access colors
theme.colors.primary        // Primary brand color
theme.colors.secondary      // Secondary color
theme.colors.backgroundColor // Background
theme.colors.buttonColor    // Button color
theme.colors.textColor      // Text color
theme.colors.disabledColor  // Disabled state
theme.colors.errorColor     // Error state

// Access font sizes
theme.fontSizes.extraExtraSmall  // 10px
theme.fontSizes.extraSmall       // 12px
theme.fontSizes.small            // 14px
theme.fontSizes.medium           // 16px
theme.fontSizes.large            // 18px
theme.fontSizes.extraLarge       // 20px
theme.fontSizes.extraExtraLarge  // 24px

// Access fonts
theme.fonts.regular  // Regular font family
theme.fonts.medium   // Medium weight font
theme.fonts.bold     // Bold font family
```

### Switching Themes

```tsx
function ThemeSwitcher() {
  const { toggleTheme, themeMode } = useTheme();

  return (
    <button onClick={() => toggleTheme()}>
      Current Theme: {themeMode} - Click to Toggle
    </button>
  );
}
```

---

## Component Patterns

### 1. Text Component for Web

**Package Component (React Native):**
```tsx
import { Text } from 'react-native-lite-ui';

<Text mode="bold" fontSize="large" colored>
  Hello World
</Text>
```

**Web Adaptation (HTML/CSS):**
```tsx
import { useTheme } from 'react-native-lite-ui';
import React from 'react';

interface TextProps {
  children: React.ReactNode;
  mode?: 'regular' | 'bold' | 'medium';
  fontSize?: 'small' | 'medium' | 'large' | 'extraLarge';
  colored?: boolean;
  style?: React.CSSProperties;
}

function Text({ 
  children, 
  mode = 'regular', 
  fontSize = 'medium', 
  colored = false,
  style = {}
}: TextProps) {
  const theme = useTheme();

  const fontWeightMap = {
    regular: 400,
    medium: 500,
    bold: 700,
  };

  const sizeMap = {
    small: theme.fontSizes.small,
    medium: theme.fontSizes.medium,
    large: theme.fontSizes.large,
    extraLarge: theme.fontSizes.extraLarge,
  };

  return (
    <span style={{
      fontFamily: theme.fonts.regular,
      fontSize: `${sizeMap[fontSize]}px`,
      fontWeight: fontWeightMap[mode],
      color: colored ? theme.colors.primary : theme.colors.textColor,
      ...style,
    }}>
      {children}
    </span>
  );
}

export default Text;
```

**Usage Examples:**
```tsx
// Basic text
<Text>Hello World</Text>

// Bold text
<Text mode="bold">Bold Text</Text>

// Large colored text
<Text fontSize="large" colored>
  Featured Title
</Text>

// With custom styles
<Text 
  mode="medium"
  fontSize="large"
  style={{ marginBottom: '10px', textTransform: 'uppercase' }}
>
  Section Header
</Text>
```

---

### 2. Button Component for Web

**Package Component (React Native):**
```tsx
import { Button } from 'react-native-lite-ui';

<Button
  title="Click Me"
  type="contained"
  radius="xl"
  onPress={() => console.log('Clicked')}
/>
```

**Web Adaptation:**
```tsx
import { useTheme } from 'react-native-lite-ui';
import React from 'react';
import './Button.css'; // See CSS below

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'contained' | 'outline' | 'text';
  radius?: 'xl' | 'l' | 'm' | 's';
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
}

function Button({
  title,
  onPress,
  type = 'contained',
  radius = 's',
  color,
  disabled = false,
  loading = false,
  style = {},
}: ButtonProps) {
  const theme = useTheme();

  const buttonColor = disabled
    ? theme.colors.disabledColor
    : color || theme.colors.buttonColor;

  const radiusMap = {
    xl: '50px',
    l: '15px',
    m: '10px',
    s: '5px',
  };

  const baseStyle: React.CSSProperties = {
    padding: '10px 16px',
    borderRadius: radiusMap[radius],
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: `${theme.fontSizes.medium}px`,
    fontFamily: theme.fonts.regular,
    fontWeight: 500,
    transition: 'all 0.3s ease',
    minWidth: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const typeStyles: React.CSSProperties = {
    contained: {
      ...baseStyle,
      backgroundColor: buttonColor,
      color: 'white',
    },
    outline: {
      ...baseStyle,
      backgroundColor: 'transparent',
      border: `1px solid ${buttonColor}`,
      color: buttonColor,
    },
    text: {
      ...baseStyle,
      backgroundColor: 'transparent',
      border: 'none',
      color: buttonColor,
    },
  };

  return (
    <button
      onClick={onPress}
      disabled={disabled || loading}
      style={{
        ...typeStyles[type],
        ...style,
      }}
      className={`btn btn-${type}`}
    >
      {loading ? (
        <span className="spinner" />
      ) : (
        title
      )}
    </button>
  );
}

export default Button;
```

**CSS (Button.css):**
```css
.btn {
  transition: all 0.3s ease;
  outline: none;
}

.btn:hover:not(:disabled) {
  opacity: 0.8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

**Usage Examples:**
```tsx
// Basic button
<Button
  title="Submit"
  onPress={() => handleSubmit()}
/>

// Outlined button
<Button
  title="Cancel"
  type="outline"
  onPress={() => handleCancel()}
/>

// Text button
<Button
  title="Learn More"
  type="text"
  onPress={() => navigate('/info')}
/>

// Disabled button
<Button
  title="Processing"
  loading={isLoading}
  disabled={isLoading}
  onPress={() => {}}
/>

// Custom styled
<Button
  title="Delete"
  type="contained"
  color="#FF3B30"
  radius="xl"
  onPress={() => handleDelete()}
/>
```

---

### 3. TextInput Component for Web

**Package Component (React Native):**
```tsx
import { TextInput } from 'react-native-lite-ui';

<TextInput
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  isError={hasError}
  errorMessage="Invalid email"
/>
```

**Web Adaptation:**
```tsx
import { useTheme } from 'react-native-lite-ui';
import React from 'react';
import './TextInput.css';

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  style?: React.CSSProperties;
}

function TextInput({
  value,
  onChangeText,
  placeholder,
  disabled = false,
  isError = false,
  errorMessage,
  type = 'text',
  style = {},
}: TextInputProps) {
  const theme = useTheme();

  return (
    <div style={{ marginBottom: '8px' }}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          minHeight: '40px',
          padding: '10px',
          borderRadius: '5px',
          border: isError 
            ? `1px solid ${theme.colors.errorColor}`
            : '1px solid #E7E8E9',
          color: theme.colors.textColor,
          fontFamily: theme.fonts.regular,
          fontSize: `${theme.fontSizes.medium}px`,
          backgroundColor: disabled
            ? theme.colors.disabledColor
            : theme.colors.backgroundColor,
          boxSizing: 'border-box',
          ...style,
        }}
        className={`input ${isError ? 'input-error' : ''}`}
      />
      {isError && errorMessage && (
        <span style={{
          color: theme.colors.errorColor,
          fontSize: `${theme.fontSizes.small}px`,
          marginTop: '4px',
          display: 'block',
        }}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default TextInput;
```

**CSS (TextInput.css):**
```css
input {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #007AFF;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}

input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-error {
  border-color: #FF3B30 !important;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.1);
}
```

**Usage Examples:**
```tsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

<TextInput
  placeholder="Enter email"
  value={email}
  onChangeText={(val) => {
    setEmail(val);
    setEmailError(!val.includes('@') && val.length > 0 ? 'Invalid email' : '');
  }}
  isError={emailError !== ''}
  errorMessage={emailError}
  type="email"
/>

// Password input
<TextInput
  placeholder="Enter password"
  value={password}
  onChangeText={setPassword}
  type="password"
/>

// Disabled input
<TextInput
  placeholder="Read only"
  value={readOnlyValue}
  onChangeText={() => {}}
  disabled={true}
/>
```

---

### 4. Switch Component for Web

**Package Component (React Native):**
```tsx
import { Switch } from 'react-native-lite-ui';

<Switch
  isOn={enabled}
  onToggle={(state) => setEnabled(state)}
/>
```

**Web Adaptation:**
```tsx
import { useTheme } from 'react-native-lite-ui';
import React from 'react';
import './Switch.css';

interface SwitchProps {
  isOn: boolean;
  onToggle: (state: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
}

function Switch({
  isOn,
  onToggle,
  activeColor,
  inactiveColor = '#E5E5EA',
}: SwitchProps) {
  const theme = useTheme();
  const switchColor = activeColor || theme.colors.primary;

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isOn}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <span
        className="slider"
        style={{
          backgroundColor: isOn ? switchColor : inactiveColor,
        }}
      />
    </label>
  );
}

export default Switch;
```

**CSS (Switch.css):**
```css
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #007aff;
}

input:checked + .slider:before {
  transform: translateX(30px);
}
```

**Usage Examples:**
```tsx
const [notificationsEnabled, setNotificationsEnabled] = useState(false);

<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <label>Enable Notifications</label>
  <Switch
    isOn={notificationsEnabled}
    onToggle={setNotificationsEnabled}
  />
</div>
```

---

### 5. Checkbox Component for Web

**Package Component (React Native):**
```tsx
import { CustomCheckbox } from 'react-native-lite-ui';

<CustomCheckbox
  label="I agree to terms"
  checked={agreedToTerms}
  onChange={() => setAgreedToTerms(!agreedToTerms)}
/>
```

**Web Adaptation:**
```tsx
import { useTheme } from 'react-native-lite-ui';
import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
}

function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) {
  const theme = useTheme();

  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: '20px',
          height: '20px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          accentColor: theme.colors.primary,
        }}
      />
      {label && (
        <span style={{
          color: theme.colors.textColor,
          fontSize: `${theme.fontSizes.medium}px`,
          fontFamily: theme.fonts.regular,
        }}>
          {label}
        </span>
      )}
    </label>
  );
}

export default Checkbox;
```

**Usage Examples:**
```tsx
const [agreedToTerms, setAgreedToTerms] = useState(false);
const [preferences, setPreferences] = useState({
  email: false,
  sms: false,
  push: false,
});

// Single checkbox
<Checkbox
  checked={agreedToTerms}
  onChange={() => setAgreedToTerms(!agreedToTerms)}
  label="I agree to terms and conditions"
/>

// Multiple checkboxes
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  <Checkbox
    checked={preferences.email}
    onChange={() => setPreferences({...preferences, email: !preferences.email})}
    label="Email Notifications"
  />
  <Checkbox
    checked={preferences.sms}
    onChange={() => setPreferences({...preferences, sms: !preferences.sms})}
    label="SMS Notifications"
  />
  <Checkbox
    checked={preferences.push}
    onChange={() => setPreferences({...preferences, push: !preferences.push})}
    label="Push Notifications"
  />
</div>
```

---

### 6. Toast Notifications for Web

**Package Component (React Native):**
```tsx
import { Toast } from 'react-native-lite-ui';

Toast.show({
  type: 'success',
  message: 'Operation completed'
});
```

**Web Adaptation:**
```tsx
import { useTheme } from 'react-native-lite-ui';
import React, { useState, useCallback } from 'react';
import './Toast.css';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  heading?: string;
  duration?: number;
}

const ToastContext = React.createContext<any>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const theme = useTheme();

  const show = useCallback((params: Omit<ToastMessage, 'id'> & { duration?: number }) => {
    const id = Date.now().toString();
    const newToast: ToastMessage = {
      ...params,
      id,
      duration: params.duration || 3000,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration !== Infinity) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getIcon = (type: ToastType) => {
    const iconMap = {
      success: '✓',
      error: '✕',
      warning: '!',
      info: 'ℹ',
    };
    return iconMap[type];
  };

  const getColor = (type: ToastType) => {
    const colorMap = {
      success: '#4CAF50',
      error: theme.colors.errorColor,
      warning: '#FF9800',
      info: theme.colors.primary,
    };
    return colorMap[type];
  };

  return (
    <ToastContext.Provider value={{ show, remove }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            style={{
              backgroundColor: getColor(toast.type),
              borderLeft: `4px solid ${getColor(toast.type)}`,
            }}
          >
            <span className="toast-icon">{getIcon(toast.type)}</span>
            <div className="toast-content">
              {toast.heading && (
                <div className="toast-heading">{toast.heading}</div>
              )}
              <div className="toast-message">{toast.message}</div>
            </div>
            <button
              className="toast-close"
              onClick={() => remove(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
```

**CSS (Toast.css):**
```css
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 300px;
  max-width: 500px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: white;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-icon {
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
}

.toast-heading {
  font-weight: bold;
  margin-bottom: 4px;
}

.toast-message {
  font-size: 14px;
  opacity: 0.9;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.toast-close:hover {
  opacity: 0.8;
}
```

**Usage Examples:**
```tsx
import { ToastProvider, useToast } from './Toast';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

function MyComponent() {
  const toast = useToast();

  return (
    <>
      <button onClick={() => toast.show({
        type: 'success',
        message: 'Operation successful!',
      })}>
        Show Success
      </button>

      <button onClick={() => toast.show({
        type: 'error',
        heading: 'Error',
        message: 'Something went wrong',
      })}>
        Show Error
      </button>

      <button onClick={() => toast.show({
        type: 'warning',
        message: 'Please check your input',
        duration: 5000,
      })}>
        Show Warning
      </button>
    </>
  );
}
```

---

### 7. Chip Component for Web

**Web Adaptation:**
```tsx
import { useTheme } from 'react-native-lite-ui';
import React from 'react';

interface ChipProps {
  title: string;
  selected?: boolean;
  onPress?: () => void;
  type?: 'contained' | 'outline';
  color?: string;
}

function Chip({
  title,
  selected = false,
  onPress,
  type = 'outline',
  color,
}: ChipProps) {
  const theme = useTheme();
  const chipColor = color || theme.colors.primary;

  return (
    <button
      onClick={onPress}
      style={{
        padding: '6px 12px',
        borderRadius: '20px',
        border: type === 'outline' ? `1px solid ${chipColor}` : 'none',
        backgroundColor: selected || type === 'contained'
          ? chipColor
          : 'transparent',
        color: selected || type === 'contained' ? 'white' : chipColor,
        cursor: 'pointer',
        fontFamily: theme.fonts.regular,
        fontSize: `${theme.fontSizes.medium}px`,
        transition: 'all 0.3s ease',
      }}
    >
      {title}
    </button>
  );
}

export default Chip;
```

**Usage Examples:**
```tsx
const [selected, setSelected] = useState(null);
const options = ['All', 'Active', 'Archived'];

<div style={{ display: 'flex', gap: '8px' }}>
  {options.map((option) => (
    <Chip
      key={option}
      title={option}
      selected={selected === option}
      onPress={() => setSelected(option)}
    />
  ))}
</div>
```

---

## Complete Web App Example

```tsx
import React, { useState } from 'react';
import { ThemeProvider, useTheme } from 'react-native-lite-ui';
import Button from './components/Button';
import Text from './components/Text';
import TextInput from './components/TextInput';
import Switch from './components/Switch';
import Checkbox from './components/Checkbox';
import { ToastProvider, useToast } from './components/Toast';
import './App.css';

const themeConfig = {
  colors: {
    primary: '#007AFF',
    secondary: '#FF3B30',
    backgroundColor: '#FFFFFF',
    buttonColor: '#007AFF',
    textColor: '#000000',
    disabledColor: '#E7E8E9',
    errorColor: '#FF3B30',
  },
  themesColors: {
    light: {
      primary: '#007AFF',
      secondary: '#FF3B30',
      backgroundColor: '#FFFFFF',
      buttonColor: '#007AFF',
      textColor: '#000000',
      disabledColor: '#E7E8E9',
      errorColor: '#FF3B30',
    },
    dark: {
      primary: '#0A84FF',
      secondary: '#FF453A',
      backgroundColor: '#000000',
      buttonColor: '#0A84FF',
      textColor: '#FFFFFF',
      disabledColor: '#3A3A3C',
      errorColor: '#FF453A',
    },
  },
  fontSizes: {
    extraExtraSmall: 10,
    extraSmall: 12,
    small: 14,
    medium: 16,
    large: 18,
    extraLarge: 20,
    extraExtraLarge: 24,
  },
  fonts: {
    regular: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    medium: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    bold: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};

function FormContent() {
  const theme = useTheme();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreedToTerms: false,
    notificationsEnabled: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (!formData.agreedToTerms) {
        toast.show({
          type: 'warning',
          message: 'Please agree to terms and conditions',
        });
        return;
      }

      toast.show({
        type: 'success',
        heading: 'Success',
        message: 'Form submitted successfully!',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        agreedToTerms: false,
        notificationsEnabled: false,
      });
    } else {
      toast.show({
        type: 'error',
        heading: 'Validation Error',
        message: 'Please fix the errors above',
      });
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: theme.colors.backgroundColor,
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <Text mode="bold" fontSize="extraLarge" style={{ marginBottom: '24px' }}>
        Sign Up Form
      </Text>

      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          color: theme.colors.textColor,
        }}>
          Full Name
        </label>
        <TextInput
          value={formData.name}
          onChangeText={(val) => setFormData({ ...formData, name: val })}
          placeholder="Enter your full name"
          isError={!!errors.name}
          errorMessage={errors.name}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          color: theme.colors.textColor,
        }}>
          Email Address
        </label>
        <TextInput
          value={formData.email}
          onChangeText={(val) => setFormData({ ...formData, email: val })}
          placeholder="Enter your email"
          type="email"
          isError={!!errors.email}
          errorMessage={errors.email}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          color: theme.colors.textColor,
        }}>
          Password
        </label>
        <TextInput
          value={formData.password}
          onChangeText={(val) => setFormData({ ...formData, password: val })}
          placeholder="Enter your password"
          type="password"
          isError={!!errors.password}
          errorMessage={errors.password}
        />
      </div>

      <div style={{
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text>Enable Notifications</Text>
        <Switch
          isOn={formData.notificationsEnabled}
          onToggle={(val) =>
            setFormData({ ...formData, notificationsEnabled: val })
          }
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <Checkbox
          checked={formData.agreedToTerms}
          onChange={() =>
            setFormData({ ...formData, agreedToTerms: !formData.agreedToTerms })
          }
          label="I agree to terms and conditions"
        />
      </div>

      <Button
        title="Sign Up"
        onPress={handleSubmit}
        disabled={!formData.agreedToTerms}
        style={{ width: '100%' }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider initialValues={themeConfig}>
      <ToastProvider>
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          padding: '24px',
        }}>
          <FormContent />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
```

---

## Best Practices for Web

1. **Use CSS for styling** - React web apps use CSS instead of React Native styles
2. **Responsive design** - Use media queries and flexbox/grid for layouts
3. **Accessibility** - Always use proper HTML elements (button, input, label)
4. **Theme consistency** - Extract colors and fonts from theme context
5. **Font families** - Use web-safe fonts or Google Fonts
6. **Event handling** - Use React event handlers (onClick, onChange, etc.)
7. **State management** - Use useState for component state
8. **Performance** - Memoize components when needed with React.memo()

---

## Common Patterns

### Theme-aware styling

```tsx
function StyledComponent() {
  const theme = useTheme();
  
  return (
    <div style={{
      color: theme.colors.textColor,
      backgroundColor: theme.colors.backgroundColor,
      fontFamily: theme.fonts.regular,
      fontSize: `${theme.fontSizes.medium}px`,
    }}>
      Content
    </div>
  );
}
```

### Form validation

```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const validateEmail = (value) => {
  const isValid = value.includes('@') && value.includes('.');
  setError(isValid ? '' : 'Invalid email address');
  return isValid;
};

<TextInput
  value={email}
  onChangeText={(val) => {
    setEmail(val);
    validateEmail(val);
  }}
  isError={!!error}
  errorMessage={error}
/>
```

### Modal/Dialog pattern

```tsx
function Dialog({ open, title, message, onClose }) {
  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        maxWidth: '500px',
      }}>
        <h2>{title}</h2>
        <p>{message}</p>
        <Button title="Close" onPress={onClose} />
      </div>
    </div>
  );
}
```

---

## Differences from React Native

| Aspect | React Native | React Web |
|--------|-------------|-----------|
| **Styling** | `StyleSheet.create()` | CSS / inline styles |
| **Elements** | `View`, `Text`, `ScrollView` | `div`, `span`, `button`, etc. |
| **Events** | `onPress` | `onClick`, `onChange` |
| **Layout** | Flexbox only | Flexbox, Grid, CSS |
| **Fonts** | Installed fonts | Web-safe or Google Fonts |
| **Colors** | RGB/Hex strings | CSS color formats |
| **Animations** | React Native Animated | CSS animations / Framer Motion |
| **Responsive** | Device-specific | Media queries |

---

## Resources

- **React Documentation**: https://react.dev
- **Original Package**: https://github.com/chandannath98/react-native-lite-ui
- **CSS Reference**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **React Patterns**: https://www.patterns.dev/react

---

## License

ISC © 2024 Chandan Nath
