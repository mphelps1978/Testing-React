import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, wait} from '@testing-library/react';
import {getByTestId} from '@testing-library/dom'
import {getData} from '../api/index';
import StarWarsCharacters from './StarWarsCharacters'

jest.mock('../api')



test('Buttons Next and Previous function as intended', async() =>{

    getData.mockResolvedValue(
        {
          results: [
            {
              name: 'testName',
              id: 1
            }
          ],
          next: 'testNext',
          previous: 'testPrevious'
        }
    )

const { getByText } = render(<StarWarsCharacters />)

const testNextButton = getByText(/next/i)
const testPreviousButton = getByText(/previous/i)



fireEvent.click(testNextButton)
fireEvent.click(testPreviousButton)
expect(getData).toHaveBeenCalledTimes(1)

wait(() => expect(getByText(/'Darth'/i)))
})



