import { mount } from 'enzyme';
import Home from 'Pages/index';
import {render, fireEvent, cleanup} from '@testing-library/react';
import SearchService from "../services/search";

jest.mock('Services/search', () => (
    {
        searchSymbol: jest.fn()
    }
));
afterEach(cleanup);

describe('Home Page should render correctly', () => {
    it('should render without throwing an error', function () {
        const wrap = mount(<Home/>);
        expect(wrap.find('div.title-home').text()).toBe('Search Stock Info By Stock Symbol')
    });

    it('should render the details component with proper data', async  () => {
        SearchService.searchSymbol.mockImplementation(() => {
                return new Promise((resolve) => {
                    resolve({
                        symbol: 'TT',
                        description: 'This is Big company',
                        companyName: 'Test',
                        price: '$40.00'
                    });
                });
        });
        const { container, findByText  } = render(<Home />);
        const button = container.querySelector('button.ant-input-search-button');
        fireEvent.click(button);
        // Wait for page to update with new state
        const companyName = await findByText('Test');
        const symbol = await findByText('TT');
        expect(companyName).toBeDefined();
        expect(symbol).toBeDefined();
    });

    it('should render the 404 Error Message', async  () => {
        SearchService.searchSymbol.mockImplementation(() => {
            return new Promise((_, reject) => {
                reject({
                    response: {
                        status: 404
                    }
                });
            });
        });
        const { container, findByText  } = render(<Home />);
        const button = container.querySelector('button.ant-input-search-button');
        fireEvent.click(button);
        // Wait for page to update with new state
        const errorCode = await findByText('Sorry, the symbol you searched seems to be invalid.');
        expect(errorCode).toBeDefined();
    });
});