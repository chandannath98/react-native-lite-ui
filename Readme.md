
# Custom UI Components with Theming

This package provides customizable and themable React Native components including Buttons, Chips, Text, and TextInput. All components are designed to work seamlessly with a theme context to provide a consistent UI experience.

## Installation

```bash
npm install react-native-lite-ui
```

## Usage

First, wrap your app with the `ThemeProvider` and provide initial values for the theme:

```tsx
import React from 'react';
import { ThemeProvider } from 'react-native-lite-ui';

const App = () => {
  const theme = {
    colors: {
      primary: '#6200EE',
      buttonColor: '#03DAC6',
      textColor: '#000',
    },
    fontSizes: {
      medium: 16,
    },
    fonts: {
      regular: 'System',
      medium: 'System-Medium',
      bold: 'System-Bold',
    },
  };

  return (
    <ThemeProvider initialValues={theme}>
      {/* Your app code */}
    </ThemeProvider>
  );
};

export default App;
```

### Button

A button component that supports multiple styles and theming.

#### Props

| Prop       | Type                                  | Description                                         | Default     |
|------------|---------------------------------------|-----------------------------------------------------|-------------|
| `title`    | `string`                              | The text displayed on the button.                   | `required`  |
| `onPress`  | `() => void`                          | Function to call when the button is pressed.         | `required`  |
| `style`    | `ViewStyle`                           | Custom style for the button.                        | `undefined` |
| `textStyle`| `TextStyle`                           | Custom style for the text inside the button.        | `undefined` |
| `type`     | `'contained' , 'outline' , 'text'`       | Button style type.                                  | `contained` |
| `radius`   | `'xl' , 'l' , 'm' , 's'`               | Border radius of the button.                        | `contained` |

#### Example

```tsx
import { Button } from 'react-native-lite-ui';

<Button title="Click Me" onPress={() => alert('Button pressed')} type="outline" />
```

### Chip

A chip component that supports multiple styles and theming.

#### Props

| Prop       | Type                                  | Description                                         | Default     |
|------------|---------------------------------------|-----------------------------------------------------|-------------|
| `title`    | `string`                              | The text displayed on the chip.                     | `required`  |
| `style`    | `ViewStyle`                           | Custom style for the chip.                          | `undefined` |
| `textStyle`| `TextStyle`                           | Custom style for the text inside the chip.          | `undefined` |
| `type`     | `'contained' ,'outline' , 'text'`       | Chip style type.                                    | `contained` |
| `radius`   | `'xl' , 'l' ,'m' , 's'`               | Border radius of the chip.                          | `xl`        |
| `color`    | `string`                              | Custom color for the chip.                          | `theme.colors.primary` |

#### Example

```tsx
import { Chip } from 'react-native-lite-ui';

<Chip title="Chip" type="outline" />
```

### Text

A customizable text component that supports multiple font styles and colors.

#### Props

| Prop       | Type                                  | Description                                         | Default     |
|------------|---------------------------------------|-----------------------------------------------------|-------------|
| `children` | `React.ReactNode`                     | The text content inside the component.              | `required`  |
| `fontSize` | `'medium',"large","extraLarge","extraExtraLarge","small","extraSmall"`                     | Font Size.              | `medium`  |
| `style`    | `TextStyle ` | Custom style for the text.                          | `undefined` |
| `mode`     | `'regular' , 'bold' , 'medium'`       | Font weight/style of the text.                      | `regular`   |
| `colored`  | `boolean`                             | Whether to use the primary color from the theme.    | `false`     |

#### Example

```tsx
import { Text } from 'react-native-lite-ui';

<Text mode="bold" colored={true}>Hello World</Text>
```

### TextInput

A customizable text input field with support for different font weights.

#### Props

| Prop       | Type                                  | Description                                         | Default     |
|------------|---------------------------------------|-----------------------------------------------------|-------------|
| `style`    | `TextStyle`                           | Custom style for the text input.                    | `undefined` |
| `fontWeight`| `'regular' , 'bold' , 'medium'`       | Font weight of the text input.                      | `regular`   |

#### Example

```tsx
import { TextInput } from 'react-native-lite-ui';

<TextInput placeholder="Type here" fontWeight="bold" />
```

## Theming

All components use the `useTheme` hook to apply colors, fonts, and styles from a theme. To change the appearance globally, provide custom values via the `ThemeProvider`.

```tsx
import { ThemeProvider } from 'react-native-lite-ui';

const theme = {
  colors: {
    primary: '#6200EE',
    textColor: '#000',
  },
   fontSizes:{
      medium: 14,
      large: 16,
      extraLarge: 18,
      extraExtraLarge: 50,
      small:12,
      extraSmall: 10
  },
  fonts: {
    regular: 'System-Regular',
    medium: 'System-Medium',
    bold: 'System-Bold',
  },
};

<ThemeProvider initialValues={theme}>
  {/* Your app code */}
</ThemeProvider>
```

## License

This project is licensed under the MIT License.
# react-native-lite-ui
