import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Search } from '../../components/Search/Search'

jest.mock('../../ws.context', () => ({
  wsContext: {
    _currentValue: { on: jest.fn(), emit: jest.fn() },
  },
}))

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({ message: 'Test Message' }),
})

describe('Search Component', () => {
  test('should set input query and trigger query handler', async () => {
    render(<Search />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    const button = screen.getByRole('button', { name: /Search/i })

    fireEvent.change(input, { target: { value: 'test query' } })

    expect(input).toHaveValue('test query')

    fireEvent.click(button)

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/query',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ q: 'test query' }),
        }),
      ),
    )
  })
})
