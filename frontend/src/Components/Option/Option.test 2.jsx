import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Option from './Option';

describe('Option component', () => {
  const mockOption = {
    description: 'Option description',
    attribute: 'Option attribute',
    threshold: 'Option threshold',
    reward: { name: 'Option reward', attribute: 'Option reward attribute', value: 10 },
    penalty: { name: 'Option penalty', value: -5 }
  };

  it('renders the option description', () => {
    const { getByText } = render(<Option option={mockOption} />);
    expect(getByText('Option description')).toBeInTheDocument();
  });

  it('renders the option attribute and threshold', () => {
    const { getByText } = render(<Option option={mockOption} />);
    expect(getByText('Option attribute')).toBeInTheDocument();
    expect(getByText('Option threshold')).toBeInTheDocument();
  });

  it('renders the option reward name, attribute, and value', () => {
    const { getByText } = render(<Option option={mockOption} />);
    expect(getByText('Option reward')).toBeInTheDocument();
    expect(getByText('Option reward attribute: +10')).toBeInTheDocument();
  });

  it('renders the option penalty name and value', () => {
    const { getByText } = render(<Option option={mockOption} />);
    expect(getByText('Option penalty:-5')).toBeInTheDocument();
  });
});
