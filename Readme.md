# Custom UI Components with Theming

This package provides customizable and themable React Native components all synced with same fonts of your choice so you don's have to set fonts individually at every place, package including Buttons, Chips, Text, and TextInput, Toast, Alert. All components are designed to work seamlessly with a theme context to provide a consistent UI experience.

## Installation

```bash
npm install react-native-lite-ui
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons
npm install lottie-react-native
```

## Usage

First, wrap your app with the `ThemeProvider` and provide initial values for the theme:

### Setting Up Theme

Wrap your app with the `ThemeProvider` and provide initial values for colors, font sizes, and fonts. The `ThemeProvider` supports both light and dark themes as well as a system-based mode.

```tsx
import React from 'react';
import { ThemeProvider,ThemeInitialValues } from 'react-native-lite-ui';

const App = () => {
  const theme:ThemeInitialValues = {
   secondary2: "#018786",
    secondary3: "#03dac4",
    backgroundColor2: "#f5f5f5",
    backgroundColor3: "#e0e0e0",
    disabledColor: "#bdbdbd",
    errorColor: "#cf6679",
  },
  themesColors: {
    light: {
      primary: "#6200ea",
      secondary: "#03dac6",
      backgroundColor: "#ffffff",
      buttonColor: "#6200ea",
      textColor: "#000000",
      disabledColor: "#bdbdbd",
      primary2: "#3700b3",
      primary3: "#bb86fc",
      secondary2: "#018786",
      secondary3: "#03dac4",
      backgroundColor2: "#f5f5f5",
      backgroundColor3: "#e0e0e0",
      errorColor: "#cf6679",
    },
    dark: {
      primary: "#bb86fc",
      secondary: "#03dac6",
      backgroundColor: "#121212",
      buttonColor: "#bb86fc",
      textColor: "#ffffff",
      disabledColor: "#757575",
      primary2: "#3700b3",
      primary3: "#6200ea",
      secondary2: "#018786",
      secondary3: "#03dac4",
      backgroundColor2: "#1e1e1e",
      backgroundColor3: "#2a2a2a",
      errorColor: "#cf6679",
    },
  },
  fontSizes: {
    small: 12,
    medium: 14,
    large: 16,
    extraLarge: 18,
    extraExtraLarge: 22,
    extraSmall: 10,
    extraExtraSmall: 8,
  },
  fonts: {
    regular: "Roboto-Regular",
    bold: "Roboto-Bold",
    medium: "Roboto-Medium",
  },
  colorMode: "light",
  };

  return (
    <ThemeProvider initialValues={theme}>
      {/* Your app code */}
    </ThemeProvider>
  )


}


export default App;
```

### Switching Themes

You can switch themes dynamically using the `useTheme,setThemeMode` hook, and get theme `colors` using colors of `useTheme`:

```tsx
import React from 'react';
import {Button, useTheme} from 'react-native-lite-ui';

const ThemeSwitcher = () => {
  const {themeMode, setThemeMode, colors} = useTheme();

  return (
    <View style={{backgroundColor: colors.backgroundColor}}>
      <Button
        title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}
        onPress={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
      />
    </View>
  );
};
```

---

### Theming Details

The `ThemeProvider` allows you to define themes for light and dark modes as well as system-based preferences. It also provides additional customization options for font sizes and font families.

#### Available Properties

- **Colors**:

  - `primary`
  - `secondary`
  - `backgroundColor`
  - `buttonColor`
  - `textColor`
  - `disabledColor`
  - `primary2`, `primary3`, `secondary2`, `secondary3`
  - `backgroundColor2`, `backgroundColor3`

- **Font Sizes**:

  - `medium`, `large`, `extraLarge`, `small`, `extraSmall`,`extraExtraSmall`

- **Fonts**:

  - `regular`, `medium`, `bold`

- **Theme Modes**:
  - `'light'`, `'dark'`, `'system'`

#### Example

