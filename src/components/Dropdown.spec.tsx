import Dropdown from './Dropdown';
import { fireEvent, render, screen } from '@testing-library/react';
import mockPokemons from '@/mocks/mockPokemons.json';

/**
 * TDD:
 * 1. Should dropdown starts closed
 * 2. Should dropdown show options when is clicked by user
 * 3. Should signal an option was selected and close dropdown
 */

const title = 'Selecione o seu Pokémon';

describe('Dropdown', () => {
  it('should dropdown starts closed', () => {
    render(
      <Dropdown
        options={mockPokemons}
        title={title}
        onSelect={() => jest.fn()}
      />
    );

    mockPokemons.forEach((item) => {
      expect(screen.queryByText(item)).not.toBeInTheDocument();
    });
  });

  it('should dropdown show options when is clicked by user', () => {
    render(
      <Dropdown
        options={mockPokemons}
        title={title}
        onSelect={() => jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: title }));

    mockPokemons.forEach((item) => {
      expect(
        screen
          .getAllByRole('listitem')
          .find((listitem) => listitem.textContent === item)
      ).toBeInTheDocument();
    });
  });

  it('should signal an option was selected and close dropdown', () => {
    const onSelect = jest.fn();

    render(
      <Dropdown options={mockPokemons} title={title} onSelect={onSelect} />
    );

    fireEvent.click(screen.getByRole('button', { name: title }));

    fireEvent.click(screen.getByText(mockPokemons[0]));

    expect(onSelect).toHaveBeenCalledWith(mockPokemons[0]);
  });
});
