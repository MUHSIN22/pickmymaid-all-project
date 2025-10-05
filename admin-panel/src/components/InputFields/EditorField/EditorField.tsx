// import chakra ui
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

// import react-hook-form, react-quill
import { useController } from 'react-hook-form';
import ReactQuill from 'react-quill';

// import styles
import 'react-quill/dist/quill.snow.css';
import './EditorField.css';
import { errorMessageStyle } from '../../styles';

/* `const modules` is an object that defines the toolbar options for the `ReactQuill` editor component.
The `toolbar` property is an array of arrays, where each inner array represents a group of toolbar
options. The first inner array contains an option to remove the header, while the second inner array
contains options for bold, italic, underline, strike, and blockquote formatting. The third inner
array contains options for ordered and unordered lists, as well as indenting options. These toolbar
options are displayed above the editor and allow the user to format their text. */
const modules = {
  toolbar: [
    [{ header: false }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
  ],
};

/* This code exports a React component called `EditorField` that takes in four props: `name`,
`control`, `rules`, and `label`. It uses the `useController` hook from the `react-hook-form` library
to manage the state of the editor field. The `ReactQuill` component is used to render the editor
field with the specified toolbar options defined in the `modules` object. The `FormControl`,
`FormLabel`, and `FormErrorMessage` components from the `@chakra-ui/react` library are used to
provide form validation and styling. The `EditorField` component returns the rendered editor field
along with any validation errors if present. */
export default function EditorField({
  name,
  control,
  rules,
  label,
}: {
  name: string;
  control: any;
  rules?: any;
  label: string;
}) {
  const {
    field: { value, onChange },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <FormControl isInvalid={invalid}>
      <FormLabel variant='primary'>{label}</FormLabel>

      <ReactQuill
        theme='snow'
        modules={modules}
        value={value}
        onChange={onChange}
      />

      {error && (
        <FormErrorMessage sx={errorMessageStyle}>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}