```tsx
const theme = {
   secondary2: "#018786",
    secondary3: "#03dac4",
    backgroundColor2: "#f5f5f5",
    backgroundColor3: "#e0e0e0",
    disabledColor: "#bdbdbd",
    errorColor: "#cf6679",
  },
  themesColors: {
    light: {
      primary: "#6200ea",
      secondary: "#03dac6",
      backgroundColor: "#ffffff",
      buttonColor: "#6200ea",
      textColor: "#000000",
      disabledColor: "#bdbdbd",
      primary2: "#3700b3",
      primary3: "#bb86fc",
      secondary2: "#018786",
      secondary3: "#03dac4",
      backgroundColor2: "#f5f5f5",
      backgroundColor3: "#e0e0e0",
      errorColor: "#cf6679",
    },
    dark: {
      primary: "#bb86fc",
      secondary: "#03dac6",
      backgroundColor: "#121212",
      buttonColor: "#bb86fc",
      textColor: "#ffffff",
      disabledColor: "#757575",
      primary2: "#3700b3",
      primary3: "#6200ea",
      secondary2: "#018786",
      secondary3: "#03dac4",
      backgroundColor2: "#1e1e1e",
      backgroundColor3: "#2a2a2a",
      errorColor: "#cf6679",
    },
  },
  fontSizes: {
    small: 12,
    medium: 14,
    large: 16,
    extraLarge: 18,
    extraExtraLarge: 22,
    extraSmall: 10,
    extraExtraSmall: 8,
  },
  fonts: {
    regular: "Roboto-Regular",
    bold: "Roboto-Bold",
    medium: "Roboto-Medium",
  },
  colorMode: "light",
};
```

### Button

A button component that supports multiple styles and theming.

#### Props

| Prop               | Type                               | Description                                  | Default                      |
| ------------------ | ---------------------------------- | -------------------------------------------- | ---------------------------- |
| `title`            | `string`                           | The text displayed on the button.            | `required`                   |
| `onPress`          | `() => void`                       | Function to call when the button is pressed. | `required`                   |
| `style`            | `ViewStyle`                        | Custom style for the button.                 | `undefined`                  |
| `textStyle`        | `TextStyle`                        | Custom style for the text inside the button. | `undefined`                  |
| `type`             | `'contained' , 'outline' , 'text'` | Button style type.                           | `contained`                  |
| `radius`           | `'xl' , 'l' , 'm' , 's'`           | Border radius of the button.                 | `contained`                  |
| `color`            | `string`                           | Color of Button.                             | Themes default primary color |
| `loading`          | `boolean`                          | show loading indicator.                      | `false`                      |
| `disabled`         | `boolean`                          | To Disable button.                           | `false`                      |
| `startComponent`   | `ReactNode`                        | Component to show on the left of button.     |                              |
| `tailingComponent` | `ReactNode`                        | Component to show on the right of button.    |                              |
| `tailingICon`      | `ReactNode / string`               | Icon to show on the right of button.         |                              |
| `tailingIconSize`  | `Number`                           | Icon size.                                   | `12`                         |
| `tailingIconColor` | `String`                           | Icon size.                                   | default theme color          |

#### Example

```tsx
import {Button} from 'react-native-lite-ui';

<Button
  title="Click Me"
  onPress={() => alert('Button pressed')}
  type="outline"
/>;
```

### Chip

A chip component that supports multiple styles and theming.

#### Props

| Prop              | Type                              | Description                                | Default              |
| ----------------- | --------------------------------- | ------------------------------------------ | -------------------- |
| `title`           | `string`                          | The text displayed on the chip.            | `required`           |
| `style`           | `ViewStyle`                       | Custom style for the chip.                 | `undefined`          |
| `textStyle`       | `TextStyle`                       | Custom style for the text inside the chip. | `undefined`          |
| `type`            | `'contained' ,'outline' , 'text'` | Chip style type.                           | `contained`          |
| `radius`          | `'xl' , 'l' ,'m' , 's'`           | Border radius of the chip.                 | `xl`                 |
| `color`           | `string`                          | Custom color for the chip.                 | themes primary color |
| `icon`            | `ReactNode`                       | Icon on the right of chip.                 |                      |
| `gap`             | `Number`                          | Gap between Icon and Text.                 | `3`                  |
| `selected`        | `boolean`                         | background filled if true.                 | `false`              |
| `isTouchable`     | `boolean`                         | is Touchable.                              | `false`              |
| `backgroundColor` | `string`                          | background color when not selected.        | ``                   |

#### Example

```tsx
import {Chip} from 'react-native-lite-ui';

<Chip title="Chip" type="outline" />;
```

### ChipGroup

Group of Chips in a row that can be used as select options.

#### Props

