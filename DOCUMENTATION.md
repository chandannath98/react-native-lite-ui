# React Native Lite UI - Complete Documentation

A comprehensive collection of lightweight, customizable UI components for React Native applications. This package provides theme support, dark mode, and intuitive component APIs.

**Version:** 1.1.4  
**Author:** Chandan Nath  
**License:** ISC  
**Repository:** [https://github.com/chandannath98/react-native-lite-ui](https://github.com/chandannath98/react-native-lite-ui)

---

## Table of Contents

1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Theme Setup](#theme-setup)
4. [Components](#components)
   - [Text](#text)
   - [Button](#button)
   - [TextInput](#textinput)
   - [Chip & ChipGroup](#chip--chipgroup)
   - [Switch](#switch)
   - [Checkbox](#checkbox)
   - [Toast](#toast)
   - [Alert](#alert)
   - [Dialog](#dialog)
   - [BottomSheet](#bottomsheet)
   - [Divider](#divider)
   - [ScreenWrapper](#screenwrapper)
   - [AnimatedInput](#animatedinput)
   - [ButtonGroup](#buttongroup)
   - [Selector](#selector)

---

## Installation

```bash
npm install react-native-lite-ui
```

**Dependencies:**
```bash
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons
npm install rn-popover-selector
npm install lottie-react-native
npm install react-native-size-matters
```

---

## Getting Started

### Basic Setup with Theme Provider

Wrap your app with `ThemeProvider` to enable theming across all components:

```tsx
import React from 'react';
import { ThemeProvider, Text, Button } from 'react-native-lite-ui';

const App = () => {
  return (
    <ThemeProvider
      initialValues={{
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
          regular: 'Roboto-Regular',
          medium: 'Roboto-Medium',
          bold: 'Roboto-Bold',
        },
      }}
    >
      {/* Your app components */}
    </ThemeProvider>
  );
};

export default App;
```

---

## Theme Setup

### Using the Theme Hook

Access theme values anywhere in your app using the `useTheme` hook:

```tsx
import { useTheme } from 'react-native-lite-ui';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.backgroundColor }}>
      <Text style={{ color: theme.colors.textColor }}>Hello</Text>
    </View>
  );
};
```

### Switching Themes

```tsx
const MyComponent = () => {
  const { themeMode, setThemeMode, toggleTheme } = useTheme();

  return (
    <Button
      title="Toggle Theme"
      onPress={() => toggleTheme()}
    />
  );
};
```

---

## Components

### Text

A customizable text component with theme support and font weight options.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **Required** | Text content |
| `mode` | `'regular' \| 'bold' \| 'medium'` | `'regular'` | Font weight style |
| `fontSize` | `'extraExtraSmall' \| 'extraSmall' \| 'small' \| 'medium' \| 'large' \| 'extraLarge' \| 'extraExtraLarge'` | `'medium'` | Font size preset |
| `colored` | `boolean` | `false` | Use primary color if true |
| `style` | `TextStyle \| TextStyle[]` | `undefined` | Custom styles |

#### Examples

```tsx
import { Text } from 'react-native-lite-ui';

// Basic text
<Text>Hello World</Text>

// Bold text
<Text mode="bold">Bold Text</Text>

// Medium font weight
<Text mode="medium">Medium Weight</Text>

// Different sizes
<Text fontSize="small">Small Text</Text>
<Text fontSize="large">Large Text</Text>
<Text fontSize="extraLarge">Extra Large Text</Text>

// Colored text (uses primary color)
<Text colored>Colored Text</Text>

// Custom style
<Text style={{ color: 'red', marginBottom: 10 }}>
  Styled Text
</Text>

// Combined
<Text 
  mode="bold" 
  fontSize="large" 
  colored 
  style={{ marginVertical: 10 }}
>
  Bold Large Colored Text
</Text>
```

---

### Button

A versatile button component with multiple types, loading states, and icon support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Button text |
| `onPress` | `() => void` | **Required** | Callback when pressed |
| `type` | `'contained' \| 'outline' \| 'text'` | `'contained'` | Button style type |
| `radius` | `'xl' \| 'l' \| 'm' \| 's'` | `'s'` | Border radius size |
| `color` | `string` | Theme primary color | Button color |
| `disabled` | `boolean` | `false` | Disable button interaction |
| `loading` | `boolean` | `false` | Show loading indicator |
| `style` | `ViewStyle \| ViewStyle[]` | `undefined` | Custom container style |
| `textStyle` | `TextStyle` | `undefined` | Custom text style |
| `startComponent` | `ReactNode` | `undefined` | Component before text |
| `tailingComponent` | `ReactNode` | `undefined` | Component after text |
| `tailingICon` | `string \| ReactNode` | `undefined` | Icon name or component |
| `tailingIconSize` | `number` | `15` | Icon size |
| `tailingIconColor` | `string` | Button color | Icon color |

#### Examples

```tsx
import { Button } from 'react-native-lite-ui';

// Basic button
<Button
  title="Press Me"
  onPress={() => console.log('Pressed!')}
/>

// Outlined button
<Button
  title="Outline Button"
  type="outline"
  onPress={() => {}}
/>

// Text button
<Button
  title="Text Button"
  type="text"
  onPress={() => {}}
/>

// Custom colors
<Button
  title="Custom Color"
  color="#FF6B6B"
  onPress={() => {}}
/>

// With rounded corners
<Button
  title="Rounded"
  radius="xl"
  onPress={() => {}}
/>

// Loading state
<Button
  title="Loading"
  loading={true}
  onPress={() => {}}
/>

// Disabled button
<Button
  title="Disabled"
  disabled={true}
  onPress={() => {}}
/>

// With trailing icon
<Button
  title="Next"
  tailingICon="right"
  tailingIconSize={18}
  onPress={() => {}}
/>

// Full example with multiple props
<Button
  title="Advanced Button"
  type="contained"
  radius="xl"
  color="#007AFF"
  style={{ marginVertical: 10, paddingVertical: 15 }}
  textStyle={{ fontSize: 18 }}
  onPress={() => console.log('Clicked')}
/>
```

---

### TextInput

A customizable text input with error handling and theme support.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Input value |
| `onChangeText` | `(text: string) => void` | `undefined` | Change callback |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `fontWeight` | `'regular' \| 'medium' \| 'bold'` | `'regular'` | Font weight |
| `disabled` | `boolean` | `false` | Disable input |
| `isError` | `boolean` | `false` | Show error state |
| `errorMessage` | `string` | `undefined` | Error message text |
| `errorColor` | `ColorValue` | `'red'` | Error color |
| `gapBetweenErrorMessage` | `string \| number` | `2` | Gap between input and error |
| `style` | `TextStyle` | `undefined` | Custom style |

#### Examples

```tsx
import { TextInput } from 'react-native-lite-ui';
import { useState } from 'react';

// Basic input
const [text, setText] = useState('');
<TextInput
  placeholder="Enter text"
  value={text}
  onChangeText={setText}
/>

// With error
<TextInput
  placeholder="Email"
  isError={true}
  errorMessage="Invalid email"
  errorColor="#FF3B30"
/>

// Disabled input
<TextInput
  placeholder="Disabled"
  disabled={true}
/>

// Bold font weight
<TextInput
  placeholder="Bold input"
  fontWeight="bold"
/>

// Custom styling
<TextInput
  placeholder="Styled input"
  style={{ marginVertical: 10, paddingVertical: 12 }}
/>

// Complete example with validation
const [email, setEmail] = useState('');
const [error, setError] = useState('');

<TextInput
  placeholder="Enter email"
  value={email}
  onChangeText={(value) => {
    setEmail(value);
    setError(!value.includes('@') && value.length > 0 ? 'Invalid email' : '');
  }}
  isError={error !== ''}
  errorMessage={error}
  fontWeight="medium"
/>
```

---

### Chip & ChipGroup

Lightweight selection components for displaying options.

#### Chip Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Chip text |
| `type` | `'contained' \| 'outline'` | `'outline'` | Chip style |
| `radius` | `'xl' \| 'l' \| 'm' \| 's'` | `'xl'` | Border radius |
| `color` | `string` | Theme primary | Chip color |
| `selected` | `boolean` | `false` | Selection state |
| `isTouchable` | `boolean` | `true` | Enable interaction |
| `icon` | `ReactNode \| function` | `undefined` | Icon element or function |
| `gap` | `number` | `3` | Gap between text and icon |
| `backgroundColor` | `string` | `undefined` | Background color |
| `style` | `ViewStyle` | `undefined` | Custom style |
| `textStyle` | `TextStyle` | `undefined` | Custom text style |

#### ChipGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ChipItem[]` | **Required** | Array of chip items |
| `selectedId` | `string \| number` | `undefined` | Selected chip ID |
| `onSelect` | `(id: string \| number) => void` | `undefined` | Selection callback |
| `type` | `'contained' \| 'outline'` | `'outline'` | Chip type |
| `gap` | `number` | `10` | Gap between chips |
| `style` | `ViewStyle` | `undefined` | Container style |

#### Examples

```tsx
import { Chip, ChipGroup } from 'react-native-lite-ui';
import { useState } from 'react';

// Basic chip
<Chip
  title="Filter"
  onPress={() => {}}
/>

// Selected chip
<Chip
  title="Active"
  selected={true}
  onPress={() => {}}
/>

// Contained chip
<Chip
  title="Contained"
  type="contained"
  onPress={() => {}}
/>

// Chip with icon
<Chip
  title="Like"
  icon={<Icon name="heart" size={16} />}
  gap={5}
  onPress={() => {}}
/>

// ChipGroup example
const [selected, setSelected] = useState(null);
const items = [
  { id: 1, title: 'Option 1' },
  { id: 2, title: 'Option 2' },
  { id: 3, title: 'Option 3' },
];

<ChipGroup
  items={items}
  selectedId={selected}
  onSelect={(id) => setSelected(id)}
  type="outline"
  gap={8}
/>

// With custom styling
<Chip
  title="Custom"
  style={{ marginHorizontal: 5 }}
  textStyle={{ fontWeight: 'bold' }}
  color="#FF6B6B"
/>
```

---

### Switch

An animated toggle switch component.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOn` | `boolean` | **Required** | Switch state |
| `onToggle` | `(state: boolean) => void` | **Required** | State change callback |
| `activeColor` | `string` | Theme primary | Active color |
| `inactiveColor` | `string` | `'#E5E5EA'` | Inactive color |
| `switchWidth` | `number` | `60` | Total width |
| `switchHeight` | `number` | `30` | Total height |
| `circleSize` | `number` | `26` | Circle/knob size |

#### Examples

```tsx
import { Switch } from 'react-native-lite-ui';
import { useState } from 'react';

// Basic switch
const [isOn, setIsOn] = useState(false);
<Switch
  isOn={isOn}
  onToggle={(value) => setIsOn(value)}
/>

// Custom colors
<Switch
  isOn={isOn}
  onToggle={(value) => setIsOn(value)}
  activeColor="#4CAF50"
  inactiveColor="#BDBDBD"
/>

// Different sizes
<Switch
  isOn={isOn}
  onToggle={(value) => setIsOn(value)}
  switchWidth={80}
  switchHeight={40}
  circleSize={36}
/>

// Complete example with label
const [notificationsEnabled, setNotificationsEnabled] = useState(false);

<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <Text>Enable Notifications</Text>
  <Switch
    isOn={notificationsEnabled}
    onToggle={(value) => setNotificationsEnabled(value)}
  />
</View>
```

---

### Checkbox

A customizable checkbox component with labels.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | **Required** | Checked state |
| `onChange` | `() => void` | **Required** | Change callback |
| `label` | `string` | `undefined` | Label text |
| `size` | `number` | `24` | Icon size |
| `color` | `string` | Theme primary | Checkbox color |

#### Examples

```tsx
import { CustomCheckbox } from 'react-native-lite-ui';
import { useState } from 'react';

// Basic checkbox
const [checked, setChecked] = useState(false);
<CustomCheckbox
  checked={checked}
  onChange={() => setChecked(!checked)}
/>

// With label
<CustomCheckbox
  checked={checked}
  onChange={() => setChecked(!checked)}
  label="I agree to terms"
/>

// Custom size and color
<CustomCheckbox
  checked={checked}
  onChange={() => setChecked(!checked)}
  size={28}
  color="#FF6B6B"
  label="Remember me"
/>

// Multiple checkboxes
const [preferences, setPreferences] = useState({
  email: false,
  sms: false,
  push: false,
});

<View>
  <CustomCheckbox
    checked={preferences.email}
    onChange={() => setPreferences({...preferences, email: !preferences.email})}
    label="Email Notifications"
  />
  <CustomCheckbox
    checked={preferences.sms}
    onChange={() => setPreferences({...preferences, sms: !preferences.sms})}
    label="SMS Notifications"
  />
  <CustomCheckbox
    checked={preferences.push}
    onChange={() => setPreferences({...preferences, push: !preferences.push})}
    label="Push Notifications"
  />
</View>
```

---

### Toast

A non-intrusive notification component that appears at the top or bottom of the screen.

#### Toast.show() Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | **Required** | Toast type |
| `message` | `string` | **Required** | Toast message |
| `heading` | `string` | `undefined` | Optional heading |
| `duration` | `number \| ToastDuration` | `3000` | Duration in milliseconds |
| `position` | `'top' \| 'bottom'` | `'top'` | Position on screen |
| `onDismiss` | `() => void` | `undefined` | Callback when dismissed |

#### Examples

```tsx
import { Toast } from 'react-native-lite-ui';

// Success toast
<Button
  title="Show Success"
  onPress={() => Toast.show({
    type: 'success',
    message: 'Operation completed successfully!'
  })}
/>

// Error toast
Toast.show({
  type: 'error',
  message: 'Something went wrong',
  heading: 'Error'
});

// Warning toast
Toast.show({
  type: 'warning',
  message: 'Please check your input',
  duration: 5000
});

// Info toast at bottom
Toast.show({
  type: 'info',
  message: 'New update available',
  position: 'bottom',
  duration: 4000
});

// With callback
Toast.show({
  type: 'success',
  message: 'Item saved',
  onDismiss: () => console.log('Toast dismissed')
});

// Hide toast programmatically
Toast.hide();

// Complete example in a component
const handleSave = async () => {
  try {
    // Save logic
    Toast.show({
      type: 'success',
      message: 'Data saved successfully',
      duration: 3000
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      message: 'Failed to save data',
      heading: 'Error'
    });
  }
};
```

---

### Alert

A modal alert component for user attention.

#### Alert.show() Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | `undefined` | Alert title |
| `message` | `string` | `undefined` | Alert message |
| `buttons` | `AlertButton[]` | `undefined` | Array of buttons |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert type with icon |

**AlertButton:**
```tsx
{
  text: string,
  onPress: () => void,
  style?: 'default' | 'destructive' | 'cancel'
}
```

#### Examples

```tsx
import { Alert } from 'react-native-lite-ui';

// Simple alert
Alert.show({
  title: 'Confirm',
  message: 'Do you want to continue?',
  buttons: [
    { text: 'Cancel', onPress: () => {} },
    { text: 'OK', onPress: () => console.log('Confirmed') }
  ]
});

// Success alert
Alert.show({
  title: 'Success',
  message: 'Operation completed successfully',
  type: 'success',
  buttons: [
    { text: 'Done', onPress: () => Alert.hide() }
  ]
});

// Error alert
Alert.show({
  title: 'Error',
  message: 'Something went wrong. Please try again.',
  type: 'error',
  buttons: [
    { text: 'Cancel', style: 'cancel', onPress: () => Alert.hide() },
    { text: 'Retry', onPress: () => console.log('Retrying') }
  ]
});

// Warning alert
Alert.show({
  title: 'Warning',
  message: 'This action cannot be undone.',
  type: 'warning',
  buttons: [
    { text: 'Cancel', onPress: () => {} },
    { text: 'Delete', style: 'destructive', onPress: () => {} }
  ]
});

// Hide alert
Alert.hide();

// Complete example with delete confirmation
const handleDelete = () => {
  Alert.show({
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    type: 'warning',
    buttons: [
      { text: 'Cancel', style: 'cancel', onPress: () => Alert.hide() },
      { 
        text: 'Delete', 
        style: 'destructive', 
        onPress: () => {
          // Delete logic
          Alert.hide();
          Toast.show({
            type: 'success',
            message: 'Item deleted'
          });
        }
      }
    ]
  });
};
```

---

### Dialog

A customizable dialog/modal component.

#### Dialog.show() Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | `undefined` | Dialog title |
| `message` | `string` | `undefined` | Dialog message |
| `buttons` | `DialogButton[]` | `undefined` | Action buttons |
| `children` | `ReactNode` | `undefined` | Custom content |

**DialogButton:**
```tsx
{
  text: string,
  onPress: () => void,
  color?: string
}
```

#### Examples

```tsx
import { Dialog } from 'react-native-lite-ui';

// Basic dialog
Dialog.show({
  title: 'Choose Action',
  message: 'What would you like to do?',
  buttons: [
    { text: 'Cancel', onPress: () => Dialog.hide() },
    { text: 'Confirm', onPress: () => console.log('Confirmed'), color: '#007AFF' }
  ]
});

// Dialog with styled buttons
Dialog.show({
  title: 'Delete Confirmation',
  message: 'Are you sure?',
  buttons: [
    { text: 'Keep', onPress: () => Dialog.hide() },
    { text: 'Delete', onPress: () => {}, color: '#FF3B30' }
  ]
});

// Hide dialog
Dialog.hide();

// Complete example
const handleLogout = () => {
  Dialog.show({
    title: 'Logout',
    message: 'Are you sure you want to logout?',
    buttons: [
      { text: 'Cancel', onPress: () => Dialog.hide() },
      { 
        text: 'Logout', 
        onPress: () => {
          Dialog.hide();
          // Logout logic
        },
        color: '#FF3B30'
      }
    ]
  });
};
```

---

### BottomSheet

A customizable bottom sheet component with smooth animations.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Sheet content |
| `height` | `number` | `undefined` | Sheet height |
| `onOpen` | `() => void` | `undefined` | Open callback |
| `onDismiss` | `() => void` | `undefined` | Close callback |
| `closeOnTouchOutside` | `boolean` | `true` | Close on outside touch |
| `cancellable` | `boolean` | `true` | Allow swipe to close |

#### Examples

```tsx
import { BottomSheet } from 'react-native-lite-ui';
import { useRef } from 'react';

// Basic bottom sheet
const bottomSheetRef = useRef(null);

<BottomSheet
  ref={bottomSheetRef}
  height={300}
  onOpen={() => console.log('Opened')}
  onDismiss={() => console.log('Closed')}
>
  <View style={{ padding: 20 }}>
    <Text>Bottom Sheet Content</Text>
  </View>
</BottomSheet>

<Button
  title="Show Bottom Sheet"
  onPress={() => bottomSheetRef.current?.show()}
/>

// Filter bottom sheet
const filterSheetRef = useRef(null);

<BottomSheet
  ref={filterSheetRef}
  height={400}
  cancellable={true}
>
  <View style={{ flex: 1, padding: 20 }}>
    <Text mode="bold" fontSize="large" style={{ marginBottom: 20 }}>
      Filter Options
    </Text>
    <CustomCheckbox label="Option 1" checked={false} onChange={() => {}} />
    <CustomCheckbox label="Option 2" checked={false} onChange={() => {}} />
    <Button
      title="Apply Filters"
      onPress={() => filterSheetRef.current?.hide()}
      style={{ marginTop: 20 }}
    />
  </View>
</BottomSheet>

<Button
  title="Open Filters"
  onPress={() => filterSheetRef.current?.show()}
/>

// Non-dismissible bottom sheet
<BottomSheet
  ref={bottomSheetRef}
  height={350}
  cancellable={false}
  closeOnTouchOutside={false}
>
  <View style={{ padding: 20 }}>
    <Text>Required Action</Text>
    <Button
      title="Done"
      onPress={() => bottomSheetRef.current?.hide()}
    />
  </View>
</BottomSheet>
```

---

### Divider

A simple horizontal divider component.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `number` | `1` | Divider height |

#### Examples

```tsx
import { Divider } from 'react-native-lite-ui';

// Default divider
<Divider />

// Custom height
<Divider height={2} />

// Thick divider
<Divider height={5} />

// In a list
<View>
  <Text>Section 1</Text>
  <Divider height={1} />
  <Text>Section 2</Text>
  <Divider height={2} />
  <Text>Section 3</Text>
</View>
```

---

### ScreenWrapper

A wrapper component that handles background color from theme.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Screen content |
| `style` | `ViewStyle \| ViewStyle[]` | `undefined` | Custom style |

#### Examples

```tsx
import { ScreenWrapper, Text } from 'react-native-lite-ui';

// Basic screen wrapper
<ScreenWrapper>
  <View style={{ padding: 20 }}>
    <Text>Screen Content</Text>
  </View>
</ScreenWrapper>

// With custom style
<ScreenWrapper style={{ paddingHorizontal: 16 }}>
  <Text>Screen with custom style</Text>
</ScreenWrapper>

// Complete screen example
<ScreenWrapper>
  <ScrollView contentContainerStyle={{ padding: 16 }}>
    <Text mode="bold" fontSize="large">Profile</Text>
    <Divider height={2} />
    <Text>User information here</Text>
  </ScrollView>
</ScreenWrapper>
```

---

### AnimatedInput

A text input with animated floating label.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **Required** | Input value |
| `placeholder` | `string` | **Required** | Floating label text |
| `onFocus` | `() => void` | `undefined` | Focus callback |
| `onBlur` | `() => void` | `undefined` | Blur callback |
| `multiline` | `boolean` | `false` | Allow multiple lines |
| `outerBoxStyle` | `ViewStyle` | `undefined` | Container style |
| `placeholderStyle` | `TextStyle` | `undefined` | Label style |
| `style` | `TextStyle` | `undefined` | Input style |

#### Examples

```tsx
import { AnimatedInput } from 'react-native-lite-ui';
import { useState } from 'react';

// Basic animated input
const [email, setEmail] = useState('');
<AnimatedInput
  value={email}
  placeholder="Email"
  onChangeText={setEmail}
/>

// Multiple fields
const [form, setForm] = useState({
  name: '',
  email: '',
  password: ''
});

<View style={{ gap: 20 }}>
  <AnimatedInput
    value={form.name}
    placeholder="Full Name"
    onChangeText={(val) => setForm({...form, name: val})}
  />
  <AnimatedInput
    value={form.email}
    placeholder="Email Address"
    onChangeText={(val) => setForm({...form, email: val})}
  />
  <AnimatedInput
    value={form.password}
    placeholder="Password"
    secureTextEntry={true}
    onChangeText={(val) => setForm({...form, password: val})}
  />
</View>

// Multiline animated input
const [bio, setBio] = useState('');
<AnimatedInput
  value={bio}
  placeholder="Bio"
  onChangeText={setBio}
  multiline={true}
  outerBoxStyle={{ marginVertical: 10 }}
/>

// With custom styling
<AnimatedInput
  value={text}
  placeholder="Styled Input"
  onChangeText={setText}
  outerBoxStyle={{ marginHorizontal: 16 }}
  placeholderStyle={{ fontSize: 14 }}
/>
```

---

### ButtonGroup

An animated button group for selection.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttons` | `string[]` | **Required** | Button labels |
| `onClick` | `(index: number) => void` | **Required** | Selection callback |
| `color` | `string` | Theme primary | Active color |
| `radius` | `number` | `50` | Border radius |
| `value` | `number` | `0` | Initial selected index |

#### Examples

```tsx
import { ButtonGroup } from 'react-native-lite-ui';
import { useState } from 'react';

// Basic button group
const [selected, setSelected] = useState(1);
<ButtonGroup
  buttons={['Tab 1', 'Tab 2', 'Tab 3']}
  onClick={(index) => setSelected(index)}
  value={selected - 1}
/>

// Filter options
const [filterType, setFilterType] = useState(1);
<ButtonGroup
  buttons={['All', 'Pending', 'Completed']}
  onClick={(index) => setFilterType(index)}
  value={filterType - 1}
  color="#FF6B6B"
/>

// Custom radius
<ButtonGroup
  buttons={['Day', 'Week', 'Month']}
  onClick={(index) => setSelected(index)}
  radius={10}
/>

// Complete example with content switching
const [tabIndex, setTabIndex] = useState(1);

<View style={{ flex: 1 }}>
  <ButtonGroup
    buttons={['Home', 'Profile', 'Settings']}
    onClick={(index) => setTabIndex(index)}
    value={tabIndex - 1}
    color="#007AFF"
  />
  
  {tabIndex === 1 && <HomeScreen />}
  {tabIndex === 2 && <ProfileScreen />}
  {tabIndex === 3 && <SettingsScreen />}
</View>
```

---

### Selector

A popover selector component for dropdown selections.

#### Props

Inherits from `RNPopoverSelectorProps`. Common props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SelectItem[]` | **Required** | Array of options |
| `selectedItem` | `SelectItem` | `undefined` | Selected item |
| `onItemSelect` | `(item: SelectItem) => void` | `undefined` | Selection callback |

#### Examples

```tsx
import { Selector } from 'react-native-lite-ui';
import { useState } from 'react';

// Basic selector
const [selectedCountry, setSelectedCountry] = useState(null);
const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
];

<Selector
  items={countries}
  selectedItem={selectedCountry}
  onItemSelect={(item) => setSelectedCountry(item)}
/>

// Multiple selectors
const [country, setCountry] = useState(null);
const [state, setState] = useState(null);

<View style={{ gap: 10 }}>
  <Selector
    items={countries}
    selectedItem={country}
    onItemSelect={(item) => setCountry(item)}
  />
  {country && (
    <Selector
      items={statesByCountry[country.value]}
      selectedItem={state}
      onItemSelect={(item) => setState(item)}
    />
  )}
</View>

// Styled selector with custom options
const [category, setCategory] = useState(null);
const categories = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Books', value: 'books' },
];

<Selector
  items={categories}
  selectedItem={category}
  onItemSelect={(item) => setCategory(item)}
/>

// Complete example in a form
const [selectedOption, setSelectedOption] = useState(null);
const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

<View style={{ padding: 16 }}>
  <Text style={{ marginBottom: 8 }}>Select an option:</Text>
  <Selector
    items={options}
    selectedItem={selectedOption}
    onItemSelect={(item) => setSelectedOption(item)}
  />
  {selectedOption && (
    <Text style={{ marginTop: 8 }}>
      Selected: {selectedOption.label}
    </Text>
  )}
</View>
```

---

## Complete App Example

```tsx
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
  ThemeProvider,
  useTheme,
  Text,
  Button,
  TextInput,
  Switch,
  CustomCheckbox,
  Toast,
  Alert,
  ScreenWrapper,
} from 'react-native-lite-ui';

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = () => {
    if (!email) {
      Toast.show({
        type: 'warning',
        message: 'Please enter an email',
      });
      return;
    }

    Alert.show({
      title: 'Confirm Submission',
      message: 'Submit this form?',
      buttons: [
        { text: 'Cancel', onPress: () => Alert.hide() },
        {
          text: 'Submit',
          onPress: () => {
            Alert.hide();
            Toast.show({
              type: 'success',
              message: 'Form submitted successfully',
            });
          },
        },
      ],
    });
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text mode="bold" fontSize="extraLarge" style={{ marginBottom: 20 }}>
          Welcome
        </Text>

        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 16 }}
        />

        <View style={{ marginBottom: 16, gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Enable Notifications</Text>
            <Switch
              isOn={notificationsEnabled}
              onToggle={setNotificationsEnabled}
            />
          </View>

          <CustomCheckbox
            label="I agree to terms and conditions"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
        </View>

        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={!agreeTerms}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const App = () => {
  return (
    <ThemeProvider
      initialValues={{
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
          regular: 'Roboto-Regular',
          medium: 'Roboto-Medium',
          bold: 'Roboto-Bold',
        },
      }}
    >
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
```

---

## Best Practices

1. **Always wrap your app with ThemeProvider** to ensure all components have access to theme values
2. **Use useTheme hook** to access colors and fonts throughout your app
3. **Leverage theme mode switching** for dark/light mode support
4. **Use ScreenWrapper** as the root container for all screens
5. **Toast/Alert/Dialog are singleton patterns** - use static methods like `Toast.show()`
6. **Responsive design** - use theme font sizes for consistency
7. **Error handling** - always provide error states with meaningful messages
8. **Accessibility** - provide labels and proper component states

---

## Troubleshooting

### Components not styled correctly
- Ensure `ThemeProvider` wraps your entire app
- Check that theme values are properly defined
- Verify custom styles don't override theme values

### Toast/Alert/Dialog not showing
- Ensure component is rendered before calling `.show()`
- Check that ref is properly initialized
- Verify you're not calling `.hide()` immediately after `.show()`

### Performance issues
- Use `React.memo()` for frequently rendered custom components
- Avoid inline object definitions for styles
- Use theme values directly instead of recalculating

---

## Contributing

Found a bug or want to suggest a feature? Visit the [GitHub repository](https://github.com/chandannath98/react-native-lite-ui)

---

## License

ISC © 2024 Chandan Nath
