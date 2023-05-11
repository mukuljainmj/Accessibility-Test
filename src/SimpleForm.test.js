import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import SimpleForm from './SimpleForm';

describe('The <SimpleForm/> component', () => {
  test('should not fail any accessibility tests', async () => {
    const { container } = render(<SimpleForm />);
    expect(await axe(container)).toHaveNoViolations();
  });
  test('should not fail any accessibility tests when toggle show more fields is true', async () => {
    const { container, getByTestId } = render(<SimpleForm />);
    fireEvent.click(getByTestId('toggle-more-fields'))
    expect(await axe(container)).toHaveNoViolations();
  });
});