| Prop              | Type                              | Description                                | Default              |
| ----------------- | --------------------------------- | ------------------------------------------ | -------------------- |
| `chips`           | `ChipProps[]`                     | chips data.                                | `required`           |
| `onSelect`        | `Function`                        | Function on Select.                        | `required`           |
| `containerStyle`  | `ViewStyle`                       | Custom style for the container.            | `undefined`          |
| `chipStyle`       | `ViewStyle`                       | Custom style for the chips.                | `undefined`          |
| `textStyle`       | `TextStyle`                       | Custom style for the text inside the chip. | `undefined`          |
| `type`            | `'contained' ,'outline' , 'text'` | Chip style type.                           | `contained`          |
| `radius`          | `'xl' , 'l' ,'m' , 's'`           | Border radius of the chip.                 | `xl`                 |
| `color`           | `string`                          | Custom color for the chip.                 | themes primary color |
| `icon`            | `ReactNode`                       | Icon on the right of chip.                 |                      |
| `gap`             | `Number`                          | Gap between Chips.                         | `3`                  |
| `iconGap`         | `Number`                          | Gap between Icon and Text.                 | `3`                  |
| `selectedId`      | `boolean`                         | background filled if true.                 | `false`              |
| `isTouchable`     | `boolean`                         | is Touchable.                              | `false`              |
| `backgroundColor` | `string`                          | background color when not selected.        | ``                   |

#### ChipProps

| Prop    | Type        | Description                |            |
| ------- | ----------- | -------------------------- | ---------- |
| `id`    | `number`    | id.                        | `required` |
| `title` | `string`    | title.                     | `required` |
| `icon`  | `ReactNode` | Icon on the right of chip. | ``         |

#### Example

```tsx
import {Chip} from 'react-native-lite-ui';

<ChipGroup
  onSelect={id => setSelectedChip(id)}
  chips={[
    {
      title: 'REC',
      id: 'REC',
      icon: (color, selected) =>
        selected ? (
          <Feather
            style={{marginTop: 3}}
            name={'check'}
            size={12}
            color={color || theme.colors.primary}
          />
        ) : (
          <></>
        ),
    },
    {
      title: 'RTM',
      id: 'RTM',
      icon: (color, selected) =>
        selected ? (
          <Feather
            style={{marginTop: 3}}
            name={'check'}
            size={12}
            color={color || theme.colors.primary}
          />
        ) : (
          <></>
        ),
    },
  ]}
  selectedId={selectedChip}
  backgroundColor="#e6ebea"
  radius="l"
  gap={5}
/>;
```

### Text

A customizable text component that supports multiple font styles and colors.

#### Props

| Prop       | Type                                                                                     | Description                                      | Default     |
| ---------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------- |
| `children` | `React.ReactNode`                                                                        | The text content inside the component.           | `required`  |
| `fontSize` | `'medium',"large","extraLarge","extraExtraLarge","small","extraSmall","extraExtraSmall"` | Font Size.                                       | `medium`    |
| `style`    | `TextStyle `                                                                             | Custom style for the text.                       | `undefined` |
| `mode`     | `'regular' , 'bold' , 'medium'`                                                          | Font weight/style of the text.                   | `regular`   |
| `colored`  | `boolean`                                                                                | Whether to use the primary color from the theme. | `false`     |

#### Example

```tsx
import {Text} from 'react-native-lite-ui';

<Text mode="bold" colored={true}>
  Hello World
</Text>;
```

### TextInput

A customizable text input field with support for different font weights.

#### Props

| Prop                     | Type                            | Description                                                                               | Default           |
| ------------------------ | ------------------------------- | ----------------------------------------------------------------------------------------- | ----------------- |
| `style`                  | `TextStyle`                     | Custom style for the text input.                                                          | `undefined`       |
| `fontWeight`             | `'regular' , 'bold' , 'medium'` | Font weight of the text input.                                                            | `regular`         |
| `disabled`               | `boolean`                       | Is disable input.                                                                         | `false`           |
| `isError`                | `boolean`                       | Error Condition in the case of true a error message will be shown on the bottom of input. | `false`           |
| `errorMessage`           | `String`                        | Error message will be shown on the bottom of input.                                       | `"Invalid Input"` |
| `gapBetweenErrorMessage` | `Number`                        | Gap between textInput and error message.                                                  | `3`               |
| `errorColor`             | `String`                        | Color of error message.                                                                   | `"red"`           |

#### Example

```tsx
import {TextInput} from 'react-native-lite-ui';

<TextInput placeholder="Type here" fontWeight="bold" />;
```

## License

This project is licensed under the MIT License.

# react-native-lite-ui
