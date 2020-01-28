import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, wait} from '@testing-library/react';
import {getByTestId} from '@testing-library/dom'
import {getData} from '../api/index';
import StarWarsCharacters from './StarWarsCharacters'

jest.mock('../api')


test('Buttons Next and Prev function as intended', async() =>{

    getData.mockResolvedValueOnce(
        {
          results: [
            {
              name: 'testName'
            }
          ],
          next: 'testNext',
          previous: 'testPrevious'
        }
    )

const { getByText } = render(<StarWarsCharacters />)

const nextButton = getByText(/next/i)
const prevButton = getByText(/previous/i)

fireEvent.click(nextButton)
fireEvent.click(prevButton)
expect(getData).toHaveBeenCalledTimes(1)

wait(() => expect(getByText(/'Darth'/i)))
})



